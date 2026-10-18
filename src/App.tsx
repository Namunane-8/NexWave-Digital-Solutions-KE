import { useEffect, useState } from 'react';

const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'Our story', href: '#story' },
  { label: 'About', href: '#about' },
];

function LocalClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const date = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(now);

  const time = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(now);

  return <span className="local-clock" aria-label={`Your local date and time: ${date}, ${time}`}>{date} <span aria-hidden="true">·</span> {time}</span>;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="NexWave Digital Solutions home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="wordmark-text">NEXWAVE<span>DIGITAL SOLUTIONS</span></span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span><span className="menu-lines" aria-hidden="true" />
      </button>
      <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {navigation.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <a href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Founder <Arrow diagonal /></a>
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Start a conversation <Arrow /></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="wordmark footer-wordmark" href="#home">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="wordmark-text">NEXWAVE<span>DIGITAL SOLUTIONS</span></span>
        </a>
        <p>Practical digital progress, built with purpose.</p>
        <a className="footer-founder" href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Meet the founder <Arrow diagonal /></a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NexWave Digital Solutions</span>
        <span className="footer-tagline">Brighter Digital Future.</span>
        <a href="mailto:nexwavedigitalsolutions@gmail.com">Email NexWave <Arrow diagonal /></a>
      </div>
    </footer>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div id="home" className="site-shell">
        <div className="utility-bar"><span>Digital solutions, thoughtfully built.</span><LocalClock /></div>
        <Header />
        <main id="main-content">
          <section className="hero section-wrap">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-line" /> KENYA · WORKING WITH AMBITION</p>
              <h1>Make digital work<br /><em>work for you.</em></h1>
              <p className="hero-intro">We help businesses and growing teams turn digital challenges into useful websites, clearer online selling and simpler day-to-day work.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Discuss a project <Arrow /></a>
                <a className="text-link" href="#services">Explore our services <Arrow /></a>
              </div>
              <div className="hero-note"><span className="note-rule" /> A founder-led digital solutions practice focused on practical outcomes, not technology for its own sake.</div>
            </div>
            <div className="hero-visual" aria-label="Abstract architectural illustration representing connected digital systems" role="img">
              <div className="visual-label">IDEAS, CONNECTED TO ACTION</div>
              <div className="visual-grid" />
              <div className="visual-frame frame-back" />
              <div className="visual-frame frame-front">
                <div className="frame-top"><span>N / W</span><span>01—04</span></div>
                <div className="frame-structure"><span /><span /><span /><span /></div>
                <div className="frame-base" />
              </div>
              <div className="visual-coordinate coordinate-a">00.01<br />DISCOVER</div>
              <div className="visual-coordinate coordinate-b">BUILD WITH INTENT.</div>
              <div className="visual-index">NX / 001</div>
            </div>
          </section>

          <section className="trust-strip" aria-label="Our approach">
            <div className="section-wrap strip-inner"><span>OUR APPROACH</span><p>Clear thinking. Useful technology. Work built around real needs.</p><span className="strip-end">01 — 04</span></div>
          </section>

          <section className="services section-wrap" id="services">
            <div className="section-heading">
              <div><p className="eyebrow">WHAT WE DO</p><h2>Digital capability,<br /><em>without the noise.</em></h2></div>
              <p>Start with the problem you need to solve. We’ll help define a practical digital response, agree the scope and build with purpose.</p>
            </div>
            <div className="service-list">
              <a className="service-row" href="#contact"><span className="service-number">01</span><div><h3>Websites & digital experiences</h3><p>Clear, responsive websites that help people understand your business and take the next step.</p></div><span className="service-audience">For businesses & teams</span><Arrow diagonal /></a>
              <a className="service-row" href="#contact"><span className="service-number">02</span><div><h3>E-commerce & online selling</h3><p>Thoughtful product presentation and buying journeys shaped around your customers and operations.</p></div><span className="service-audience">For sellers & growing brands</span><Arrow diagonal /></a>
              <a className="service-row" href="#contact"><span className="service-number">03</span><div><h3>Digital strategy & brand clarity</h3><p>Sharper messaging, useful content structure and a more consistent digital presence.</p></div><span className="service-audience">For teams finding their focus</span><Arrow diagonal /></a>
              <a className="service-row" href="#contact"><span className="service-number">04</span><div><h3>Practical workflows & automation</h3><p>Explore ways to reduce repetitive work and organise information with carefully scoped digital tools.</p></div><span className="service-audience">For everyday operations</span><Arrow diagonal /></a>
            </div>
            <p className="scope-note">Every engagement begins with a conversation about needs, scope, timing and cost. Services are agreed before work begins.</p>
          </section>

          <section className="story-band" id="story">
            <div className="section-wrap story-layout">
              <div className="story-kicker"><span className="eyebrow-line" /> NEXWAVE / IN PROGRESS</div>
              <div className="story-content"><p className="eyebrow">OUR DEVELOPING STORY</p><h2>Building what<br /><em>comes next.</em></h2><p>NexWave is growing at the intersection of digital innovation, technology and practical problem-solving. We explore emerging approaches, understand real-world challenges and shape digital experiences designed to create meaningful value.</p><p>Our journey is ongoing. Every project begins with understanding a problem, refining the right approach and turning promising ideas into reliable solutions.</p><a className="text-link text-link-light" href="#about">How we work <Arrow /></a></div>
              <div className="story-index"><span>RESEARCH</span><span className="story-index-line" /><span>DESIGN</span><span className="story-index-line" /><span>DEVELOP</span><span className="story-index-line" /><span>IMPROVE</span></div>
            </div>
          </section>

          <section className="about section-wrap" id="about">
            <div className="about-label"><p className="eyebrow">A PRACTICAL MINDSET</p><span>KENYA, WITH A GLOBAL OUTLOOK</span></div>
            <div className="about-content"><h2>Technology should solve a real problem — <em>and make the next step clearer.</em></h2><p>NexWave Digital Solutions is a founder-led digital business based in Kenya. Our approach is straightforward: understand the need, agree on the work, build with care and be honest about what a solution can deliver.</p><a className="text-link" href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Discover the founder’s work <Arrow diagonal /></a></div>
          </section>

          <section className="contact-band" id="contact">
            <div className="section-wrap contact-inner"><div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make a<br /><em>useful next move.</em></h2></div><div className="contact-action"><p>Tell us what you’re trying to achieve. We can discuss the challenge, explore fit and agree a practical next step.</p><a className="button button-light" href="mailto:nexwavedigitalsolutions@gmail.com?subject=NexWave%20project%20enquiry">Email NexWave <Arrow diagonal /></a><span>Prefer a direct message? <a href="https://wa.me/254700670136?text=Hello%20NexWave%20Digital%20Solutions%2C%20I%27d%20like%20to%20make%20an%20enquiry" target="_blank" rel="noreferrer">Contact via WhatsApp</a></span></div></div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;