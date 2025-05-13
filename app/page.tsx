import { Tilt } from '@/components/motion-primitives/tilt';
import { CardEffect } from './components/card-effect';
import { ThemeToggle } from '@/components/theme-toggle';

function TiltCard1() {
  return (
    <Tilt rotationFactor={15}>
      <div className="card-rotator">
        <div
          className="card-tilt"
          style={{
            backgroundImage: "url('/papyrus-texture.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            border: "2px solid #808080",
            borderRadius: 20,
            boxSizing: "border-box",
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
            width: 320,
            height: 420,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}
        >
          <CardEffect />
          <svg
            width="320"
            height="420"
            viewBox="0 0 320 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', zIndex: 3 }}
          >
            {/* Large diamond background */}
            <rect x="110" y="150" width="100" height="100" rx="10" transform="rotate(0 160 200)" fill="black" />
            {/* Top left small black circle */}
            <circle cx="48" cy="48" r="24" fill="black" />
            {/* Bottom right small black circle */}
            <circle cx="272" cy="372" r="24" fill="black" />
          </svg>
        </div>
      </div>
    </Tilt>
  );
}

export default function Home() {
  return (
    <div className="flex h-[100dvh] items-center justify-center bg-white dark:bg-zinc-900 fixed inset-0 overflow-hidden overscroll-none touch-none">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <TiltCard1 />
    </div>
  );
}
