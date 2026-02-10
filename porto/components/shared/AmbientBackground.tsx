export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background">
      {/* Top Left Dimmed Light */}
      <div className="absolute -left-[10%] -top-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] filter" />
      
      {/* Bottom Right Dimmed Light */}
      <div className="absolute -bottom-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px] filter" />
      
      {/* Optional: Very subtle noise overlay for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}
