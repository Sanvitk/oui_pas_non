"use client";

import { useState, useEffect, useCallback } from "react";

type ModalType = "oui" | "non" | null;

function playChimeSound() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new AudioContextClass();

    const now = ctx.currentTime;

    const freqs = [1318.51, 1046.5, 1567.98, 2093.0];
    const times = [0, 0.12, 0.28, 0.46];

    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + times[i]);

      gain.gain.setValueAtTime(0, now + times[i]);
      gain.gain.linearRampToValueAtTime(0.18, now + times[i] + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, now + times[i] + 1.1);

      osc.start(now + times[i]);
      osc.stop(now + times[i] + 1.2);
    });

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(3520, now + 0.55);
    gain2.gain.setValueAtTime(0, now + 0.55);
    gain2.gain.linearRampToValueAtTime(0.22, now + 0.56);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
    osc2.start(now + 0.55);
    osc2.stop(now + 1.7);
  } catch {
    // silent fallback
  }
}

function ChampagneAnimation() {
  const [phase, setPhase] = useState<"entering" | "clinking" | "settled">(
    "entering"
  );
  const [soundPlayed, setSoundPlayed] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("clinking"), 900);
    const t2 = setTimeout(() => setPhase("settled"), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase === "clinking" && !soundPlayed) {
      playChimeSound();
      setSoundPlayed(true);
    }
  }, [phase, soundPlayed]);

  const leftStyle: React.CSSProperties =
    phase === "entering"
      ? {
          transform: "translateX(-100px) rotate(-20deg)",
          opacity: 0,
          transition: "transform 0.9s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
        }
      : phase === "clinking"
      ? {
          transform: "translateX(-16px) rotate(-8deg)",
          opacity: 1,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }
      : {
          transform: "translateX(-20px) rotate(-10deg)",
          opacity: 1,
          transition: "transform 0.25s ease-out",
        };

  const rightStyle: React.CSSProperties =
    phase === "entering"
      ? {
          transform: "translateX(100px) rotate(20deg)",
          opacity: 0,
          transition: "transform 0.9s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease",
        }
      : phase === "clinking"
      ? {
          transform: "translateX(16px) rotate(8deg)",
          opacity: 1,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
        }
      : {
          transform: "translateX(20px) rotate(10deg)",
          opacity: 1,
          transition: "transform 0.25s ease-out",
        };

  const glassSvg = (mirrored: boolean) => (
    <svg
      width="72"
      height="110"
      viewBox="0 0 72 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={mirrored ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={mirrored ? "glassGradR" : "glassGradL"} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7e7ce" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={mirrored ? "stemGradR" : "stemGradL"} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f7e7ce" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Bowl */}
      <ellipse cx="36" cy="18" rx="22" ry="8" fill={`url(#${mirrored ? "glassGradR" : "glassGradL"})`} opacity="0.7" />
      <path
        d="M14 18 Q10 52 24 64 L48 64 Q62 52 58 18 Z"
        fill={`url(#${mirrored ? "glassGradR" : "glassGradL"})`}
        stroke="#c9a84c"
        strokeWidth="1.5"
      />
      <path
        d="M14 18 Q10 52 24 64"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Stem */}
      <rect x="33" y="64" width="6" height="30" rx="3" fill={`url(#${mirrored ? "stemGradR" : "stemGradL"})`} stroke="#c9a84c" strokeWidth="1" />
      {/* Base */}
      <ellipse cx="36" cy="97" rx="18" ry="5" fill="#c9a84c" opacity="0.5" />
      <ellipse cx="36" cy="96" rx="18" ry="4" stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      {/* Champagne liquid */}
      <path
        d="M17 36 Q12 52 24 62 L48 62 Q60 52 55 36 Z"
        fill="#f7e7a0"
        opacity="0.55"
      />
      {/* Bubbles */}
      {phase !== "entering" && (
        <>
          <circle cx="30" cy="55" r="2" fill="#fff" opacity="0.7">
            <animate attributeName="cy" from="55" to="22" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.7" to="0" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="38" cy="50" r="1.5" fill="#fff" opacity="0.6">
            <animate attributeName="cy" from="50" to="20" dur="0.9s" repeatCount="indefinite" begin="0.3s" />
            <animate attributeName="opacity" from="0.6" to="0" dur="0.9s" repeatCount="indefinite" begin="0.3s" />
          </circle>
          <circle cx="34" cy="58" r="1" fill="#fff" opacity="0.5">
            <animate attributeName="cy" from="58" to="24" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
            <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" begin="0.6s" />
          </circle>
        </>
      )}
    </svg>
  );

  return (
    <div className="flex items-end justify-center gap-0 my-6 h-32" style={{ minHeight: 120 }}>
      <div style={{ ...leftStyle, display: "inline-block" }}>
        {glassSvg(false)}
      </div>
      <div style={{ ...rightStyle, display: "inline-block" }}>
        {glassSvg(true)}
      </div>
    </div>
  );
}

function OuiModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(44,36,22,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl animate-slideUp"
        style={{
          background: "linear-gradient(145deg, #fdf8f0, #f5ead8)",
          border: "1.5px solid #c9a84c",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="text-4xl mb-2">🇫🇷</div>
        <h2
          className="text-2xl font-semibold mb-1"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#722f37",
          }}
        >
          Puikus pasirinkimas!
        </h2>
        <p
          className="text-lg mb-1"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#2c2416" }}
        >
          Tavo jubiliejus vyks Paryžiuje.
        </p>

        <ChampagneAnimation />

        <div className="text-3xl mb-6">❤️</div>

        <button
          onClick={onClose}
          className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #c9a84c, #a8863c)",
            color: "#fdf8f0",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: "0.05em",
            border: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Merci ✨
        </button>
      </div>
    </div>
  );
}

function NonModal({ onClose, onChangeAnswer }: { onClose: () => void; onChangeAnswer: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(44,36,22,0.55)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl p-8 text-center shadow-2xl animate-slideUp"
        style={{
          background: "linear-gradient(145deg, #fdf8f0, #f5ead8)",
          border: "1.5px solid #c9a84c",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl mb-3">❌</div>
        <h2
          className="text-2xl font-semibold mb-2"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "#722f37",
          }}
        >
          Klaida 404
        </h2>
        <p
          className="text-lg mb-1"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "#2c2416",
            lineHeight: 1.6,
          }}
        >
          Toks pasirinkimas neegzistuoja.
        </p>
        <p
          className="text-base mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: "#8b7355",
          }}
        >
          Bandykite dar kartą.
        </p>

        <button
          onClick={onChangeAnswer}
          className="w-full py-3 rounded-xl text-base font-medium transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #722f37, #5a2029)",
            color: "#fdf8f0",
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: "0.03em",
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 6px 24px rgba(114,47,55,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ❤️ Grįžti ir pasirinkti OUI
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const [modal, setModal] = useState<ModalType>(null);

  const handleOui = useCallback(() => setModal("oui"), []);
  const handleNon = useCallback(() => setModal("non"), []);
  const handleClose = useCallback(() => setModal(null), []);
  const handleChangeToOui = useCallback(() => setModal("oui"), []);

  useEffect(() => {
    if (modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <>
      <main
        className="min-h-screen flex items-center justify-center p-4 py-12"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, #f7e7ce 0%, #fdf8f0 40%, #f0e8d8 100%)",
        }}
      >
        {/* Decorative background pattern */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23722f37' fill-opacity='1'%3E%3Cpath d='M30 10 L32 18 L40 18 L34 23 L36 31 L30 26 L24 31 L26 23 L20 18 L28 18Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        />

        <article
          className="relative w-full max-w-lg rounded-3xl shadow-2xl animate-fadeIn"
          style={{
            background:
              "linear-gradient(160deg, #fdfaf4 0%, #f9f0e0 50%, #f5e8d0 100%)",
            border: "1px solid rgba(201,168,76,0.3)",
            boxShadow:
              "0 4px 6px -1px rgba(44,36,22,0.04), 0 20px 60px -10px rgba(44,36,22,0.18), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
          }}
        >
          {/* Top ornament */}
          <div className="flex items-center justify-center pt-8 pb-2">
            <div
              className="h-px flex-1 mx-6"
              style={{
                background:
                  "linear-gradient(to right, transparent, #c9a84c, transparent)",
              }}
            />
            <span className="text-2xl px-2" style={{ color: "#c9a84c" }}>
              ❧
            </span>
            <div
              className="h-px flex-1 mx-6"
              style={{
                background:
                  "linear-gradient(to right, transparent, #c9a84c, transparent)",
              }}
            />
          </div>

          {/* Eyebrow */}
          <p
            className="text-center text-xs tracking-[0.3em] uppercase mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              color: "#c9a84c",
            }}
          >
            Une invitation personnelle
          </p>

          {/* Eiffel Tower SVG */}
          <div className="flex justify-center mb-4">
            <svg
              width="48"
              height="72"
              viewBox="0 0 48 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 2 L20 20 M24 2 L28 20"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M18 20 L14 42 M30 20 L34 42"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 42 L8 64 M36 42 L40 64"
                stroke="#c9a84c"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line x1="19" y1="20" x2="29" y2="20" stroke="#c9a84c" strokeWidth="1.5" />
              <line x1="15" y1="30" x2="33" y2="30" stroke="#c9a84c" strokeWidth="1" />
              <line x1="13" y1="42" x2="35" y2="42" stroke="#c9a84c" strokeWidth="1.5" />
              <line x1="10" y1="52" x2="38" y2="52" stroke="#c9a84c" strokeWidth="1" />
              <line x1="8" y1="64" x2="40" y2="64" stroke="#c9a84c" strokeWidth="1.5" />
              <line x1="6" y1="68" x2="42" y2="68" stroke="#c9a84c" strokeWidth="2" />
            </svg>
          </div>

          {/* Main heading */}
          <div className="px-8 text-center">
            <h1
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-6"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#2c2416",
                textShadow: "0 1px 2px rgba(255,255,255,0.8)",
              }}
            >
              <em>Paris is always</em>
              <br />
              <em>a good idea.</em>
            </h1>

            {/* Divider */}
            <div
              className="w-16 h-px mx-auto mb-6"
              style={{ background: "linear-gradient(to right, transparent, #c9a84c, transparent)" }}
            />

            {/* Intro text */}
            <p
              className="text-lg leading-relaxed mb-6"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "#3d3020",
                fontSize: "1.2rem",
              }}
            >
              Todėl Tavo jubiliejaus proga kviečiu Tave{" "}
              <strong style={{ color: "#722f37" }}>penkioms dienoms</strong> ten,
              kur laukia:
            </p>

            {/* List */}
            <ul
              className="text-left mx-auto mb-8 space-y-3"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "#3d3020",
                fontSize: "1.15rem",
                maxWidth: "320px",
                listStyle: "none",
                padding: 0,
              }}
            >
              {[
                { emoji: "🥐", text: "kruasanai pusryčiams" },
                { emoji: "🦪", text: "austrės turguose" },
                { emoji: "🍾", text: "daug gero vyno ir burbulų" },
                { emoji: "🐌", text: "sraigės ir 🐸 varlės bei kiti kultūriniai malonumai" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5 shrink-0">{item.emoji}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            {/* Date */}
            <div
              className="rounded-2xl py-4 px-6 mb-6 text-center"
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.25)",
              }}
            >
              <p
                className="text-xl font-semibold mb-1"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "#722f37",
                }}
              >
                2026 m. lapkričio 2–7 d.
              </p>
              <p
                className="text-base"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: "#8b7355",
                  letterSpacing: "0.08em",
                }}
              >
                Vilnius ✈ Paryžius ✈ Vilnius
              </p>
            </div>

            {/* Question */}
            <p
              className="text-2xl font-semibold mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                color: "#2c2416",
              }}
            >
              Ar skrendi su manimi?
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 px-8 pb-10">
            <button
              onClick={handleOui}
              className="flex-1 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 group"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "linear-gradient(135deg, #722f37 0%, #9b3f49 100%)",
                color: "#fdf8f0",
                border: "none",
                letterSpacing: "0.06em",
                boxShadow: "0 4px 20px rgba(114,47,55,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(114,47,55,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(114,47,55,0.3)";
              }}
            >
              ❤️ OUI
            </button>

            <button
              onClick={handleNon}
              className="flex-1 py-4 rounded-2xl text-xl font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                background: "transparent",
                color: "#8b7355",
                border: "2px solid rgba(201,168,76,0.4)",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              🤍 NON
            </button>
          </div>

          {/* Bottom ornament */}
          <div className="flex items-center justify-center pb-6">
            <div
              className="h-px flex-1 mx-6"
              style={{
                background:
                  "linear-gradient(to right, transparent, #c9a84c, transparent)",
              }}
            />
            <span className="text-lg px-2" style={{ color: "#c9a84c", opacity: 0.6 }}>
              ✦
            </span>
            <div
              className="h-px flex-1 mx-6"
              style={{
                background:
                  "linear-gradient(to right, transparent, #c9a84c, transparent)",
              }}
            />
          </div>
        </article>
      </main>

      {modal === "oui" && <OuiModal onClose={handleClose} />}
      {modal === "non" && (
        <NonModal onClose={handleClose} onChangeAnswer={handleChangeToOui} />
      )}
    </>
  );
}
