
import { useState } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Search, 
  MoreHorizontal, 
  UserMinus,
  UserPlus,
  Shield,
  ShieldAlert,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data (would come from Supabase)
const initialUsers = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "admin",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Sophia Rodriguez",
    email: "sophia@example.com",
    role: "author",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    joinDate: "2023-02-22",
  },
  {
    id: 3,
    name: "Marcus Lee",
    email: "marcus@example.com",
    role: "author",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "user",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    joinDate: "2023-04-05",
  },
  {
    id: 5,
    name: "David Chen",
    email: "david@example.com",
    role: "user",
    status: "blocked",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    joinDate: "2023-05-12",
  },
  {
    id: 6,
    name: "Olivia Brown",
    email: "olivia@example.com",
    role: "user",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    joinDate: "2023-06-19",
  },
  {
    id: 7,
    name: "James Smith",
    email: "james@example.com",
    role: "user",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/men/57.jpg",
    joinDate: "2023-07-03",
  },
  {
    id: 8,
    name: "Ava Garcia",
    email: "ava@example.com",
    role: "user",
    status: "active",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    joinDate: "2023-08-14",
  },
];

type User = typeof initialUsers[0];

const AdminUsersPage = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "author" | "user">("all");
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"block" | "promote" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Role filter
    const matchesRole = filterRole === "all" || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const handleAction = () => {
    if (!selectedUser || !actionType) return;
    
    if (actionType === "block") {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, status: user.status === "blocked" ? "active" : "blocked" } 
          : user
      ));
      
      toast({
        title: selectedUser.status === "blocked" ? "User unblocked" : "User blocked",
        description: selectedUser.status === "blocked" 
          ? `${selectedUser.name} can now access the platform again.` 
          : `${selectedUser.name} has been blocked from the platform.`,
      });
    } else if (actionType === "promote") {
      const newRole = selectedUser.role === "user" ? "author" : (selectedUser.role === "author" ? "admin" : "user");
      
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, role: newRole } 
          : user
      ));
      
      toast({
        title: "Role updated",
        description: `${selectedUser.name}'s role has been updated to ${newRole}.`,
      });
    }
    
    setActionDialogOpen(false);
    setSelectedUser(null);
    setActionType(null);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "author":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Users</h1>
        <p className="text-muted-foreground">
          Manage users and their permissions
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button 
            variant={filterRole === "all" ? "default" : "outline"}
            onClick={() => setFilterRole("all")}
          >
            All
          </Button>
          <Button 
            variant={filterRole === "admin" ? "default" : "outline"}
            onClick={() => setFilterRole("admin")}
          >
            Admins
          </Button>
          <Button 
            variant={filterRole === "author" ? "default" : "outline"}
            onClick={() => setFilterRole("author")}
          >
            Authors
          </Button>
          <Button 
            variant={filterRole === "user" ? "default" : "outline"}
            onClick={() => setFilterRole("user")}
          >
            Users
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    <Users className="mx-auto mb-2 h-10 w-10 text-muted-foreground/60" />
                    <p className="text-lg font-medium mb-1">No users found</p>
                    <p>Try changing your search or filters</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "outline" : "destructive"}>
                        {user.status === "active" ? "Active" : "Blocked"}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
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
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setActionType("block");
                                setActionDialogOpen(true);
                              }}
                            >
                              <UserMinus className="mr-2 h-4 w-4" />
                              Block User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setActionType("block");
                                setActionDialogOpen(true);
                              }}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              Unblock User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          {user.role === "user" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setActionType("promote");
                                setActionDialogOpen(true);
                              }}
                            >
                              <Shield className="mr-2 h-4 w-4" />
                              Promote to Author
                            </DropdownMenuItem>
                          )}
                          {user.role === "author" && (
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setActionType("promote");
                                setActionDialogOpen(true);
                              }}
                            >
                              <ShieldAlert className="mr-2 h-4 w-4" />
                              Promote to Admin
                            </DropdownMenuItem>
                          )}
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

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "block" 
                ? (selectedUser?.status === "blocked" ? "Unblock User" : "Block User") 
                : "Change User Role"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "block" 
                ? (selectedUser?.status === "blocked"
                  ? `Are you sure you want to unblock ${selectedUser?.name}? They will regain access to the platform.`
                  : `Are you sure you want to block ${selectedUser?.name}? They will not be able to access the platform until unblocked.`)
                : `Are you sure you want to change ${selectedUser?.name}'s role?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAction}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsersPage;
