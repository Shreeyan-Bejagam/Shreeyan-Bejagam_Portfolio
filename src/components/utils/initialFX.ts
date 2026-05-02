import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  // Keep the intro fast and deployment-safe (no SplitText plugin).
  const introEls = gsap.utils.toArray<HTMLElement>([
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ]);
  gsap.fromTo(
    introEls,
    { opacity: 0, y: 34, filter: "blur(5px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.95,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.25,
    }
  );

  gsap.fromTo(
    [".landing-h2-info", ".landing-h2-info-1", ".landing-h2-1", ".landing-h2-2"],
    { opacity: 0, y: 18, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.85,
      ease: "power3.out",
      stagger: 0.08,
      delay: 0.45,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );
}
