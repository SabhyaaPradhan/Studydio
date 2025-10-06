
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { BookOpen, Bot, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const steps = [
    { id: 1, title: 'Paste Your Content', description: 'Start by providing the material you want to learn from.' },
    { id: 2, title: 'Choose Your Tools', description: 'Select the study materials you want to generate.' },
    { id: 3, title: 'Generate & Study', description: 'Let our AI work its magic!' },
];

const OnboardingStep1 = ({ onNext }: { onNext: (data: any) => void }) => {
    const [content, setContent] = useState('');
    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
            <Textarea 
                placeholder="Paste a YouTube link, article, or any text here..." 
                className="min-h-[250px] bg-white/5 border-white/10 text-base"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button onClick={() => onNext({ content })} disabled={!content.trim()} className="w-full">
                Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </motion.div>
    );
};

const OnboardingStep2 = ({ onNext, onBack }: { onNext: (data: any) => void, onBack: () => void }) => {
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    
    const toggleTool = (tool: string) => {
        setSelectedTools(prev => prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]);
    }

    const tools = [
        { id: 'flashcards', name: 'Flashcards', icon: <BookOpen /> },
        { id: 'quiz', name: 'Quiz', icon: <Bot /> },
        { id: 'summary', name: 'Summary', icon: <FileText /> },
    ];

    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map(tool => (
                    <Card 
                        key={tool.id} 
                        onClick={() => toggleTool(tool.id)}
                        className={`p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 bg-white/5 border-white/10 ${selectedTools.includes(tool.id) ? 'border-primary scale-105 shadow-lg shadow-primary/20' : 'hover:border-white/30'}`}
                    >
                        <div className={`text-4xl ${selectedTools.includes(tool.id) ? 'text-primary' : 'text-muted-foreground'}`}>{tool.icon}</div>
                        <h3 className="font-semibold">{tool.name}</h3>
                    </Card>
                ))}
            </div>
            <div className="flex gap-4">
                <Button onClick={onBack} variant="outline" className="w-full">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button onClick={() => onNext({ tools: selectedTools })} disabled={selectedTools.length === 0} className="w-full">
                    Generate <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
};


const OnboardingStep3 = ({ onFinish }: { onFinish: () => void }) => {
    const [generating, setGenerating] = useState(true);

    // Simulate AI generation
    useState(() => {
        const timer = setTimeout(() => setGenerating(false), 2500);
        return () => clearTimeout(timer);
    });

    return (
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center space-y-6">
            {generating ? (
                <>
                    <div className="text-primary text-4xl animate-spin-slow">✨</div>
                    <h2 className="text-2xl font-bold">Generating Your Study Pack...</h2>
                    <p className="text-muted-foreground">Our AI is crafting your materials. This will just take a moment.</p>
                    <Progress value={50} className="w-full animate-pulse" />
                </>
            ) : (
                 <>
                    <div className="text-green-400 text-6xl">🎉</div>
                    <h2 className="text-2xl font-bold">Your First Study Pack is Ready!</h2>
                    <p className="text-muted-foreground">You're all set to start learning smarter.</p>
                    <Button onClick={onFinish} className="w-full">
                        Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </>
            )}
        </motion.div>
    );
};

export default function OnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [onboardingData, setOnboardingData] = useState({});

    const handleNext = (data: any) => {
        setOnboardingData(prev => ({ ...prev, ...data }));
        setCurrentStep(prev => prev + 1);
    };
    
    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleFinish = () => {
        // Here you would typically save the onboardingData
        console.log("Onboarding complete:", onboardingData);
        // Then redirect
        router.push('/dashboard');
    };

    const progress = ((currentStep -1) / (steps.length -1)) * 100;
    
    return (
        <div className="container mx-auto max-w-2xl py-12">
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-2xl opacity-10"></div>
                <Card className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold">{steps[currentStep - 1].title}</h1>
                        <p className="text-muted-foreground mt-2">{steps[currentStep - 1].description}</p>
                    </div>

                    <div className="mb-8">
                        <Progress value={progress} className="w-full" />
                    </div>

                    <AnimatePresence mode="wait">
                        {currentStep === 1 && <OnboardingStep1 onNext={handleNext} />}
                        {currentStep === 2 && <OnboardingStep2 onNext={handleNext} onBack={handleBack}/>}
                        {currentStep === 3 && <OnboardingStep3 onFinish={handleFinish} />}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
}
