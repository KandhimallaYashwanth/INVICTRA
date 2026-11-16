import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
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
        <Link className="brand" to="/" onClick={() => setOpen(false)}>INVICTRA<span>®</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, to]) => <Link key={to} className={path === to ? "nav-link active" : "nav-link"} to={to}>{label}</Link>)}
        </nav>
        <Link className="nav-cta" to="/contact">Let's Talk <ArrowUpRight size={15} /></Link>
        <button className="mobile-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </header>
      <AnimatePresence>
        {open && <motion.nav className="mobile-menu" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} aria-label="Mobile navigation">
          {navItems.map(([label, to]) => <Link key={to} onClick={() => setOpen(false)} to={to}>{label}<ArrowUpRight size={16} /></Link>)}
        </motion.nav>}
      </AnimatePresence>
    </>
  );
}

function SectionIntro({ eyebrow, title, accent, copy, centered = false, level = "h2" }) {
  const Heading = level;
  return <motion.div className={`section-intro ${centered ? "centered" : ""}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}>
    <span className="eyebrow"><i /> {eyebrow}</span>
    <Heading>{title} <em>{accent}</em></Heading>
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
        <p>INVICTRA is a software development company in Hyderabad creating elegant digital solutions with engineering and modern intelligence.</p>
        <div className="hero-actions"><button className="button-primary" onClick={() => navigate("/services")}>Explore Our Services <ArrowRight size={16} /></button><button className="button-quiet" onClick={() => navigate("/about")}>Discover INVICTRA <ArrowUpRight size={15} /></button></div>
        <div className="hero-proof"><div className="proof-avatars"><b>I</b><b>N</b><b>V</b></div><span>Thoughtful engineering.<br /><strong>Meaningful outcomes.</strong></span></div>
      </div>
      <motion.div className="hero-art-wrap" initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8 }}><HeroVisual /></motion.div>
      <div className="hero-bottom"><span className="strip-label">WHAT WE DO</span><div className="tech-strip">{[["Full-Stack", Layers3], ["AI & ML", BrainCircuit], ["Data Science", Database], ["Cloud & DevOps", Cloud]].map(([label, Icon]) => <span key={label}><Icon /> {label}</span>)}</div></div>
    </section>
    <section className="section-wrap section-space home-intro"><SectionIntro eyebrow="WHO WE ARE" title="Technology That Turns" accent="Possibilities Into Progress." copy="INVICTRA combines software engineering, intelligent technologies and creative problem-solving to help businesses move from a promising idea to a dependable digital product." /><button className="button-primary" onClick={() => navigate("/about")}>Meet the team behind the work <ArrowRight size={16} /></button></section>
    <section className="section-wrap home-story">
      <div className="story-copy"><span className="eyebrow"><i /> BUILT FOR THE NEXT MOVE</span><h2>Clarity for complex <em>challenges.</em></h2><p>We work alongside ambitious teams to understand the problem beneath the brief, shape a practical direction and engineer solutions that remain useful as the business evolves.</p><p>From customer-facing platforms to intelligent operations, our work is grounded in clear thinking, careful delivery and a genuine respect for the people who use what we build.</p></div>
      <div className="story-points">{[["01", "Engineering depth", "Reliable foundations, thoughtful interfaces and systems that are ready for real-world use."], ["02", "Intelligent by design", "AI, data and automation applied where they create meaningful business value."], ["03", "A collaborative path", "Transparent communication from the first conversation through to the next iteration."]].map(([number, title, copy]) => <article className="glass-card story-point" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>
    <section className="section-wrap featured-services"><div className="section-heading-row"><SectionIntro eyebrow="A FEW WAYS WE HELP" title="Capabilities for" accent="what comes next." copy="Bring us a product challenge, a data question or a workflow ready for reinvention." /><button className="button-quiet" onClick={() => navigate("/services")}>View all services <ArrowRight size={15} /></button></div><div className="featured-service-grid">{serviceOptions.slice(0, 3).map(({ name, desc, icon: Icon }) => <article className="glass-card featured-service" key={name}><span className="icon-orb"><Icon size={18} /></span><h3>{name}</h3><p>{desc}</p><Link to="/services">Explore capability <ArrowUpRight size={14} /></Link></article>)}</div></section>
    <section className="section-wrap home-cta"><div><span className="eyebrow"><i /> READY WHEN YOU ARE</span><h2>Let’s turn the next idea into <em>something real.</em></h2><p>Tell us what you are working toward and we’ll start with a thoughtful conversation.</p></div><button className="button-primary" onClick={() => navigate("/contact")}>Start a conversation <ArrowRight size={16} /></button></section>
  </main>;
}

function AboutPage() {
  return <main><PageHero eyebrow="ABOUT INVICTRA" title="Building a Smarter," accent="More Innovative Tomorrow." copy="As a technology partner in Hyderabad, INVICTRA combines software engineering, AI, data and cloud expertise to solve meaningful problems." />
    <section className="section-wrap about-grid">
      <div className="about-visual"><img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80" alt="Contemporary glass office interior" /><div className="image-caption"><span>OUR APPROACH</span><strong>Technology with purpose.</strong></div></div>
      <div><SectionIntro eyebrow="WHO WE ARE" title="Curious minds," accent="meaningful work." copy="We are a technology and software engineering team that brings together product thinking, technical craft and a practical understanding of business priorities." /><div className="mission-grid">{[["Our Mission", Target, "To engineer intelligent, reliable and meaningful digital solutions that empower businesses."], ["Our Vision", Eye, "To become a trusted technology partner driving innovation through engineering and intelligence."], ["Our Core Values", HeartHandshake, "Innovation · Integrity · Excellence · Collaboration · Continuous Learning"]].map(([title, Icon, text]) => <article className="glass-card mission-card" key={title}><div className="icon-orb"><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div>
    </section>
    <section className="section-wrap about-details"><article className="glass-card detail-panel"><span className="eyebrow"><i /> OUR APPROACH</span><h2>Listen carefully. Build deliberately.</h2><p>Good engineering starts with the right questions. We make space to understand your users, constraints and goals before choosing the tools or shape of a solution.</p><p>That means focused discovery, useful prototypes, maintainable code and a delivery rhythm that keeps progress visible.</p></article><article className="glass-card detail-panel"><span className="eyebrow"><i /> WHY INVICTRA</span><h2>Technical confidence with a human pace.</h2><p>We keep communication clear, decisions grounded and the work connected to outcomes. Our goal is not to add complexity; it is to make the right complexity manageable.</p><p>We stay curious about emerging technology while remaining accountable to reliability, accessibility and long-term value.</p></article></section>
    <section className="section-wrap commitment-panel"><span className="eyebrow"><i /> OUR COMMITMENT TO INNOVATION</span><h2>Make progress feel <em>possible.</em></h2><p>Innovation is more than novelty. It is the discipline of finding a better path, testing it thoughtfully and turning the learning into something people can use.</p></section>
  </main>;
}

function ServiceVisual({ type }) {
  if (type === "stack") return <div className="service-visual stack-visual"><span className="browser-panel"><i className="window-dots" /><i className="url-bar" /><b className="sidebar" /><b className="hero-block" /><b className="grid-card card-a" /><b className="grid-card card-b" /><b className="grid-card card-c" /></span><span className="browser-layer layer-nav" /><span className="browser-layer layer-hero" /></div>;
  if (type === "neural") {
    const layers = [[32, 28], [32, 56], [32, 84], [120, 16], [120, 40], [120, 64], [120, 88], [208, 28], [208, 56], [208, 84]];
    const edges = [[0, 3], [0, 4], [0, 5], [0, 6], [1, 3], [1, 4], [1, 5], [1, 6], [2, 3], [2, 4], [2, 5], [2, 6], [3, 7], [3, 8], [3, 9], [4, 7], [4, 8], [4, 9], [5, 7], [5, 8], [5, 9], [6, 7], [6, 8], [6, 9]];
    return <svg className="service-visual service-svg neural-visual" viewBox="0 0 240 112" role="img" aria-label="Connected neural network illustration">
      {edges.map(([from, to], index) => <line className="neural-edge" style={{ animationDelay: `${index * .12}s` }} key={`${from}-${to}`} x1={layers[from][0]} y1={layers[from][1]} x2={layers[to][0]} y2={layers[to][1]} />)}
      {layers.map(([cx, cy], index) => <circle className="neural-node" style={{ animationDelay: `${index * .14}s` }} key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" />)}
    </svg>;
  }
  if (type === "analytics") return <svg className="service-visual service-svg analytics-visual" viewBox="0 0 240 112" role="img" aria-label="Data analytics bar chart illustration">
    <line className="chart-axis" x1="30" y1="94" x2="216" y2="94" /><rect className="chart-bar" x="48" y="58" width="22" height="36" /><rect className="chart-bar" x="91" y="40" width="22" height="54" style={{ animationDelay: ".2s" }} /><rect className="chart-bar" x="134" y="24" width="22" height="70" style={{ animationDelay: ".4s" }} /><rect className="chart-bar" x="177" y="50" width="22" height="44" style={{ animationDelay: ".6s" }} />
  </svg>;
  if (type === "cloud") return <svg className="service-visual service-svg cloud-visual" viewBox="0 0 240 112" role="img" aria-label="Glass cloud illustration">
    <ellipse className="cloud-glow" cx="120" cy="48" rx="74" ry="28" /><path className="cloud-shape" d="M56 64h126a20 20 0 0 0 0-40h-4a32 32 0 0 0-60-4 25 25 0 0 0-45 18h-17a13 13 0 0 0 0 26Z" />
  </svg>;
  if (type === "python") return <div className="service-visual code-visual python-visual"><span className="code-top" /><b>Py</b><i /><i /><i /></div>;
  if (type === "java") return <div className="service-visual code-visual java-visual"><span className="code-top" /><b>J</b><i /><i /><i /></div>;
  if (type === "modules") return <div className="service-visual modules-visual"><i /><i /><i /><i /><b /></div>;
  if (type === "medical") return <div className="service-visual medical-visual"><b className="medical-cross" /><span className="heartbeat" /></div>;
  return <svg className="service-visual service-svg iot-visual" viewBox="0 0 240 112" role="img" aria-label="Connected Internet of Things device network illustration">
    <line className="iot-line" x1="42" y1="28" x2="120" y2="56" /><line className="iot-line" x1="198" y1="28" x2="120" y2="56" /><line className="iot-line" x1="72" y1="84" x2="120" y2="56" /><line className="iot-line" x1="168" y1="84" x2="120" y2="56" /><circle className="iot-hub" cx="120" cy="56" r="14" /><circle className="iot-wave wave-one" cx="120" cy="56" r="21" /><circle className="iot-wave wave-two" cx="120" cy="56" r="29" /><rect className="iot-node" x="29" y="15" width="26" height="26" rx="6" /><rect className="iot-node" x="185" y="15" width="26" height="26" rx="6" /><rect className="iot-node" x="59" y="71" width="26" height="26" rx="6" /><rect className="iot-node" x="155" y="71" width="26" height="26" rx="6" />
  </svg>;
}

function InteractiveServiceCard({ service, index }) {
  const { name, icon: Icon, desc, visual } = service;
  const depthRef = useRef();
  const handleMove = (event) => {
    const element = depthRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    element.style.setProperty("--tilt-x", `${(0.5 - y) * 20}deg`);
    element.style.setProperty("--tilt-y", `${(x - 0.5) * 20}deg`);
    element.style.setProperty("--spot-x", `${x * 100}%`);
    element.style.setProperty("--spot-y", `${y * 100}%`);
  };
  const handleLeave = () => {
    const element = depthRef.current;
    if (!element) return;
    element.style.setProperty("--tilt-x", "0deg");
    element.style.setProperty("--tilt-y", "0deg");
    element.style.setProperty("--spot-x", "50%");
    element.style.setProperty("--spot-y", "50%");
  };
  return <motion.article className={`service-card service-card-large ${visual}-card`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .04 }} whileHover={{ y: -8 }}>
    <div className="service-card-depth" ref={depthRef} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="service-top"><span className="service-number">0{index + 1}</span><span className="service-icon"><Icon size={21} /></span></div>
      <ServiceVisual type={visual} />
      <h3>{name}</h3>
      <p>{desc}</p>
    </div>
  </motion.article>;
}

function ServicesPage() {
  return <main><PageHero eyebrow="WHAT WE DO" title="Engineering intelligent" accent="digital solutions." copy="Custom software development services spanning full-stack development, AI and Machine Learning, data science, Python, Java, cloud and IoT." />
    <section className="section-wrap services-page-grid">{serviceOptions.map((service, index) => <InteractiveServiceCard service={service} index={index} key={service.name} />)}</section>
    <section className="section-wrap services-cta"><div><span className="eyebrow"><i /> FROM QUESTION TO OUTCOME</span><h2>Have a challenge worth <em>solving?</em></h2><p>We can help you define the opportunity, choose a sensible path and build the capability your team needs.</p></div><Link className="button-primary" to="/contact">Talk to our team <ArrowRight size={16} /></Link></section>
  </main>;
}

function CustomSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(Math.max(0, options.indexOf(value)));
  const containerRef = useRef();
  useEffect(() => {
    const close = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  const choose = (option) => {
    onChange(option);
    setActiveIndex(options.indexOf(option));
    setOpen(false);
  };
  const onKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + (event.key === "ArrowDown" ? 1 : options.length - 1)) % options.length);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(options[activeIndex]);
      else setOpen(true);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };
  return <div className={`custom-select ${open ? "is-open" : ""}`} ref={containerRef}>
    <button type="button" className="custom-select-trigger" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={onKeyDown}>
      <span>{value || "Select a service"}</span><ChevronDown size={16} aria-hidden="true" />
    </button>
    <AnimatePresence>
      {open && <motion.ul className="custom-select-menu" role="listbox" initial={{ opacity: 0, y: -6, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: .98 }} transition={{ duration: .16 }}>
        {options.map((option, index) => <li key={option} role="option" aria-selected={value === option} className={value === option ? "selected" : ""}><button type="button" onMouseEnter={() => setActiveIndex(index)} onClick={() => choose(option)}>{option}{value === option && <CheckCircle2 size={14} />}</button></li>)}
      </motion.ul>}
    </AnimatePresence>
  </div>;
}

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [formError, setFormError] = useState("");
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const phoneLink = contactConfig.phone ? `tel:${contactConfig.phone}` : undefined;
  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.service || !form.message.trim()) {
      setFormError("Please complete your name, email, service and message.");
      return;
    }
    setFormError("");
    setSubmitted(true);
  };
  return <main><section className="contact-page section-wrap"><div className="contact-info"><SectionIntro eyebrow="LET'S CONNECT" title="Let's Build" accent="Something Together." copy="Start a software development enquiry or technology consultation with our Hyderabad team." level="h1" /><h3 className="contact-subtitle">Get in touch</h3>
    <a className="contact-row" href={`mailto:${contactConfig.email}`}><span><Mail /></span><div><small>EMAIL</small><strong>{contactConfig.email}</strong></div><ArrowUpRight /></a>
    {phoneLink ? <a className="contact-row" href={phoneLink}><span><Phone /></span><div><small>PHONE</small><strong>{contactConfig.phone}</strong></div><ArrowUpRight /></a> : <div className="contact-row muted-row"><span><Phone /></span><div><small>PHONE</small><strong>+91 (number coming soon)</strong></div></div>}
    <a className="contact-row" href={contactConfig.linkedin || "#contact"} onClick={(event) => !contactConfig.linkedin && event.preventDefault()}><span><Linkedin /></span><div><small>LINKEDIN</small><strong>{contactConfig.linkedin ? "Connect with us" : "Official profile coming soon"}</strong></div><ArrowUpRight /></a>
    <a className="contact-row" href="https://www.google.com/maps/search/?api=1&query=Hyderabad%2C%20Telangana%2C%20India"><span><MapPin /></span><div><small>LOCATION</small><strong>{contactConfig.location}</strong></div><ArrowUpRight /></a>
  </div><motion.form className="contact-form glass-card" onSubmit={submit} initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}>
    {submitted ? <div className="success-state"><CheckCircle2 size={40} /><h3>Thanks for reaching out.</h3><p>Your message has been captured. We will be in touch soon.</p><button type="button" className="button-quiet" onClick={() => setSubmitted(false)}>Send another message</button></div> : <><div className="form-heading"><span>YOUR NEXT CHAPTER</span><h3>Tell us what you're imagining.</h3><p>Share a few details and let’s explore what’s possible.</p></div>
      <label>Name<input name="name" value={form.name} onChange={update} placeholder="How should we address you?" required /></label>
      <label>Email<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required /></label>
      <label>Service<CustomSelect value={form.service} onChange={(service) => setForm({ ...form, service })} options={[...serviceOptions.map(({ name }) => name), "Other"]} /></label>
      <label>Message<textarea name="message" value={form.message} onChange={update} placeholder="A few details about your idea..." rows="3" required /></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button-primary form-submit" type="submit">Send Message <ArrowRight size={16} /></button></>}
  </motion.form></section><div className="skyline" aria-hidden="true" /></main>;
}

function CareersPage({ navigate }) {
  return <main><PageHero eyebrow="CAREERS AT INVICTRA" title="Build What's Next" accent="With INVICTRA." copy="We believe great ideas come from curious minds, creative thinkers and people who love solving meaningful problems." /><section className="section-wrap careers-grid"><div className="career-orb"><div className="career-orb-ring" /><BriefcaseBusiness size={54} /></div><div><SectionIntro eyebrow="A PLACE TO GROW" title="Bring your curiosity." accent="Make an impact." copy="We value talented people, continuous learning and collaboration over titles or rigid paths." /><div className="career-columns"><div><h3>Life at INVICTRA</h3><ul><li>Innovation-driven thinking.</li><li>Continuous learning.</li><li>Collaboration.</li><li>Engineering excellence.</li><li>Creative problem-solving.</li></ul></div><div><h3>Who We Appreciate</h3><ul><li>Software developers.</li><li>AI and ML enthusiasts.</li><li>Data professionals.</li><li>Cloud engineers.</li><li>Creative problem-solvers.</li></ul></div></div><button className="button-primary" onClick={() => window.location.href = `mailto:${contactConfig.email}`}>Connect With Us <ArrowRight size={16} /></button></div></section><section className="section-wrap career-details"><article className="glass-card detail-panel"><span className="eyebrow"><i /> LEARNING & DEVELOPMENT</span><h2>Keep growing through the work.</h2><p>We value people who ask good questions, share what they learn and stay open to better ways of working. Every project is an opportunity to deepen craft and broaden perspective.</p></article><article className="glass-card detail-panel"><span className="eyebrow"><i /> ENGINEERING CULTURE</span><h2>Thoughtful teams build better things.</h2><p>Our culture is built around respectful collaboration, clear ownership and space for ideas. We care about the quality of the result and the quality of the journey.</p></article><article className="glass-card career-invite"><span className="eyebrow"><i /> STAY CONNECTED</span><h2>Introduce yourself.</h2><p>We do not publish artificial vacancies. If you are excited by meaningful technology and see a potential fit, share your story, interests and work with us.</p><a className="button-primary" href={`mailto:${contactConfig.email}?subject=Introduction%20to%20INVICTRA`}>Email {contactConfig.email} <ArrowRight size={16} /></a></article></section></main>;
}

function Footer() {
  return <footer className="footer"><div className="footer-inner section-wrap"><div className="footer-brand"><Link className="brand" to="/">INVICTRA<span>®</span></Link><p>Engineering the Future.</p><span>We build intelligent digital solutions for teams ready to move forward.</span></div><nav className="footer-links" aria-label="Footer navigation"><h3>Explore</h3>{navItems.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}</nav><div className="footer-contact"><h3>Connect</h3><a className="footer-email" href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a><span className="footer-location">{contactConfig.location}</span><a className="footer-social" href={contactConfig.linkedin || "#contact"} onClick={(event) => !contactConfig.linkedin && event.preventDefault()}><Linkedin size={15} /> LinkedIn</a></div><div className="footer-cta"><h3>Have an idea in mind?</h3><p>Start with a thoughtful conversation about what you want to make possible.</p><Link className="button-quiet footer-cta-link" to="/contact">Let's talk <ArrowUpRight size={14} /></Link></div></div><div className="footer-bottom section-wrap"><span>© 2026 INVICTRA. All Rights Reserved.</span><span>Hyderabad · Telangana · India</span></div></footer>;
}

function NotFoundPage() {
  const navigate = useNavigate();
  return <main className="not-found section-wrap"><span className="eyebrow"><i /> PAGE NOT FOUND</span><h1>This page took a wrong turn.</h1><p>The page you requested does not exist, but there is plenty more to explore.</p><button className="button-primary" onClick={() => navigate("/")}>Back to Home <ArrowRight size={16} /></button></main>;
}

function SeoSchema({ path }) {
  const pageLabels = { "/about": "About Us", "/services": "Services", "/contact": "Contact", "/careers": "Careers" };
  const breadcrumbItems = [{ name: "Home", item: "https://invictra.in/" }];
  if (pageLabels[path]) breadcrumbItems.push({ name: pageLabels[path], item: `https://invictra.in${path}` });
  const organization = {
    "@type": "Organization",
    "@id": "https://invictra.in/#organization",
    name: "INVICTRA",
    url: "https://invictra.in/",
    logo: "https://invictra.in/invictra-favicon.png",
    email: contactConfig.email,
    address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressRegion: "Telangana", addressCountry: "IN" },
  };
  const schemas = [
    { "@context": "https://schema.org", ...organization },
    { "@context": "https://schema.org", "@type": "WebSite", "@id": "https://invictra.in/#website", name: "INVICTRA | Engineering the Future", url: "https://invictra.in/", publisher: { "@id": "https://invictra.in/#organization" } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.item })) },
  ];
  if (path === "/services") schemas.push({
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Software Development Services",
    serviceType: "Software development and technology solutions",
    provider: { "@id": "https://invictra.in/#organization" },
    areaServed: { "@type": "City", name: "Hyderabad" },
    hasOfferCatalog: { "@type": "OfferCatalog", name: "INVICTRA services", itemListElement: serviceOptions.map(({ name, desc }) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, description: desc } })) },
  });
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />;
}

function RoutedApp() {
  const { pathname: path } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const metadata = {
      "/": ["INVICTRA | Software Development Company in Hyderabad", "INVICTRA is a software development company in Hyderabad delivering custom technology solutions with AI, data and cloud expertise."],
      "/about": ["About Us | INVICTRA Technology Company", "Learn about INVICTRA, a Hyderabad technology company combining software engineering, AI, data science and cloud capabilities."],
      "/services": ["Software Development Services | INVICTRA", "Explore full-stack development, AI and Machine Learning, data science, Python, Java, Cloud and DevOps, IoT and custom software services."],
      "/contact": ["Contact INVICTRA | Hyderabad Software Development", "Contact INVICTRA for software development enquiries and technology consultation in Hyderabad, Telangana."],
      "/careers": ["Software Development Careers | INVICTRA", "Explore software development careers at INVICTRA and connect with a team focused on learning, engineering and meaningful work."],
    }[path] || ["INVICTRA | Engineering the Future", "Engineering intelligent digital solutions."];
    document.title = metadata[0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", metadata[1]);
    const keywords = {
      "/": "software development company in Hyderabad, technology solutions, custom software",
      "/about": "INVICTRA company profile, software engineering, AI, data science, cloud capabilities",
      "/services": "full-stack development company, AI and Machine Learning solutions, Python development services, Java development services, Cloud and DevOps solutions, data science and analytics services",
      "/contact": "software development enquiries Hyderabad, technology consultation, custom software development services",
      "/careers": "software development careers, technology jobs Hyderabad, engineering careers",
    }[path] || "INVICTRA software development company";
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", keywords);
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
  return <div className="site-shell"><SeoSchema path={path} /><div className="ambient ambient-one" /><div className="ambient ambient-two" /><Header path={path} navigate={navigate} /><AnimatePresence mode="wait"><motion.div key={path} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}><Routes><Route path="/" element={<HomePage navigate={navigate} />} /><Route path="/about" element={<AboutPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/careers" element={<CareersPage />} /><Route path="*" element={<NotFoundPage />} /></Routes></motion.div></AnimatePresence><Footer /></div>;
}

function App() {
  return <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><RoutedApp /></BrowserRouter>;
}

export default App;
