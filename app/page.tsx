import { Tilt } from '@/components/motion-primitives/tilt';

function TiltCard1() {
  return (
    <Tilt rotationFactor={15}>
      <div
        style={{
          width: 320,
          height: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: "url('/img/illusion.png'), repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(var(--space) * 1), rgba(255, 237, 95, 1) calc(var(--space) * 2), rgba(168, 255, 95, 1) calc(var(--space) * 3), rgba(131, 255, 247, 1) calc(var(--space) * 4), rgba(120, 148, 255, 1) calc(var(--space) * 5), rgb(216, 117, 255) calc(var(--space) * 6), rgb(255, 119, 115) calc(var(--space) * 7)), repeating-linear-gradient(var(--angle), #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)",
          backgroundSize: '50%, 200% 700%, 100% 100%',
          backgroundPosition: '0% var(--posy), var(--posx) var(--posy), center',
          backgroundRepeat: 'repeat, no-repeat, no-repeat',
          border: '2px solid #222',
          borderRadius: '20px',
          boxSizing: 'border-box',
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.08)',
          // @ts-ignore
          '--angle': '135deg',
          '--posx': '0%',
          '--posy': '0%',
        }}
      >
        <svg width="320" height="420" viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg">
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
