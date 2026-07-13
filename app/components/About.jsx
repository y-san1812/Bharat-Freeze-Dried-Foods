'use client';
import { useEffect, useRef, useState } from 'react';
import {
  Sprout, Snowflake, FlaskConical, Wind, Droplets,
  Package, CalendarCheck, Globe, ThermometerSnowflake,
  CheckCircle2, XCircle, Shield, Award, Zap, RefreshCw, BarChart2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    icon: Sprout,
    title: 'Premium Raw Materials',
    desc: 'Sourced from the fertile agricultural belts of Madhya Pradesh. We procure fresh onion, garlic, tomato, potato, fruits, and herbs directly from farm gates at peak harvest.',
    color: '#2D7A3A',
    bg: 'rgba(45,122,58,0.06)',
    tag: 'Sourcing Strength',
  },
  {
    icon: ThermometerSnowflake,
    title: 'Rapid Freezing at −50°C',
    desc: 'Flash-freezing locks the cell structure, preserving organic properties, colour, and taste without structural cell wall damage.',
    color: '#1565C0',
    bg: 'rgba(21,101,192,0.06)',
    tag: '−50°C Flash',
    highlight: true,
  },
  {
    icon: FlaskConical,
    title: 'Vacuum Lyophilization',
    desc: 'Frozen products enter the vacuum chamber. Low pressure allows water to sublimate directly from ice to vapour without a liquid phase.',
    color: '#6A1B9A',
    bg: 'rgba(106,27,154,0.06)',
    tag: 'Vacuum Sublimation',
  },
  {
    icon: Wind,
    title: 'Sublimation Extraction',
    desc: 'Gentle heat is applied under strict vacuum to remove moisture while maintaining structural integrity and shape.',
    color: '#00838F',
    bg: 'rgba(0,131,143,0.06)',
    tag: 'Core Phase',
    highlight: true,
  },
  {
    icon: Droplets,
    title: 'Moisture Control Check',
    desc: 'Moisture is reduced below the critical 4% threshold, ensuring complete microbiological stability and ambient storage suitability.',
    color: '#0277BD',
    bg: 'rgba(2,119,189,0.06)',
    tag: 'Moisture < 4%',
  },
  {
    icon: Package,
    title: 'De-oxygenated Packaging',
    desc: 'Hermetically sealed in multi-layer barrier foil with nitrogen flushing to guarantee isolation from moisture and oxygen.',
    color: '#4E342E',
    bg: 'rgba(78,52,46,0.06)',
    tag: 'Industrial Sealing',
  },
  {
    icon: CalendarCheck,
    title: '24-Month Ambient Shelf Life',
    desc: 'Achieves extended stability without chemical preservatives, cold chain infrastructure, or temperature-controlled warehousing.',
    color: '#E65100',
    bg: 'rgba(230,81,0,0.06)',
    tag: 'No Cold Chain',
    highlight: true,
  },
  {
    icon: Globe,
    title: 'Ready for Global Supply Chains',
    desc: 'Lightweight format drastically reduces freight costs. Fully compliant for international shipping and institutional integration.',
    color: '#2D7A3A',
    bg: 'rgba(45,122,58,0.06)',
    tag: 'Global Delivery',
  },
];

const compareLeft = [
  { text: 'Requires continuous cold chain logistics' },
  { text: 'High risk of temperature abuse and spoilage' },
  { text: 'Cellular damage and water leakage upon thawing' },
  { text: 'Shortened shelf life, typically 6-12 months max' },
  { text: 'High transport costs due to shipping raw water weight' },
  { text: 'Demands expensive cold-storage warehousing' },
];

const compareRight = [
  { text: 'Zero cold chain requirement at any point' },
  { text: 'Ambient stability removes storage spoilage risk' },
  { text: 'Retains original shape, colour, and 97% nutrition' },
  { text: 'Guaranteed 18-24 months ambient shelf life' },
  { text: 'Up to 90% lighter, reducing shipping emissions' },
  { text: 'Standard dry warehouse storage is sufficient' },
];

const techPillars = [
  { icon: Droplets, title: 'Low Moisture', desc: 'Moisture is reduced below 4% to stop microbiological activity while keeping cells intact.' },
  { icon: CalendarCheck, title: 'Long Shelf Life', desc: '18 to 24 months stability in standard conditions, protecting inventory from seasonal price spikes.' },
  { icon: BarChart2, title: 'Lightweight Payload', desc: 'Water weight is removed, lowering dry freight costs and improving logistics efficiency.' },
  { icon: RefreshCw, title: 'Quick Rehydration', desc: 'Reconstitutes to original state within minutes when exposed to warm water or cooking bases.' },
  { icon: Shield, title: 'Clean Label Purity', desc: 'Pure single-ingredient options with absolutely no added salt, chemical preservatives, or carriers.' },
  { icon: Snowflake, title: 'No Refrigeration', desc: 'Enables global shipping and ambient distribution without dependence on cold chain networks.' }
];

export default function About() {
  const timelineRef = useRef(null);
  const compareRef  = useRef(null);
  const techRef     = useRef(null);
  const sectionRef  = useRef(null);
  const canvasRef   = useRef(null);
  const storyRef    = useRef(null);

  const [visibleSteps, setVisibleSteps] = useState(new Set());
  const [compareVisible, setCompareVisible] = useState(false);
  const [techVisible,    setTechVisible]    = useState(false);

  // ─── Apple-style canvas image-sequence ───────────────────────────
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx2d = canvas.getContext('2d');
    const TOTAL_FRAMES = 144; // matches extracted frame count (frame_0001.jpg … frame_0144.jpg)
    const FRAME_PATH   = (n) => `/frames/freeze/frame_${String(n).padStart(4, '0')}.jpg`;

    let frames       = new Array(TOTAL_FRAMES).fill(null); // Image objects
    let loadedCount  = 0;
    let currentFrame = 0;
    let gsapCtx      = null;
    let resizeTimer  = null;

    // ── Resize canvas to fill section, respecting devicePixelRatio ──
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w   = section.offsetWidth;
      const h   = section.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width  = w + 'px';
      canvas.style.height = h + 'px';
      ctx2d.scale(dpr, dpr);
      // Redraw current frame after resize
      drawFrame(currentFrame);
    };

    // ── Draw a single frame with object-fit: cover math ─────────────
    const drawFrame = (index) => {
      const img = frames[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width  / (window.devicePixelRatio || 1);
      const ch = canvas.height / (window.devicePixelRatio || 1);
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover: scale the image so it fills the canvas, then center-crop
      const scale = Math.max(cw / iw, ch / ih);
      const sw    = iw * scale;
      const sh    = ih * scale;
      const sx    = (cw - sw) / 2;
      const sy    = (ch - sh) / 2;

      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(img, sx, sy, sw, sh);
    };

    // ── Set up GSAP ScrollTrigger once all frames are ready ──────────
    const initScrollTrigger = () => {
      gsapCtx = gsap.context(() => {
        // We tween a plain object's `frame` property
        const proxy = { frame: 0 };
        gsap.to(proxy, {
          frame: TOTAL_FRAMES - 1,
          snap:  'frame', // always land on a whole-number frame
          ease:  'none',
          scrollTrigger: {
            trigger: section,
            start:   'top bottom',   // section enters from below
            end:     'bottom top',   // section exits above
            scrub:   0.5,            // 0.5s smooth lag — cinematic feel
            invalidateOnRefresh: true,
          },
          onUpdate() {
            const idx = Math.round(proxy.frame);
            if (idx !== currentFrame) {
              currentFrame = idx;
              drawFrame(currentFrame);
            }
          },
        });
      });

      // Draw the very first frame immediately
      drawFrame(0);
    };

    // ── Preload all frames in parallel ───────────────────────────────
    const loadAll = () => {
      const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload  = () => { frames[i] = img; loadedCount++; resolve(); };
          img.onerror = () => { frames[i] = null;               resolve(); }; // silent fail
          img.src = FRAME_PATH(i + 1); // files are 1-indexed
        })
      );

      Promise.all(promises).then(() => {
        resizeCanvas();
        initScrollTrigger();
      });
    };

    // ── Handle window resize cleanly ─────────────────────────────────
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Reset scale by clearing transform state
        const dpr = window.devicePixelRatio || 1;
        const w   = section.offsetWidth;
        const h   = section.offsetHeight;
        canvas.width  = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width  = w + 'px';
        canvas.style.height = h + 'px';
        ctx2d.scale(dpr, dpr);
        drawFrame(currentFrame);
      }, 100);
    };

    window.addEventListener('resize', onResize, { passive: true });
    loadAll();

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (gsapCtx) gsapCtx.revert();
      // Release image memory
      frames = frames.map(() => null);
    };
  }, []);

  useEffect(() => {
    const stepEls = timelineRef.current?.querySelectorAll('[data-step]');
    if (!stepEls) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setVisibleSteps(prev => new Set([...prev, +e.target.dataset.step]));
          }
        });
      },
      { threshold: 0.15 }
    );
    stepEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // GSAP scroll reveals — story, tech pillars, comparison grid
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Story section
      if (storyRef.current) {
        gsap.fromTo(storyRef.current.children,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: storyRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Tech pillars cards
      if (techRef.current) {
        const cards = techRef.current.querySelectorAll('[data-tech-card]');
        if (cards.length) {
          gsap.fromTo(cards,
            { opacity: 0, y: 28 },
            {
              opacity: 1, y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: techRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }

      // Comparison grid
      if (compareRef.current) {
        const cols = compareRef.current.querySelectorAll('[data-compare-col]');
        if (cols.length) {
          gsap.fromTo(cols,
            { opacity: 0, y: 24 },
            {
              opacity: 1, y: 0,
              duration: 0.7,
              stagger: 0.10,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: compareRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── Story Section ───────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label" style={{ margin: '0 auto 16px' }}>Agri-Processing Platform</div>
            <h2 className="display-sm" style={{ color: 'var(--text-dark)' }}>
              Corporate Sourcing &amp;{' '}
              <span className="gradient-text-green">Processing Power.</span>
            </h2>
          </div>
          <div ref={storyRef} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'start',
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'var(--text-body)',
          }}>
            <div>
              <p style={{ marginBottom: '20px' }}>
                Bharat Freeze-Dried Foods is building a modern food-processing venture strategically located in Madhya Pradesh, India. This central hub places our facility close to the core agricultural belts of central India, ensuring quick transit from harvesting fields to freeze-drying chambers.
              </p>
              <p>
                Our location guarantees direct access to premium onion, garlic, potato, tomato, regional fruits, and herbs. Sourcing directly at harvest allows us to maintain strict raw material standards and deliver high-retention food technology for modern global supply chains.
              </p>
            </div>
            <div style={{
              background: 'var(--light-grey)',
              padding: '32px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)',
            }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--text-dark)', marginBottom: '16px' }}>
                Agri-Sourcing Highlights
              </h3>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><strong>Local Raw Material Sourcing:</strong> Direct links with grower networks across Malwa and central agri-zones.</li>
                <li><strong>Industrial Competence:</strong> Designed as a heavy commercial partner for global food brands, seasoning companies, and institutional buyers.</li>
                <li><strong>Location Advantage:</strong> Lower logistics transit time helps retain natural colour, aroma, and structural integrity.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        ref={sectionRef}
        className="section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--border-light)',
          background: '#060a0f',
        }}
      >
        {/* Canvas: Apple-style image sequence background */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(6,10,15,.48), rgba(6,10,15,.38), rgba(6,10,15,.52))',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div
              className="section-label"
              style={{
                color: 'var(--lime)',
                borderColor: 'rgba(139,195,74,0.3)',
                background: 'rgba(139,195,74,0.1)',
              }}
            >
              Our Process
            </div>
            <h2 className="display-md" style={{ color: 'var(--white)', marginBottom: '16px' }}>
              From Farm to{' '}
              <span className="gradient-text-green">Freeze.</span>
            </h2>
            <p className="body-lg" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto' }}>
              Eight precisely controlled steps that transform fresh produce into nature&apos;s most perfectly preserved food.
            </p>
          </div>

          <div ref={timelineRef} style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
            {/* Central spine */}
            <div style={{
              position: 'absolute',
              top: 0, bottom: 0,
              left: '36px',
              width: '2px',
              background: 'linear-gradient(to bottom, var(--green), var(--lime), rgba(139,195,74,0.1))',
              zIndex: 0,
            }} />

            {processSteps.map((step, i) => {
              const Icon = step.icon;
              const visible = visibleSteps.has(i);
              return (
                <div
                  key={i}
                  data-step={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '28px',
                    marginBottom: i < processSteps.length - 1 ? '48px' : '0',
                    position: 'relative',
                    zIndex: 1,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                    transition: `opacity 0.7s ease ${i * 0.05}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.05}s`,
                  }}
                >
                  {/* Icon node on spine */}
                  <div style={{
                    flexShrink: 0,
                    width: '72px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <div style={{
                      width: 52, height: 52,
                      borderRadius: '50%',
                      background: step.highlight
                        ? `linear-gradient(135deg, ${step.color}, ${step.color}cc)`
                        : 'white',
                      border: `2px solid ${step.color}40`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: step.highlight
                        ? `0 8px 24px ${step.color}40`
                        : '0 4px 16px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                    }}>
                      <Icon size={22} color={step.highlight ? 'white' : step.color} strokeWidth={2} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: '10px', color: 'var(--text-light)',
                      letterSpacing: '0.06em',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: 'white',
                    border: `1px solid ${step.color}18`,
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px 28px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                    marginBottom: '4px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.35s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 16px 40px ${step.color}18`;
                    e.currentTarget.style.borderColor = `${step.color}30`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                    e.currentTarget.style.borderColor = `${step.color}18`;
                  }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, bottom: 0,
                      width: '4px',
                      background: `linear-gradient(to bottom, ${step.color}, ${step.color}55)`,
                      borderRadius: '4px 0 0 4px',
                    }} />

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800,
                        fontSize: '17px', color: 'var(--text-dark)', lineHeight: 1.2,
                      }}>
                        {step.title}
                      </h3>
                      <span style={{
                        padding: '3px 10px',
                        background: `${step.color}12`,
                        border: `1px solid ${step.color}25`,
                        borderRadius: '9999px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700, fontSize: '10px',
                        color: step.color, letterSpacing: '0.06em',
                        whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px',
                      }}>
                        {step.tag}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '14px',
                      color: 'var(--text-body)', lineHeight: 1.72,
                    }}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Technology Page / Section ────────────────────────── */}
      <section ref={techRef} className="section" style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label">Technology &amp; Credibility</div>
            <h2 className="display-md" style={{ marginBottom: '16px' }}>
              Advanced Lyophilization{'  '}
              <span className="gradient-text-green">Capabilities.</span>
            </h2>
            <p className="body-lg" style={{ color: 'var(--text-body)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7 }}>
              Freeze-drying removes moisture under low temperature and vacuum. This process helps retain natural colour, flavour, aroma, nutrition, and cell structure far better than conventional thermal dehydration.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            {techPillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  data-tech-card
                  style={{
                    padding: '32px',
                    background: 'var(--light-grey)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-light)',
                    opacity: 0,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'var(--green-light)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: 'rgba(45,122,58,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '20px',
                  }}>
                    <Icon size={20} color="var(--green)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px', color: 'var(--text-dark)', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Freeze Dry vs Traditional ───────────────────────── */}
      <section ref={compareRef} className="section" style={{ background: 'var(--light-grey)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label">Science Meets Food</div>
            <h2 className="display-md" style={{ marginBottom: '16px' }}>
              Why Freeze Drying{' '}
              <span className="gradient-text-green">Wins.</span>
            </h2>
            <p className="body-md" style={{ color: 'var(--text-body)', maxWidth: '480px', margin: '0 auto' }}>
              Not all preservation is equal. Lyophilization is the gold standard — and here is why.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: '28px',
            alignItems: 'start',
            maxWidth: '920px',
            margin: '0 auto',
          }}>
            {/* Traditional */}
            <div data-compare-col style={{
              background: 'linear-gradient(135deg, #E3F2FD, #BBDEFB)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 36px',
              border: '1px solid rgba(21,101,192,0.15)',
              opacity: 0,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(21,101,192,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Snowflake size={24} color="#1565C0" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '20px', color: '#1565C0',
                }}>Traditional Frozen</h3>
              </div>
              {compareLeft.map((pt, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  marginBottom: '12px', padding: '12px 14px',
                  background: 'rgba(21,101,192,0.06)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(21,101,192,0.1)',
                }}>
                  <XCircle size={16} color="#EF5350" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1A237E', lineHeight: 1.5 }}>
                    {pt.text}
                  </span>
                </div>
              ))}
            </div>

            {/* VS badge */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '100px' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--green), var(--lime))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '13px', color: 'white',
                boxShadow: '0 8px 24px rgba(45,122,58,0.35)',
              }}>VS</div>
              <div style={{
                width: '2px', height: '60px', marginTop: '12px',
                background: 'linear-gradient(to bottom, var(--green), transparent)',
              }} />
            </div>

            {/* Freeze Dried */}
            <div data-compare-col style={{
              background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
              borderRadius: 'var(--radius-xl)',
              padding: '40px 36px',
              border: '2px solid rgba(45,122,58,0.25)',
              position: 'relative',
              opacity: 0,
              boxShadow: '0 20px 60px rgba(45,122,58,0.12)',
            }}>
              <div style={{
                position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, var(--green), var(--lime))',
                color: 'white', padding: '5px 18px', borderRadius: '9999px',
                fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                boxShadow: '0 4px 16px rgba(45,122,58,0.35)', whiteSpace: 'nowrap',
              }}>
                Superior Choice
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'rgba(45,122,58,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Sprout size={24} color="#2D7A3A" />
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 800,
                  fontSize: '20px', color: '#2D7A3A',
                }}>Freeze Dried — BFF</h3>
              </div>
              {compareRight.map((pt, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '10px',
                  marginBottom: '12px', padding: '12px 14px',
                  background: 'rgba(45,122,58,0.06)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(45,122,58,0.12)',
                }}>
                  <CheckCircle2 size={16} color="#2D7A3A" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: '#1B5E20', lineHeight: 1.5, fontWeight: 500,
                  }}>
                    {pt.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
