import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

type StardustButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  compact?: boolean;
  asChild?: boolean;
};

export function StardustButton({
  children = "Launching Soon",
  className = "",
  compact = false,
  asChild = false,
  ...props
}: StardustButtonProps) {
  const Comp = asChild ? Slot : "button";
  const buttonStyle: React.CSSProperties = {
    ["--white" as string]: "#fff3eb",
    ["--bg" as string]: "#c65a20",
    ["--radius" as string]: "100px",
    outline: "none",
    cursor: "pointer",
    border: 0,
    position: "relative",
    borderRadius: compact ? "9999px" : "100px",
    backgroundColor: "var(--bg)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease",
    overflow: "hidden",
    boxShadow: `
      inset 0 0.3rem 0.9rem rgba(255, 255, 255, 0.3),
      inset 0 -0.1rem 0.3rem rgba(120, 46, 14, 0.55),
      inset 0 -0.4rem 0.9rem rgba(255, 196, 153, 0.5),
      0 1.5rem 2rem rgba(120, 46, 14, 0.35),
      0 0.8rem 1rem -0.6rem rgba(120, 46, 14, 0.5)
    `,
  };

  const wrapStyle: React.CSSProperties = {
    fontSize: compact ? "13px" : "25px",
    fontWeight: 500,
    color: "rgba(255, 243, 235, 0.98)",
    padding: compact ? "9px 14px" : "32px 45px",
    borderRadius: "inherit",
    position: "relative",
    overflow: "hidden",
    lineHeight: 1.1,
    whiteSpace: "nowrap",
  };

  const pStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: compact ? "7px" : "12px",
    margin: 0,
    transition: "all 0.2s ease",
    transform: "translateY(2%)",
    maskImage: "linear-gradient(to bottom, rgba(129, 216, 255, 1) 40%, transparent)",
  };

  const beforeAfterStyles = `
    .pearl-button .wrap::before,
    .pearl-button .wrap::after {
      content: "";
      position: absolute;
      transition: all 0.3s ease;
    }
    
    .pearl-button .wrap::before {
      left: -15%;
      right: -15%;
      bottom: 25%;
      top: -100%;
      border-radius: 50%;
      background-color: rgba(255, 195, 150, 0.2);
    }
    
    .pearl-button .wrap::after {
      left: 6%;
      right: 6%;
      top: 12%;
      bottom: 40%;
      border-radius: 22px 22px 0 0;
      box-shadow: inset 0 10px 8px -10px rgba(255, 220, 190, 0.65);
      background: linear-gradient(
        180deg,
        rgba(255, 183, 130, 0.35) 0%,
        rgba(0, 0, 0, 0) 50%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    
    .pearl-button .wrap p span:nth-child(2) {
      display: none;
    }
    
    .pearl-button:hover .wrap p span:nth-child(1) {
      display: none;
    }
    
    .pearl-button:hover .wrap p span:nth-child(2) {
      display: inline-block;
    }
    
    .pearl-button:hover {
      transform: scale(1.05);
      box-shadow:
        inset 0 0.3rem 0.5rem rgba(129, 216, 255, 0.4),
        inset 0 -0.1rem 0.3rem rgba(120, 46, 14, 0.65),
        inset 0 -0.4rem 0.9rem rgba(255, 165, 102, 0.55),
        0 1.8rem 2.2rem rgba(120, 46, 14, 0.35),
        0 0.9rem 1rem -0.6rem rgba(120, 46, 14, 0.5);
    }
    
    .pearl-button:hover .wrap::before {
      transform: translateY(-5%);
    }
    
    .pearl-button:hover .wrap::after {
      opacity: 0.4;
      transform: translateY(5%);
    }
    
    .pearl-button:hover .wrap p {
      transform: translateY(-4%);
    }
    
    .pearl-button:active {
      transform: translateY(4px);
      box-shadow:
        inset 0 0.3rem 0.5rem rgba(129, 216, 255, 0.5),
        inset 0 -0.1rem 0.3rem rgba(120, 46, 14, 0.75),
        inset 0 -0.4rem 0.9rem rgba(255, 165, 102, 0.35),
        0 1.8rem 2.2rem rgba(120, 46, 14, 0.35),
        0 0.9rem 1rem -0.6rem rgba(120, 46, 14, 0.55);
    }

    @media (prefers-reduced-motion: reduce) {
      .pearl-button,
      .pearl-button:hover,
      .pearl-button:active,
      .pearl-button .wrap p {
        transition: none !important;
        transform: none !important;
      }
    }
  `;

  return (
    <>
      <style>{beforeAfterStyles}</style>
      <Comp
        className={cn("pearl-button inline-flex items-center justify-center rounded-full", className)}
        style={buttonStyle}
        {...props}
      >
        <div className="wrap" style={wrapStyle}>
          <p style={pStyle}>
            <span>✧</span>
            <span>✦</span>
            {children}
          </p>
        </div>
      </Comp>
    </>
  );
}

