import { CSSProperties, memo, useMemo, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type LabelPlacement =
  | "ABOVE LEFT"
  | "BELOW LEFT"
  | "ABOVE"
  | "BELOW"
  | "ABOVE RIGHT"
  | "BELOW RIGHT";

type TechIcon = {
  file: string;
  label: string;
};

export type StackStep = {
  title: string;
  placement: LabelPlacement;
  icons: TechIcon[];
};

export const stackSteps: StackStep[] = [
  {
    title: "Frontend",
    placement: "ABOVE LEFT",
    icons: [
      { file: "react.png", label: "React" },
      { file: "nextjs.png", label: "Next.js" },
      { file: "typescript.png", label: "TypeScript" },
    ],
  },
  {
    title: "Styling & Motion",
    placement: "BELOW LEFT",
    icons: [
      { file: "tailwind.png", label: "Tailwind" },
      { file: "framermotion.png", label: "Framer Motion" },
    ],
  },
  {
    title: "Backend",
    placement: "ABOVE",
    icons: [
      { file: "fastapi.png", label: "FastAPI" },
      { file: "nodejs.png", label: "Node.js" },
      { file: "python.png", label: "Python" },
    ],
  },
  {
    title: "Database & Cache",
    placement: "BELOW",
    icons: [
      { file: "postgresql.png", label: "PostgreSQL" },
      { file: "redis.png", label: "Redis" },
      { file: "mongodb.png", label: "MongoDB" },
    ],
  },
  {
    title: "AI / ML",
    placement: "ABOVE",
    icons: [
      { file: "pytorch.png", label: "PyTorch" },
      { file: "scikitlearn.png", label: "Scikit-learn" },
      { file: "huggingface.png", label: "Hugging Face" },
    ],
  },
  {
    title: "Data & Streaming",
    placement: "BELOW",
    icons: [
      { file: "kafka.png", label: "Kafka" },
      { file: "pandas.png", label: "Pandas" },
      { file: "numpy.png", label: "NumPy" },
    ],
  },
  {
    title: "DevOps & Infra",
    placement: "ABOVE RIGHT",
    icons: [
      { file: "docker.png", label: "Docker" },
      { file: "github.png", label: "GitHub" },
      { file: "linux.png", label: "Linux" },
    ],
  },
  {
    title: "Cloud & Deploy",
    placement: "BELOW RIGHT",
    icons: [
      { file: "vercel.png", label: "Vercel" },
      { file: "railway.png", label: "Railway" },
      { file: "cloudflare.png", label: "Cloudflare" },
    ],
  },
];

const linePlacementStyles: Record<
  LabelPlacement,
  {
    label: CSSProperties;
    line: CSSProperties;
  }
> = {
  "ABOVE LEFT": {
    label: { bottom: "100%", left: "10px", transform: "translate(-100%, -18px)" },
    line: {
      width: 74,
      left: -54,
      bottom: 72,
      transform: "rotate(-14deg)",
      transformOrigin: "right center",
    },
  },
  "BELOW LEFT": {
    label: { top: "100%", left: "18px", transform: "translate(-100%, 18px)" },
    line: {
      width: 72,
      left: -50,
      top: 74,
      transform: "rotate(14deg)",
      transformOrigin: "right center",
    },
  },
  ABOVE: {
    label: { bottom: "100%", left: "50%", transform: "translate(-50%, -18px)" },
    line: {
      width: 2,
      height: 28,
      left: "50%",
      bottom: 64,
      transform: "translateX(-50%)",
    },
  },
  BELOW: {
    label: { top: "100%", left: "50%", transform: "translate(-50%, 18px)" },
    line: {
      width: 2,
      height: 28,
      left: "50%",
      top: 74,
      transform: "translateX(-50%)",
    },
  },
  "ABOVE RIGHT": {
    label: { bottom: "100%", right: "18px", transform: "translate(100%, -18px)" },
    line: {
      width: 74,
      right: -56,
      bottom: 72,
      transform: "rotate(14deg)",
      transformOrigin: "left center",
    },
  },
  "BELOW RIGHT": {
    label: { top: "100%", right: "18px", transform: "translate(100%, 18px)" },
    line: {
      width: 72,
      right: -52,
      top: 74,
      transform: "rotate(-14deg)",
      transformOrigin: "left center",
    },
  },
};

function IconBadge({ icon }: { icon: TechIcon }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <span className="tech-pill-fallback" title={icon.label}>
        {icon.label}
      </span>
    );
  }

  return (
    <img
      src={`/images/${icon.file}`}
      alt={icon.label}
      width={32}
      height={32}
      loading="lazy"
      onError={() => setHasError(true)}
      className="tech-step-icon"
      draggable={false}
    />
  );
}

const StairLabel = memo(function StairLabel({
  title,
  placement,
}: {
  title: string;
  placement: LabelPlacement;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const placementStyles = linePlacementStyles[placement];

  return (
    <>
      <motion.div
        ref={ref}
        className="tech-step-label"
        style={placementStyles.label}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {title}
      </motion.div>
      <span className="tech-step-line" style={placementStyles.line} />
    </>
  );
});

function StairStep({ step, index }: { step: StackStep; index: number }) {
  const positionStyle = useMemo<CSSProperties>(
    () => ({
      // More breathing room (less congested)
      // Fit all 8 steps inside ~1100px without clipping
      top: `${360 - index * 42}px`,
      left: `${20 + index * 120}px`,
      zIndex: 12 - index,
    }),
    [index]
  );

  return (
    <motion.div
      className="tech-step-shell"
      style={positionStyle}
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <StairLabel title={step.title} placement={step.placement} />
      <motion.div
        className="tech-step-box"
        whileHover={{
          y: -6,
          transition: { duration: 0.22, ease: "easeOut" },
        }}
      >
        <div className="tech-step-top">
          <div className="tech-step-icons">
            {step.icons.map((icon) => (
              <IconBadge key={icon.label} icon={icon} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const staircaseStyles = `
.tech-staircase-wrap {
  position: relative;
  width: min(1100px, 100%);
  height: 540px;
  margin: 0 auto;
  overflow: visible;
}
.tech-staircase-scene {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.tech-step-shell {
  position: absolute;
  width: 220px;
  height: 170px;
  overflow: visible;
}
.tech-step-box {
  position: absolute;
  left: 0;
  top: 52px;
  width: 210px;
  height: 96px;
  filter: drop-shadow(0 12px 28px rgba(48, 82, 255, 0.24));
}
.tech-step-top {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(210, 232, 255, 0.32), rgba(210, 232, 255, 0) 22%),
    linear-gradient(135deg, #18214e 0%, #3447da 52%, #5b6fff 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.36),
    0 0 24px rgba(84, 120, 255, 0.34);
  border: 1px solid rgba(149, 197, 255, 0.22);
  transform: skewX(-12deg);
}
.tech-step-icons {
  position: absolute;
  left: 50%;
  top: 50%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: calc(100% - 28px);
  flex-wrap: wrap;
  row-gap: 10px;
  transform: translate(-50%, -50%) skewX(12deg);
  z-index: 2;
}
.tech-step-icon,
.tech-pill-fallback {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
  flex-shrink: 0;
}
.tech-step-icon {
  object-fit: contain;
  padding: 7px;
  background: rgba(10, 14, 26, 0.88);
  box-shadow:
    0 8px 18px rgba(0, 0, 0, 0.32),
    0 0 14px rgba(86, 178, 255, 0.3);
}
.tech-pill-fallback {
  min-width: 40px;
  width: auto;
  max-width: 120px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(19, 31, 58, 0.96);
  color: #f5fbff;
  border: 1px solid rgba(138, 199, 255, 0.34);
  backdrop-filter: blur(10px);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: 0 0 14px rgba(82, 151, 255, 0.22);
}
.tech-step-shell:hover .tech-step-icon,
.tech-step-shell:hover .tech-pill-fallback {
  transform: translateY(-4px) scale(1.2);
  filter: drop-shadow(0 0 12px rgba(111, 197, 255, 0.75));
  box-shadow:
    0 16px 30px rgba(0, 0, 0, 0.35),
    0 0 24px rgba(111, 197, 255, 0.55);
}
.tech-step-label {
  position: absolute;
  color: rgba(245, 250, 255, 0.96);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  text-shadow: 0 0 14px rgba(63, 167, 255, 0.2);
}
.tech-step-line {
  position: absolute;
  display: block;
  background: linear-gradient(90deg, rgba(126, 234, 255, 0.2), rgba(126, 234, 255, 0.95));
  box-shadow: 0 0 12px rgba(126, 234, 255, 0.28);
  height: 2px;
}
@media (max-width: 1150px) {
  .tech-staircase-wrap {
    transform: scale(0.92);
    transform-origin: top center;
  }
}
`;

const TechStaircase = () => {
  return (
    <div className="tech-staircase-wrap" aria-label="Tech staircase overview">
      <style>{staircaseStyles}</style>
      <div className="tech-staircase-scene">
        {stackSteps.map((step, index) => (
          <StairStep key={step.title} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

export default TechStaircase;
