
import { useState, useEffect } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// Fetch posts from Supabase
const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      profiles:author_id (
        full_name,
        avatar_url
      )
    `)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    throw error;
  }

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
};

export const HomePage = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to load posts");
      console.error("Error loading posts:", error);
    }
  }, [error]);

  // Get unique tags from all posts
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort();
  
  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags?.includes(activeTag))
    : posts;

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container-custom text-center">
          <h1 className="mb-4">Explore Insights & Ideas</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Discover thought-provoking articles on technology, design, and web development
          </p>
          <Button size="lg">Subscribe to Newsletter</Button>
        </div>
      </section>

      {/* Featured Tags */}
      <section className="py-8 border-b">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button 
              variant={activeTag === null ? "default" : "outline"} 
              onClick={() => setActiveTag(null)}
              className="rounded-full"
            >
              All
            </Button>
            {allTags.map((tag) => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                onClick={() => setActiveTag(tag)}
                className="rounded-full"
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          )}

          {!isLoading && filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                {activeTag ? `No posts found with the tag "${activeTag}".` : "There are no posts yet."}
              </p>
              {activeTag && (
                <Button onClick={() => setActiveTag(null)}>View All Posts</Button>
              )}
            </div>
          )}

          {!isLoading && filteredPosts.length > 0 && filteredPosts.length >= 6 && (
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-muted">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="mb-3">Stay Updated</h2>
            <p className="text-muted-foreground text-lg">
              Get the latest articles and insights delivered to your inbox
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            />
            <Button className="flex-shrink-0">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
