import Link from "next/link";
import type { StudyPack } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Youtube, FileText, Type, Newspaper, ArrowRight } from "lucide-react";

const contentTypeIcons = {
  youtube: <Youtube className="h-5 w-5 text-red-500" />,
  pdf: <FileText className="h-5 w-5 text-blue-500" />,
  text: <Type className="h-5 w-5 text-gray-500" />,
  article: <Newspaper className="h-5 w-5 text-green-500" />,
  link: <Newspaper className="h-5 w-5 text-green-500" />,
  upload: <FileText className="h-5 w-5 text-blue-500" />,
  paste: <Type className="h-5 w-5 text-gray-500" />,
};

function formatDate(timestamp: any): string {
    if (!timestamp) return 'Just now';
    if (timestamp.toDate) { // Firestore Timestamp object
        return timestamp.toDate().toLocaleDateString();
    }
    // Fallback for string or number
    return new Date(timestamp).toLocaleDateString();
}


export function StudyPackCard({ pack }: { pack: StudyPack }) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
            <CardTitle className="text-lg font-semibold leading-tight pr-2">{pack.title}</CardTitle>
            {pack.contentType && contentTypeIcons[pack.contentType as keyof typeof contentTypeIcons]}
        </div>
        <CardDescription className="text-xs pt-1">Created on {formatDate(pack.createdAt)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{pack.contentSnippet}</p>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-muted-foreground">Progress</span>
            <span className="text-xs font-semibold">{pack.progress || 0}%</span>
          </div>
          <Progress value={pack.progress || 0} aria-label={`${pack.progress || 0}% complete`} />
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="secondary" className="w-full">
          <Link href={`/study/${pack.id}`}>
            Continue Studying
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
