import { mockStudyPacks, mockUser } from "@/lib/mock-data";
import { StudyPackCard } from "@/components/study-pack-card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <ScrollFloat tag="h1" className="text-3xl font-bold" textClassName="scroll-float-text-h1">
            Welcome back, {mockUser.name.split(' ')[0]}!
          </ScrollFloat>
          <ScrollReveal tag="div" textTag="p" className="text-muted-foreground !m-0" textClassName="!text-base !font-normal">
            Here are your study packs. Keep up the great work.
          </ScrollReveal>
        </div>
        <Button asChild>
            <Link href="/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Pack
            </Link>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockStudyPacks.map((pack) => (
          <StudyPackCard key={pack.id} pack={pack} />
        ))}
      </div>
    </div>
  );
}
