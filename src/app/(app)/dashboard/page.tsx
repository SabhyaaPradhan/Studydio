
'use client';
import { mockStudyPacks } from "@/lib/mock-data";
import { StudyPackCard } from "@/components/study-pack-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, BarChart, FileText, ArrowRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};


export default function DashboardPage() {
  const { user } = useUser();
  const userName = user?.displayName?.split(' ')[0] || "User";
  const hasStudyPacks = mockStudyPacks && mockStudyPacks.length > 0;

  return (
    <div className="container mx-auto relative">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">
          Welcome back, {userName} 👋
        </h1>
        <p className="text-muted-foreground text-lg mt-1">Ready to create your next study set?</p>
      </motion.div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
            <Link href="/create">
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:scale-105 transition-all duration-300 h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wand2 className="text-primary"/> Generate New Material</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Paste a link, text, or upload a file to start.</p>
                    </CardContent>
                    <CardContent>
                        <ArrowRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:scale-105 transition-all duration-300 h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="text-primary"/> My Study Sets</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Browse and manage all your created packs.</p>
                </CardContent>
                 <CardContent>
                    <ArrowRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </CardContent>
            </Card>
        </motion.div>
        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:scale-105 transition-all duration-300 h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Progress & Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Track your learning and review your stats.</p>
                </CardContent>
                 <CardContent>
                    <ArrowRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </CardContent>
            </Card>
        </motion.div>
      </div>

        {/* Recent Activity */}
        <div>
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            {hasStudyPacks ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {mockStudyPacks.map((pack, i) => (
                         <motion.div key={pack.id} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
                            <StudyPackCard pack={pack} />
                         </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 px-6 rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center">
                    <div className="mb-4 text-6xl">📚</div>
                    <h3 className="text-xl font-semibold mb-2">No study sets yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">It looks like you haven't created any study material. Let's make your first one!</p>
                    <Button asChild className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg">
                        <Link href="/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Start Creating
                        </Link>
                    </Button>
                </div>
            )}
        </div>

        {/* Floating Action Button */}
        <Link href="/create">
             <motion.div
                initial={{ scale: 0, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                 whileHover={{ scale: 1.1 }}
                 className="fixed bottom-8 right-8 z-50"
             >
                <Button size="lg" className="rounded-full shadow-2xl shadow-primary/30 bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 h-16 w-16 p-0 flex items-center justify-center">
                     <PlusCircle className="h-8 w-8 text-white" />
                     <span className="sr-only">New Study Set</span>
                </Button>
            </motion.div>
        </Link>
    </div>
  );
}
