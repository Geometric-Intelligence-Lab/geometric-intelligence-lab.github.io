"use client";

import { useEffect, useState } from "react";

const topics = ["3D Generative AI", "Geometry Processing", "Computer Vision", "Geometric Learning", "Spatial Reasoning"];
const papers = [
  ["2026", "Best Segmentation Buddies", "CVPR", "Image–shape correspondence without training or text labels.", "/research/bsb.png", "https://threedle.github.io/bsb/"],
  ["2025", "Geometry in Style", "CVPR", "3D stylization through surface-normal deformation.", "/research/geometry-in-style.png", "https://threedle.github.io/geometry-in-style/"],
  ["2025", "MeshUp", "3DV", "Controllable mesh deformation from multiple visual concepts.", "/research/meshup.png", "https://threedle.github.io/MeshUp/"],
  ["2024", "iSeg", "SIGGRAPH Asia", "Fine-grained 3D segmentation from a few user clicks.", "/research/iseg.png", "https://threedle.github.io/iSeg/"],
];

function Dot({ variant = "plain" }: { variant?: string }) {
  return <div className={`dot dot-${variant}`} aria-hidden="true"><i/><i/><i/></div>;
}

export default function Home() {
  const [open, setOpen] = useState(false);
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
      <nav className={open ? "open" : ""}><a href="#research">Research</a><a href="#work">Work</a><a href="#people">People</a><a href="https://itailang.github.io/" target="_blank" rel="noreferrer">Contact</a></nav>
    </header>

    <section className="hero shell" id="top">
      <div>
        <p className="label">Tel Aviv University</p>
        <div className="hero-name"><img src="/brand/gi-logo.png" alt="G"/><h1>eometric Intelligence <span>Lab</span></h1></div>
        <p className="summary">We develop AI methods for understanding, generating, and manipulating 3D geometry.</p>
      </div>
    </section>

    <section className="topics shell" id="research">
      <p className="label">Research</p>
      <div>{topics.map((topic, i)=><span key={topic}><b>{String(i+1).padStart(2,"0")}</b>{topic}</span>)}</div>
    </section>

    <section className="objects shell" id="work">
      <div className="section-head"><div><p className="label">Selected work</p><h2>Research objects</h2></div></div>
      <div className="object-grid">
        {papers.map(([year,title,venue,caption,image,href])=><a href={href} target="_blank" rel="noreferrer" className="object-card" key={title}>
          <div className="object-view"><img src={image} alt={`Project image for ${title}`}/><span>3D</span></div>
          <div className="object-meta"><small>{year} · {venue}</small><h3>{title}</h3><p>{caption}</p><b>↗</b></div>
        </a>)}
      </div>
    </section>

    <section className="people shell" id="people">
      <div className="section-head"><div><p className="label">People</p><h2>The lab</h2></div><p>People, each with their own point of view.</p></div>
      <div className="people-grid">
        <article className="person"><img className="person-photo" src="/people/itai-lang.png" alt="Itai Lang"/><div><small>Principal Investigator</small><h3>Itai Lang</h3><div className="profile-links"><a href="https://itailang.github.io/" target="_blank" rel="noreferrer">Website</a><a href="https://il.linkedin.com/in/itailang" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://scholar.google.com/citations?hl=en&user=q0bBhtsAAAAJ" target="_blank" rel="noreferrer">Scholar</a></div></div></article>
        <article className="person"><img className="person-photo" src="/people/rotem-gatenyo.png" alt="Rotem Gatenyo"/><div><small>Researcher</small><h3>Rotem Gatenyo</h3><div className="profile-links"><a href="https://rotemgat.github.io/" target="_blank" rel="noreferrer">Website</a><a href="https://www.linkedin.com/in/rotem-g8/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://scholar.google.com/citations?user=MCSaL64AAAAJ&hl=en" target="_blank" rel="noreferrer">Scholar</a></div></div></article>
        <article className="person join"><div className="plus">+</div><div><small>Open positions</small><h3>Join the lab</h3><p>Students and collaborators are welcome.</p></div></article>
      </div>
    </section>

    <footer className="shell"><div className="wordmark"><img src="/brand/gi-logo.png" alt=""/><span>Geometric Intelligence Lab</span></div><p>School of Electrical & Computer Engineering<br/>Tel Aviv University</p><small>2026</small></footer>
  </main>;
}
