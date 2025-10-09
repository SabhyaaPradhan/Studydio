
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from '@/firebase';
import { collection, doc, query, where } from 'firebase/firestore';
import type { Subject, StudyPack } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import ScrollFloat from '@/components/ScrollFloat';
import { StudyPackCard } from '@/components/study-pack-card';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : '';

  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const subjectRef = useMemoFirebase(() => {
    if (!user?.uid || !firestore || !id) return null;
    return doc(firestore, 'users', user.uid, 'subjects', id);
  }, [user?.uid, firestore, id]);

  const studyPacksQuery = useMemoFirebase(() => {
    if (!user?.uid || !firestore || !id) return null;
    return query(collection(firestore, 'users', user.uid, 'studyPacks'), where('subjectId', '==', id));
  }, [user?.uid, firestore, id]);

  const { data: subject, isLoading: isLoadingSubject } = useDoc<Subject>(subjectRef);
  const { data: studyPacks, isLoading: isLoadingPacks } = useCollection<StudyPack>(studyPacksQuery);

  const isLoading = isUserLoading || isLoadingSubject || isLoadingPacks;

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Skeleton className="h-8 w-24 mb-4" />
        <Skeleton className="h-10 w-1/2 mb-1" />
        <Skeleton className="h-6 w-3/4 mb-8" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-64 w-full" />)}
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Collection Not Found</h1>
        <p className="text-muted-foreground">
          This collection does not exist or you do not have permission to view it.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Button variant="ghost" onClick={() => router.push('/collections')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Collections
      </Button>
      <ScrollFloat tag="h1" className="text-3xl font-bold" textClassName="scroll-float-text-h1">
        {subject.title}
      </ScrollFloat>
      <p className="text-muted-foreground mt-1 mb-8">{subject.description}</p>
      
      <h2 className="text-2xl font-bold mb-6">Study Packs in this Collection</h2>

      {studyPacks && studyPacks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {studyPacks.map(pack => (
            <StudyPackCard key={pack.id} pack={pack} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-6 rounded-2xl bg-white/5 border border-dashed border-white/10">
          <h3 className="text-xl font-semibold mb-2">No study packs here yet</h3>
          <p className="text-muted-foreground mb-6">Add study packs to this collection from your dashboard.</p>
           <Button asChild>
                <Link href="/dashboard">
                    Go to Dashboard
                </Link>
           </Button>
        </div>
      )}
    </div>
  );
}
