
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Save, Settings, User, Shield } from "lucide-react";

const accountFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});

const siteSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  siteDescription: z.string().optional(),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;
type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;

const SettingsPage = () => {
  const [isAccountSubmitting, setIsAccountSubmitting] = useState(false);
  const [isSiteSubmitting, setIsSiteSubmitting] = useState(false);
  const { toast } = useToast();

  // Account form
  const accountForm = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      name: "Admin User",
      email: "admin@example.com",
    },
  });

  // Site settings form
  const siteForm = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "My Blog",
      siteDescription: "A simple blog built with React and Supabase",
    },
  });

  const handleAccountSubmit = async (data: AccountFormValues) => {
    setIsAccountSubmitting(true);
    try {
      console.log("Submitting account data:", data);
      // TODO: Implement Supabase integration
      
      toast({
        title: "Account updated",
        description: "Your account information has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating account:", error);
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAccountSubmitting(false);
    }
  };

  const handleSiteSubmit = async (data: SiteSettingsFormValues) => {
    setIsSiteSubmitting(true);
    try {
      console.log("Submitting site settings:", data);
      // TODO: Implement Supabase integration
      
      toast({
        title: "Settings updated",
        description: "Site settings have been updated successfully",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSiteSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and site settings
        </p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="site">
            <Settings className="mr-2 h-4 w-4" /> Site Settings
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card>
            <Form {...accountForm}>
              <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)}>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={accountForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={accountForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button type="submit" disabled={isAccountSubmitting}>
                    <Save className="mr-2 h-4 w-4" />
                    {isAccountSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>

        <TabsContent value="site">
          <Card>
            <Form {...siteForm}>
              <form onSubmit={siteForm.handleSubmit(handleSiteSubmit)}>
                <CardHeader>
                  <CardTitle>Site Settings</CardTitle>
                  <CardDescription>
                    Configure your site preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={siteForm.control}
                    name="siteName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Site name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be displayed in the header and browser title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={siteForm.control}
                    name="siteDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Site description" {...field} />
                        </FormControl>
                        <FormDescription>
                          Used for SEO and social sharing
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="text-sm font-medium">Require Login to Comment</h3>
                        <p className="text-sm text-muted-foreground">
                          Users must be logged in to leave comments
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="text-sm font-medium">Show Related Posts</h3>
                        <p className="text-sm text-muted-foreground">
                          Display related posts at the end of each article
                        </p>
                      </div>
                      <Switch defaultChecked={true} />
                    </div>
                    
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="text-sm font-medium">Auto Publish Comments</h3>
                        <p className="text-sm text-muted-foreground">
                          Comments will be published without moderation
                        </p>
                      </div>
                      <Switch defaultChecked={false} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t p-6">
                  <Button type="submit" disabled={isSiteSubmitting}>
                    <Save className="mr-2 h-4 w-4" />
                    {isSiteSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="text-sm font-medium">Two Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="text-sm font-medium">API Access</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage API keys for accessing your content
                    </p>
                  </div>
                  <Button variant="outline">Manage Keys</Button>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Change Password</h3>
                  <div className="space-y-3">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button className="mt-2">Update Password</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
