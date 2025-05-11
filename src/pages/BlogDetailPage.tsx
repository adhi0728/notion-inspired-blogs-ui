
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogCard } from "@/components/BlogCard";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

// Mock data (would come from Supabase)
const mockPost = {
  id: 1,
  title: "Getting Started with React and TypeScript",
  content: `
    <p>React is a popular JavaScript library for building user interfaces, and TypeScript adds static typing to enhance developer experience and code quality. Together, they create a powerful combination for front-end development.</p>
    
    <h2>Why Use TypeScript with React?</h2>
    <p>TypeScript offers several benefits when used with React:</p>
    <ul>
      <li>Type checking for props, state, and other component data</li>
      <li>Better IDE support with autocompletion</li>
      <li>Easier refactoring and maintenance</li>
      <li>Catching errors during development rather than runtime</li>
    </ul>
    
    <h2>Setting Up Your Environment</h2>
    <p>To get started with React and TypeScript, you can use Create React App with the TypeScript template:</p>
    <pre><code>npx create-react-app my-app --template typescript</code></pre>
    
    <p>This sets up a project structure with all the necessary configurations for TypeScript.</p>
    
    <h2>Creating Your First Component</h2>
    <p>Let's create a simple component with TypeScript:</p>
    <pre><code>
    import React from 'react';
    
    interface GreetingProps {
      name: string;
      enthusiasmLevel?: number;
    }
    
    const Greeting: React.FC<GreetingProps> = ({ name, enthusiasmLevel = 1 }) => {
      const exclamation = Array(enthusiasmLevel).fill('!').join('');
      return (
        <div>
          <h1>Hello, {name}{exclamation}</h1>
        </div>
      );
    };
    
    export default Greeting;
    </code></pre>
    
    <h2>Conclusion</h2>
    <p>React and TypeScript offer a robust solution for building type-safe user interfaces. As you continue your journey, you'll discover more advanced patterns and techniques that will help you build maintainable, scalable applications.</p>
  `,
  coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800",
  author: {
    name: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Frontend developer with a passion for React and TypeScript. Writing about web development and UI/UX design.",
  },
  publishedAt: "2023-05-15",
  tags: ["React", "TypeScript", "Frontend"],
  readingTime: "5 min read",
};

// Related posts
const relatedPosts = [
  {
    id: 2,
    title: "Building a Blog with Supabase and React",
    excerpt: "Discover how to create a full-featured blog using Supabase as your backend and React for the frontend.",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&w=800",
    author: {
      name: "Sophia Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    publishedAt: "2023-06-02",
    tags: ["Supabase", "React", "Full Stack"],
  },
  {
    id: 3,
    title: "The Power of Tailwind CSS",
    excerpt: "Why Tailwind CSS is changing how developers approach styling their web applications.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&w=800",
    author: {
      name: "Marcus Lee",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    publishedAt: "2023-06-20",
    tags: ["CSS", "Tailwind", "Design"],
  },
  {
    id: 4,
    title: "State Management in 2023",
    excerpt: "A comprehensive overview of state management solutions for modern web applications.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&w=800",
    author: {
      name: "Emma Wilson",
      avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    },
    publishedAt: "2023-07-05",
    tags: ["React", "State Management", "Frontend"],
  },
];

export const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [post] = useState(mockPost);
  
  // Comments state
  const [comments, setComments] = useState([
    { 
      id: 1, 
      author: "Jane Cooper", 
      avatar: "https://randomuser.me/api/portraits/women/10.jpg", 
      content: "This was incredibly helpful! Thanks for the detailed explanation.", 
      date: "2023-05-16" 
    },
    { 
      id: 2, 
      author: "Robert Fox", 
      avatar: "https://randomuser.me/api/portraits/men/15.jpg", 
      content: "I've been struggling with TypeScript setup. This cleared things up for me.", 
      date: "2023-05-17" 
    },
  ]);
  const [commentText, setCommentText] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      author: "Guest User",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      content: commentText,
      date: new Date().toISOString().split('T')[0],
    };
    
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div>
      {/* Hero Image */}
      <div className="w-full h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url(${post.coverImage})` }}>
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
              {post.tags.map(tag => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>
            <h1 className="mb-4">{post.title}</h1>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <time>{new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</time>
                  <span className="mx-1">•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Post content */}
          <div className="prose prose-lg max-w-none blog-content mb-12" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          {/* Author bio */}
          <Card className="mb-12">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                  <h3 className="font-medium text-lg mb-2">Written by {post.author.name}</h3>
                  <p className="text-muted-foreground mb-4">{post.author.bio}</p>
                  <Button variant="outline" size="sm">Follow</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Comments section */}
          <div className="border-t pt-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
            
            {/* Comment form */}
            <div className="mb-8">
              <form onSubmit={handleAddComment}>
                <div className="mb-4">
                  <textarea
                    className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                </div>
                <Button type="submit">Post Comment</Button>
              </form>
            </div>
            
            {/* Comments list */}
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar} alt={comment.author} />
                    <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <time className="text-sm text-muted-foreground">{comment.date}</time>
                    </div>
                    <p>{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Related posts */}
        <div className="border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map(post => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
