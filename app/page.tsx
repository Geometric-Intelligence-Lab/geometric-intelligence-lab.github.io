"use client";

import { useEffect, useState } from "react";
import { Box, ScanEye, Network, Orbit, Shapes, ArrowUpRight, GraduationCap, MapPin, Globe2, SquareUserRound, BookOpen, Mail } from "lucide-react";
import GeometryPlayground from "./GeometryPlayground";

const topics = [
  ["3D Generative AI", Box, "Models that create 3D assets from images, text, and sparse observations."],
  ["Geometry Processing", Shapes, "Learning to represent, analyze, and transform complex geometric structures."],
  ["Computer Vision", ScanEye, "Recovering shape, pose, and scene structure from visual information."],
  ["Geometric Learning", Network, "Neural methods for meshes, point clouds, graphs, and neural fields."],
  ["Spatial Reasoning", Orbit, "AI systems that reason about shape, space, structure, and perception."],
];
const papers = [
  ["2026", "Best Segmentation Buddies", "CVPR", "Image–shape correspondence without training or text labels.", "/research/bsb.png", "https://threedle.github.io/bsb/"],
  ["2025", "Geometry in Style", "CVPR", "3D stylization through surface-normal deformation.", "/research/geometry-in-style.png", "https://threedle.github.io/geometry-in-style/"],
  ["2025", "MeshUp", "3DV", "Controllable mesh deformation from multiple visual concepts.", "/research/meshup.png", "https://threedle.github.io/MeshUp/"],
  ["2024", "iSeg", "SIGGRAPH Asia", "Fine-grained 3D segmentation from a few user clicks.", "/research/iseg.png", "https://threedle.github.io/iSeg/"],
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const goToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    setOpen(false);
    history.replaceState(null, "", window.location.pathname + window.location.search);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    const resetScroll = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    resetScroll();
    requestAnimationFrame(resetScroll);
    window.addEventListener("pageshow", resetScroll);
    return () => window.removeEventListener("pageshow", resetScroll);
  }, []);
  return <main>
    <header className="nav shell">
      <a href="#top" className="wordmark"><img src="/brand/gi-logo.png" alt=""/><span>Geometric Intelligence Lab</span></a>
      <button onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
      <nav className={open ? "open" : ""}><a href="#research" onClick={(event) => goToSection(event, "research")}>Research</a><a href="#work" onClick={(event) => goToSection(event, "work")}>Work</a><a href="#people" onClick={(event) => goToSection(event, "people")}>People</a><a href="https://itailang.github.io/" target="_blank" rel="noreferrer">Contact</a></nav>
    </header>

    <section className="hero shell" id="top">
      <div className="hero-copy">
        <p className="label">Tel Aviv University</p>
        <div className="hero-name"><img src="/brand/gi-logo.png" alt="G"/><h1>eometric Intelligence <span>Lab</span></h1></div>
        <p className="summary">We develop AI methods for <span>understanding, generating, and manipulating</span> 3D geometry.</p>
        <a className="hero-link" href="#research" onClick={(event) => goToSection(event, "research")}>Explore our research <ArrowUpRight size={15}/></a>
      </div>
      <div className="hero-system" aria-hidden="true">
        <div className="system-ring ring-one"/><div className="system-ring ring-two"/>
        <div className="system-core"><img src="/brand/gi-logo.png" alt=""/></div>
        <i className="node node-a"/><i className="node node-b"/><i className="node node-c"/><i className="node node-d"/>
        <span className="system-tag tag-a">VISION</span><span className="system-tag tag-b">GEOMETRY</span><span className="system-tag tag-c">GENERATIVE AI</span>
      </div>
    </section>

    <GeometryPlayground/>

    <section className="topics shell" id="research">
      <div className="section-intro"><p className="label">Research areas</p><h2>Learning the language<br/>of <span>geometry</span></h2></div>
      <div className="topic-grid">{topics.map(([topic, Icon, description], i)=>{
        const TopicIcon = Icon as typeof Box;
        return <article className="topic-card" key={topic as string}>
          <div className="topic-top"><span>{String(i+1).padStart(2,"0")}</span><TopicIcon size={25} strokeWidth={1.6}/></div>
          <h3>{topic as string}</h3><p>{description as string}</p>
        </article>;
      })}</div>
    </section>

    <section className="objects shell" id="work">
      <div className="section-head"><div><p className="label">Selected work</p><h2>Recent <span>research</span></h2></div><p>Methods for understanding and creating<br/>the three-dimensional world.</p></div>
      <div className="object-grid">
        {papers.map(([year,title,venue,caption,image,href])=><a href={href} target="_blank" rel="noreferrer" className="object-card" key={title}>
          <div className="object-view"><img src={image} alt={`Project image for ${title}`}/><span>{venue}</span></div>
          <div className="object-meta"><small>{year}</small><h3>{title}</h3><p>{caption}</p><b><ArrowUpRight size={17}/></b></div>
        </a>)}
      </div>
    </section>

    <section className="people shell" id="people">
      <div className="section-head"><div><p className="label">People</p><h2>Meet the <span>lab</span></h2></div></div>
      <div className="people-grid">
        <article className="person"><img className="person-photo" src="/people/itai-lang.png" alt="Itai Lang"/><div className="person-info"><small>Principal Investigator</small><h3>Itai Lang</h3><div className="profile-links"><a href="https://itailang.github.io/" target="_blank" rel="noreferrer"><Globe2 size={12}/>Website</a><a href="https://il.linkedin.com/in/itailang" target="_blank" rel="noreferrer"><SquareUserRound size={12}/>LinkedIn</a><a href="https://scholar.google.com/citations?hl=en&user=q0bBhtsAAAAJ" target="_blank" rel="noreferrer"><BookOpen size={12}/>Scholar</a></div></div></article>
        <article className="person"><img className="person-photo" src="/people/rotem-gatenyo.png" alt="Rotem Gatenyo"/><div className="person-info"><small>PhD Student</small><h3>Rotem Gatenyo</h3><div className="profile-links"><a href="https://rotemgat.github.io/" target="_blank" rel="noreferrer"><Globe2 size={12}/>Website</a><a href="https://www.linkedin.com/in/rotem-g8/" target="_blank" rel="noreferrer"><SquareUserRound size={12}/>LinkedIn</a><a href="https://scholar.google.com/citations?user=MCSaL64AAAAJ&hl=en" target="_blank" rel="noreferrer"><BookOpen size={12}/>Scholar</a></div></div></article>
      </div>
    </section>

    <section className="join-section shell">
      <div className="join-panel">
        <div className="join-icon"><GraduationCap size={30}/></div>
        <div className="join-copy"><p className="label">Open positions</p><h2>Work with us</h2><p>If you are a motivated researcher who wants to work on cutting-edge AI for geometry processing, you are welcome to write to us.</p></div>
        <a href="mailto:itailang@mail.tau.ac.il"><Mail size={15}/> Write to Itai</a>
      </div>
    </section>

    <footer className="shell"><div className="wordmark"><img src="/brand/gi-logo.png" alt=""/><span>Geometric Intelligence Lab</span></div><p><MapPin size={13}/> School of Electrical & Computer Engineering<br/>Tel Aviv University</p><small>© 2026</small></footer>
  </main>;
}
