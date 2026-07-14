'use client';
import { useRef, useEffect, useState } from 'react';
import {
  Settings2, Package, Tag, Factory, Sprout, Globe, Lock,
  TrendingUp, CheckCircle2, Award, ShieldCheck, HelpCircle,
  MessageSquare, Layers, FileText, BadgeCheck, FileCheck, ArrowRight, ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: '01', title: 'Product Selection', desc: "Select from our catalog of freeze-dried fruits, vegetables, superfoods, spices, or submit your own custom formulation/recipe.", icon: Settings2, color: '#2D7A3A', tag: 'Catalog or Custom' },
  { step: '02', title: 'Recipe Calibration', desc: "Our food scientists adjust slicing sizes, texture targets, and moisture curves to match your brand's specific requirements.", icon: Layers, color: '#1565C0', tag: 'Food Science', highlight: true },
  { step: '03', title: 'Sourcing & Processing', desc: "We source peak-season fresh ingredients directly from our contracted farms and process them immediately under strict hygiene.", icon: Sprout, color: '#2D7A3A', tag: 'Farm Direct' },
  { step: '04', title: 'Lyophilization', desc: "Food is freeze-dried at -40 degrees C in our state-of-the-art chambers, extracting moisture while preserving 97% original nutrition and color.", icon: Factory, color: '#6A1B9A', tag: '-40C Chamber', highlight: true },
  { step: '05', title: 'Branding & Packing', desc: "Products are packed in our certified facility using your custom stand-up pouches, tins, or bulk packaging with branded labels.", icon: Package, color: '#E65100', tag: 'Your Brand' },
  { step: '06', title: 'Quality & Clearance', desc: "Every batch undergoes rigorous moisture analysis (below 2%), metal detection, and sorting before receiving export compliance papers.", icon: ShieldCheck, color: '#00838F', tag: 'Export Ready', highlight: true }
];

const categories = [
  { name: 'Freeze-Dried Fruits', desc: "Crispy slices or dices of strawberries, mangoes, bananas, apples, and blueberries. Zero moisture, intense sweet taste.", image: '/images/fruits_hero.png', accent: '#E65100' },
  { name: 'Freeze-Dried Vegetables', desc: "Sweet corn, peas, carrots, mushrooms, green chilis, and herb flakes. Rehydrates instantly to fresh color and crunch.", image: '/images/vegetables_hero.png', accent: '#2D7A3A' },
  { name: 'Wellness & Powders', desc: "Nutrient-rich, soluble superfood powders (Moringa, wheatgrass, beetroot, fruit powders) for wellness, supplement, or bakery brands.", image: '/images/superfoods_hero.png', accent: '#6A1B9A' },
  { name: 'Precooked Bases', desc: "Instant-prep dal bases, gravies, and meals that require only hot water to restore to authentic home-cooked flavor.", image: '/images/precooked_hero.png', accent: '#BF360C' }
];

const packages = [
  { type: 'Stand-Up Pouches', desc: "Premium Mylar or Kraft pouches with resealable zippers, hang holes, and custom matte/gloss prints. Perfect for retail snacks.", size: 'Retail-ready: 20g - 200g', icon: Package, gradient: 'linear-gradient(135deg, #E65100, #FF8A65)' },
  { type: 'Glass & Plastic Jars', desc: "Sturdy PET or glass jars with induction seal liners and custom labels. Ideal for wellness powders and premium spices.", size: 'Wellness packs: 100g - 500g', icon: Award, gradient: 'linear-gradient(135deg, #6A1B9A, #AB47BC)' },
  { type: 'Bulk Catering Bags', desc: "Heavy-duty multi-layer aluminum foil liners inside rigid master cartons. Best for food manufacturers and QSR chains.", size: 'Bulk inputs: 5kg - 25kg', icon: Factory, gradient: 'linear-gradient(135deg, #1565C0, #42A5F5)' }
];

const faqs = [
  { q: 'What is the Minimum Order Quantity (MOQ) for private label?', a: "Our starting MOQ for private label orders is 500 kg per product SKU. This allows us to calibrate our automated packing lines efficiently for your branded run." },
  { q: 'Can you develop a custom formulation or recipe under NDA?', a: "Absolutely. We regularly sign Non-Disclosure Agreements (NDAs) with brands to protect proprietary recipes. Our in-house R&D team can formulate and dry unique blends exclusively for you." },
  { q: 'Do you assist with packaging design and sourcing?', a: "Yes. We offer turnkey solutions where we help source high-barrier print films, design custom label layouts, and procure containers to ensure compliance with export standards." },
  { q: 'What certifications are included with private label products?', a: "All private label batches are processed in our FSSAI, ISO 22000, and HACCP certified facility. We also provide Phytosanitary Certificates and Lab Reports for export compliance." }
];

export default function PrivateLabel() {
  const [activeCat, setActiveCat] = useState(0);
  const [displayCat, setDisplayCat] = useState(0);
  const [animState, setAnimState] = useState('visible');
  const [activeFaq, setActiveFaq] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState(new Set());

  // Category switcher animation ref
  const transitionTimerRef = useRef(null);
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, []);

  const handleSelectCat = (idx) => {
    if (idx !== activeCat) {
      setActiveCat(idx);
      setAnimState('leaving');
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = setTimeout(() => {
        setDisplayCat(idx);
        setAnimState('entering');
      }, 150);
    }
  };

  useEffect(() => {
    if (animState === 'entering') {
      const timer2 = setTimeout(() => { setAnimState('visible'); }, 50);
      return () => clearTimeout(timer2);
    }
  }, [animState]);

  // Refs
  const ingredientsRef = useRef(null);
  const pkgGridRef = useRef(null);
  const galleryRef = useRef(null);
  const faqRef = useRef(null);
  const timelineSectionRef = useRef(null);
  const timelineListRef = useRef(null);
  const videoRef = useRef(null);

  // Timeline IntersectionObserver
  useEffect(() => {
    const stepEls = timelineListRef.current ? timelineListRef.current.querySelectorAll('[data-step]') : null;
    if (!stepEls || stepEls.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-step'));
            setVisibleSteps((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15 }
    );
    stepEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Video scroll scrub
  useEffect(() => {
    const video = videoRef.current;
    const section = timelineSectionRef.current;
    if (!video || !section) return;
    let scrubTrigger;
    let rafId;
    let targetTime = 0;
    let currentTime = 0;
    const setupScrub = () => {
      video.pause();
      scrubTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (video.duration) {
            targetTime = self.progress * video.duration;
          }
        },
      });
      const tick = () => {
        currentTime += (targetTime - currentTime) * 0.12;
        if (Math.abs(currentTime - video.currentTime) > 0.01) {
          video.currentTime = currentTime;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
    };
    if (video.readyState >= 1) {
      setupScrub();
    } else {
      video.addEventListener('loadedmetadata', setupScrub);
    }
    return () => {
      video.removeEventListener('loadedmetadata', setupScrub);
      if (scrubTrigger) scrubTrigger.kill();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // GSAP scroll reveals
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ingredients section
      if (ingredientsRef.current) {
        gsap.fromTo(ingredientsRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: { trigger: ingredientsRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      // Packaging grid
      if (pkgGridRef.current) {
        gsap.fromTo(pkgGridRef.current.children,
          { opacity: 0, y: 35, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: pkgGridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      // Gallery
      if (galleryRef.current) {
        gsap.fromTo(galleryRef.current.children,
          { opacity: 0, y: 30, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: galleryRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
      // FAQ
      if (faqRef.current) {
        gsap.fromTo(faqRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: faqRef.current, start: 'top 85%', toggleActions: 'play none none none' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  // Form
  const [brandName, setBrandName] = useState('');
  const [interest, setInterest] = useState('Fruits');
  const [whatsapp, setWhatsapp] = useState('');
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="journey" style={{ background: 'var(--white)', overflow: 'hidden' }}>
      <div style={{ height: '80px', background: 'var(--white)' }} />

      {/* ════════════════════════════════════════════════════════════
          SECTION 1: CHOOSE YOUR INGREDIENTS — Immersive card design
         ════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: '120px 0',
        background: 'linear-gradient(135deg, #0A1A0A 0%, #0D2314 50%, #081A0C 100%)',
        borderBottom: '1px solid rgba(139,195,74,0.15)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(139,195,74,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{
              margin: '0 auto 16px',
              color: 'var(--lime)',
              borderColor: 'rgba(139,195,74,0.3)',
              background: 'rgba(139,195,74,0.1)',
            }}>Catalog Options</div>
            <h2 className="display-sm" style={{ color: 'white' }}>
              Choose Your{' '}
              <span className="gradient-text-green">Ingredients.</span>
            </h2>
            <p className="body-md" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '480px', margin: '16px auto 0' }}>
              Pick your product category. We handle sourcing, processing, and branding.
            </p>
          </div>

          <div ref={ingredientsRef} style={{ display: 'flex', gap: '48px', alignItems: 'stretch', flexWrap: 'wrap' }}>
            {/* Tabs */}
            <div className="private-label-tabs" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categories.map((cat, idx) => {
                const active = activeCat === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectCat(idx)}
                    style={{
                      padding: '28px 24px',
                      textAlign: 'left',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: active ? cat.accent + '80' : 'rgba(255,255,255,0.08)',
                      background: active
                        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))'
                        : 'rgba(255,255,255,0.02)',
                      backdropFilter: 'blur(12px)',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                        e.currentTarget.style.transform = 'translateX(6px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!active) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    {/* Active glow bar */}
                    {active && (
                      <div style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
                        background: 'linear-gradient(to bottom, ' + cat.accent + ', ' + cat.accent + '55)',
                        borderRadius: '4px 0 0 4px',
                      }} />
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: 10, height: 10, borderRadius: '50%',
                        background: active ? cat.accent : 'rgba(255,255,255,0.2)',
                        boxShadow: active ? '0 0 12px ' + cat.accent + '60' : 'none',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      }} />
                      <h4 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '16px',
                        color: active ? 'white' : 'rgba(255,255,255,0.55)',
                        transition: 'color 0.3s ease',
                      }}>
                        {cat.name}
                      </h4>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '12.5px',
                      color: active ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)',
                      marginTop: '6px', lineHeight: 1.5, paddingLeft: '22px',
                      transition: 'color 0.3s ease',
                    }}>
                      {cat.desc.slice(0, 80)}...
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Preview card — glassmorphic */}
            <div className="private-label-preview" style={{
              flex: '1.2 1 420px',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              padding: '0',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
              overflow: 'hidden',
              opacity: animState === 'visible' ? 1 : 0,
              transform: animState === 'leaving' ? 'scale(0.97)' : animState === 'entering' ? 'scale(0.97)' : 'scale(1)',
              transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}>
              <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                <img
                  src={categories[displayCat].image}
                  alt={categories[displayCat].name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(10,26,10,0.95) 0%, rgba(10,26,10,0.2) 50%, transparent 100%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: '20px', left: '28px', right: '28px',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '24px',
                    color: 'white', marginBottom: '4px', textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                  }}>
                    {categories[displayCat].name}
                  </h3>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginBottom: '24px',
                }}>
                  {categories[displayCat].desc}
                </p>
                <a
                  href="#onboarding"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, var(--green), var(--lime))',
                    color: 'white', borderRadius: '9999px',
                    fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '13px',
                    textDecoration: 'none',
                    boxShadow: '0 8px 24px rgba(45,122,58,0.35)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(45,122,58,0.5)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(45,122,58,0.35)'; }}
                >
                  Inquire For This Category <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2: CHOOSE PACKAGING — Gradient icon cards
         ════════════════════════════════════════════════════════════ */}
      <div style={{ padding: '120px 0', borderBottom: '1px solid var(--border-light)', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div className="section-label" style={{ margin: '0 auto 16px' }}>Packaging Formats</div>
            <h2 className="display-sm" style={{ color: 'var(--text-dark)' }}>
              Select Packaging{' '}
              <span className="gradient-text-green">Systems.</span>
            </h2>
            <p className="body-md" style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '16px auto 0' }}>
              Every format engineered for maximum shelf life and retail impact.
            </p>
          </div>
          <div ref={pkgGridRef} className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {packages.map((pkg, idx) => {
              const PkgIcon = pkg.icon;
              return (
                <div
                  key={idx}
                  style={{
                    padding: '44px 36px',
                    background: 'var(--white)',
                    borderRadius: '20px',
                    border: '1px solid var(--border-light)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '360px',
                    opacity: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 24px 56px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = 'var(--green-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  {/* Decorative corner glow */}
                  <div style={{
                    position: 'absolute', top: '-40px', right: '-40px',
                    width: '120px', height: '120px',
                    background: pkg.gradient,
                    opacity: 0.06,
                    borderRadius: '50%',
                    filter: 'blur(30px)',
                    pointerEvents: 'none',
                  }} />
                  <div>
                    <div style={{
                      width: 56, height: 56, borderRadius: '16px',
                      background: pkg.gradient,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '24px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    }}>
                      <PkgIcon size={24} color="white" />
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '11px',
                      color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em',
                      marginBottom: '10px',
                    }}>
                      {pkg.size}
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px',
                      color: 'var(--text-dark)', marginBottom: '14px',
                    }}>
                      {pkg.type}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '14px',
                      color: 'var(--text-body)', lineHeight: 1.7,
                    }}>
                      {pkg.desc}
                    </p>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    borderTop: '1px solid var(--border-light)', paddingTop: '18px', marginTop: '24px',
                  }}>
                    <CheckCircle2 size={14} color="var(--green)" />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-muted)' }}>
                      High moisture barrier locks
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3: PACKAGING GALLERY — Cinematic cards with overlay
         ════════════════════════════════════════════════════════════ */}
      <div style={{
        padding: '120px 0',
        background: 'var(--light-grey)',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div className="section-label" style={{ margin: '0 auto 16px' }}>Branding Showcase</div>
            <h2 className="display-sm" style={{ color: 'var(--text-dark)' }}>
              Packaging{' '}
              <span className="gradient-text-green">Gallery.</span>
            </h2>
          </div>
          <div ref={galleryRef} className="packaging-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            {[
              { title: 'Crispy Strawberries', type: 'Stand-Up Pouch', image: '/images/private_label.png' },
              { title: 'Sweet Potato Bites', type: 'Kraft Zip Pouch', image: '/images/pet_treats.png' },
              { title: 'Exotic Salad Mix', type: 'Bulk Foil Bag', image: '/images/vegetables_hero.png' },
              { title: 'Gourmet Gravy Base', type: 'Canister Packing', image: '/images/gravies_sauces.png' },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: 'white',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
                  border: '1px solid var(--border-light)',
                  transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
                  opacity: 0,
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 24px 56px rgba(0,0,0,0.14)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                    pointerEvents: 'none',
                  }} />
                  <div style={{
                    position: 'absolute', bottom: '14px', left: '16px',
                  }}>
                    <span style={{
                      padding: '4px 12px',
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '10px',
                      color: 'white', letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>
                      {item.type}
                    </span>
                  </div>
                </div>
                <div style={{ padding: '18px 20px' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '15px', color: 'var(--text-dark)' }}>
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4: HOW PRIVATE LABEL WORKS — Video timeline
         ════════════════════════════════════════════════════════════ */}
      <div
        ref={timelineSectionRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 0',
          borderBottom: '1px solid var(--border-light)',
          background: '#060a0f',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', zIndex: 0, pointerEvents: 'none',
          }}
        >
          <source src="/videos/Vegetables_conveyor_smooth.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(6,10,15,.48), rgba(6,10,15,.38), rgba(6,10,15,.52))',
          zIndex: 1, pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '72px' }}>
            <div className="section-label" style={{
              margin: '0 auto 16px',
              color: 'var(--lime)',
              borderColor: 'rgba(139,195,74,0.3)',
              background: 'rgba(139,195,74,0.1)',
            }}>
              Manufacturing Journey
            </div>
            <h2 className="display-sm" style={{ color: 'var(--white)' }}>
              How Private Label{' '}
              <span className="gradient-text-green">Works.</span>
            </h2>
            <p className="body-md" style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '16px auto 0' }}>
              We manage the entire food-science loop from direct farm sourcing to vacuum packaging under your own logo.
            </p>
          </div>
          <div ref={timelineListRef} style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 0, bottom: 0, left: '36px', width: '2px',
              background: 'linear-gradient(to bottom, var(--green), var(--lime), rgba(139,195,74,0.1))',
              zIndex: 0,
            }} />
            {steps.map((st, idx) => {
              const StepIcon = st.icon;
              const visible = visibleSteps.has(idx);
              return (
                <div
                  key={idx}
                  data-step={idx}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '28px',
                    marginBottom: idx < steps.length - 1 ? '48px' : '0',
                    position: 'relative', zIndex: 1,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateX(0)' : 'translateX(-40px)',
                    transition: 'opacity 0.7s ease ' + (idx * 0.05) + 's, transform 0.7s cubic-bezier(0.16,1,0.3,1) ' + (idx * 0.05) + 's',
                  }}
                >
                  <div style={{ flexShrink: 0, width: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: st.highlight ? 'linear-gradient(135deg, ' + st.color + ', ' + st.color + 'cc)' : 'white',
                      border: '2px solid ' + st.color + '40',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: st.highlight ? '0 8px 24px ' + st.color + '40' : '0 4px 16px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                    }}>
                      <StepIcon size={22} color={st.highlight ? 'white' : st.color} strokeWidth={2} />
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: '10px', color: 'var(--text-light)', letterSpacing: '0.06em',
                    }}>
                      {st.step}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1, background: 'white',
                      border: '1px solid ' + st.color + '18',
                      borderRadius: 'var(--radius-lg)',
                      padding: '24px 28px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                      marginBottom: '4px',
                      position: 'relative', overflow: 'hidden',
                      transition: 'all 0.35s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 16px 40px ' + st.color + '18';
                      e.currentTarget.style.borderColor = st.color + '30';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = st.color + '18';
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 0, left: 0, bottom: 0, width: '4px',
                      background: 'linear-gradient(to bottom, ' + st.color + ', ' + st.color + '55)',
                      borderRadius: '4px 0 0 4px',
                    }} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)', fontWeight: 800,
                        fontSize: '17px', color: 'var(--text-dark)', lineHeight: 1.2,
                      }}>
                        {st.title}
                      </h3>
                      <span style={{
                        padding: '3px 10px',
                        background: st.color + '12',
                        border: '1px solid ' + st.color + '25',
                        borderRadius: '9999px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700, fontSize: '10px',
                        color: st.color, letterSpacing: '0.06em',
                        whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '12px',
                      }}>
                        {st.tag}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '14px',
                      color: 'var(--text-body)', lineHeight: 1.72,
                    }}>
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5: FAQ ACCORDION
         ════════════════════════════════════════════════════════════ */}
      <div ref={faqRef} style={{ padding: '120px 0', borderBottom: '1px solid var(--border-light)', opacity: 0 }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div className="section-label" style={{ margin: '0 auto 16px' }}>Common Questions</div>
            <h2 className="display-sm" style={{ color: 'var(--text-dark)', marginBottom: '12px' }}>
              Frequently Asked{' '}
              <span className="gradient-text-green">Questions.</span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: activeFaq === idx ? 'white' : 'var(--light-grey)',
                  borderRadius: '14px',
                  border: '1px solid ' + (activeFaq === idx ? 'var(--green-light)' : 'var(--border-light)'),
                  overflow: 'hidden',
                  boxShadow: activeFaq === idx ? '0 8px 32px rgba(45,122,58,0.08)' : 'none',
                  transition: 'all 0.35s ease',
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%', padding: '24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    textAlign: 'left', cursor: 'pointer',
                    background: 'none', border: 'none',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '14.5px', color: 'var(--text-dark)' }}>
                    {faq.q}
                  </span>
                  <ChevronDown size={18} style={{
                    color: 'var(--text-muted)', flexShrink: 0, marginLeft: '16px',
                    transform: activeFaq === idx ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s ease',
                  }} />
                </button>
                {activeFaq === idx && (
                  <div style={{
                    padding: '0 24px 24px',
                    fontFamily: 'var(--font-body)', fontSize: '14px',
                    color: 'var(--text-body)', lineHeight: 1.75,
                    borderTop: '1px solid rgba(0,0,0,0.04)',
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6: BULK INQUIRY FORM
         ════════════════════════════════════════════════════════════ */}
      <div id="onboarding" style={{ padding: '120px 0', background: 'var(--light-grey)' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <div style={{ background: 'white', padding: '48px 40px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-light)' }}>
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                  <div className="section-label" style={{ margin: '0 auto 12px' }}>Bulk Inquiry &amp; RFQ</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '22px', color: 'var(--text-dark)' }}>
                    Request a Custom Quote
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Please provide your product specifications below. Our export and supply team will get back to you within 24 hours.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="form-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Company Name
                      </label>
                      <input
                        type="text" required value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="e.g. Global Foods Trading"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Destination Country
                      </label>
                      <input
                        type="text" required placeholder="e.g. Germany"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Product Required
                      </label>
                      <input
                        type="text" required placeholder="e.g. Garlic Powder / Onion Flakes"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Product Form
                      </label>
                      <select
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', background: 'white', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      >
                        <option value="flakes">Flakes</option>
                        <option value="powder">Powder</option>
                        <option value="whole">Whole / Sliced</option>
                        <option value="dice">Diced</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Monthly Quantity Needed
                      </label>
                      <input
                        type="text" required placeholder="e.g. 500 kg / 2 Tons"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Target Price (USD/INR per kg)
                      </label>
                      <input
                        type="text" placeholder="Optional"
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Packaging Requirement
                      </label>
                      <select
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', background: 'white', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      >
                        <option value="bulk">Bulk Pack (10kg / 20kg drums)</option>
                        <option value="retail">Retail Ready Pack (pouches/jars)</option>
                        <option value="custom">Custom specifications</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Private Label Required?
                      </label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', background: 'white', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                        onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                        onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                      >
                        <option value="Yes">Yes, private label required</option>
                        <option value="No">No, bulk ingredient supply only</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '11px', color: 'var(--text-dark)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      WhatsApp / Email Contact
                    </label>
                    <input
                      type="text" required value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="e.g. +91 99999 99999 / buyer@globalfoods.com"
                      style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontFamily: 'var(--font-body)', fontSize: '13px', transition: 'border-color 0.3s, box-shadow 0.3s' }}
                      onFocus={(e) => { e.target.style.borderColor = 'var(--green)'; e.target.style.boxShadow = '0 0 0 3px rgba(45,122,58,0.1)'; }}
                      onBlur={(e) => { e.target.style.borderColor = 'var(--border-light)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      width: '100%', padding: '16px',
                      borderRadius: 'var(--radius-full)',
                      fontWeight: 700, fontSize: '14px',
                      marginTop: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                  >
                    Submit RFQ &amp; Request Samples
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(45,122,58,0.1)', display: 'flex', alignItems: 'center', margin: '0 auto 20px', justifyContent: 'center' }}>
                  <CheckCircle2 size={28} color="var(--green)" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '20px', color: 'var(--text-dark)', marginBottom: '12px' }}>
                  Bulk RFQ Submitted Successfully
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13.5px', color: 'var(--text-body)', lineHeight: 1.6, marginBottom: '24px' }}>
                  Thank you for submitting specifications for {brandName}. Our industrial ingredients desk is processing your request and will provide sample details.
                </p>
                <a
                  href={"https://wa.me/919023257295?text=Hi%20BFF%2C%20I%20just%20submitted%20a%20bulk%20inquiry%20RFQ%20for%20company%20" + encodeURIComponent(brandName)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13.5px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                  }}
                >
                  <MessageSquare size={14} />
                  Connect Instantly on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}