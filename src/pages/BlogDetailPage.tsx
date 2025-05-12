
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCard } from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");

  // Fetch the current post
  const { data: post, isLoading: postLoading, error: postError } = useQuery({
    queryKey: ['post', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          author:profiles!posts_author_id_fkey (
            id,
            full_name,
            avatar_url,
            role
          )
        `)
        .eq("id", id)
        .single();

      if (error) throw error;
      if (!data) throw new Error("Post not found");

      return {
        ...data,
        readingTime: `${Math.ceil(data.content.split(' ').length / 200)} min read`,
      };
    },
    onError: (error) => {
      console.error("Error fetching post:", error);
      toast.error("Failed to load post");
      if (error.message.includes("not found")) {
        navigate("/404");
      }
    }
  });

  // Fetch comments for this post
  const { data: comments = [], isLoading: commentsLoading, refetch: refetchComments } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          author:profiles!comments_author_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq("post_id", id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    onError: () => {
      toast.error("Failed to load comments");
    }
  });

  // Fetch related posts based on tags
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['relatedPosts', id, post?.tags],
    queryFn: async () => {
      if (!post?.tags || post.tags.length === 0) return [];
      
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles!posts_author_id_fkey (
            full_name,
            avatar_url
          )
        `)
        .eq("status", "published")
        .neq("id", id)
        .overlaps("tags", post.tags)
        .limit(3);

      if (error) throw error;
      
      return data.map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || post.content.substring(0, 150) + "...",
        coverImage: post.featured_image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800",
        author: {
          name: post.profiles?.full_name || "Unknown Author",
          avatar: post.profiles?.avatar_url || "https://randomuser.me/api/portraits/lego/1.jpg",
        },
        publishedAt: post.published_at || post.created_at,
        tags: post.tags || [],
      }));
    },
    enabled: !!post?.tags,
    onError: () => {
      console.error("Failed to load related posts");
    }
  });

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to comment");
      navigate("/signin");
      return;
    }
    
    if (!commentText.trim()) return;
    
    try {
      const { error } = await supabase.from("comments").insert({
        content: commentText,
        post_id: id,
        author_id: user.id
      });
      
      if (error) throw error;
      
      toast.success("Comment added successfully");
      setCommentText("");
      refetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  if (postLoading) {
    return (
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (postError || !post) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <p className="mb-6 text-muted-foreground">The post you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Image */}
      <div 
        className="w-full h-64 md:h-96 bg-cover bg-center" 
        style={{ 
          backgroundImage: `url(${post.featured_image || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800"})` 
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-40 flex items-end">
          <div className="container-custom py-8">
            <Link to="/" className="inline-flex items-center text-white mb-4 hover:underline">
              <ArrowLeft size={16} className="mr-1" /> Back to blogs
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          {/* Post header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mb-4">{post.title}</h1>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={post.author?.avatar_url} alt={post.author?.full_name} />
                <AvatarFallback>{post.author?.full_name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author?.full_name || "Unknown Author"}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <time>{new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  <span className="mx-1">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Post content */}
          <div className="prose prose-lg max-w-none blog-content mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          {/* Author bio */}
          {post.author && (
            <Card className="mb-12">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={post.author.avatar_url} alt={post.author.full_name} />
                    <AvatarFallback>{post.author.full_name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <h3 className="font-medium text-lg mb-2">Written by {post.author.full_name}</h3>
                    <p className="text-muted-foreground mb-4">
                      {post.author.role === "admin" ? "Admin and content creator" : "Contributing author"}
                    </p>
                    <Button variant="outline" size="sm">Follow</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Comments section */}
          <div className="border-t pt-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
            
            {/* Comment form */}
            <div className="mb-8">
              <form onSubmit={handleAddComment}>
                <div className="mb-4">
                  <textarea
                    className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder={user ? "Add a comment..." : "Sign in to add a comment..."}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={!user}
                  />
                </div>
                {user ? (
                  <Button type="submit">Post Comment</Button>
                ) : (
                  <Button asChild>
                    <Link to="/signin">Sign In to Comment</Link>
                  </Button>
                )}
              </form>
            </div>
            
            {/* Comments list */}
            {commentsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.author?.avatar_url} alt={comment.author?.full_name} />
                      <AvatarFallback>{comment.author?.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.author?.full_name || "Unknown User"}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <time className="text-sm text-muted-foreground">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </time>
                      </div>
                      <p>{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;
