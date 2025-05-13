import { Tilt } from '@/components/motion-primitives/tilt';
import { CardEffect } from './components/card-effect';

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
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              inset: 0,
              zIndex: 2,
              borderRadius: "inherit",
              background: `
                url('/grain.webp'),
                repeating-linear-gradient(
                  0deg,
                  var(--holographia-clr-1) calc(var(--space) * 1),
                  var(--holographia-clr-2) calc(var(--space) * 2),
                  var(--holographia-clr-3) calc(var(--space) * 3),
                  var(--holographia-clr-4) calc(var(--space) * 4),
                  var(--holographia-clr-5) calc(var(--space) * 5),
                  var(--holographia-clr-6) calc(var(--space) * 6),
                  var(--holographia-clr-1) calc(var(--space) * 7)
                ),
                repeating-linear-gradient(
                  var(--angle),
                  #0e152e 0%,
                  hsl(180, 10%, 60%) 3.8%,
                  hsl(180, 29%, 66%) 4.5%,
                  hsl(180, 10%, 60%) 5.2%,
                  #0e152e 10%,
                  #0e152e 12%
                ),
                radial-gradient(
                  farthest-corner circle at var(--pointer-x) var(--pointer-y),
                  hsla(0, 0%, 0%, 0.1) 12%,
                  hsla(0, 0%, 0%, 0.15) 20%,
                  hsla(0, 0%, 0%, 0.25) 120%
                )
              `,
              backgroundBlendMode: "overlay, overlay, overlay, overlay",
              backgroundSize: "100%, 200% 700%, 300%, 200%",
              backgroundPosition: "center, 50% var(--posy), var(--posx) var(--posy), var(--posx) var(--posy)",
              backgroundRepeat: "repeat, no-repeat, no-repeat, no-repeat",
              mixBlendMode: "overlay",
              pointerEvents: "none",
              willChange: "background-position"
            }
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
            <rect x="110" y="150" width="100" height="100" rx="10" transform="rotate(45 160 200)" fill="black" />
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
      <TiltCard1 />
    </div>
  );
}
