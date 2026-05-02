import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./styles/Work.css";

type Project = {
  title: string;
  category: string;
  /** What the project does — no stack listing */
  summary: string;
  highlights: string[];
  techStack: string[];
  images?: { src: string; alt: string }[];
  link?: string;
};

const projects: Project[] = [
  {
    title: "Intelligent Traffic Management System",
    category: "Smart mobility & analytics",
    summary:
      "A traffic operations system that helps teams monitor road conditions, take quicker action, and streamline enforcement.",
    highlights: [
      "Turns traffic and congestion signals into clear views leaders can act on.",
      "Supports monitoring typical road situations so operators can spot issues earlier.",
      "Wireless challan generation so field enforcement can issue challans faster with less manual paperwork.",
      "Keeps challan records consistent so the same vehicle/event can be tracked without duplicate entry.",
      "Designed to reduce turnaround time between spotting a violation and recording it in the system.",
    ],
    techStack: [
      "Python",
      "YOLO",
      "Labelme",
      "HTML",
      "CSS",
    ],
    images: [
      { src: "/images/itms.JPG", alt: "ITMS screenshot" },
      { src: "/images/itms_test1.png", alt: "ITMS demo screenshot" },
    ],
  },
  {
    title: "ASSEFLOW (ERP System)",
    category: "Enterprise resource planning",
    summary:
      "A multi-dashboard ERP that brings operations, approvals, and employee workflows into one place for faster coordination.",
    highlights: [
      "One place for admins, directors, and staff to see operations, approvals, and day-to-day work.",
      "Connects front office and back office so data moves cleanly between teams instead of silos.",
      "Shipped with sign-in, live updates, and a production-ready hosting setup with controlled access.",
      "Focused on reducing handoffs and making status/ownership clear across departments.",
    ],
    techStack: ["HTML", "CSS", "React", "Node.js", "Firebase", "AWS", "cPanel"],
    images: [
      { src: "/images/asseflow.png", alt: "ASSEFLOW ERP screenshot" },
      { src: "/images/asseflow2.png", alt: "ASSEFLOW ERP screenshot (2)" },
    ],
  },
  {
    title: "Lexicon Attendance System",
    category: "Education & operations",
    summary:
      "A role-based campus app that keeps attendance and academic workflows organized across admissions, faculty, admin, and students.",
    highlights: [
      "Campus-wide app where admissions, faculty, admin, and students each see what matters to them.",
      "Keeps access tight so people only open the screens their role should see.",
      "Keeps student records, admissions steps, and academic workflows in sync as things change.",
      "Built to reduce manual follow-ups by keeping updates visible to the right stakeholders.",
    ],
    techStack: ["Flutter", "Firebase Auth", "Firestore"],
    images: [{ src: "/images/lxicon.jpg", alt: "Lexicon app screenshot" }],
  },
  {
    title: "Asset Management App",
    category: "Inventory & lifecycle",
    summary:
      "An asset lifecycle tracker that makes stock movement and state changes easy to follow from intake to dispatch.",
    highlights: [
      "Tracks assets from intake through labeling, quality checks, packaging, and dispatch.",
      "Makes handoffs between stages obvious so nothing sits in the wrong state.",
      "Gives the floor an up-to-date picture of stock and where each unit is in the pipeline.",
      "Improves traceability by tying each unit to a clear status and history of transitions.",
    ],
    techStack: [
      "Flutter",
      "Android Studio",
      "REST APIs",
      "Firebase",
      "Google Drive",
      "RClone",
    ],
    images: [
      { src: "/images/asset_1.jpg", alt: "Asset management screenshot" },
      { src: "/images/asset_2.jpg", alt: "Asset management screenshot (2)" },
    ],
  },
  {
    title: "Object Detection for Autonomous Vehicles",
    category: "Deep learning & perception",
    summary:
      "An object detection project focused on improving reliability for driving scenes, especially for smaller but critical objects.",
    highlights: [
      "Strengthened detection for small, easy-to-miss objects that matter in driving scenes.",
      "Balanced accuracy with speed so the pipeline can keep up in near–real-time conditions.",
      "Built a clean, well-prepared dataset so training stayed stable and results repeatable.",
      "Improved consistency in challenging frames (distance, motion blur, and clutter).",
    ],
    techStack: ["YOLOv5", "PyTorch", "Dataset annotation & preprocessing", "RCNN", "Faster RCNN"],
    images: [
      {
        src: "/images/object_detection.JPG",
        alt: "Object detection screenshot",
      },
    ],
  },
  {
    title: "AI-Driven Waste Segregation & Recycling",
    category: "Ideathon — Sopra Steria",
    summary:
      "A physical prototype that scans waste and routes it into the correct chamber to demonstrate automated segregation.",
    highlights: [
      "Prototype that looks at each piece of waste and routes it toward the right bin type.",
      "Physical rig with two chambers: after a scan, a plate rotates to drop waste into the correct side.",
      "Tuned the vision side for mixed everyday waste and timed motor moves so drops and resets stay reliable.",
      "Built to demonstrate a repeatable flow from scan → classify → route → reset with minimal operator effort.",
    ],
    techStack: ["Python", "Raspberry Pi", "Pi Camera", "YOLOv8", "Servo motors"],
  },
  {
    title: "AI Code Review Bot for GitHub Repos",
    category: "Automated code review",
    summary:
      "A bot that reviews changes in context and leaves actionable feedback to improve quality and consistency in pull requests.",
    highlights: [
      "Reads proposed changes and leaves review-style notes instead of only lint messages.",
      "Understands repository context so feedback points at the right files and diffs.",
      "Helps teams catch issues earlier by flagging risky patterns and suggesting safer alternatives.",
      "Designed to keep feedback short and relevant so it fits naturally into PR review.",
    ],
    techStack: ["Python", "LangChain", "GitHub APP"],
    link: "https://github.com/Shreeyan-Bejagam/Code-Review-Agent-",
  },
  {
    title: "AI-Powered Video Captioning & Generation",
    category: "Multimodal AI (rare human actions)",
    summary:
      "A multimodal pipeline that describes video content and uses those descriptions to drive a follow-on generation step.",
    highlights: [
      "Captions live video with extra attention to uncommon human actions that generic tools miss.",
      "Produces descriptions that match what is happening on screen, not generic filler.",
      "Uses those descriptions to generate new video so the flow from “see” to “say” to “show” is visible end to end.",
      "Built as a compact demo to show caption quality and downstream generation working together.",
    ],
    techStack: ["BLIP", "Hugging Face", "Transformers", "PyTorch", "Gradio"],
    link: "https://github.com/Shreeyan-Bejagam/AI-Powered-Video-Captioning-and-Generation-with-rare-human-actions",
  },
];

const LEFT_INDICES = [0, 2, 4, 6] as const;
const RIGHT_INDICES = [1, 3, 5, 7] as const;

function WorkDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="work-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="work-detail-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      onMouseDown={(e) => {
        // close when clicking the overlay (not the card)
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="work-modal-card"
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.99 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="work-detail-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          ×
        </button>
        <span className="work-detail-accent" aria-hidden />
        <p className="work-detail-label">Project</p>
        <h3 id="work-detail-title" className="work-detail-title">
          {project.title}
        </h3>
        <p className="work-detail-category">{project.category}</p>
        <p className="work-detail-summary">{project.summary}</p>
        <ul className="work-detail-list">
          {project.highlights.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <div className="work-detail-tech">
          <p className="work-detail-tech__label">Tech stack used</p>
          <div className="work-detail-tech__chips">
            {project.techStack.map((t) => (
              <span className="work-detail-tech__chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
        {project.images?.length ? (
          <div className="work-detail-media" aria-label="Project images">
            {project.images.map((img) => (
              <img
                key={img.src}
                className="work-detail-media__img"
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        ) : null}
        {project.link ? (
          <a
            className="work-detail-link"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        ) : null}
      </motion.div>
    </motion.div>
  );
}

const Work = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const clear = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clear();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedIndex, clear]);

  const selectedProject =
    selectedIndex !== null ? projects[selectedIndex] : null;

  const onTileClick = (index: number) => {
    setSelectedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2 className="work-section-title">
          My <span>Work</span>
        </h2>
        <div className="work-columns">
          <div
            className="work-col work-col--left"
          >
            <div className="work-tiles-stack">
              {LEFT_INDICES.map((index) => {
                const project = projects[index];
                return (
                  <button
                    key={project.title}
                    type="button"
                    className={`work-tile ${
                      selectedIndex === index ? "work-tile--active" : ""
                    }`}
                    onClick={() => onTileClick(index)}
                    aria-expanded={selectedIndex === index}
                  >
                    <span className="work-tile__accent" aria-hidden />
                    <span className="work-tile__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="work-tile__title">{project.title}</span>
                    <span className="work-tile__cat">{project.category}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="work-col work-col--right"
          >
            <div className="work-tiles-stack">
              {RIGHT_INDICES.map((index) => {
                const project = projects[index];
                return (
                  <button
                    key={project.title}
                    type="button"
                    className={`work-tile ${
                      selectedIndex === index ? "work-tile--active" : ""
                    }`}
                    onClick={() => onTileClick(index)}
                    aria-expanded={selectedIndex === index}
                  >
                    <span className="work-tile__accent" aria-hidden />
                    <span className="work-tile__num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="work-tile__title">{project.title}</span>
                    <span className="work-tile__cat">{project.category}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedProject ? (
            <WorkDetail
              key={selectedIndex}
              project={selectedProject}
              onClose={clear}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Work;
