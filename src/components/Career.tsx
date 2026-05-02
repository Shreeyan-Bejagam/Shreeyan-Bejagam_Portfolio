import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Artificial Intelligence</h4>
                <h5>Mahindra University, Hyderabad</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Built a strong foundation in AI engineering, full-stack systems,
              databases, and applied machine learning through academic projects
              and practical deployments.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI Engineer Executive</h4>
                <h5>SSEV SoftSols Pvt Ltd</h5>
              </div>
              <h3>2025 - Present</h3>
            </div>
            <p>
              Designed end-to-end full-stack features and autonomous AI agent
              workflows integrating LLMs with APIs, databases, and enterprise
              services.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Career;
