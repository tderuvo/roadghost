"use client";
import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════
const BG0 = "#020810";
const BG1 = "#05111C";
const BG2 = "#091828";
const BG3 = "#0D2035";
const B0 = "rgba(0, 100, 160, 0.15)";
const B1 = "rgba(0, 130, 200, 0.30)";
const B2 = "rgba(0, 170, 238, 0.55)";

const T0 = "#C0D5E8";
const T1 = "#4A7090";
const T2 = "#253848";
const TA = "#00AAEE";
const TG = "#3A8858";
const TY = "#8A7A20";

const SANS = `'Space Grotesk', system-ui, sans-serif`;
const MONO = `'Space Mono', 'Courier New', monospace`;

// ═══════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════

function Mono({ children, color = T1, size = "0.62rem", style = {} }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: size, letterSpacing: "0.18em", color, ...style }}>
      {children}
    </span>
  );
}

function SectionLabel({ children, style = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", ...style }}>
      <div style={{ width: 20, height: 1, background: TA }} />
      <Mono color={TA} size="0.58rem">{children}</Mono>
    </div>
  );
}

function HR({ opacity = 0.15, style = {} }) {
  return <div style={{ height: 1, background: `rgba(0, 150, 210, ${opacity})`, ...style }} />;
}

function Dot({ status = "active" }) {
  const c = { active: TA, live: TG, concept: TY, classified: "#8A3040" };
  return (
    <span style={{
      display: "inline-block", width: 5, height: 5, borderRadius: "50%",
      background: c[status] || T1, marginRight: "0.5rem",
      boxShadow: `0 0 6px ${c[status] || T1}`,
      animation: "rgPulse 2s ease-in-out infinite",
    }} />
  );
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL REVEAL HOOK
// ═══════════════════════════════════════════════════════════════════
function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("rg-revealed"); }),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    document.querySelectorAll(".rg-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ═══════════════════════════════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════════════════════════════
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 3rem",
      background: scrolled ? "rgba(2, 8, 16, 0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? `1px solid ${B0}` : "1px solid transparent",
      transition: "all 0.35s ease",
      fontFamily: SANS,
    }}>

      {/* Logo */}
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.85rem", textDecoration: "none" }}>
        <div style={{ position: "relative", width: 34, height: 34, flexShrink: 0 }}>
          <div style={{
            position: "absolute", inset: 0,
            border: `1px solid ${B2}`,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            background: "rgba(0, 170, 238, 0.08)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 12, height: 12,
            background: TA,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          }} />
        </div>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, letterSpacing: "0.14em", color: T0, lineHeight: 1.1, textTransform: "uppercase" }}>
            RoadGhost
          </div>
          <div style={{ fontFamily: MONO, fontSize: "0.44rem", letterSpacing: "0.28em", color: T1, lineHeight: 1 }}>
            SYSTEMS
          </div>
        </div>
      </a>

      {/* Desktop links */}
      <div className="rg-hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.75rem" }}>
        {[["Programs", "#programs"], ["Technology", "#technology"], ["About", "#about"], ["Contact", "#contact"]].map(([label, href]) => (
          <a key={label} href={href} className="rg-navlink">{label}</a>
        ))}
      </div>

      <a href="#contact" className="rg-btn-ghost rg-nav-cta" style={{ padding: "0.5rem 1.4rem", fontSize: "0.62rem" }}>
        Request Brief
      </a>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════
// HERO
// ═══════════════════════════════════════════════════════════════════
function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(n => n + 1), 1200);
    return () => clearInterval(t);
  }, []);

  const coords = ["68°24'N  17°52'E", "47°11'N  08°32'E", "34°55'N  33°38'E"];
  const coord = coords[tick % coords.length];

  return (
    <section className="rg-scanlines" style={{
      position: "relative", minHeight: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "center",
      background: BG0,
      backgroundImage: `
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0, 100, 180, 0.14) 0%, transparent 65%),
        linear-gradient(rgba(0, 140, 200, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 140, 200, 0.03) 1px, transparent 1px)`,
      backgroundSize: "100% 100%, 52px 52px, 52px 52px",
      overflow: "hidden",
    }}>

      {/* Classification banner */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        height: 28,
        background: "rgba(0, 50, 80, 0.5)",
        borderBottom: `1px solid ${B0}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 10,
      }}>
        <Mono color={T1} size="0.55rem">
          UNCLASSIFIED // FOR DEMONSTRATION PURPOSES ONLY — NOT ITAR CONTROLLED
        </Mono>
      </div>

      {/* Scanning line animation */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(0,170,238,0.4), transparent)",
        animation: "rgScan 6s linear infinite",
        pointerEvents: "none", zIndex: 5,
      }} />

      {/* Corner accents */}
      {[
        { top: 36, left: 28, borderWidth: "1px 0 0 1px" },
        { top: 36, right: 28, borderWidth: "1px 1px 0 0" },
        { bottom: 60, left: 28, borderWidth: "0 0 1px 1px" },
        { bottom: 60, right: 28, borderWidth: "0 1px 1px 0" },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", width: 22, height: 22,
          border: `1px solid rgba(0, 170, 238, 0.3)`,
          borderWidth: pos.borderWidth,
          ...pos, pointerEvents: "none",
        }} />
      ))}

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, padding: "8rem 3rem 6rem", maxWidth: 1200, margin: "0 auto", width: "100%" }}>

        {/* System tag */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem", animation: "rgFadeUp 0.8s ease both" }}>
          <Mono color={TA} size="0.6rem">RGS — ADV. PROGRAMS DIVISION</Mono>
          <div style={{ width: 1, height: 12, background: B1 }} />
          <Mono color={T1} size="0.6rem">EST. 2019</Mono>
          <div style={{ width: 1, height: 12, background: B1 }} />
          <Dot status="live" />
          <Mono color={TG} size="0.6rem">SYSTEMS OPERATIONAL</Mono>
        </div>

        {/* Headline */}
        <h1 className="rg-hero-title" style={{
          fontFamily: SANS, fontWeight: 700,
          fontSize: "clamp(3.2rem, 7vw, 6.5rem)",
          lineHeight: 0.92, letterSpacing: "-0.02em",
          color: T0, textTransform: "uppercase",
          marginBottom: "2.25rem",
          maxWidth: 900,
          animation: "rgFadeUp 0.9s 0.1s ease both",
        }}>
          Deny.{" "}
          <span style={{ color: TA }}>Deceive.</span>
          {" "}Survive.
        </h1>

        {/* Subheadline */}
        <p style={{
          fontFamily: SANS, fontWeight: 300,
          fontSize: "1.15rem", lineHeight: 1.7,
          color: T1, maxWidth: 580,
          marginBottom: "3rem",
          animation: "rgFadeUp 0.9s 0.2s ease both",
        }}>
          Multi-spectral concealment and battlefield deception platforms engineered
          for distributed air operations in contested and denied environments.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "rgFadeUp 0.9s 0.3s ease both" }}>
          <a href="#roadghost" className="rg-btn-primary">
            Explore ROADGHOST
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
            </svg>
          </a>
          <a href="#technology" className="rg-btn-ghost">
            View Capability Brief
          </a>
        </div>

        {/* Spec bar */}
        <div style={{
          display: "flex", gap: "2.5rem", flexWrap: "wrap",
          marginTop: "3rem",
          paddingTop: "2rem",
          borderTop: `1px solid ${B0}`,
          animation: "rgFadeUp 0.9s 0.4s ease both",
        }}>
          {[
            ["TRL", "7–8"],
            ["SPECTRAL COVERAGE", "VIS / NIR / LWIR / RADAR"],
            ["DEPLOY TIME", "< 15 MIN"],
            ["CREW REQ.", "4 PERSONNEL"],
            ["COORD", coord],
          ].map(([label, val]) => (
            <div key={label}>
              <Mono color={T2} size="0.52rem" style={{ display: "block", marginBottom: 4 }}>{label}</Mono>
              <Mono color={T0} size="0.68rem">{val}</Mono>
            </div>
          ))}
        </div>
      </div>

      {/* Blueprint image panel */}
      <div style={{
        position: "relative", zIndex: 10,
        padding: "0 3rem 5rem",
        maxWidth: 1200, margin: "0 auto", width: "100%",
        animation: "rgFadeUp 1s 0.5s ease both",
      }}>
        {/* Panel header bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.65rem 1.25rem",
          background: BG3,
          border: `1px solid ${B1}`,
          borderBottom: "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Dot status="active" />
            <Mono color={TA} size="0.58rem">SYSTEM DIAGRAM — ROADGHOST RAPID DEPLOY CAMOUFLAGE SHELTER</Mono>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Mono color={T2} size="0.52rem">DOC: RGS-DWG-4100-A</Mono>
            <Mono color={T2} size="0.52rem">UNCLASSIFIED</Mono>
          </div>
        </div>

        {/* Image wrapper */}
        <div style={{
          position: "relative",
          border: `1px solid ${B1}`,
          overflow: "hidden",
          lineHeight: 0,
        }}>
          <img
            src="/roadghost-blueprint.png"
            alt="ROADGHOST Rapid Deploy Camouflage Shelter System — Technical Diagram"
            style={{
              width: "100%",
              display: "block",
              filter: "brightness(0.92) contrast(1.05) saturate(0.95)",
            }}
          />
          {/* Subtle corner brackets */}
          {[
            { top: 12, left: 12, borderWidth: "1px 0 0 1px" },
            { top: 12, right: 12, borderWidth: "1px 1px 0 0" },
            { bottom: 12, left: 12, borderWidth: "0 0 1px 1px" },
            { bottom: 12, right: 12, borderWidth: "0 1px 1px 0" },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute", width: 20, height: 20,
              borderColor: "rgba(0,170,238,0.5)", borderStyle: "solid",
              borderWidth: pos.borderWidth, ...pos, pointerEvents: "none",
            }} />
          ))}
          {/* Scan line overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)",
            pointerEvents: "none",
          }} />
        </div>

        {/* Panel footer */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0.55rem 1.25rem",
          background: BG3,
          border: `1px solid ${B1}`,
          borderTop: `1px solid ${B0}`,
        }}>
          <Mono color={T2} size="0.5rem">© ROADGHOST SYSTEMS LLC — FOR AUTHORIZED REVIEW ONLY — NOT FOR PUBLIC RELEASE</Mono>
          <Mono color={T2} size="0.5rem">SHEET 1 OF 4</Mono>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
        background: `linear-gradient(transparent, ${BG0})`,
        pointerEvents: "none",
      }} />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MISSION
// ═══════════════════════════════════════════════════════════════════
function Mission() {
  return (
    <section id="about" className="rg-section-pad" style={{ padding: "7rem 3rem", background: BG1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center",
          paddingTop: "4rem",
        }} className="rg-col-2">

          {/* Left */}
          <div className="rg-reveal">
            <SectionLabel>001 — Mission Imperative</SectionLabel>
            <h2 style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "2.4rem",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: T0, textTransform: "uppercase",
              marginBottom: "1.75rem",
            }}>
              Survivability<br />
              <span style={{ color: TA }}>by design.</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: T1, marginBottom: "1.25rem" }}>
              RoadGhost Systems develops advanced multi-spectral concealment, deception,
              and survivability technologies for military forces operating in contested and
              denied environments. Our systems are engineered for rapid deployment, operational
              simplicity, and spectral authenticity across visual, thermal, and radar domains.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: T1 }}>
              We work at the intersection of materials science, signature engineering, and
              expeditionary logistics — delivering concealment solutions that operate at
              the speed of dispersed warfare.
            </p>
          </div>

          {/* Right — stats */}
          <div className="rg-reveal rg-d2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", border: `1px solid ${B0}` }}>
            {[
              ["2019", "Founded"],
              ["7", "Active Programs"],
              ["TS/SCI", "Cleared Facility"],
              ["4", "Patent Families"],
              ["NATO", "STANAG Aligned"],
              ["DoD", "SBIR Recipient"],
            ].map(([val, label]) => (
              <div key={label} style={{
                padding: "2rem 1.75rem",
                background: BG2,
                borderBottom: `1px solid ${B0}`,
                borderRight: `1px solid ${B0}`,
              }}>
                <div style={{ fontFamily: MONO, fontSize: "1.6rem", fontWeight: 700, color: TA, lineHeight: 1, marginBottom: "0.4rem" }}>
                  {val}
                </div>
                <Mono color={T1} size="0.6rem">{label}</Mono>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FLAGSHIP — ROADGHOST SYSTEM
// ═══════════════════════════════════════════════════════════════════
function Flagship() {
  const pillars = [
    {
      id: "01",
      title: "Visual Terrain Substitution",
      desc: "Photorealistic modular canopy panels, pattern-matched to local terrain using spectral imaging analysis and high-resolution satellite datasets.",
    },
    {
      id: "02",
      title: "Thermal Signature Suppression",
      desc: "Active and passive thermal management system. Reduces airframe IR cross-section to ambient background across MWIR and LWIR bands.",
    },
    {
      id: "03",
      title: "Signature Injection",
      desc: "Programmable false-civilian signature emitters. Defeats AI-assisted targeting algorithms and overhead persistent surveillance systems.",
    },
    {
      id: "04",
      title: "Rapid Deploy Architecture",
      desc: "4-person crew deployment under 15 minutes. Engineered for highway airstrip operations with minimal ground support equipment.",
    },
    {
      id: "05",
      title: "Distributed Airfield Survivability",
      desc: "System architecture optimized for dispersed basing concepts, including RENEGADE, Agile Combat Employment, and HiMART operations.",
    },
  ];

  return (
    <section id="roadghost" style={{ padding: "7rem 3rem", background: BG0, position: "relative", overflow: "hidden" }}>

      {/* Blueprint grid background */}
      <div className="rg-grid" style={{ position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 5, maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{ paddingTop: "4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem" }} className="rg-col-2">

          {/* Left */}
          <div>
            <div className="rg-reveal">
              <SectionLabel>002 — Flagship System</SectionLabel>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.75rem" }}>
                <h2 style={{
                  fontFamily: SANS, fontWeight: 700, fontSize: "2.8rem",
                  lineHeight: 1, letterSpacing: "-0.02em", color: T0, textTransform: "uppercase",
                }}>
                  ROADGHOST
                </h2>
                <Mono color={T2} size="0.58rem">SYSTEM REV. 4.1</Mono>
              </div>
              <p style={{ fontFamily: MONO, fontSize: "0.65rem", letterSpacing: "0.12em", color: TG, marginBottom: "1.75rem" }}>
                RAPID DEPLOY CAMOUFLAGE SHELTER SYSTEM
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: T1, marginBottom: "1.5rem" }}>
                The ROADGHOST system conceals fixed- and rotary-wing aircraft on expeditionary
                airfields, dispersed highway strips, and forward operating locations. Modular
                terrain skins, integrated thermal suppression, and programmable false signatures
                deliver platform survivability against multispectral ISR and precision targeting systems.
              </p>
              <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: T1 }}>
                Designed to operate in all climate zones. Compatible with legacy and fifth-generation
                aircraft profiles. Fully field-reparable with organic maintenance capability.
              </p>
            </div>

            {/* Pillars */}
            <div style={{ marginTop: "3rem" }}>
              {pillars.map((p, i) => (
                <div key={p.id} className={`rg-reveal rg-d${i + 1}`} style={{
                  display: "flex", gap: "1.5rem",
                  padding: "1.5rem 0",
                  borderBottom: `1px solid ${B0}`,
                  alignItems: "flex-start",
                }}>
                  <Mono color={T2} size="0.65rem" style={{ flexShrink: 0, paddingTop: "0.1rem" }}>{p.id}</Mono>
                  <div>
                    <div style={{ fontFamily: SANS, fontSize: "0.85rem", fontWeight: 600, color: T0, marginBottom: "0.35rem", letterSpacing: "0.04em" }}>
                      {p.title}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: "0.82rem", lineHeight: 1.65, color: T1 }}>
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — system visual */}
          <div className="rg-reveal rg-d3">
            <div className="rg-bracket" style={{
              position: "relative",
              background: BG2,
              border: `1px solid ${B0}`,
              padding: "3rem 2.5rem",
              height: "100%",
              minHeight: 520,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              {/* Schematic art */}
              <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>

                {/* Ground line */}
                <div style={{
                  position: "absolute", bottom: "15%", left: "5%", right: "5%",
                  height: 1, background: `rgba(0, 140, 200, 0.25)`,
                }} />

                {/* Road lines */}
                {[-1, 0, 1].map(i => (
                  <div key={i} style={{
                    position: "absolute", bottom: "12%",
                    left: `${50 + i * 18}%`, width: "10%", height: 1,
                    background: `rgba(0, 140, 200, 0.12)`,
                  }} />
                ))}

                {/* Shelter canopy */}
                <div style={{
                  position: "absolute", bottom: "14%",
                  left: "15%", right: "15%",
                  height: "48%",
                  background: "linear-gradient(180deg, rgba(0,80,40,0.35) 0%, rgba(0,60,30,0.6) 100%)",
                  border: `1px solid rgba(60,120,60,0.4)`,
                  clipPath: "polygon(5% 100%, 0% 60%, 15% 10%, 50% 0%, 85% 10%, 100% 60%, 95% 100%)",
                }} />

                {/* Thermal layer */}
                <div style={{
                  position: "absolute", bottom: "14%",
                  left: "20%", right: "20%",
                  height: "40%",
                  background: "rgba(0, 100, 200, 0.06)",
                  clipPath: "polygon(5% 100%, 0% 55%, 18% 8%, 50% 0%, 82% 8%, 100% 55%, 95% 100%)",
                  border: `1px dashed rgba(0, 140, 200, 0.2)`,
                }} />

                {/* Aircraft silhouette */}
                <div style={{
                  position: "absolute", bottom: "17%",
                  left: "50%", transform: "translateX(-50%)",
                  width: "55%", height: "18%",
                  background: "rgba(180, 210, 230, 0.06)",
                  clipPath: "polygon(0 80%, 10% 20%, 25% 0%, 50% 0%, 75% 0%, 90% 20%, 100% 80%, 80% 100%, 20% 100%)",
                  border: `1px solid rgba(180, 210, 230, 0.15)`,
                }} />

                {/* Sensor rings (overhead ISR simulation) */}
                {[80, 110, 145].map((r, i) => (
                  <div key={i} style={{
                    position: "absolute", top: "8%", left: "50%",
                    width: r, height: r,
                    transform: "translate(-50%, -50%)",
                    border: `1px solid rgba(0, 170, 238, ${0.08 - i * 0.02})`,
                    borderRadius: "50%",
                  }} />
                ))}
                {/* ISR label */}
                <div style={{ position: "absolute", top: "2%", left: "50%", transform: "translateX(-50%)" }}>
                  <Mono color="rgba(0,170,238,0.4)" size="0.52rem">ISR OVERHEAD</Mono>
                </div>

                {/* Annotation lines */}
                <div style={{ position: "absolute", top: "30%", left: "8%", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  <div style={{ width: 40, height: 1, background: "rgba(0,170,238,0.25)" }} />
                  <Mono color="rgba(0,170,238,0.5)" size="0.5rem">CANOPY</Mono>
                </div>
                <div style={{ position: "absolute", bottom: "30%", right: "8%", display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end" }}>
                  <div style={{ width: 40, height: 1, background: "rgba(0,170,238,0.25)" }} />
                  <Mono color="rgba(0,170,238,0.5)" size="0.5rem">THERMAL LYR</Mono>
                </div>
              </div>

              {/* Spec bar */}
              <div style={{ borderTop: `1px solid ${B0}`, paddingTop: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem" }}>
                  {[["BANDS", "4"], ["DEPLOY", "15'"], ["WEIGHT", "820 KG"]].map(([l, v]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <Mono color={T2} size="0.52rem" style={{ display: "block", marginBottom: 3 }}>{l}</Mono>
                      <Mono color={TA} size="0.8rem">{v}</Mono>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CAPABILITIES
// ═══════════════════════════════════════════════════════════════════
function Capabilities() {
  const caps = [
    {
      id: "CAP-01",
      title: "Multi-Spectral Deception",
      desc: "Integrated deception across visual, near-infrared, long-wave IR, and synthetic aperture radar bands. Defeat layered ISR without spectral signature gaps.",
      icon: "◈",
    },
    {
      id: "CAP-02",
      title: "Expeditionary Camouflage Systems",
      desc: "Man-portable and vehicle-towed concealment packages optimized for rapid airfield establishment and austere forward basing in all climate zones.",
      icon: "⬡",
    },
    {
      id: "CAP-03",
      title: "Tactical Signature Management",
      desc: "Real-time signature monitoring and adaptive response across deployed assets. Integrated with organic ISR feeds for threat-reactive concealment adjustment.",
      icon: "◎",
    },
    {
      id: "CAP-04",
      title: "Mobile Concealment Infrastructure",
      desc: "Vehicle-integrated concealment systems for convoy and staging area operations. Modular panels compatible with HMMWV, JLTV, and MH-series platforms.",
      icon: "▣",
    },
    {
      id: "CAP-05",
      title: "Adaptive Battlefield Obscuration",
      desc: "Directed and area-effect obscuration systems using multi-spectral smoke, aerosol, and thermal masking technologies for tactical movement and basing.",
      icon: "◉",
    },
    {
      id: "CAP-06",
      title: "ISR Degradation Solutions",
      desc: "Passive and active techniques to reduce exploitation quality of collected imagery. Validated against representative threat sensor architectures.",
      icon: "⬢",
    },
  ];

  return (
    <section id="technology" style={{ padding: "7rem 3rem", background: BG1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{ paddingTop: "4rem" }}>
          <div className="rg-reveal" style={{ maxWidth: 640, marginBottom: "4rem" }}>
            <SectionLabel>003 — Core Capabilities</SectionLabel>
            <h2 style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "2.2rem",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: T0, textTransform: "uppercase", marginBottom: "1rem",
            }}>
              Full-spectrum<br />concealment portfolio.
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.75, color: T1 }}>
              From individual platform concealment to distributed airfield survivability,
              RoadGhost Systems offers a complete portfolio of signature management capabilities.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: B0 }} className="rg-col-3">
            {caps.map((cap, i) => (
              <div key={cap.id} className={`rg-reveal rg-d${(i % 3) + 1} rg-bracket rg-card`} style={{
                background: BG2,
                border: `1px solid ${B0}`,
                padding: "2.25rem 2rem",
                cursor: "default",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "1.4rem", color: TA, lineHeight: 1 }}>{cap.icon}</span>
                  <Mono color={T2} size="0.54rem">{cap.id}</Mono>
                </div>
                <div style={{
                  fontFamily: SANS, fontSize: "0.88rem", fontWeight: 600,
                  color: T0, marginBottom: "0.75rem", lineHeight: 1.3, letterSpacing: "0.02em",
                }}>
                  {cap.title}
                </div>
                <div style={{ fontFamily: SANS, fontSize: "0.82rem", lineHeight: 1.7, color: T1 }}>
                  {cap.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// OPERATIONAL SCENARIO
// ═══════════════════════════════════════════════════════════════════
function Scenario() {
  const steps = [
    {
      phase: "PHASE 01",
      title: "Dispersed Landing",
      detail: "Fighter aircraft diverts to pre-surveyed highway airstrip. 2.4km straight section confirmed clear. Aircraft lands within runway marking system. Elapsed: T+00:00.",
      status: "complete",
    },
    {
      phase: "PHASE 02",
      title: "Rapid Deployment",
      detail: "4-person ground crew deploys ROADGHOST shelter from pre-positioned support vehicle. Collapsible aluminum frame erected. Terrain canopy panels installed. Elapsed: T+12:00.",
      status: "complete",
    },
    {
      phase: "PHASE 03",
      title: "Spectral Activation",
      detail: "Thermal suppression system activated. Engine heat diffusion pads deployed. Signature injection modules initialized with pre-loaded civilian roadside profile. Elapsed: T+15:00.",
      status: "active",
    },
    {
      phase: "PHASE 04",
      title: "ISR Assessment",
      detail: "Overhead ISR sensor pass at 18,000ft. Target shows civilian roadside construction signature. No military thermal profile detected. Pattern-of-life assessment: benign. Elapsed: T+22:00.",
      status: "concept",
    },
  ];

  return (
    <section style={{ padding: "7rem 3rem", background: BG0, position: "relative", overflow: "hidden" }}>
      <div className="rg-grid-dense" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 5, maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{ paddingTop: "4rem" }}>
          <div className="rg-reveal" style={{ marginBottom: "4.5rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ maxWidth: 540 }}>
              <SectionLabel>004 — Operational Scenario</SectionLabel>
              <h2 style={{
                fontFamily: SANS, fontWeight: 700, fontSize: "2.2rem",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                color: T0, textTransform: "uppercase",
              }}>
                Highway airstrip.<br />
                <span style={{ color: TA }}>Invisible to ISR.</span>
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <Mono color={T2} size="0.56rem" style={{ display: "block", marginBottom: 6 }}>SCENARIO REF</Mono>
              <Mono color={T1} size="0.62rem">OPS-SCN-017 // NORDIC ENVIRONMENT</Mono>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }} className="rg-col-2">
            {steps.map((step, i) => (
              <div key={step.phase} className={`rg-reveal rg-d${i + 1}`} style={{
                borderLeft: `1px solid ${B0}`,
                borderTop: `1px solid ${B0}`,
                borderBottom: `1px solid ${B0}`,
                borderRight: i === steps.length - 1 ? `1px solid ${B0}` : "none",
                padding: "2.5rem 2rem",
                background: i % 2 === 0 ? BG1 : BG2,
                position: "relative",
              }}>
                {/* Phase connector */}
                {i < steps.length - 1 && (
                  <div style={{
                    position: "absolute", right: -1, top: "50%",
                    transform: "translateY(-50%)",
                    width: 8, height: 8,
                    background: B1,
                    clipPath: "polygon(0 0, 100% 50%, 0 100%)",
                    zIndex: 10,
                  }} className="rg-hide-mobile" />
                )}
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                  <Dot status={step.status} />
                  <Mono color={TA} size="0.58rem">{step.phase}</Mono>
                </div>
                <div style={{
                  fontFamily: SANS, fontSize: "0.92rem", fontWeight: 600,
                  color: T0, marginBottom: "0.9rem", lineHeight: 1.25,
                }}>
                  {step.title}
                </div>
                <div style={{ fontFamily: SANS, fontSize: "0.8rem", lineHeight: 1.7, color: T1 }}>
                  {step.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// TECHNICAL ARCHITECTURE
// ═══════════════════════════════════════════════════════════════════
function TechArch() {
  const components = [
    { id: "CMP-01", name: "Collapsible Shelter Frame",    spec: "6061-T6 Al alloy, 14-node articulation",      status: "TRL 8" },
    { id: "CMP-02", name: "Interchangeable Terrain Skins", spec: "Spectral-matched, 3-season modular panels",  status: "TRL 8" },
    { id: "CMP-03", name: "Selective LED Visual Modules",  spec: "Dynamic pattern emulation, 400–900nm",       status: "TRL 7" },
    { id: "CMP-04", name: "Thermal Diffusion Layer",       spec: "Passive + active, MWIR/LWIR attenuation",    status: "TRL 7" },
    { id: "CMP-05", name: "Engine Signature Heat Pads",    spec: "Conformal, 300°C rated, LWIR suppression",   status: "TRL 6" },
    { id: "CMP-06", name: "Ruggedized Control Unit",       spec: "MIL-STD-810H, -40°C to +70°C operation",    status: "TRL 8" },
    { id: "CMP-07", name: "False Signature Emitters",      spec: "Programmable civilian profile library",      status: "TRL 6" },
    { id: "CMP-08", name: "Rapid Deploy Anchor System",    spec: "Ground anchor, 120 kg lateral load rated",   status: "TRL 9" },
  ];

  return (
    <section id="technology-detail" style={{ padding: "7rem 3rem", background: BG1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{ paddingTop: "4rem" }}>
          <div className="rg-reveal" style={{ marginBottom: "4rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <SectionLabel>005 — Technical Architecture</SectionLabel>
              <h2 style={{
                fontFamily: SANS, fontWeight: 700, fontSize: "2.2rem",
                lineHeight: 1.1, letterSpacing: "-0.02em",
                color: T0, textTransform: "uppercase",
              }}>
                System components.<br />
                <span style={{ color: TA }}>Engineered for field reality.</span>
              </h2>
            </div>
            <div style={{ border: `1px solid ${B0}`, padding: "0.75rem 1.5rem" }}>
              <Mono color={T2} size="0.52rem" style={{ display: "block", marginBottom: 4 }}>DOCUMENT REF</Mono>
              <Mono color={T1} size="0.62rem">RGS-TECH-4100-REV-D</Mono>
            </div>
          </div>

          {/* Spec table */}
          <div className="rg-reveal rg-d1" style={{ border: `1px solid ${B0}`, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{
              display: "grid", gridTemplateColumns: "6rem 1fr 1fr 6rem",
              background: BG3,
              borderBottom: `1px solid ${B1}`,
              padding: "0.85rem 1.75rem",
            }}>
              {["REF", "COMPONENT", "SPECIFICATION", "STATUS"].map(h => (
                <Mono key={h} color={T2} size="0.56rem">{h}</Mono>
              ))}
            </div>
            {/* Rows */}
            {components.map((c, i) => (
              <div key={c.id} className={`rg-reveal rg-d${(i % 4) + 1}`} style={{
                display: "grid", gridTemplateColumns: "6rem 1fr 1fr 6rem",
                padding: "1.25rem 1.75rem",
                borderBottom: i < components.length - 1 ? `1px solid ${B0}` : "none",
                background: i % 2 === 0 ? BG2 : "transparent",
                alignItems: "center",
                transition: "background 0.2s",
                cursor: "default",
              }}
              onMouseEnter={e => e.currentTarget.style.background = BG3}
              onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? BG2 : "transparent"}>
                <Mono color={T2} size="0.58rem">{c.id}</Mono>
                <div style={{ fontFamily: SANS, fontSize: "0.85rem", fontWeight: 500, color: T0 }}>{c.name}</div>
                <div style={{ fontFamily: MONO, fontSize: "0.6rem", color: T1, letterSpacing: "0.08em" }}>{c.spec}</div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{
                    fontFamily: MONO, fontSize: "0.55rem", letterSpacing: "0.12em",
                    color: c.status === "TRL 9" || c.status === "TRL 8" ? TG : c.status === "TRL 7" ? TA : TY,
                    border: `1px solid currentColor`, padding: "0.2rem 0.4rem",
                    opacity: 0.9,
                  }}>
                    {c.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// PROGRAMS
// ═══════════════════════════════════════════════════════════════════
function Programs() {
  const programs = [
    {
      codename: "ROADGHOST ARCTIC",
      ref: "PGM-101",
      desc: "Cold-weather variant optimized for arctic and sub-arctic environments. Addresses spectral signature challenges unique to snow, ice, and low-sun-angle terrain.",
      phase: "Advanced Development",
      trl: 5,
      status: "active",
      class: "UNCLASSIFIED // FOUO",
    },
    {
      codename: "ROADGHOST MOBILE DECOY",
      ref: "PGM-102",
      desc: "Autonomous mobile decoy system generating credible fighter-aircraft signature across visual, thermal, and radar bands. Designed for pre-strike ISR saturation.",
      phase: "Concept Exploration",
      trl: 3,
      status: "concept",
      class: "UNCLASSIFIED // FOUO",
    },
    {
      codename: "GHOSTLANE",
      ref: "PGM-103",
      desc: "Highway airstrip survey, marking, and obstacle clearance system. Enables rapid identification and preparation of dispersed landing sites from organic ground assets.",
      phase: "Engineering & Manufacturing",
      trl: 7,
      status: "live",
      class: "UNCLASSIFIED",
    },
    {
      codename: "SPECTRAHIDE",
      ref: "PGM-104",
      desc: "Passive multi-spectral netting for vehicle and equipment concealment. Low-cost, high-quantity production variant for front-line logistics and staging area protection.",
      phase: "Production & Deployment",
      trl: 9,
      status: "live",
      class: "UNCLASSIFIED",
    },
    {
      codename: "PROJECT GREYLINE",
      ref: "PGM-105",
      desc: "Advanced program. Adaptive active-camouflage system integrating real-time environmental sampling, AI-driven pattern generation, and conformal surface actuation.",
      phase: "Technology Maturation",
      trl: 2,
      status: "classified",
      class: "SECRET // NOFORN",
    },
  ];

  return (
    <section id="programs" style={{ padding: "7rem 3rem", background: BG0, position: "relative", overflow: "hidden" }}>
      <div className="rg-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 5, maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{ paddingTop: "4rem" }}>
          <div className="rg-reveal" style={{ marginBottom: "4rem" }}>
            <SectionLabel>006 — Programs & Roadmap</SectionLabel>
            <h2 style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "2.2rem",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: T0, textTransform: "uppercase",
            }}>
              Current and future<br />
              <span style={{ color: TA }}>program portfolio.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gap: "1px", background: B0 }}>
            {programs.map((p, i) => (
              <div key={p.ref} className={`rg-reveal rg-d${i + 1} rg-card`} style={{
                background: BG1,
                border: `1px solid ${B0}`,
                padding: "2.25rem 2.5rem",
                display: "grid",
                gridTemplateColumns: "7rem 1fr 1fr auto",
                gap: "2rem",
                alignItems: "start",
                cursor: "default",
              }}>
                <div>
                  <Mono color={T2} size="0.52rem" style={{ display: "block", marginBottom: 6 }}>{p.ref}</Mono>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Dot status={p.status} />
                    <Mono color={p.status === "live" ? TG : p.status === "classified" ? "#8A3040" : TA} size="0.55rem">
                      {p.status.toUpperCase()}
                    </Mono>
                  </div>
                </div>

                <div>
                  <div style={{
                    fontFamily: MONO, fontSize: "0.72rem", fontWeight: 700,
                    letterSpacing: "0.12em", color: T0,
                    marginBottom: "0.6rem",
                  }}>
                    {p.codename}
                  </div>
                  <div style={{ fontFamily: SANS, fontSize: "0.82rem", lineHeight: 1.7, color: T1 }}>
                    {p.desc}
                  </div>
                </div>

                <div>
                  <Mono color={T2} size="0.52rem" style={{ display: "block", marginBottom: 6 }}>PHASE</Mono>
                  <div style={{ fontFamily: SANS, fontSize: "0.8rem", color: T0, marginBottom: "1rem" }}>{p.phase}</div>

                  {/* TRL bar */}
                  <div>
                    <Mono color={T2} size="0.52rem" style={{ display: "block", marginBottom: 6 }}>TRL {p.trl} / 9</Mono>
                    <div style={{ display: "flex", gap: 3 }}>
                      {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} style={{
                          flex: 1, height: 4,
                          background: j < p.trl ? TA : T2,
                          opacity: j < p.trl ? 1 : 0.3,
                        }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: MONO, fontSize: "0.5rem",
                    letterSpacing: "0.12em",
                    color: p.class.includes("SECRET") ? "#8A3040" : T2,
                    border: `1px solid ${p.class.includes("SECRET") ? "rgba(140,48,64,0.4)" : B0}`,
                    padding: "0.25rem 0.5rem",
                    whiteSpace: "nowrap",
                  }}>
                    {p.class}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// LEADERSHIP
// ═══════════════════════════════════════════════════════════════════
function Leadership() {
  const team = [
    {
      name: "Col. (Ret.) Marcus R. Holt",
      title: "Chief Executive Officer",
      clearance: "TS/SCI",
      bio: "28 years USAF, former AFSOC program lead. Commanded 2nd Special Operations Squadron. Led dispersed basing concept development for ACC. Founding executive, RoadGhost Systems.",
      prior: "USAF / AFSOC / ACC",
    },
    {
      name: "Dr. Ingrid K. Halvorsen",
      title: "Chief Technology Officer",
      clearance: "TS/SCI w/ SAP",
      bio: "PhD Materials Science, MIT. 14 years at Draper Laboratory on signature suppression programs. Principal investigator on three DARPA contracts in adaptive camouflage and spectral control.",
      prior: "Draper Lab / DARPA",
    },
    {
      name: "James T. Arriaga",
      title: "VP, Programs & Contracts",
      clearance: "TS/SCI",
      bio: "Former acquisition officer, AFLCMC. Led F-35 sustainment contracting for two cycles. Expert in DoDI 5000.02 acquisition strategy and LPTA/Best Value source selection.",
      prior: "AFLCMC / SAF/AQ",
    },
    {
      name: "Dr. Yoon-Suk Cha",
      title: "Director, Sensor Defeat",
      clearance: "TS/SCI",
      bio: "16 years NRL and Army RDECOM on EO/IR sensor exploitation and defeat. Expert in threat sensor characterization, spectral exploitation countermeasures, and MASINT analysis.",
      prior: "NRL / Army RDECOM",
    },
  ];

  return (
    <section style={{ padding: "7rem 3rem", background: BG1 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{ paddingTop: "4rem" }}>
          <div className="rg-reveal" style={{ marginBottom: "4rem" }}>
            <SectionLabel>007 — Leadership</SectionLabel>
            <h2 style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "2.2rem",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: T0, textTransform: "uppercase",
            }}>
              Operators. Scientists.<br />
              <span style={{ color: TA }}>Acquisition professionals.</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: B0 }} className="rg-col-2">
            {team.map((p, i) => (
              <div key={p.name} className={`rg-reveal rg-d${(i % 2) + 1} rg-bracket`} style={{
                background: BG2,
                border: `1px solid ${B0}`,
                padding: "2.5rem 2.25rem",
              }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{
                      fontFamily: SANS, fontSize: "1rem", fontWeight: 600,
                      color: T0, marginBottom: "0.25rem",
                    }}>
                      {p.name}
                    </div>
                    <div style={{ fontFamily: SANS, fontSize: "0.78rem", color: TA, letterSpacing: "0.04em" }}>
                      {p.title}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: MONO, fontSize: "0.5rem",
                    color: TG,
                    border: `1px solid rgba(60,136,88,0.4)`,
                    padding: "0.2rem 0.5rem",
                    letterSpacing: "0.1em",
                    flexShrink: 0,
                  }}>
                    {p.clearance}
                  </div>
                </div>

                <HR />

                <p style={{ fontFamily: SANS, fontSize: "0.82rem", lineHeight: 1.75, color: T1, margin: "1.25rem 0 1.25rem" }}>
                  {p.bio}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Mono color={T2} size="0.52rem">PRIOR AFFILIATION</Mono>
                  <div style={{ width: 1, height: 10, background: B0 }} />
                  <Mono color={T1} size="0.58rem">{p.prior}</Mono>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// CONTACT / FOOTER CTA
// ═══════════════════════════════════════════════════════════════════
function Contact() {
  return (
    <section id="contact" style={{
      padding: "7rem 3rem",
      background: BG0,
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="rg-grid" style={{ position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 5, maxWidth: 1200, margin: "0 auto" }}>
        <HR />
        <div style={{
          paddingTop: "4rem",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "center",
        }} className="rg-col-2">

          {/* Left */}
          <div className="rg-reveal">
            <SectionLabel>008 — Contact</SectionLabel>
            <h2 style={{
              fontFamily: SANS, fontWeight: 700, fontSize: "2.4rem",
              lineHeight: 1.1, letterSpacing: "-0.02em",
              color: T0, textTransform: "uppercase", marginBottom: "1.75rem",
            }}>
              Defense procurement<br />
              <span style={{ color: TA }}>and partnership.</span>
            </h2>
            <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: T1, marginBottom: "0.75rem" }}>
              RoadGhost Systems works directly with defense acquisition organizations,
              program offices, and allied partners. We support government-to-government
              arrangements, FMS, DCS, and OTA contracting mechanisms.
            </p>
            <p style={{ fontFamily: SANS, fontSize: "0.95rem", lineHeight: 1.8, color: T1, marginBottom: "2.5rem" }}>
              For capability briefs, facility tours, and program discussions, cleared
              requests should be submitted through official channels.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="mailto:programs@roadghostsystems.com" className="rg-btn-primary">
                Submit Inquiry
              </a>
              <a href="#roadghost" className="rg-btn-ghost">
                Capability Brief
              </a>
            </div>
          </div>

          {/* Right — contact info */}
          <div className="rg-reveal rg-d2">
            <div style={{ border: `1px solid ${B0}`, background: BG2 }}>
              {[
                ["General Inquiries", "info@roadghostsystems.com", false],
                ["Programs & Contracts", "programs@roadghostsystems.com", false],
                ["Security Office", "security@roadghostsystems.com", true],
                ["Media Relations", "press@roadghostsystems.com", false],
              ].map(([label, email, sensitive]) => (
                <div key={label} style={{
                  padding: "1.5rem 2rem",
                  borderBottom: `1px solid ${B0}`,
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", flexWrap: "wrap", gap: "0.75rem",
                }}>
                  <Mono color={T1} size="0.62rem">{label}</Mono>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {sensitive && <Mono color={TY} size="0.5rem">[CLEARED ONLY]</Mono>}
                    <Mono color={TA} size="0.62rem">{email}</Mono>
                  </div>
                </div>
              ))}
              <div style={{ padding: "1.5rem 2rem" }}>
                <Mono color={T2} size="0.56rem" style={{ display: "block", marginBottom: 8 }}>PRINCIPAL FACILITY</Mono>
                <Mono color={T1} size="0.62rem">
                  RoadGhost Systems LLC · 4280 Research Blvd, Suite 900 · Huntsville, AL 35806
                </Mono>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════════
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "#010508", borderTop: `1px solid ${B0}`, padding: "3rem", fontFamily: SANS }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "3rem", marginBottom: "3rem",
        }} className="rg-col-3">
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{
                width: 28, height: 28,
                border: `1px solid ${B1}`,
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "rgba(0, 170, 238, 0.07)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 10, height: 10, background: TA,
                  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                }} />
              </div>
              <Mono color={T0} size="0.7rem">ROADGHOST SYSTEMS</Mono>
            </div>
            <p style={{ fontSize: "0.78rem", lineHeight: 1.7, color: T2 }}>
              Advanced concealment and survivability engineering for contested operational environments.
            </p>
          </div>

          {/* Systems */}
          <div>
            <Mono color={T2} size="0.56rem" style={{ display: "block", marginBottom: 16 }}>SYSTEMS</Mono>
            {["ROADGHOST", "GHOSTLANE", "SPECTRAHIDE", "ROADGHOST ARCTIC"].map(s => (
              <div key={s} style={{ marginBottom: 10 }}>
                <Mono color={T1} size="0.6rem">{s}</Mono>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <Mono color={T2} size="0.56rem" style={{ display: "block", marginBottom: 16 }}>COMPANY</Mono>
            {["About", "Technology", "Programs", "Leadership", "Careers", "News"].map(s => (
              <div key={s} style={{ marginBottom: 10 }}>
                <a href="#" style={{ textDecoration: "none" }}>
                  <Mono color={T1} size="0.6rem" style={{ cursor: "pointer" }}>{s}</Mono>
                </a>
              </div>
            ))}
          </div>

          {/* Compliance */}
          <div>
            <Mono color={T2} size="0.56rem" style={{ display: "block", marginBottom: 16 }}>COMPLIANCE</Mono>
            {["CAGE: 8RG47", "DUNS: 07-842-9113", "NAICS: 336411, 541715", "ITAR Registered", "CMMC Level 2"].map(s => (
              <div key={s} style={{ marginBottom: 10 }}>
                <Mono color={T1} size="0.6rem">{s}</Mono>
              </div>
            ))}
          </div>
        </div>

        <HR />

        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "1rem",
          paddingTop: "1.75rem",
        }}>
          <Mono color={T2} size="0.56rem">
            © {year} ROADGHOST SYSTEMS LLC — ALL RIGHTS RESERVED
          </Mono>
          <Mono color={T2} size="0.56rem">
            UNCLASSIFIED // FOR DEMONSTRATION PURPOSES ONLY
          </Mono>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Mono color={T2} size="0.56rem">PRIVACY</Mono>
            <Mono color={T2} size="0.56rem">LEGAL</Mono>
            <Mono color={T2} size="0.56rem">ACCESSIBILITY</Mono>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROOT PAGE
// ═══════════════════════════════════════════════════════════════════
export default function RoadGhostPage() {
  useScrollReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Mission />
        <Flagship />
        <Capabilities />
        <Scenario />
        <TechArch />
        <Programs />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
