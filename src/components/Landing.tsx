import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <p className="landing-kicker">AI Engineer • Full Stack Developer</p>
            <h2>Hello! I'm</h2>
            <h1>
              SHREEYAN
              <br />
              <span>BEJAGAM</span>
            </h1>
          </div>
          <div className="landing-info">
            <p className="landing-info-label">What I Build</p>
            <h3>An AI Engineer</h3>
            <h3>A Full Stack Developer</h3>
            <p className="landing-info-copy">
              Building production AI systems, intelligent products, and modern
              full stack experiences.
            </p>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
