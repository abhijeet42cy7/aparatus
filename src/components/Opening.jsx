// PinnedWordRevealPage.jsx
import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import ThreeLinePattern from './ThreeLinePattern';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "../utils/smoothScroll.js";

gsap.registerPlugin(ScrollTrigger);

// Helper: distance from point to center of box
function distanceToBoxCenter(mouse, box) {
  const cx = box.left + box.width / 2;
  const cy = box.top + box.height / 2;
  return Math.sqrt((mouse.x - cx) ** 2 + (mouse.y - cy) ** 2);
}

// Helper: calculate grid distance between two pattern positions
const isAdjacent = (idx1, idx2, gridData) => {
  if (idx1 < 0 || idx2 < 0 || idx1 >= gridData.length || idx2 >= gridData.length) {
    return false;
  }
  const pos1 = gridData[idx1];
  const pos2 = gridData[idx2];

  // Check if patterns are neighbors (horizontally or vertically)
  const colDiff = Math.abs(pos1.col - pos2.col);
  const rowDiff = Math.abs(pos1.row - pos2.row);

  return (colDiff <= 1 && rowDiff === 0) || (colDiff === 0 && rowDiff <= 1);
};

export default function PinnedWordRevealPage() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  const videoRef = useRef(null);
  const OPENING_VIDEO_SRC = "/opening.mp4?v=3";

  // Vector lines configuration - same as Opening.jsx
  const lines = {
    line1: {
      start: { x: 13.5, y: 0 },
      end: { x: 13.5, y: 13 }
    },
    line2: {
      start: { x: 13.5, y: 13 },
      end: { x: 27, y: 14 }
    },
    line3: {
      start: { x: 13.5, y: 13 },
      end: { x: 9, y: 19 }
    }
  };

  // Pattern grid constants - same as Opening.jsx
  const ROWS = 6;
  const COLS = 24;
  const BOX_W = 27;
  const BOX_H = 26;
  const H_GAP = 27;
  const V_GAP = 32;

  // Hidden indices per row - same as Opening.jsx
  const hiddenMap = [
    [7, 16, 19],
    [1, 5, 14, 21],
    [2, 7, 10, 15, 23],
    [4, 5, 16, 22],
    [1, 6, 14, 23],
    [11, 12, 15],
  ];

  // Split grid for top and bottom
  const gridTop = [];
  const gridBottom = [];
  let idx = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!hiddenMap[row].includes(col)) {
        if (row < 3) {
          gridTop.push({ row, col, idx });
        } else {
          gridBottom.push({ row: row - 3, col, idx });
        }
        idx++;
      }
    }
  }

  // Top grid state
  const gridTopRef = useRef(null);
  const [hoverIdxTop, setHoverIdxTop] = useState(null);
  const getBoxRectsTop = useCallback(() => {
    return gridTop.map(({ row, col }) => ({
      left: col * (BOX_W + H_GAP),
      top: row * (BOX_H + V_GAP),
      width: BOX_W,
      height: BOX_H,
    }));
  }, [gridTop]);
  const handleMouseMoveTop = (e) => {
    const rect = gridTopRef.current.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const boxes = getBoxRectsTop();
    let minDist = Infinity;
    let minIdx = null;
    boxes.forEach((box, idx) => {
      const dist = distanceToBoxCenter(mouse, box);
      if (dist < minDist) {
        minDist = dist;
        minIdx = idx;
      }
    });
    setHoverIdxTop(minDist < 40 ? minIdx : null);
  };
  const handleMouseLeaveTop = () => setHoverIdxTop(null);

  // Bottom grid state
  const gridBottomRef = useRef(null);
  const [hoverIdxBottom, setHoverIdxBottom] = useState(null);
  const getBoxRectsBottom = useCallback(() => {
    return gridBottom.map(({ row, col }) => ({
      left: col * (BOX_W + H_GAP),
      top: row * (BOX_H + V_GAP),
      width: BOX_W,
      height: BOX_H,
    }));
  }, [gridBottom]);
  const handleMouseMoveBottom = (e) => {
    const rect = gridBottomRef.current.getBoundingClientRect();
    const mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    const boxes = getBoxRectsBottom();
    let minDist = Infinity;
    let minIdx = null;
    boxes.forEach((box, idx) => {
      const dist = distanceToBoxCenter(mouse, box);
      if (dist < minDist) {
        minDist = dist;
        minIdx = idx;
      }
    });
    setHoverIdxBottom(minDist < 40 ? minIdx : null);
  };
  const handleMouseLeaveBottom = () => setHoverIdxBottom(null);

  // Style for a SINGLE pattern box
  const singlePatternStyle = {
    position: 'relative',
    width: '27px',
    height: '26px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '27px 26px',
    backgroundPosition: 'center',
    opacity: 0.15,
    transition: 'opacity 0.3s ease-out, filter 0.3s ease-out',
    cursor: 'pointer',
  };

  const sentence =
    "Build applications to Analyze. Automate. Delegate — with Aparatus Platform. Let your team focus on decisions, not execution";

  const textLines = [
    { highlight: false, words: ["Build", "applications", "to"] },
    { highlight: true, words: ["Analyze.", "Automate.", "Delegate", "—"] },
    { highlight: false, words: ["with", "Aparatus", "Platform."] },
    { highlight: false, words: ["Let", "your", "team", "focus", "on", "decisions,", "not", "execution"] },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const words = wordsRef.current.filter(Boolean);
    if (!section || !words.length) return;

    gsap.set(words, { opacity: 0.32, force3D: true });
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    let duration = video?.duration || 0;
    let target = 0;
    let shown = 0;
    let raf = 0;

    const applyProgress = (p) => {
      const clamped = gsap.utils.clamp(0, 1, p);
      words.forEach((word, i) => {
        const start = i / words.length;
        const span = 1 / words.length;
        const local = gsap.utils.clamp(0, 1, (clamped - start) / span);
        gsap.set(word, { opacity: 0.32 + 0.68 * local });
      });

      if (!video || !duration) return;
      const t = clamped * duration;
      if (Math.abs(video.currentTime - t) > 0.04) {
        video.currentTime = t;
      }
    };

    const tick = () => {
      shown += (target - shown) * 0.16;
      if (Math.abs(target - shown) < 0.0007) shown = target;
      applyProgress(shown);
      raf = Math.abs(target - shown) > 0.0007 ? window.requestAnimationFrame(tick) : 0;
    };

    const setProgress = (p) => {
      target = p;
      if (!raf) raf = window.requestAnimationFrame(tick);
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=220%",
      pin: true,
      pinSpacing: true,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      onUpdate: (self) => setProgress(self.progress),
      onRefresh: (self) => {
        shown = self.progress;
        target = self.progress;
        applyProgress(self.progress);
      },
    });

    let videoReady = false;
    const markVideoReady = () => {
      if (!video || videoReady) return;
      videoReady = true;
      duration = video.duration || duration;
      video.pause();
      video.classList.add("is-ready");
      video.parentElement?.classList.add("has-video");
    };

    const onMeta = () => {
      duration = video.duration || 0;
      video.pause();
      if (video.readyState >= 2) markVideoReady();
    };

    if (video) {
      video.addEventListener("loadedmetadata", onMeta);
      video.addEventListener("canplay", markVideoReady);
      if (video.readyState >= 1) onMeta();
      if (video.readyState >= 2) markVideoReady();
    }

    const lenis = getLenis();
    const onLenisScroll = () => ScrollTrigger.update();
    if (lenis) lenis.on("scroll", onLenisScroll);

    ScrollTrigger.refresh();

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      if (video) {
        video.removeEventListener("loadedmetadata", onMeta);
        video.removeEventListener("canplay", markVideoReady);
        video.pause();
      }
      if (lenis) lenis.off("scroll", onLenisScroll);
      st.kill();
    };
  }, []);

  // Render top rows
  let gridIdxTop = 0;
  const rowsTop = [];
  for (let row = 0; row < 3; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      if (hiddenMap[row].includes(col)) {
        cols.push(
          <div key={col} style={{ ...singlePatternStyle, visibility: 'hidden' }} />
        );
      } else {
        let opacity = 0.15;
        let lineColor = '#000';
        if (hoverIdxTop !== null) {
          if (gridIdxTop === hoverIdxTop) {
            opacity = 1;
            lineColor = '#111';
          } else if (isAdjacent(gridIdxTop, hoverIdxTop, gridTop)) {
            opacity = 0.5;
          }
        }
        cols.push(
          <ThreeLinePattern
            key={col}
            spacing={0}
            style={{ ...singlePatternStyle, opacity }}
            lineColor={lineColor}
            lineWidth={1}
            line1Start={lines.line1.start}
            line1End={lines.line1.end}
            line2Start={lines.line2.start}
            line2End={lines.line2.end}
            line3Start={lines.line3.start}
            line3End={lines.line3.end}
          />
        );
        gridIdxTop++;
      }
    }
    rowsTop.push(
      <div className="hard-row-openingO" key={row}>
        {cols}
      </div>
    );
  }

  // Render bottom rows
  let gridIdxBottom = 0;
  const rowsBottom = [];
  for (let row = 3; row < 6; row++) {
    const cols = [];
    for (let col = 0; col < COLS; col++) {
      if (hiddenMap[row].includes(col)) {
        cols.push(
          <div key={col} style={{ ...singlePatternStyle, visibility: 'hidden' }} />
        );
      } else {
        let opacity = 0.15;
        let lineColor = '#000';
        if (hoverIdxBottom !== null) {
          if (gridIdxBottom === hoverIdxBottom) {
            opacity = 1;
            lineColor = '#111';
          } else if (isAdjacent(gridIdxBottom, hoverIdxBottom, gridBottom)) {
            opacity = 0.5;
          }
        }
        cols.push(
          <ThreeLinePattern
            key={col}
            spacing={0}
            style={{ ...singlePatternStyle, opacity }}
            lineColor={lineColor}
            lineWidth={1}
            line1Start={lines.line1.start}
            line1End={lines.line1.end}
            line2Start={lines.line2.start}
            line2End={lines.line2.end}
            line3Start={lines.line3.start}
            line3End={lines.line3.end}
          />
        );
        gridIdxBottom++;
      }
    }
    rowsBottom.push(
      <div className="hard-row-openingO" key={row}>
        {cols}
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="page-openingO">
      <style>{`
        .page-openingO {
          min-height: 100vh;
          background: #000000;
          box-sizing: border-box;
          position: relative;
          padding: 96px 40px 40px;
          overflow: hidden;
          backface-visibility: hidden;
        }

        .opening-media {
          position: absolute;
          left: 40px;
          bottom: 72px;
          width: min(340px, 26vw);
          aspect-ratio: 4 / 3;
          border-radius: 22px;
          overflow: hidden;
          background: #141414;
          z-index: 15;
          container-type: size;
        }

        .opening-media-placeholder {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.45);
          font-family: "Alliance No.2", ui-sans-serif, system-ui, sans-serif;
          font-size: 12px;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06), transparent 45%),
            #161616;
          opacity: 1;
          transition: opacity 0.45s ease;
        }

        .opening-media-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 0.45s ease;
          background: #111;
        }

        .opening-media-video.is-ready {
          opacity: 1;
        }

        .opening-media.has-video .opening-media-placeholder {
          opacity: 0;
          pointer-events: none;
        }

        .opening-ontology-overlay {
          position: absolute;
          left: 50.4%;
          top: 76.5%;
          transform: translate(-50%, -50%);
          z-index: 4;
          background: #e9e9e9;
          color: #4c4c4c;
          font-family: ui-sans-serif, system-ui, Helvetica, Arial, sans-serif;
          font-size: 3.8cqw;
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1;
          padding: 0.45cqh 0.9cqw;
          white-space: nowrap;
          pointer-events: none;
          opacity: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
        }

        .hero-wrap-openingO {
          margin-left: auto;
          width: min(68%, 980px);
          height: calc(100vh - 136px);
          background: #ffffff;
          border-radius: 28px;
          padding: 0;
          box-sizing: border-box;
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .opening-signs {
          position: absolute;
          left: 3%;
          width: 94%;
          height: 150px;
          object-fit: contain;
          object-position: center;
          pointer-events: none;
          user-select: none;
          z-index: 2;
        }

        .opening-signs-top {
          top: 24px;
        }

        .opening-signs-bottom {
          bottom: 24px;
        }

        .headline-openingO {
          margin: 0;
          max-width: 86%;
          font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI",
            Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji",
            "Segoe UI Emoji";
          font-size: 38px;
          line-height: 1.28;
          color: #333333;
          font-weight: 400;
          text-align: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          position: relative;
          z-index: 20;
        }

        .headline-line-openingO {
          display: block;
        }

        .headline-openingO .word {
          display: inline-block;
          margin-right: 0.32em;
          opacity: 0.32;
          will-change: opacity;
          white-space: nowrap;
        }

        .muted-openingO { color: rgba(75, 85, 99, 0.61); }
        .highlight-openingO { color: #4169e1; }

        .hard-grid-openingO,
        .top-grid-openingO,
        .bottom-grid-openingO,
        .hard-row-openingO {
          display: none;
        }

        @media (max-width: 1024px) {
          .page-openingO {
            padding: 88px 24px 24px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            gap: 18px;
          }

          .hero-wrap-openingO {
            width: 100%;
            height: auto;
            min-height: 58vh;
            padding: 72px 20px;
            margin-left: 0;
            order: 1;
          }

          .opening-media {
            position: relative;
            left: auto;
            bottom: auto;
            width: min(420px, 100%);
            order: 2;
          }

          .headline-openingO {
            max-width: 90%;
            font-size: 32px;
          }

          .opening-signs {
            height: 96px;
          }

          .opening-signs-top {
            top: 12px;
          }

          .opening-signs-bottom {
            bottom: 12px;
          }
        }

        @media (max-width: 640px) {
          .headline-openingO {
            font-size: 24px;
          }

          .hero-wrap-openingO {
            border-radius: 20px;
            min-height: 48vh;
          }

          .opening-media {
            border-radius: 16px;
          }
        }
      `}</style>

      <div className="opening-media">
        <div className="opening-media-placeholder">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M8 6.5v11l9-5.5-9-5.5Z" fill="currentColor" />
          </svg>
          <span>Video placeholder</span>
        </div>
        <video
          ref={videoRef}
          className="opening-media-video"
          muted
          playsInline
          preload="auto"
          src={OPENING_VIDEO_SRC || undefined}
          onLoadedMetadata={(e) => e.currentTarget.pause()}
        />
        <span className="opening-ontology-overlay" aria-hidden="true">A_paratus</span>
      </div>

      <div className="hero-wrap-openingO">
        <img
          src="/opening-signs.png"
          alt=""
          className="opening-signs opening-signs-top"
        />
        <img
          src="/opening-signs.png"
          alt=""
          className="opening-signs opening-signs-bottom"
        />

        <div
          className="hard-grid-openingO top-grid-openingO"
          ref={gridTopRef}
          onMouseMove={handleMouseMoveTop}
          onMouseLeave={handleMouseLeaveTop}
          style={{ userSelect: 'none' }}
        >
          {rowsTop}
        </div>

        <div
          className="hard-grid-openingO bottom-grid-openingO"
          ref={gridBottomRef}
          onMouseMove={handleMouseMoveBottom}
          onMouseLeave={handleMouseLeaveBottom}
          style={{ userSelect: 'none' }}
        >
          {rowsBottom}
        </div>

        <h1 className="headline-openingO" aria-label={sentence}>
          {textLines.map((line, lineIndex) => (
            <span className="headline-line-openingO" key={lineIndex}>
              {line.words.map((w, wordIndex) => {
                const i = textLines.slice(0, lineIndex).reduce((n, l) => n + l.words.length, 0) + wordIndex;
                return (
                  <span
                    key={i}
                    className={`word${line.highlight ? " highlight-openingO" : ""}`}
                    ref={(el) => (wordsRef.current[i] = el)}
                  >
                    {w}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
