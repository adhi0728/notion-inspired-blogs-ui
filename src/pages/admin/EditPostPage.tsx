
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { Link } from "react-router-dom";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for specific post (would come from Supabase)
const mockPosts = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    content: "React and TypeScript make a powerful combination for building robust web applications...",
    status: "published",
    author: "Alex Johnson",
    date: "2023-05-15",
    views: 1245,
    imageUrl: null
  },
  {
    id: "2",
    title: "Building a Blog with Supabase and React",
    content: "Supabase offers a powerful backend as a service that pairs perfectly with React...",
    status: "published",
    author: "Sophia Rodriguez",
    date: "2023-06-02",
    views: 873,
    imageUrl: null
  },
  // Additional mock posts would be here
];

const EditPostPage = () => {
  const { id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    // Mock fetch post data (would be a Supabase query)
    const fetchPost = () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          const foundPost = mockPosts.find(post => post.id === id);
          if (foundPost) {
            setPost(foundPost);
            form.reset({
              title: foundPost.title,
              content: foundPost.content,
            });
            if (foundPost.imageUrl) {
              setImagePreview(foundPost.imageUrl);
            }
          } else {
            toast({
              title: "Post not found",
              description: "The post you're trying to edit doesn't exist.",
              variant: "destructive",
            });
            navigate("/admin/posts");
          }
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast({
          title: "Error",
          description: "Failed to load post data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, toast, form]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("image", file);
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Updating post:", data);
      // TODO: Implement Supabase integration here
      
      toast({
        title: "Post updated",
        description: "Your post has been updated successfully",
      });
      
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading post data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Post</h1>
          <p className="text-muted-foreground">Update an existing blog post</p>
        </div>
        <Button variant="outline" asChild>
          <Link to="/admin/posts">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Posts
          </Link>
        </Button>
      </div>

      {post && (
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant={post.status === "published" ? "default" : "outline"}>
            {post.status === "published" ? "Published" : "Draft"}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {post.date} • {post.views} views • by {post.author}
          </span>
        </div>
      )}

      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your post content here..."
                        className="min-h-[300px]" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel htmlFor="image">Featured Image</FormLabel>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="image-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      {imagePreview ? (
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="max-h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                          <p className="mb-2 text-sm text-muted-foreground">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PNG, JPG or GIF (MAX. 2MB)
                          </p>
                        </div>
                      )}
                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-between">
              <Button variant="outline" type="button" asChild>
                <Link to="/admin/posts">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 h-4 w-4" />
                {isSubmitting ? "Updating..." : "Update Post"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditPostPage;
