import { Tilt } from '@/components/motion-primitives/tilt';

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
            border: "2px solid #222",
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
          <svg
            width="320"
            height="420"
            viewBox="0 0 320 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Large diamond background */}
            <rect x="60" y="100" width="200" height="200" rx="10" transform="rotate(45 160 200)" fill="#D9D9D9" />
            {/* Large black circle in center */}
            <circle cx="160" cy="200" r="70" fill="black" />
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
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-900">
      <TiltCard1 />
    </div>
  );
}
