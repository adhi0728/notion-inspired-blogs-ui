
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Eye, FileText, Users } from "lucide-react";

// Mock data (would come from Supabase)
const visitorsData = [
  { name: "Jan", count: 4000 },
  { name: "Feb", count: 3000 },
  { name: "Mar", count: 2000 },
  { name: "Apr", count: 2780 },
  { name: "May", count: 1890 },
  { name: "Jun", count: 2390 },
  { name: "Jul", count: 3490 },
];

const postsData = [
  { name: "Jan", published: 10, draft: 5 },
  { name: "Feb", published: 15, draft: 7 },
  { name: "Mar", published: 20, draft: 10 },
  { name: "Apr", published: 25, draft: 12 },
  { name: "May", published: 30, draft: 15 },
  { name: "Jun", published: 35, draft: 17 },
  { name: "Jul", published: 40, draft: 20 },
];

const recentActivityData = [
  {
    id: 1,
    user: "Alex Johnson",
    action: "published a new post",
    target: "Getting Started with React",
    time: "10 minutes ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    user: "Emma Wilson",
    action: "commented on",
    target: "State Management in 2023",
    time: "1 hour ago",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    id: 3,
    user: "Marcus Lee",
    action: "created a draft post",
    target: "Advanced TypeScript Patterns",
    time: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 4,
    user: "Sophia Rodriguez",
    action: "edited",
    target: "Building a Blog with Supabase",
    time: "4 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 5,
    user: "David Chen",
    action: "signed up",
    target: "",
    time: "5 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your blog performance and activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">89,721</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Statistics</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={visitorsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Posts Overview</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={postsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="published" fill="hsl(var(--primary))" />
                  <Bar dataKey="draft" fill="hsl(var(--muted))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {recentActivityData.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p>
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    {activity.target && (
                      <span className="font-medium">{activity.target}</span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
