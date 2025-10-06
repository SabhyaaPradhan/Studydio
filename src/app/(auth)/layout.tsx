
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-black via-stone-950 to-stone-900 p-4">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
}
