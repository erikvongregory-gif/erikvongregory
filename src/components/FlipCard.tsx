import type { ReactNode } from "react";

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
};

export function FlipCard({ front, back, className = "" }: FlipCardProps) {
  return (
    <div className={`flip-card group relative ${className}`}>
      <div className="flip-card-inner relative h-full w-full transition-transform duration-500 ease-out">
        <div className="flip-card-front absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="flip-card-back absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
