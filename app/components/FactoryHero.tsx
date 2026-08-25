"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const factorySlides = [
  {
    src: "/media/deesheng-factory-campus.webp",
    alt: "Aerial view of the Deesheng Food manufacturing campus in Qingdao, China",
    label: "Manufacturing campus",
    position: "factory-slide-campus",
  },
  {
    src: "/media/deesheng-factory-mark.webp",
    alt: "Deesheng Food factory exterior with the D&S brand mark",
    label: "D&S production facility",
    position: "factory-slide-mark",
  },
  {
    src: "/media/deesheng-factory-office.webp",
    alt: "Deesheng Food office building and production workshops in Qingdao",
    label: "Export and production team",
    position: "factory-slide-office",
  },
  {
    src: "/media/deesheng-factory-gate.webp",
    alt: "Front entrance of the Deesheng Food factory and office campus",
    label: "Qingdao factory entrance",
    position: "factory-slide-gate",
  },
];

export function FactoryHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % factorySlides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="factory-showcase" aria-label="Deesheng Food manufacturing campus">
      <div className="factory-slides" aria-live="off">
        {factorySlides.map((slide, index) => (
          <img
            className={`factory-slide ${slide.position} ${index === activeSlide ? "is-active" : ""}`}
            src={slide.src}
            alt={index === activeSlide ? slide.alt : ""}
            width="2048"
            height="1152"
            fetchPriority={index === 0 ? "high" : undefined}
            loading={index === 0 ? "eager" : "lazy"}
            aria-hidden={index !== activeSlide}
            key={slide.src}
          />
        ))}
      </div>
      <div className="factory-showcase-shade" />

      <div className="shell factory-showcase-inner">
        <div className="factory-showcase-copy reveal">
          <p className="factory-kicker">
            <span>HALAL-certified manufacturer</span>
            <b>Qingdao · China</b>
          </p>
          <h1>Korean sauces made for global markets.</h1>
          <p className="factory-showcase-lede">
            Factory-direct gochujang, Korean sauces, seasonings and private-label
            food solutions for importers, distributors and foodservice buyers.
          </p>
          <div className="button-row factory-actions">
            <a
              className="button button-primary"
              href="https://wa.me/8615621089573?text=Hello%20Deesheng%20Food%20export%20team%2C%20I%20am%20interested%20in%20your%20HALAL%20Korean%20sauces."
              target="_blank"
              rel="noreferrer"
            >
              Contact our export team <span aria-hidden="true">↗</span>
            </a>
            <Link className="button button-ghost" href="/products">
              Explore 90+ products
            </Link>
          </div>
          <ul className="factory-trust" aria-label="Factory certifications">
            <li>HALAL</li>
            <li>BRCGS Grade A</li>
            <li>HACCP</li>
            <li>OU Kosher</li>
          </ul>
        </div>

        <aside className="factory-showcase-card" aria-label="Current factory view">
          <span>Deesheng campus</span>
          <strong>{factorySlides[activeSlide].label}</strong>
          <small>Real factory photography · Qingdao</small>
        </aside>
      </div>

      <div className="shell factory-showcase-controls" aria-label="Choose a factory photograph">
        <span className="factory-slide-count">
          {String(activeSlide + 1).padStart(2, "0")} <i /> {String(factorySlides.length).padStart(2, "0")}
        </span>
        <div className="factory-control-group">
          {factorySlides.map((slide, index) => (
            <button
              className={index === activeSlide ? "is-active" : ""}
              type="button"
              aria-label={`Show ${slide.label}`}
              aria-current={index === activeSlide ? "true" : undefined}
              onClick={() => setActiveSlide(index)}
              key={slide.src}
            >
              <span />
            </button>
          ))}
          <button
            className="factory-slideshow-toggle"
            type="button"
            aria-label={isPaused ? "Play factory photo slideshow" : "Pause factory photo slideshow"}
            aria-pressed={isPaused}
            onClick={() => setIsPaused((paused) => !paused)}
          >
            <b aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</b>
          </button>
        </div>
      </div>
    </section>
  );
}
