import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  FileText, 
  FilePlus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data (would come from Supabase)
const initialPosts = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    author: "Alex Johnson",
    status: "published",
    date: "2023-05-15",
    views: 1245,
  },
  {
    id: 2,
    title: "Building a Blog with Supabase and React",
    author: "Sophia Rodriguez",
    status: "published",
    date: "2023-06-02",
    views: 873,
  },
  {
    id: 3,
    title: "The Power of Tailwind CSS",
    author: "Marcus Lee",
    status: "published",
    date: "2023-06-20",
    views: 642,
  },
  {
    id: 4,
    title: "State Management in 2023",
    author: "Emma Wilson",
    status: "draft",
    date: "2023-07-05",
    views: 0,
  },
  {
    id: 5,
    title: "Introduction to API Design",
    author: "David Chen",
    status: "draft",
    date: "2023-07-18",
    views: 0,
  },
  {
    id: 6,
    title: "Testing Your React Applications",
    author: "Olivia Brown",
    status: "published",
    date: "2023-08-01",
    views: 421,
  },
  {
    id: 7,
    title: "Advanced TypeScript Patterns",
    author: "Marcus Lee",
    status: "draft",
    date: "2023-08-12",
    views: 0,
  },
  {
    id: 8,
    title: "Optimizing Web Performance",
    author: "Alex Johnson",
    status: "published",
    date: "2023-08-25",
    views: 287,
  },
];

const AdminPostsPage = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  
  const { toast } = useToast();

  const filteredPosts = posts.filter(post => {
    // Search filter
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = filterStatus === "all" || post.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleDeletePost = () => {
    if (postToDelete) {
      setPosts(posts.filter(post => post.id !== postToDelete));
      setDeleteConfirmOpen(false);
      setPostToDelete(null);
      
      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully",
      });
    }
  };

  const handleToggleStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
    
    toast({
      title: `Post ${newStatus === "published" ? "published" : "unpublished"}`,
      description: `The post is now ${newStatus === "published" ? "visible to users" : "in draft mode"}`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/posts/new">
            <FilePlus className="mr-2 h-4 w-4" /> Create New Post
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filterStatus === "all" ? "default" : "outline"}
            onClick={() => setFilterStatus("all")}
          >
            All
          </Button>
          <Button 
            variant={filterStatus === "published" ? "default" : "outline"}
            onClick={() => setFilterStatus("published")}
          >
            Published
          </Button>
          <Button 
            variant={filterStatus === "draft" ? "default" : "outline"}
            onClick={() => setFilterStatus("draft")}
          >
            Drafts
          </Button>
        </div>
      </div>

      {/* Posts Table */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    <FileText className="mx-auto mb-2 h-10 w-10 text-muted-foreground/60" />
                    <p className="text-lg font-medium mb-1">No posts found</p>
                    <p>Try changing your search or filters</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <Link to={`/admin/posts/${post.id}/edit`} className="font-medium hover:underline">
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <Badge variant={post.status === "published" ? "default" : "outline"}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/posts/${post.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(post.id, post.status)}>
                            {post.status === "published" ? (
                              <>
                                <EyeOff className="mr-2 h-4 w-4" />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Eye className="mr-2 h-4 w-4" />
                                Publish
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => {
                              setPostToDelete(post.id);
                              setDeleteConfirmOpen(true);
                            }}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The post will be permanently deleted from the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePost}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPostsPage;
