
import { useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";

// Mock data (will be replaced with Supabase data)
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn how to set up a new React project with TypeScript and build your first component.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=800",
    author: {
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    publishedAt: "2023-05-15",
    tags: ["React", "TypeScript", "Frontend"],
  },
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
  {
    id: 5,
    title: "Introduction to API Design",
    excerpt: "Best practices for designing robust and scalable APIs for your applications.",
    coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&w=800",
    author: {
      name: "David Chen",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    },
    publishedAt: "2023-07-18",
    tags: ["API", "Backend", "Architecture"],
  },
  {
    id: 6,
    title: "Testing Your React Applications",
    excerpt: "A practical guide to testing React applications with Jest and React Testing Library.",
    coverImage: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&w=800",
    author: {
      name: "Olivia Brown",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
    publishedAt: "2023-08-01",
    tags: ["Testing", "React", "Jest"],
  },
];

export const HomePage = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  
  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                No posts found with the selected tag.
              </p>
              <Button onClick={() => setActiveTag(null)}>View All Posts</Button>
            </div>
          )}

          {filteredPosts.length > 0 && (
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
