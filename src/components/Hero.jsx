import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "../utils/smoothScroll.js";
import "./HeroScroll.css";

gsap.registerPlugin(ScrollTrigger);

const CARD_LEAD = [
  "Enterprise",
  "stack",
  "for",
  "autonomous",
  "Applications",
  "—",
];

const CARD_DIM = ["built", "to", "analyze,", "automate,", "and", "delegate."];

const MARKERS = [
  { left: "22%", top: "20%" },
  { left: "68%", top: "24%" },
  { left: "40%", top: "42%" },
  { left: "74%", top: "56%" },
  { left: "28%", top: "66%" },
  { left: "52%", top: "78%" },
];

function layout() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const mobile = w < 900;
  const nav = mobile ? 88 : 96;
  const stagePad = mobile ? 12 : 20;
  const top = nav;
  const side = mobile ? 20 : 56;
  const bottom = mobile ? 24 : 48;
  const gap = mobile ? 16 : 24;
  const innerW = w - side * 2;
  const innerH = h - top - bottom;

  const stage = {
    top: nav,
    left: stagePad,
    width: w - stagePad * 2,
    height: h - nav - stagePad,
    borderRadius: mobile ? 22 : 32,
  };

  if (mobile) {
    const frameH = innerH * 0.42;
    return {
      stage,
      frame: { top, left: side, width: innerW, height: frameH, borderRadius: 22 },
      card: {
        top: top + frameH + gap,
        left: side,
        width: innerW,
        height: innerH - frameH - gap,
        borderRadius: 22,
      },
    };
  }

  const frameW = innerW * 0.36;
  return {
    stage,
    frame: { top, left: side, width: frameW, height: innerH, borderRadius: 28 },
    card: {
      top,
      left: side + frameW + gap,
      width: innerW - frameW - gap,
      height: innerH,
      borderRadius: 28,
    },
  };
}

function Hero({ onRequestAccess }) {
  const sectionRef = useRef(null);
  const worldRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const dimRef = useRef(null);
  const scanRef = useRef(null);
  const introRef = useRef(null);
  const cardRef = useRef(null);
  const wordsRef = useRef([]);
  const markersRef = useRef([]);
  const cueRef = useRef(null);
  const bottomRef = useRef(null);
  const wordBlinkRefs = {
    enterprise: useRef(null),
    stack: useRef(null),
    for: useRef(null),
    autonomous: useRef(null),
    applications: useRef(null),
  };

  useEffect(() => {
    const allElements = Object.values(wordBlinkRefs).map((ref) => ref.current).filter(Boolean);
    if (!allElements.length) return;

    gsap.set(allElements, { opacity: 0 });

    const blinkElement = (target, intensity, numBlinks) => {
      const sequence = gsap.timeline();
      for (let i = 0; i < numBlinks; i++) {
        sequence
          .to(target, { opacity: 0, duration: 0.09, ease: "steps(1)" })
          .to(target, {
            opacity: 1,
            filter: `brightness(${intensity})`,
            duration: 0.02,
            ease: "steps(1)",
          });
      }
      return sequence;
    };

    const mainTimeline = gsap.timeline();
    mainTimeline.add(() => {
      blinkElement(wordBlinkRefs.enterprise.current, 1.7, 4);
      blinkElement(wordBlinkRefs.stack.current, 1.5, 5);
      blinkElement(wordBlinkRefs.for.current, 1.3, 4);
    });
    mainTimeline.add(() => {
      blinkElement(wordBlinkRefs.autonomous.current, 1.8, 5);
      blinkElement(wordBlinkRefs.applications.current, 2, 7);
    }, "+=0.15");
    mainTimeline.to(allElements, { opacity: 1, filter: "brightness(1)", duration: 0.05 }, "+=0.1");
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const card = cardRef.current;
    const world = worldRef.current;
    const video = videoRef.current;
    if (!section || !frame || !card) return;

    const lenis = getLenis();
    const onLenisScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on("scroll", onLenisScroll);

    const syncWorld = () => {
      if (!world || !video) return;
      if (Math.abs(world.currentTime - video.currentTime) > 0.12) {
        world.currentTime = video.currentTime;
      }
    };
    if (video) video.addEventListener("timeupdate", syncWorld);
    if (world) {
      world.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean);
      const markers = markersRef.current.filter(Boolean);
      const { card: c } = layout();

      gsap.set(frame, {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: 0,
        borderColor: "rgba(255,255,255,0)",
        boxShadow: "0 0 0 rgba(0,0,0,0)",
      });
      gsap.set(card, { ...c, opacity: 0, pointerEvents: "none" });
      gsap.set(words, { opacity: 0.18 });
      gsap.set(markers, { opacity: 0, scale: 0.35 });
      if (scanRef.current) gsap.set(scanRef.current, { opacity: 0, top: "0%" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=340%",
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Leave the intro so the video can move
      tl.to(introRef.current, { opacity: 0, y: -16, duration: 0.08, pointerEvents: "none" }, 0.04)
        .to(bottomRef.current, { opacity: 0, duration: 0.06 }, 0.04)
        .to(cueRef.current, { opacity: 0, duration: 0.06 }, 0.05);

      // 2. Zoom out — same shot, now sitting inside a rounded frame
      tl.to(
        frame,
        {
          top: () => layout().stage.top,
          left: () => layout().stage.left,
          width: () => layout().stage.width,
          height: () => layout().stage.height,
          borderRadius: () => layout().stage.borderRadius,
          borderColor: "rgba(255,255,255,0.14)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          duration: 0.34,
          ease: "power2.inOut",
        },
        0.08,
      )
        .to(video, { scale: 1.06, duration: 0.34, ease: "power2.inOut" }, 0.08)
        .to(world, { scale: 1.08, duration: 0.34, ease: "power2.inOut" }, 0.08)
        .to(dimRef.current, { opacity: 0.12, duration: 0.28 }, 0.1);

      // 3. That framed shot settles into the left column
      tl.to(
        frame,
        {
          top: () => layout().frame.top,
          left: () => layout().frame.left,
          width: () => layout().frame.width,
          height: () => layout().frame.height,
          borderRadius: () => layout().frame.borderRadius,
          duration: 0.28,
          ease: "power2.inOut",
        },
        0.44,
      )
        .to(video, { scale: 1, duration: 0.28, ease: "power2.inOut" }, 0.44)
        .to(
          card,
          {
            top: () => layout().card.top,
            left: () => layout().card.left,
            width: () => layout().card.width,
            height: () => layout().card.height,
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.16,
          },
          0.58,
        );

      // 4. Annotate the framed video
      if (scanRef.current) {
        tl.fromTo(
          scanRef.current,
          { opacity: 0, top: "0%" },
          { opacity: 1, top: "100%", duration: 0.22, ease: "power1.inOut" },
          0.7,
        ).to(scanRef.current, { opacity: 0, duration: 0.04 }, 0.9);
      }

      markers.forEach((marker, i) => {
        tl.fromTo(
          marker,
          { opacity: 0, scale: 1.7 },
          { opacity: 1, scale: 1, duration: 0.05, ease: "back.out(2.2)" },
          0.72 + i * 0.035,
        );
      });

      words.forEach((word, i) => {
        tl.to(word, { opacity: 1, duration: 0.03 }, 0.92 + i * 0.018);
      });

      tl.to({}, { duration: 0.22 });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      if (video) video.removeEventListener("timeupdate", syncWorld);
      ctx.revert();
      if (lenis) lenis.off("scroll", onLenisScroll);
    };
  }, []);

  const RightArrow = () => (
    <span className="info-product-arrow" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 15 15" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.5 2C7.77614 2 8 2.22386 8 2.5V11.2929L11.1464 8.14645C11.3417 7.95118 11.6583 7.95118 11.8536 8.14645C12.0488 8.34171 12.0488 8.65829 11.8536 8.85355L7.85355 12.8536C7.75979 12.9473 7.63261 13 7.5 13C7.36739 13 7.24021 12.9473 7.14645 12.8536L3.14645 8.85355C2.95118 8.65829 2.95118 8.34171 3.14645 8.14645C3.34171 7.95118 3.65829 7.95118 3.85355 8.14645L7 11.2929V2.5C7 2.22386 7.22386 2 7.5 2Z" fill="white" />
      </svg>
    </span>
  );

  const products = [
    { label: "A_ocr", href: "#a-ocr", arrow: true },
    { label: "A_db", href: "#a-db", arrow: true },
    { label: "A_agents", href: "#a-agents", arrow: true },
    { label: "A_actions", href: "#a-actions", arrow: false },
  ];

  const requestAccess = () => {
    if (onRequestAccess) onRequestAccess();
    else console.error("No onRequestAccess prop provided to Hero!");
  };

  const cardWords = [
    ...CARD_LEAD.map((word) => ({ word })),
    ...CARD_DIM.map((word) => ({ word })),
  ];

  return (
    <div className="landing-container hs-section" ref={sectionRef}>
      <div className="hs-stage">
        <div className="hs-world">
          <video className="hs-world-video" ref={worldRef} autoPlay muted loop playsInline preload="auto">
            <source src="/herobg.mp4" type="video/mp4" />
          </video>
          <div className="hs-world-veil" />
        </div>

        <div className="hs-frame" ref={frameRef}>
          <video
            ref={videoRef}
            className="hs-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/herobg.mp4" type="video/mp4" />
          </video>
          <div className="hs-video-dim" ref={dimRef} />
          <div className="hs-scan" ref={scanRef} />
          <div className="hs-markers">
            {MARKERS.map((pos, i) => (
              <span
                key={i}
                className="hs-marker"
                style={{ left: pos.left, top: pos.top }}
                ref={(el) => {
                  markersRef.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        <div className="hs-intro" ref={introRef}>
          <h1 className="hs-logo">A_paratus</h1>
          <p className="hs-tagline">
            <span ref={wordBlinkRefs.enterprise}>Enterprise</span>
            {" "}
            <span ref={wordBlinkRefs.stack}>stack</span>
            {" "}
            <span ref={wordBlinkRefs.for}>for</span>
            {" "}
            <span ref={wordBlinkRefs.autonomous}>autonomous</span>
            {" "}
            <span ref={wordBlinkRefs.applications}>Applications</span>
          </p>
          <div className="hero-button-wrapper">
            <button className="hero-button" onClick={requestAccess}>
              Request Access
              <svg className="button-arrow" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 25" fill="none">
                <rect width="32" height="28" transform="translate(0 0.5)" fill="white" fillOpacity="0.01" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5.83393 18.6665C5.5215 18.3541 5.5215 17.8475 5.83393 17.5352L16.4683 6.90078H9.59961C9.15779 6.90078 8.79961 6.54261 8.79961 6.10078C8.79961 5.65896 9.15779 5.30078 9.59961 5.30078H18.3996C18.6118 5.30078 18.8153 5.38507 18.9654 5.5351C19.1153 5.68513 19.1996 5.88861 19.1996 6.10078V14.9008C19.1996 15.3426 18.8414 15.7008 18.3996 15.7008C17.9579 15.3426 17.5996 15.3426 17.5996 14.9008V8.03216L6.96529 18.6665C6.65288 18.9789 6.14635 18.9789 5.83393 18.6665Z" fill="#1C2024" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hs-card" ref={cardRef}>
          <p className="hs-card-line">
            {cardWords.map((item, i) => (
              <React.Fragment key={`${item.word}-${i}`}>
                <span
                  className="hs-word"
                  ref={(el) => {
                    wordsRef.current[i] = el;
                  }}
                >
                  {item.word}
                </span>
                {i < cardWords.length - 1 ? " " : ""}
              </React.Fragment>
            ))}
          </p>
        </div>

        <button
          type="button"
          className="hs-scroll-cue"
          ref={cueRef}
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" })}
        >
          Scroll to explore
          <span className="hs-scroll-cue-icon" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 2v8M2.5 7.5 6 11l3.5-3.5" stroke="white" strokeWidth="1.2" />
            </svg>
          </span>
        </button>

        <div className="bottom-info hs-bottom" ref={bottomRef}>
          {products.map((product) => (
            <div className="bottom-section" key={product.label}>
              <a className="info-product" href={product.href}>
                <span>{product.label}</span>
                {product.arrow ? <RightArrow /> : null}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;
