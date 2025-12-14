"use client";

import { useRef, useMemo, memo } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

// Pre-generate the map SVG outside the component (runs once at module load)
const staticMap = new DottedMap({ height: 100, grid: "diagonal" });
const darkMapSvg = staticMap.getSVG({
  radius: 0.22,
  color: "#E0E0E0",  // Slate grey shade
  shape: "circle",
  backgroundColor: "transparent",
});

const WorldMap = memo(function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  // Memoize the encoded SVG to prevent re-encoding on each render
  const encodedSvg = useMemo(() => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(darkMapSvg)}`;
  }, []);

  // Memoize point projection calculations
  const projectedDots = useMemo(() => {
    return dots.map((dot) => ({
      start: {
        x: (dot.start.lng + 180) * (800 / 360),
        y: (90 - dot.start.lat) * (400 / 180),
      },
      end: {
        x: (dot.end.lng + 180) * (800 / 360),
        y: (90 - dot.end.lat) * (400 / 180),
      },
    }));
  }, [dots]);

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] bg-transparent rounded-lg relative font-sans">
      <img
        src={encodedSvg}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
        loading="lazy"
      />
      {projectedDots.length > 0 && (
        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="w-full h-full absolute inset-0 pointer-events-none select-none"
        >
          <defs>
            <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {projectedDots.map((dot, i) => (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(dot.start, dot.end)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5 * i,
                  ease: "easeOut",
                }}
              />
              {/* Start point */}
              <circle cx={dot.start.x} cy={dot.start.y} r="2" fill={lineColor} />
              {/* End point */}
              <circle cx={dot.end.x} cy={dot.end.y} r="2" fill={lineColor} />
            </g>
          ))}
        </svg>
      )}
    </div>
  );
});

export default WorldMap;
