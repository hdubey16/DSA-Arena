import { cn } from "@/lib/utils";

export function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className="animate-grid"
          style={{
            backgroundRepeat: 'repeat',
            backgroundSize: '60px 60px',
            height: '300vh',
            inset: '0% 0px',
            marginLeft: '-50%',
            transformOrigin: '100% 0 0',
            width: '600vw',
            backgroundImage: 'linear-gradient(to right, rgba(203, 148, 247, 0.3) 1px, transparent 0), linear-gradient(to bottom, rgba(203, 148, 247, 0.3) 1px, transparent 0)',
          }}
        />
      </div>
    </div>
  );
}
