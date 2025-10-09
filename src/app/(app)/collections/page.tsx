
'use client';

import { BookCopy, PlusCircle, Trash2, Edit, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ScrollFloat from "@/components/ScrollFloat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from "firebase/firestore";
import type { Subject } from "@/lib/types";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function NewCollectionDialog({ open, onOpenChange, subjectToEdit, onSubjectUpdated }: { open: boolean, onOpenChange: (open: boolean) => void, subjectToEdit?: Subject | null, onSubjectUpdated: () => void }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = !!subjectToEdit;

  // Effect to populate form when subjectToEdit changes
  useState(() => {
    if (subjectToEdit) {
      setTitle(subjectToEdit.title);
      setDescription(subjectToEdit.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [subjectToEdit]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore || !title.trim()) return;

    setIsSaving(true);
    try {
      if (isEditing && subjectToEdit) {
        // Update existing subject
        const subjectRef = doc(firestore, `users/${user.uid}/subjects`, subjectToEdit.id);
        await updateDoc(subjectRef, {
          title,
          description,
        });
        toast({
          title: "Collection updated!",
          description: `"${title}" has been successfully updated.`,
        });
      } else {
        // Create new subject
        const subjectsCollection = collection(firestore, `users/${user.uid}/subjects`);
        await addDoc(subjectsCollection, {
          userId: user.uid,
          title,
          description,
          createdAt: serverTimestamp(),
        });
        toast({
          title: "Collection created!",
          description: `"${title}" has been added to your collections.`,
        });
      }
      
      onSubjectUpdated();
      onOpenChange(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error saving collection:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Could not save the collection. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Collection" : "Create a New Collection"}</DialogTitle>
          <DialogDescription>
            Group your study packs into subjects or courses. Example: Biology Semester 1.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="e.g., Biology Semester 1"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                placeholder="A short description of this collection."
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Collection"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export default function CollectionsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [subjectToEdit, setSubjectToEdit] = useState<Subject | null>(null);

  const subjectsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/subjects`), orderBy("createdAt", "desc"));
  }, [user, firestore]);

  const { data: subjects, isLoading, error, refetch: refetchSubjects } = useCollection<Subject>(subjectsQuery);

  const handleOpenDialogForEdit = (subject: Subject) => {
    setSubjectToEdit(subject);
    setIsDialogOpen(true);
  };
  
  const handleOpenDialogForNew = () => {
    setSubjectToEdit(null);
    setIsDialogOpen(true);
  }

  const handleDeleteSubject = async (subjectId: string) => {
    if(!user || !firestore) return;

    try {
        const subjectRef = doc(firestore, `users/${user.uid}/subjects`, subjectId);
        await deleteDoc(subjectRef);
        toast({
            title: "Collection deleted",
            description: "The collection has been successfully deleted.",
        });
    } catch(e) {
        console.error("Error deleting collection: ", e);
        toast({
            variant: "destructive",
            title: "Error",
            description: "Could not delete the collection.",
        });
    }
  };

  const renderSkeletons = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardFooter className="flex justify-end gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

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
        <Button onClick={handleOpenDialogForNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Collection
        </Button>
      </div>

       <NewCollectionDialog 
            open={isDialogOpen} 
            onOpenChange={setIsDialogOpen} 
            subjectToEdit={subjectToEdit} 
            onSubjectUpdated={() => {
                if (refetchSubjects) refetchSubjects();
            }}
       />

      {isLoading && renderSkeletons()}

      {!isLoading && subjects && subjects.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <Card key={subject.id} className="flex flex-col">
              <CardHeader className="flex-1">
                <CardTitle>{subject.title}</CardTitle>
                <CardDescription>{subject.description || 'No description'}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center gap-2">
                 <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialogForEdit(subject)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the collection. Study packs inside will not be deleted.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteSubject(subject.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                 </div>
                 <Button asChild size="sm">
                    <Link href={`/collections/${subject.id}`}>
                        View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && (!subjects || subjects.length === 0) && (
        <div className="text-center py-20 px-6 rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center">
          <div className="mb-4 text-6xl text-muted-foreground">
            <BookCopy />
          </div>
          <h3 className="text-xl font-semibold mb-2">No collections yet</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Create collections to organize your study packs by subject, course, or anything you like.
          </p>
          <Button onClick={handleOpenDialogForNew} asChild className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg">
            <Link href="#">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Collection
            </Link>
          </Button>
        </div>
      )}

      {error && (
        <div className="text-center text-destructive py-20">
            <p>Error loading collections: {error.message}</p>
        </div>
      )}
    </div>
  );
}
