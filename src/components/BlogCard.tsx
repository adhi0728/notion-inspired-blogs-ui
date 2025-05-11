
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface BlogCardProps {
  id: number;
  title: string;
  excerpt: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  tags: string[];
}

export const BlogCard = ({
  id,
  title,
  excerpt,
  coverImage,
  author,
  publishedAt,
  tags,
}: BlogCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <Link to={`/blog/${id}`}>
        <AspectRatio ratio={16 / 9}>
          <img
            src={coverImage}
            alt={title}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Link>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground">{author.name}</span>
          <span className="text-sm text-muted-foreground">•</span>
          <time className="text-sm text-muted-foreground">
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </div>
        <Link to={`/blog/${id}`} className="hover:underline">
          <h3 className="text-xl font-medium leading-tight">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="pb-4 flex-grow">
        <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-2 pt-0">
        <div className="flex flex-wrap gap-2 flex-grow">
          {tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="hover:bg-secondary hover:text-secondary-foreground">
              {tag}
            </Badge>
          ))}
        </div>
        <Button asChild size="sm">
          <Link to={`/blog/${id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
