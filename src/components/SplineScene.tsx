// Placeholder — install @splinetool/react-spline and replace this file
// when you have a Spline scene URL from spline.design

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ className }: SplineSceneProps) {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <div className="text-[200px] animate-float select-none opacity-80">👨‍🍳</div>
    </div>
  );
}
