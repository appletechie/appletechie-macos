"use client"

import { useEffect, useState } from "react"
import "./portfolio.css"

const work = [
  ["Kainotomic", "Co-Founder"],
  ["ClawWerks", "CTO"],
  ["MV Jewelry Exchange", "Co-Founder"],
  ["Peltekci Agency", "Founder"],
]

export default function Portfolio({ onExplore }: { onExplore: () => void }) {
  const [section, setSection] = useState("work")
  useEffect(() => {
    const sync = () => setSection(["about", "contact"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "work")
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])
  return <div className="portfolio-desktop">
    <a className="skip-link" href="#portfolio-content">Skip to content</a>
    <header className="portfolio-menu"><span aria-hidden="true">●</span><strong>Andrew Peltekci</strong><span>Portfolio</span><button onClick={onExplore}>Explore desktop</button></header>
    <main className="portfolio-window" aria-label="Portfolio">
      <div className="portfolio-title"><span aria-hidden="true" className="traffic">● ● ●</span><span>Portfolio — Andrew Peltekci</span><button onClick={onExplore} aria-label="Close portfolio and explore desktop">×</button></div>
      <div className="portfolio-layout"><aside><div className="profile-mark" aria-hidden="true">ap</div><strong>Andrew Peltekci</strong><p>Founder & engineer</p><nav aria-label="Portfolio sections">{["work", "about", "contact"].map(item => <a key={item} href={`#${item}`} aria-current={section === item ? "page" : undefined}>{item === "work" ? "Selected work" : item[0].toUpperCase() + item.slice(1)}</a>)}</nav><button onClick={onExplore}>Explore the desktop</button></aside>
      <div id="portfolio-content" className="portfolio-content" tabIndex={-1}>
        <p className="portfolio-location">apple-techie / portfolio</p>
        <h1>{section === "contact" ? "Let's connect." : section === "about" ? "A little about me." : "Hi, I'm Andrew."}</h1>
        <p className="portfolio-intro">{section === "about" ? "I'm a founder and engineer working across software, AI and business. This desktop is a different way to explore my work." : section === "contact" ? "Find me on GitHub or visit my personal site to get in touch." : "Founder. Engineer. Building across software, AI and business."}</p>
        <div className="portfolio-actions"><a className="primary" href={section === "contact" ? "https://peltekci.com" : "#contact"}>{section === "contact" ? "Visit peltekci.com" : "Get in touch"}</a><a href="https://github.com/appletechie">GitHub profile ↗</a></div>
        {section === "work" && <section aria-labelledby="work-heading"><div className="work-heading"><h2 id="work-heading">Current work</h2><span>Ventures & open source</span></div><ul className="work-list">{work.map(([name, role], i) => <li key={name}><span className={`work-icon work-icon-${i}`} aria-hidden="true">{name[0]}</span><div><h3>{name}</h3><p>{role}</p></div><span className="work-kind">Venture</span></li>)}<li><span className="work-icon" aria-hidden="true">⌘</span><div><h3><a href="https://github.com/appletechie/agent-chief-of-staff">Agent Chief of Staff ↗</a></h3><p>Public repository</p></div><span className="work-kind">Open source</span></li></ul></section>}
        <footer>Built with curiosity. Best explored your way.<button onClick={onExplore}>Open the macOS playground</button></footer>
      </div></div>
    </main><nav className="portfolio-dock" aria-label="Dock"><a href="#work">▦ <span>Work</span></a><a href="#about">◉ <span>About</span></a><a href="#contact">✉ <span>Contact</span></a><button onClick={onExplore}>⌘ <span>Desktop</span></button></nav>
  </div>
}
