import type * as React from "react";

const BackChevron = (props: React.HTMLAttributes<SVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
    <title>{"ionicons-v5-a"}</title>
    <path
      d="M328 112 184 256l144 144"
      style={{
        fill: "none",
        stroke: "#000",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 48,
      }}
    />
  </svg>
);
export default BackChevron;
