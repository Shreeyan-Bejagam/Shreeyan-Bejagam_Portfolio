import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");
    const onClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const section = a.getAttribute("data-href");
      if (!section) return;

      // Keep the URL hash behavior, but smooth scroll on desktop.
      if (window.innerWidth > 1024) {
        const target = document.querySelector(section);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", onClick);
    });

    return () => {
      links.forEach((elem) => {
        (elem as HTMLAnchorElement).removeEventListener("click", onClick);
      });
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Shreeyan
        </a>
        <a
          href="mailto:shreeyanbejagam@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          shreeyanbejagam@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
