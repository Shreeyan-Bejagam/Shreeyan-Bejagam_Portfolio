import "./styles/About.css";

/** Edit this text whenever you want to refresh your About section */
const ABOUT_HEADING = "About Me";
const ABOUT_PARAGRAPHS = [
  "I’m an AI engineer based in Hyderabad. I’m also experienced across the full stack—I build APIs, services, data layers, and React frontends, and I care about shipping software that holds up in production.",
  "Most of my recent work is LLM applications, agentic workflows, and retrieval systems, using tools like FastAPI, React, and LangChain to connect models with real products and business workflows.",
];

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">{ABOUT_HEADING}</h3>
        {ABOUT_PARAGRAPHS.map((text) => (
          <p className="para" key={text.slice(0, 24)}>
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default About;
