
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/BlogCard";
import { Search } from "lucide-react";

// Mock data (will be replaced with Supabase data)
const categories = [
  { id: 1, name: "Technology", count: 12 },
  { id: 2, name: "Design", count: 8 },
  { id: 3, name: "Frontend", count: 10 },
  { id: 4, name: "Backend", count: 6 },
  { id: 5, name: "Mobile", count: 4 },
  { id: 6, name: "DevOps", count: 3 },
  { id: 7, name: "UI/UX", count: 7 },
  { id: 8, name: "Artificial Intelligence", count: 5 },
  { id: 9, name: "Data Science", count: 4 },
  { id: 10, name: "Security", count: 3 }
];

// Mock posts data (same as in HomePage)
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
];

export const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter categories based on search term
  const filteredCategories = categories.filter((category) => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory 
    ? mockPosts.filter(post => post.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()))
    : mockPosts;

  return (
    <div className="container-custom py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="mb-4">Categories</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Explore our content by topic
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          <Button
            key="all"
            variant={selectedCategory === null ? "default" : "outline"}
            className="h-auto py-3"
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </Button>
          
          {filteredCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.name ? "default" : "outline"}
              className="h-auto py-3"
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
              <span className="ml-2 text-xs bg-primary/20 text-primary rounded-full px-2 py-1">
                {category.count}
              </span>
            </Button>
          ))}
        </div>
        
        {/* Blog Posts Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory ? `Posts in ${selectedCategory}` : "All Posts"}
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                There are currently no posts in this category.
              </p>
              <Button onClick={() => setSelectedCategory(null)}>View All Posts</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
