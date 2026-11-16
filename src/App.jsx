import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, BriefcaseBusiness, CheckCircle2,
  ChevronDown, Cloud, Code2, Cpu, Database, Eye, HeartHandshake, Layers3,
  Linkedin, Mail, MapPin, Menu, Phone, Target, Workflow, X
} from "lucide-react";
import * as THREE from "three";

export const contactConfig = {
  email: "contact@invictra.in",
  phone: "",
  linkedin: "",
  location: "Hyderabad, Telangana, India",
};

const serviceOptions = [
  { name: "Full-Stack Development", icon: Layers3, desc: "Scalable products with thoughtful interfaces, robust APIs and reliable architecture.", visual: "stack" },
  { name: "AI & Machine Learning", icon: BrainCircuit, desc: "Practical intelligence that turns complex data into better decisions.", visual: "neural" },
  { name: "Data Science & Analytics", icon: Database, desc: "Clear insights, predictive models and dashboards built around your business.", visual: "analytics" },
  { name: "Cloud & DevOps", icon: Cloud, desc: "Secure, observable infrastructure that helps teams ship with confidence.", visual: "cloud" },
  { name: "Python Development", icon: Code2, desc: "Elegant, maintainable Python applications built to grow with your team.", visual: "python" },
  { name: "Java Development", icon: Cpu, desc: "Reliable Java systems for complex workflows, platforms and enterprise scale.", visual: "java" },
  { name: "Custom Software Development", icon: Workflow, desc: "Purpose-built systems shaped around the way your business works.", visual: "modules" },
  { name: "Medical Software Development", icon: HeartHandshake, desc: "Trustworthy digital tools that make healthcare workflows clearer and safer.", visual: "medical" },
  { name: "Internet of Things (IoT)", icon: Target, desc: "Connected devices and dependable data flows for smarter operations.", visual: "iot" },
];

const navItems = [
  ["Home", "/"],
  ["About Us", "/about"],
  ["Services", "/services"],
  ["Contact", "/contact"],
  ["Careers", "/careers"],
];

function OrbitalObject() {
  const group = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.15, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.12, 0.04);
  });
  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.14} floatIntensity={0.35}>
        <mesh>
          <icosahedronGeometry args={[0.72, 4]} />
          <meshPhysicalMaterial color="#a66bd0" roughness={0.16} metalness={0.32} clearcoat={1} transmission={0.12} />
        </mesh>
        {[1.18, 1.48, 1.75].map((radius, index) => (
          <mesh key={radius} rotation={[0.7 + index * 0.5, 0.3, index * 0.8]}>
            <torusGeometry args={[radius, index === 0 ? 0.055 : 0.028, 16, 120]} />
            <meshPhysicalMaterial color={index === 1 ? "#8f5cbb" : "#eadcff"} metalness={0.6} roughness={0.14} transmission={0.25} />
          </mesh>
        ))}
        {[[1.5, .3, .4], [-1.3, .7, .1], [.2, -1.6, .5], [.1, 1.55, -.6]].map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[index === 0 ? .11 : .075, 20, 20]} />
            <meshPhysicalMaterial color={index % 2 ? "#9d68d4" : "#f5edff"} metalness={0.4} roughness={0.08} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="orb-glow" />
      <div className="orb-label label-one"><span /> Intelligence, in motion</div>
      <div className="orb-label label-two">Ideas → Impact</div>
      <Suspense fallback={<div className="scene-loading">Loading visual…</div>}>
        <Canvas camera={{ position: [0, 0, 5.3], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
          <ambientLight intensity={1.25} />
          <directionalLight position={[4, 4, 5]} intensity={2} color="#fff8ff" />
          <pointLight position={[-3, -2, 2]} intensity={20} color="#a76be2" />
          <OrbitalObject />
          <Sparkles count={28} scale={4} size={2} speed={0.2} color="#b58be6" opacity={0.65} />
          <Environment preset="studio" />
        </Canvas>
      </Suspense>
      <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
    </div>
  );
}

function Header({ path, navigate }) {
  const [open, setOpen] = useState(false);
  const go = (to) => { setOpen(false); navigate(to); };
  return (
    <>
      <header className="site-header">
        <button className="brand" onClick={() => go("/")}>INVICTRA<span>®</span></button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, to]) => <button key={to} className={path === to ? "nav-link active" : "nav-link"} onClick={() => go(to)}>{label}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => go("/contact")}>Let's Talk <ArrowUpRight size={15} /></button>
        <button className="mobile-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </header>
      <AnimatePresence>
        {open && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} aria-label="Mobile navigation">
          {navItems.map(([label, to]) => <button key={to} onClick={() => go(to)}>{label}<ArrowUpRight size={16} /></button>)}
        </motion.nav>}
      </AnimatePresence>
    </>
  );
}

function SectionIntro({ eyebrow, title, accent, copy, centered = false }) {
  return <motion.div className={`section-intro ${centered ? "centered" : ""}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}>
    <span className="eyebrow"><i /> {eyebrow}</span>
    <h2>{title} <em>{accent}</em></h2>
    {copy && <p>{copy}</p>}
  </motion.div>;
}

function PageHero({ eyebrow, title, accent, copy }) {
  return <section className="page-hero section-wrap"><span className="eyebrow"><i /> {eyebrow}</span><h1>{title} <em>{accent}</em></h1><p>{copy}</p></section>;
}

function HomePage({ navigate }) {
  return <main>
    <section className="hero section-wrap">
      <div className="hero-copy">
        <span className="hero-kicker">✦ INNOVATION, ENGINEERED</span>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Turning Ideas<br />Into <span>Intelligence.</span></motion.h1>
        <h3>ENGINEERING THE FUTURE</h3>
        <p>We bring technology and modern intelligence together to create elegant digital solutions that move businesses forward.</p>
        <div className="hero-actions"><button className="button-primary" onClick={() => navigate("/services")}>Explore Our Services <ArrowRight size={16} /></button><button className="button-quiet" onClick={() => navigate("/about")}>Discover INVICTRA <ArrowUpRight size={15} /></button></div>
        <div className="hero-proof"><div className="proof-avatars"><b>I</b><b>N</b><b>V</b></div><span>Thoughtful engineering.<br /><strong>Meaningful outcomes.</strong></span></div>
      </div>
      <motion.div className="hero-art-wrap" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}><HeroVisual /></motion.div>
      <div className="hero-bottom"><span className="strip-label">WHAT WE DO</span><div className="tech-strip">{[["Full-Stack", Layers3], ["AI & ML", BrainCircuit], ["Data Science", Database], ["Cloud & DevOps", Cloud]].map(([label, Icon]) => <span key={label}><Icon /> {label}</span>)}</div></div>
    </section>
    <section className="section-wrap section-space home-intro"><SectionIntro eyebrow="THE INVICTRA DIFFERENCE" title="Technology with" accent="purpose." copy="We pair deep technical thinking with a human approach, so the things we build make a real difference." /><button className="button-primary" onClick={() => navigate("/about")}>Meet the team behind the work <ArrowRight size={16} /></button></section>
  </main>;
}

function AboutPage() {
  return <main><PageHero eyebrow="ABOUT INVICTRA" title="Building a Smarter," accent="More Innovative Tomorrow." copy="At INVICTRA, we believe technology should solve meaningful problems and create opportunities for the future." />
    <section className="section-wrap about-grid">
      <div className="about-visual"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Contemporary glass office interior" /><div className="image-caption"><span>OUR APPROACH</span><strong>Technology with purpose.</strong></div></div>
      <div><SectionIntro eyebrow="WHAT GUIDES US" title="Curious minds," accent="meaningful work." copy="Our multidisciplinary team combines engineering craft, curiosity and care to help ambitious businesses move forward." /><div className="mission-grid">{[["Our Mission", Target, "To engineer intelligent, reliable and meaningful digital solutions that empower businesses."], ["Our Vision", Eye, "To become a trusted technology partner driving innovation through engineering and intelligence."], ["Our Values", HeartHandshake, "Innovation · Integrity · Excellence · Collaboration · Continuous Learning"]].map(([title, Icon, text]) => <article className="glass-card mission-card" key={title}><div className="icon-orb"><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div>
    </section>
  </main>;
}

function ServiceVisual({ type }) {
  if (type === "stack") return <div className="service-visual stack-visual"><span className="browser-bar" /><span className="browser-panel" /><span className="browser-panel panel-two" /><i className="data-node" /><i className="data-node node-two" /><b className="data-link" /></div>;
  if (type === "neural") return <div className="service-visual neural-visual">{[["n1", "n5"], ["n2", "n6"], ["n3", "n7"], ["n4", "n8"], ["n5", "n9"], ["n6", "n10"], ["n7", "n11"], ["n8", "n12"]].map(([from, to]) => <i className={`neural-line ${from}-${to}`} key={`${from}-${to}`} />)}{Array.from({ length: 12 }, (_, index) => <b className={`neural-node n${index + 1}`} key={index} />)}</div>;
  if (type === "analytics") return <div className="service-visual analytics-visual"><span className="chart-axis" /><i style={{ height: "36%" }} /><i style={{ height: "58%" }} /><i style={{ height: "78%" }} /><i style={{ height: "48%" }} /><b className="chart-line" /></div>;
  if (type === "cloud") return <div className="service-visual cloud-visual"><span className="cloud-shape" /><i /><i /><i /><b className="pipeline-line" /></div>;
  if (type === "python") return <div className="service-visual code-visual python-visual"><span className="code-top" /><b>Py</b><i /><i /><i /></div>;
  if (type === "java") return <div className="service-visual code-visual java-visual"><span className="code-top" /><b>J</b><i /><i /><i /></div>;
  if (type === "modules") return <div className="service-visual modules-visual"><i /><i /><i /><i /><b /></div>;
  if (type === "medical") return <div className="service-visual medical-visual"><b className="medical-cross" /><span className="heartbeat" /></div>;
  return <div className="service-visual iot-visual"><i /><i /><i /><i /><b /><span /><span /><span /></div>;
}

function ServicesPage() {
  return <main><PageHero eyebrow="WHAT WE DO" title="Engineering intelligent" accent="digital solutions." copy="Nine focused capabilities, one thoughtful approach to building what comes next." />
    <section className="section-wrap services-page-grid">{serviceOptions.map(({ name, icon: Icon, desc, visual }, index) => <motion.article className={`service-card service-card-large ${visual}-card`} key={name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}><div className="service-top"><span className="service-number">0{index + 1}</span><span className="service-icon"><Icon size={21} /></span></div><ServiceVisual type={visual} /><h3>{name}</h3><p>{desc}</p></motion.article>)}</section>
  </main>;
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const phoneLink = contactConfig.phone ? `tel:${contactConfig.phone}` : undefined;
  return <main><section className="contact-page section-wrap"><div className="contact-info"><SectionIntro eyebrow="LET'S CONNECT" title="Let's Build" accent="Something Together." copy="Have a challenge in mind or an idea worth exploring? Get in touch." /><h3 className="contact-subtitle">Get in touch</h3>
    <a className="contact-row" href={`mailto:${contactConfig.email}`}><span><Mail /></span><div><small>EMAIL</small><strong>{contactConfig.email}</strong></div><ArrowUpRight /></a>
    {phoneLink ? <a className="contact-row" href={phoneLink}><span><Phone /></span><div><small>PHONE</small><strong>{contactConfig.phone}</strong></div><ArrowUpRight /></a> : <div className="contact-row muted-row"><span><Phone /></span><div><small>PHONE</small><strong>+91 (number coming soon)</strong></div></div>}
    <a className="contact-row" href={contactConfig.linkedin || "#contact"} onClick={(event) => !contactConfig.linkedin && event.preventDefault()}><span><Linkedin /></span><div><small>LINKEDIN</small><strong>{contactConfig.linkedin ? "Connect with us" : "Official profile coming soon"}</strong></div><ArrowUpRight /></a>
    <a className="contact-row" href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India"><span><MapPin /></span><div><small>LOCATION</small><strong>{contactConfig.location}</strong></div><ArrowUpRight /></a>
  </div><motion.form className="contact-form glass-card" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
    {submitted ? <div className="success-state"><CheckCircle2 size={40} /><h3>Thanks for reaching out.</h3><p>Your message has been captured. We will be in touch soon.</p><button type="button" className="button-quiet" onClick={() => setSubmitted(false)}>Send another message</button></div> : <><div className="form-heading"><span>YOUR NEXT CHAPTER</span><h3>Tell us what you're imagining.</h3><p>Share a few details and let’s explore what’s possible.</p></div>
      <label>Name<input name="name" value={form.name} onChange={update} placeholder="How should we address you?" required /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required /></label>
      <label>Service<span className="select-wrap"><select name="service" value={form.service} onChange={update} required><option value="">Select a service</option>{serviceOptions.map(({ name }) => <option key={name}>{name}</option>)}<option>Other</option></select><ChevronDown size={16} /></span></label>
      <label>Message<textarea name="message" value={form.message} onChange={update} placeholder="A few details about your idea..." rows="3" required /></label><button className="button-primary form-submit" type="submit">Send Message <ArrowRight size={16} /></button></>}
  </motion.form></section><div className="skyline" aria-hidden="true" /></main>;
}

function CareersPage({ navigate }) {
  return <main><PageHero eyebrow="CAREERS AT INVICTRA" title="Build What's Next" accent="With INVICTRA." copy="We believe great ideas come from curious minds, creative thinkers and people who love solving meaningful problems." /><section className="section-wrap careers-grid"><div className="career-orb"><div className="career-orb-ring" /><BriefcaseBusiness size={54} /></div><div><SectionIntro eyebrow="A PLACE TO GROW" title="Bring your curiosity." accent="Make an impact." copy="We value talented people, continuous learning and collaboration over titles or rigid paths." /><div className="career-columns"><div><h3>Life at INVICTRA</h3><ul><li>Innovation-driven thinking.</li><li>Continuous learning.</li><li>Collaboration.</li><li>Engineering excellence.</li><li>Creative problem-solving.</li></ul></div><div><h3>Who We Appreciate</h3><ul><li>Software developers.</li><li>AI and ML enthusiasts.</li><li>Data professionals.</li><li>Cloud engineers.</li><li>Creative problem-solvers.</li></ul></div></div><button className="button-primary" onClick={() => window.location.href = `mailto:${contactConfig.email}`}>Connect With Us <ArrowRight size={16} /></button></div></section></main>;
}

function Footer({ navigate }) {
  return <footer className="footer section-wrap"><div><button className="brand" onClick={() => navigate("/")}>INVICTRA<span>®</span></button><p>Engineering the Future.</p></div><div className="footer-links">{navItems.map(([label, to]) => <button key={to} onClick={() => navigate(to)}>{label}</button>)}</div><div className="footer-contact"><a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a><span>{contactConfig.location}</span><small>© 2026 INVICTRA. All Rights Reserved.</small></div></footer>;
}

function NotFoundPage() {
  const navigate = useNavigate();
  return <main className="not-found section-wrap"><span className="eyebrow"><i /> PAGE NOT FOUND</span><h1>This page took a wrong turn.</h1><p>The page you requested does not exist, but there is plenty more to explore.</p><button className="button-primary" onClick={() => navigate("/")}>Back to Home <ArrowRight size={16} /></button></main>;
}

function RoutedApp() {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const metadata = {
      "/": ["INVICTRA | Engineering the Future", "INVICTRA creates elegant digital solutions powered by engineering and intelligence."],
      "/about": ["About INVICTRA | Engineering the Future", "Discover the mission, vision and values behind INVICTRA."],
      "/services": ["Services | INVICTRA", "Explore INVICTRA's full-stack, AI, data, cloud and custom software capabilities."],
      "/contact": ["Contact | INVICTRA", "Start a conversation with INVICTRA in Hyderabad, Telangana, India."],
      "/careers": ["Careers | INVICTRA", "Connect with INVICTRA and help build what comes next."],
    }[path] || ["INVICTRA | Engineering the Future", "Engineering intelligent digital solutions."];
    document.title = metadata[0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata[1]);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", metadata[0]);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", metadata[1]);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://invictra.in${path === "/" ? "/" : path}`;
  }, [path]);
  return <div className="site-shell"><div className="ambient ambient-one" /><div className="ambient ambient-two" /><Header path={path} navigate={navigate} /><AnimatePresence mode="wait"><motion.div key={path} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}><Routes><Route path="/" element={<HomePage navigate={navigate} />} /><Route path="/about" element={<AboutPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/careers" element={<CareersPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></motion.div></AnimatePresence><Footer navigate={navigate} /></div>;
}

function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><RoutedApp /></BrowserRouter>;
}

export default App;
