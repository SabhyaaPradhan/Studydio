
'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import StudyPackClientPage from './client-page';
import type { StudyPack } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function StudyPageSkeleton() {
    return (
        <div className="container mx-auto">
            <Skeleton className="h-10 w-3/4 mb-1" />
            <Skeleton className="h-6 w-1/2 mb-6" />

            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <div className="w-full space-y-2">
                             <div className="flex justify-between items-center mb-2">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="w-full max-w-2xl h-80" />
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default function StudyPackPage() {
    // 1. Get the ID from URL params, which is safe in a client component.
    const params = useParams();
    const id = typeof params.id === 'string' ? params.id : '';

    // 2. Get the authenticated user and firestore instance.
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();

    // 3. Construct the document reference only when user and firestore are available.
    // useMemoFirebase is crucial to prevent re-renders from creating new doc references.
    const studyPackRef = useMemoFirebase(() => {
        if (!user?.uid || !firestore || !id) return null;
        return doc(firestore, 'users', user.uid, 'studyPacks', id);
    }, [user?.uid, firestore, id]);

    // 4. Fetch the document using the client-side hook.
    const { data: studyPack, isLoading: isStudyPackLoading, error } = useDoc<StudyPack>(studyPackRef);

    const isLoading = isUserLoading || isStudyPackLoading;

    // 5. Handle Loading State
    if (isLoading) {
        return <StudyPageSkeleton />;
    }

    // 6. Handle "Not Found" state after loading is complete
    if (!studyPack) {
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold">Study Pack Not Found</h1>
                <p className="text-muted-foreground">The study pack you are looking for does not exist or you do not have permission to view it.</p>
            </div>
        );
    }

    // 7. Handle Error State
    if (error) {
         return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-2xl font-bold text-destructive">An Error Occurred</h1>
                <p className="text-muted-foreground">Could not load the study pack. Please try again later.</p>
            </div>
        );
    }

    // 8. Render the client page with the fetched data.
    return <StudyPackClientPage id={id} initialStudyPack={studyPack} />;
}
