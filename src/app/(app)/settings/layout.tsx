
'use client';
import { Card, CardContent } from "@/components/ui/card";
import ScrollFloat from "@/components/ScrollFloat";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const settingsNav = [
    { name: "General", href: "/settings" },
    { name: "Profile", href: "/settings/profile" },
    { name: "Plan & Billing", href: "/settings/billing" },
    { name: "Notifications", href: "/settings/notifications" },
]


export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <div className="container mx-auto max-w-5xl">
             <div>
                <ScrollFloat tag="h1" className="text-3xl font-bold" textClassName="scroll-float-text-h1">Settings</ScrollFloat>
                <p className="text-muted-foreground">Manage your account settings, plan, and notifications.</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                <nav className="flex flex-col space-y-1 md:col-span-1">
                    {settingsNav.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                pathname === item.href
                                ? "bg-muted text-foreground"
                                : "text-muted-foreground hover:bg-muted/50"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>
                <div className="md:col-span-3">
                    <Card>
                        <CardContent className="p-6">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
