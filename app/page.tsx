import { HolographicCard } from '@/components/ui/holographic-card';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-900 p-8">
      <HolographicCard 
        className="w-[330px] aspect-[0.714]"
        rotationFactor={15}
      />
    </div>
  );
}
