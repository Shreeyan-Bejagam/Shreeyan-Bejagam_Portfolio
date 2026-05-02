import { CSSProperties } from "react";
import techStackImage from "../../assets/techstack.png";

const sectionStyles = `
.techstack-redesign {
  position: relative;
  width: 100%;
  padding: clamp(88px, 10vw, 128px) 0 72px;
  overflow: visible;
}
.techstack-redesign::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 50%;
  width: min(1100px, 94vw);
  height: 100%;
  transform: translateX(-50%);
  background:
    radial-gradient(circle at 20% 12%, rgba(43, 97, 255, 0.15), transparent 32%),
    radial-gradient(circle at 70% 55%, rgba(85, 210, 255, 0.08), transparent 28%);
  pointer-events: none;
}
.techstack-redesign-inner {
  position: relative;
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  z-index: 1;
}
.techstack-heading {
  max-width: 720px;
  margin: 0 auto 42px;
  text-align: center;
}
.techstack-eyebrow {
  margin: 0 0 10px;
  color: rgba(126, 234, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.22em;
  font-size: 12px;
}
.techstack-heading h2 {
  margin: 0;
  color: #f5f9ff;
  font-size: clamp(40px, 6vw, 72px);
  font-weight: 500;
  line-height: 0.96;
}
.techstack-underline {
  width: 120px;
  height: 4px;
  margin: 18px auto 16px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(61, 140, 255, 0.3), #67dcff, rgba(122, 90, 255, 0.78));
  box-shadow: 0 0 20px rgba(103, 220, 255, 0.4);
}
.techstack-subtitle {
  margin: 0 auto;
  max-width: 640px;
  color: rgba(234, 229, 236, 0.72);
  font-size: 16px;
  line-height: 1.7;
}
.techstack-staircase {
  display: block;
  overflow: visible;
}
.techstack-image {
  width: min(1100px, 100%);
  margin: 0 auto;
  display: block;
  border-radius: 22px;
  border: 1px solid rgba(126, 234, 255, 0.14);
  background: linear-gradient(180deg, rgba(17, 26, 40, 0.55), rgba(8, 16, 28, 0.2));
  box-shadow: 0 22px 80px rgba(0, 0, 0, 0.32);
}
.techstack-image-frame {
  width: 100%;
  border-radius: 22px;
  aspect-ratio: 16 / 9;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
@media (max-width: 767px) {
  .techstack-heading {
    margin-bottom: 28px;
  }
  .techstack-image {
    border-radius: 18px;
  }
  .techstack-image-frame {
    border-radius: 18px;
  }
}
@media (min-width: 768px) {
  .techstack-redesign-inner {
    overflow: visible;
  }
}
`;

const TechStack = () => {
  const sectionCardStyle: CSSProperties = {
    width: "100%",
  };

  return (
    <section className="techstack-redesign section-container" style={sectionCardStyle}>
      <style>{sectionStyles}</style>
      <div className="techstack-redesign-inner">
        <div className="techstack-heading">
          <p className="techstack-eyebrow">AI Pipeline</p>
          <h2 className="title">Tech Stack</h2>
          <div className="techstack-underline" />
          <p className="techstack-subtitle para">
            Technologies I work with — from frontend to AI infrastructure.
          </p>
        </div>

        <div className="techstack-staircase">
          <div className="techstack-image">
            <div
              className="techstack-image-frame"
              role="img"
              aria-label="Tech stack overview"
              style={{ backgroundImage: `url(${techStackImage})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
