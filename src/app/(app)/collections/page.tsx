
'use client';

import { BookCopy, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrollFloat from "@/components/ScrollFloat";

export default function CollectionsPage() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <ScrollFloat tag="h1" className="text-3xl font-bold" textClassName="scroll-float-text-h1">
            My Collections
          </ScrollFloat>
          <p className="text-muted-foreground">
            Group your study packs into subjects or courses.
          </p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Collection
        </Button>
      </div>

      <div className="text-center py-20 px-6 rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center">
        <div className="mb-4 text-6xl text-muted-foreground">
          <BookCopy />
        </div>
        <h3 className="text-xl font-semibold mb-2">No collections yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Create collections to organize your study packs by subject, course, or anything you like.
        </p>
        <Button asChild className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg">
          <Link href="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Your First Collection
          </Link>
        </Button>
      </div>
    </div>
  );
}
