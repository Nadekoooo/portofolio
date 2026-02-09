export default function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Top Left Glow - Subtle Primary/Blueish */}
      <div className="absolute -left-[10%] -top-[20%] h-[70%] w-[70%] rounded-full bg-primary/10 opacity-30 blur-[120px] mix-blend-screen" />

      {/* Bottom Right Glow - Subtle Secondary/Accent/Purpleish */}
      <div className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-accent/10 opacity-20 blur-[120px] mix-blend-screen" />
    </div>
  );
}
