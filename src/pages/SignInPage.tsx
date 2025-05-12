
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
});

type FormValues = z.infer<typeof formSchema>;

export const SignInPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, user } = useAuth();
  
  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur", // Validate on blur for better user experience
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await signIn(values.email, values.password);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12">
      <div className="w-full max-w-md px-4 sm:px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm p-6 sm:p-8 border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <p className="text-center mt-6 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
