import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, ContactShadows, Sparkles } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Layers3, Cloud, Database, Code2,
  Cpu, Workflow, Mail, Phone, MapPin, Instagram, Linkedin, Facebook,
  Menu, X, Play, Sparkles as SparkleIcon, Eye, Target, HeartHandshake,
  ChevronDown, CheckCircle2
} from "lucide-react";
import * as THREE from "three";

const services = [
  { name: "Full-Stack Development", short: "Full-Stack", desc: "Scalable web platforms, thoughtful interfaces and reliable digital products.", icon: Layers3, tag: "01" },
  { name: "Machine Learning", short: "ML", desc: "Turn complex data into intelligent predictions and practical decisions.", icon: BrainCircuit, tag: "02", featured: true },
  { name: "Artificial Intelligence", short: "AI", desc: "Build useful AI experiences that make your business work smarter.", icon: Cpu, tag: "03" },
  { name: "Data Science", short: "Data Science", desc: "Find the signal in your data with clear insights and measurable outcomes.", icon: Database, tag: "04" },
  { name: "DevOps & IoT", short: "DevOps & IoT", desc: "Connect infrastructure, devices and teams with dependable systems.", icon: Workflow, tag: "05" },
  { name: "Custom Software", short: "Custom Software", desc: "Purpose-built software shaped around the way your business works.", icon: Code2, tag: "06" }
];

function OrbitalScene() {
  const group = useRef();
  const core = useRef();
  const ringA = useRef();
  const ringB = useRef();
  const ringC = useRef();
  useFrame((state, delta) => {
    if (!group.current) return;
    const { pointer } = state;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.16, 0.035);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.x * 0.13, 0.035);
    if (core.current) core.current.rotation.y += delta * 0.24;
    if (ringA.current) ringA.current.rotation.z += delta * 0.17;
    if (ringB.current) ringB.current.rotation.x -= delta * 0.13;
    if (ringC.current) ringC.current.rotation.y += delta * 0.11;
  });
  return <group ref={group}>
    <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.35}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 5]} />
        <MeshDistortMaterial color="#b88be8" roughness={0.12} metalness={0.3} distort={0.18} speed={1.6} clearcoat={1} clearcoatRoughness={0.08} />
      </mesh>
      <mesh ref={ringA} rotation={[0.8, 0.25, 0.35]}>
        <torusGeometry args={[1.18, 0.055, 20, 180]} />
        <meshPhysicalMaterial color="#d8c2f4" metalness={0.55} roughness={0.13} transmission={0.28} thickness={0.4} clearcoat={1} />
      </mesh>
      <mesh ref={ringB} rotation={[1.25, 0.5, -0.7]}>
        <torusGeometry args={[1.42, 0.035, 16, 180]} />
        <meshPhysicalMaterial color="#9670c7" metalness={0.72} roughness={0.16} transmission={0.22} thickness={0.3} />
      </mesh>
      <mesh ref={ringC} rotation={[0.2, 1.1, 0.7]}>
        <torusGeometry args={[1.62, 0.025, 16, 180]} />
        <meshPhysicalMaterial color="#eee4ff" metalness={0.6} roughness={0.1} transmission={0.4} thickness={0.5} />
      </mesh>
      {[[1.5,.3,.4],[-1.3,.7,.1],[.2,-1.6,.5],[.1,1.55,-.6]].map((p,i)=>
        <mesh key={i} position={p}>
          <sphereGeometry args={[i===0?.105:.075, 32, 32]} />
          <meshPhysicalMaterial color={i%2?"#9d68d4":"#f5edff"} metalness={0.4} roughness={0.08} clearcoat={1} />
        </mesh>
      )}
    </Float>
  </group>;
}

function HeroVisual() {
  return <div className="hero-visual">
    <div className="orb-glow" />
    <div className="orb-label label-one"><span /> Intelligence, in motion</div>
    <div className="orb-label label-two">Ideas → Impact</div>
    <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={[1, 1.7]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.3} />
      <directionalLight position={[4, 4, 5]} intensity={2.1} color="#fff8ff" />
      <pointLight position={[-3, -2, 2]} intensity={28} color="#a76be2" />
      <pointLight position={[3, 1, -2]} intensity={15} color="#d8c5ff" />
      <OrbitalScene />
      <Sparkles count={34} scale={4.2} size={2.1} speed={0.22} color="#b58be6" opacity={0.65} />
      <Environment preset="studio" />
      <ContactShadows position={[0, -1.7, 0]} opacity={0.24} scale={5} blur={2.5} far={4} />
    </Canvas>
    <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
  </div>;
}

const reveal = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [.22,.61,.36,1] } } };
function SectionIntro({ eyebrow, title, accent, copy, centered=false }) {
  return <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: .25 }} className={`section-intro ${centered?"centered":""}`}>
    <span className="eyebrow"><i /> {eyebrow}</span>
    <h2>{title} <em>{accent}</em></h2>
    {copy && <p>{copy}</p>}
  </motion.div>;
}

function App() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", service:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0,1], ["0%","100%"]);
  const navItems = ["Home","Services","About Us","Contact"];
  const goTo = (name) => {
    setActive(name); setMenuOpen(false);
    document.getElementById(name.toLowerCase().replace(" ","-"))?.scrollIntoView({ behavior:"smooth" });
  };
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };
  return <div className="site-shell">
    <motion.div className="scroll-progress" style={{ width: progress }} />
    <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="ambient ambient-three" />
    <header className="site-header">
      <a className="brand" href="#home" onClick={()=>setActive("Home")}>INVICTRA<span>®</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navItems.map(n=><button key={n} className={active===n?"nav-link active":"nav-link"} onClick={()=>goTo(n)}>{n}</button>)}
      </nav>
      <button className="nav-cta" onClick={()=>goTo("Contact")}>Let's Talk <ArrowUpRight size={15}/></button>
      <button className="mobile-toggle" aria-label="Toggle menu" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button>
    </header>
    {menuOpen && <motion.nav className="mobile-menu" initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}}>{navItems.map(n=><button key={n} onClick={()=>goTo(n)}>{n}<ArrowUpRight size={16}/></button>)}</motion.nav>}

    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-copy">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="hero-kicker"><SparkleIcon size={14}/> INNOVATION, ENGINEERED</motion.div>
          <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.08}}>Turning Ideas<br/>Into <span>Intelligence.</span></motion.h1>
          <motion.h3 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.3}}>ENGINEERING THE FUTURE</motion.h3>
          <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.35}}>We bring technology and modern intelligence together to create elegant digital solutions that move businesses forward.</motion.p>
          <motion.div className="hero-actions" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.45}}>
            <button className="button-primary" onClick={()=>goTo("Services")}>Explore Our Services <ArrowRight size={16}/></button>
            <button className="button-quiet" onClick={()=>document.getElementById("about-us")?.scrollIntoView({behavior:"smooth"})}><span className="play-icon"><Play size={11} fill="currentColor"/></span> Discover INVICTRA</button>
          </motion.div>
          <div className="hero-proof"><div className="proof-avatars"><b>I</b><b>N</b><b>V</b></div><span>Thoughtful engineering.<br/><strong>Meaningful outcomes.</strong></span></div>
        </div>
        <motion.div className="hero-art-wrap" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:1,delay:.2}}><HeroVisual /></motion.div>
        <div className="hero-bottom">
          <span className="strip-label">WHAT WE DO</span>
          <div className="tech-strip">
            <span><Layers3/> Full-Stack</span><i/><span><BrainCircuit/> Artificial Intelligence</span><i/><span><Database/> Data Science</span><i/><span><Cloud/> Cloud & DevOps</span>
          </div>
        </div>
      </section>

      <section id="about-us" className="about section-wrap section-space">
        <div className="about-left">
          <SectionIntro eyebrow="ABOUT INVICTRA" title="Building a smarter," accent="more innovative tomorrow." copy="We believe great technology should feel effortless. Our team blends engineering craft with forward-thinking ideas to build what comes next." />
          <div className="mission-grid">
            <motion.article className="glass-card mission-card" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}>
              <div className="icon-orb"><Target/></div><h3>Our Mission</h3><p>To engineer meaningful solutions for a smarter, more connected world.</p>
            </motion.article>
            <motion.article className="glass-card mission-card" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}} transition={{delay:.12}}>
              <div className="icon-orb"><Eye/></div><h3>Our Vision</h3><p>To lead innovation through technology that creates lasting value.</p>
            </motion.article>
            <motion.article className="glass-card mission-card mission-wide" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}>
              <div className="icon-orb"><HeartHandshake/></div><div><h3>Our Values</h3><p>Integrity, curiosity, collaboration and a commitment to doing excellent work.</p></div>
            </motion.article>
          </div>
        </div>
        <motion.div className="about-visual" initial={{opacity:0,x:25}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.8}}>
          <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85" alt="Contemporary glass office interior" />
          <div className="image-shine"/>
          <div className="image-caption"><span>OUR APPROACH</span><strong>Technology with purpose.</strong><ArrowUpRight/></div>
          <div className="floating-stat"><span className="stat-spark"><SparkleIcon/></span><strong>Ideas into impact</strong><small>Built around your ambition</small></div>
        </motion.div>
      </section>

      <section id="services" className="services section-wrap section-space">
        <div className="services-head">
          <SectionIntro eyebrow="WHAT WE DO" title="Engineering intelligent" accent="digital solutions." copy="From first idea to future-ready product, we bring the right people, tools and thinking together." />
          <div className="service-side-note"><span className="side-line"/><p>Thoughtfully built.<br/><strong>Ready for what's next.</strong></p></div>
        </div>
        <div className="services-layout">
          <div className="service-grid">
            {services.map((s,i)=>{const Icon=s.icon;return <motion.article key={s.tag} className={`service-card ${s.featured?"featured":""}`} initial={{opacity:0,y:22}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.55,delay:i*.07}} whileHover={{y:-8,rotateX:2,rotateY:-2,transition:{duration:.22}}}>
              <div className="service-top"><span className="service-number">{s.tag}</span><span className="service-arrow"><ArrowUpRight size={17}/></span></div>
              <div className="service-icon"><Icon size={27} strokeWidth={1.55}/></div>
              <h3>{s.name}</h3><p>{s.desc}</p>
              <div className="service-card-glow"/>
            </motion.article>})}
          </div>
          <div className="service-gallery">
            <div className="gallery-main"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85" alt="Bright modern workspace"/><div className="gallery-overlay"><span>01 / COLLABORATION</span><strong>Better ideas, built together.</strong></div></div>
            <div className="gallery-small"><img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=85" alt="Modern office meeting area"/><div className="gallery-mini-label">A space to create</div></div>
            <div className="gallery-orb"><div><SparkleIcon/><span>INNOVATE<br/>WITHOUT LIMITS</span></div></div>
          </div>
        </div>
      </section>

      <section className="statement section-wrap">
        <div className="statement-inner">
          <div className="statement-glow"/>
          <span className="eyebrow"><i/> THE INVICTRA DIFFERENCE</span>
          <h2>Make the complex<br/>feel <em>beautifully simple.</em></h2>
          <p>We pair deep technical thinking with a human approach, so the things we build make a real difference.</p>
          <button className="button-primary" onClick={()=>goTo("Contact")}>Start a conversation <ArrowRight size={16}/></button>
          <div className="statement-rings"><div/><div/><div/></div>
        </div>
      </section>

      <section id="contact" className="contact section-wrap section-space">
        <div className="contact-skyline"/>
        <div className="contact-info">
          <SectionIntro eyebrow="LET'S CONNECT" title="Let's build" accent="something together." copy="Have a challenge in mind or an idea worth exploring? We'd love to hear about it."/>
          <h3 className="contact-subtitle">Get in touch</h3>
          <a className="contact-row" href="mailto:email@invictra.com"><span><Mail/></span><div><small>EMAIL US</small><strong>email@invictra.com</strong></div><ArrowUpRight/></a>
          <a className="contact-row" href="tel:+91234559678"><span><Phone/></span><div><small>CALL US</small><strong>+9123 455 9678</strong></div><ArrowUpRight/></a>
          <div className="contact-row"><span><MapPin/></span><div><small>CONNECT</small><strong>invictra.mocakrom</strong></div></div>
          <div className="socials"><a href="#contact" aria-label="Instagram"><Instagram/></a><a href="#contact" aria-label="LinkedIn"><Linkedin/></a><a href="#contact" aria-label="Facebook"><Facebook/></a></div>
        </div>
        <motion.form className="contact-form glass-card" onSubmit={submit} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
          <div className="form-heading"><span>YOUR NEXT CHAPTER</span><h3>Tell us what you're imagining.</h3><p>We'll be in touch to explore what's possible.</p></div>
          {submitted ? <div className="success-state"><CheckCircle2 size={38}/><h3>Thanks for reaching out.</h3><p>Your message is ready. Connect this form to your email service to receive submissions.</p><button type="button" className="button-quiet" onClick={()=>{setSubmitted(false);setForm({name:"",email:"",service:"",message:""})}}>Send another message</button></div> : <>
            <label>Your name<input name="name" value={form.name} onChange={update} placeholder="How should we address you?" required /></label>
            <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required /></label>
            <label>What can we help with?<span className="select-wrap"><select name="service" value={form.service} onChange={update} required><option value="">Select a service</option>{services.map(s=><option key={s.tag}>{s.name}</option>)}</select><ChevronDown size={16}/></span></label>
            <label>Tell us a little more<textarea name="message" value={form.message} onChange={update} placeholder="A few details about your idea..." rows="3" required/></label>
            <button className="button-primary form-submit" type="submit">Send Message <ArrowRight size={16}/></button>
            <small className="form-note">By submitting, you agree to be contacted about your enquiry.</small>
          </>}
        </motion.form>
      </section>
    </main>

    <footer className="footer section-wrap">
      <a className="brand" href="#home">INVICTRA<span>®</span></a>
      <p>Engineering the future, one intelligent idea at a time.</p>
      <span>© {new Date().getFullYear()} INVICTRA. All rights reserved.</span>
    </footer>
  </div>;
}

export default App;