import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const WELCOME_TO_HOME_MS = 250;

  useEffect(() => {
    if (percent < 100 || loaded) return;
    let finishTimer: number | undefined;
    const loadedTimer = window.setTimeout(() => {
      setLoaded(true);
      finishTimer = window.setTimeout(() => {
        setIsLoaded(true);
      }, 50);
    }, 10);
    return () => {
      window.clearTimeout(loadedTimer);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [percent, loaded]);

  useEffect(() => {
    if (!isLoaded) return;
    let cancelled = false;
    setClicked(true);

    const finishLoading = () => {
      window.setTimeout(() => {
        if (!cancelled) {
          window.setTimeout(() => {
            if (!cancelled) setIsLoading(false);
          }, WELCOME_TO_HOME_MS);
        }
      }, 250);
    };

    import("./utils/initialFX")
      .then((module) => {
        try {
          module.initialFX?.();
        } catch (error) {
          console.error("initialFX failed:", error);
          document.body.style.overflowY = "auto";
        } finally {
          finishLoading();
        }
      })
      .catch((error) => {
        console.error("initialFX import failed:", error);
        document.body.style.overflowY = "auto";
        finishLoading();
      });

    return () => {
      cancelled = true;
    };
  }, [isLoaded]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> AI Engineer</span> <span>AI Engineer</span>
            <span> Full Stack Developer</span> <span>Full Stack Developer</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
