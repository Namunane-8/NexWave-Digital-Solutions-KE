import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

const navItems: { label: string; href: string; external?: boolean }[] = [
  { label: 'Services', href: '/services' },
  { label: 'Our story', href: '/our-story' },
  { label: 'About', href: '/about' },
  { label: 'Store', href: 'https://selar.com/m/nexwave-digital-solutions1952019', external: true },
];

const pageMeta: Record<string, { title: string; description: string }> = {
  '/': { title: 'NexWave Digital Solutions — Brighter Digital Future', description: 'NexWave Digital Solutions helps businesses build useful websites, clearer online selling experiences and practical digital workflows.' },
  '/services': { title: 'Services | NexWave Digital Solutions', description: 'Explore website development, e-commerce, digital strategy, branding and practical workflow services from NexWave Digital Solutions.' },
  '/services/websites-digital-experiences': { title: 'Websites & Digital Experiences | NexWave Digital Solutions', description: 'Plan a clear, responsive website or digital experience around your business goals and visitors.' },
  '/services/ecommerce-online-selling': { title: 'E-commerce & Online Selling | NexWave Digital Solutions', description: 'Shape product presentation and online selling journeys around your customers and operations.' },
  '/services/digital-strategy-brand-clarity': { title: 'Digital Strategy & Brand Clarity | NexWave Digital Solutions', description: 'Clarify your digital priorities, messaging and brand presentation with a practical, scoped approach.' },
  '/services/workflows-automation': { title: 'Practical Workflows & Automation | NexWave Digital Solutions', description: 'Explore scoped workflow improvements and automation options for repetitive digital work.' },
  '/about': { title: 'About NexWave Digital Solutions', description: 'Learn about NexWave Digital Solutions, a founder-led digital business based in Kenya with a practical approach to technology.' },
  '/our-story': { title: 'Our Developing Story | NexWave Digital Solutions', description: 'Discover the ongoing NexWave journey in digital innovation, technology and practical problem-solving.' },
  '/contact': { title: 'Contact NexWave Digital Solutions', description: 'Tell NexWave Digital Solutions about your digital project, business challenge or enquiry.' },
  '/privacy': { title: 'Privacy Notice | NexWave Digital Solutions', description: 'Read how NexWave Digital Solutions approaches information shared through its website.' },
  '/404': { title: 'Page not found | NexWave Digital Solutions', description: 'The requested page could not be found. Return to NexWave Digital Solutions.' },
  '/store': { title: 'Digital Products Store | NexWave Digital Solutions', description: 'Browse NexWave Digital Solutions digital products and complete purchases securely through the official Selar storefront.' },
};

function LocalClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const date = new Intl.DateTimeFormat(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(now);
  const time = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true }).format(now);
  return <span className="local-clock" aria-label={`Your local date and time: ${date}, ${time}`}>{date} <span aria-hidden="true">·</span> {time}</span>;
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

function AppearanceControl() {
  const [preference, setPreference] = useState<'light' | 'dark' | 'system'>(() => {
    try {
      const saved = window.localStorage.getItem('nexwave-appearance');
      return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
    } catch { return 'system'; }
  });
  const [textSize, setTextSize] = useState<'default' | 'large' | 'extra-large'>(() => {
    try {
      const saved = window.localStorage.getItem('nexwave-text-size');
      return saved === 'large' || saved === 'extra-large' || saved === 'default' ? saved : 'default';
    } catch { return 'default'; }
  });
  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => {
      const dark = preference === 'dark' || (preference === 'system' && media.matches);
      root.dataset.theme = dark ? 'dark' : 'light';
      root.style.colorScheme = dark ? 'dark' : 'light';
    };
    apply();
    try { window.localStorage.setItem('nexwave-appearance', preference); } catch { /* storage may be unavailable */ }
    if (preference === 'system') {
      media.addEventListener('change', apply);
      return () => media.removeEventListener('change', apply);
    }
  }, [preference]);
  useEffect(() => {
    document.documentElement.dataset.textSize = textSize;
    try { window.localStorage.setItem('nexwave-text-size', textSize); } catch { /* storage may be unavailable */ }
  }, [textSize]);
  return <div className="display-controls" aria-label="Display settings">
    <div className="appearance-control"><label htmlFor="appearance-choice">Appearance</label><select id="appearance-choice" value={preference} onChange={(event) => setPreference(event.target.value as 'light' | 'dark' | 'system')}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></div>
    <div className="text-size-control"><label htmlFor="text-size-choice">Text size</label><select id="text-size-choice" value={textSize} onChange={(event) => setTextSize(event.target.value as 'default' | 'large' | 'extra-large')}><option value="default">Default</option><option value="large">Large</option><option value="extra-large">Extra Large</option></select></div>
  </div>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <a className="wordmark" href="/">
        <span className="wordmark-text">NEXWAVE<span>DIGITAL SOLUTIONS</span></span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span><span className="menu-lines" aria-hidden="true" />
      </button>
      <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
        <a href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Founder <Arrow diagonal /></a>
        <AppearanceControl /><a className="nav-contact" href="/contact" onClick={() => setMenuOpen(false)}>Start a conversation <Arrow /></a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="wordmark footer-wordmark" href="/">
          <span className="wordmark-text">NEXWAVE<span>DIGITAL SOLUTIONS</span></span>
        </a>
        <p>Practical digital progress, built with purpose.</p>
        <a className="footer-founder" href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Meet the founder <Arrow diagonal /></a>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <a href="/services">Services</a><a href="/our-story">Our story</a><a href="/about">About</a><a href="https://selar.com/m/nexwave-digital-solutions1952019" target="_blank" rel="noopener noreferrer">Store</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} NexWave Digital Solutions</span>
        <span className="footer-tagline">Brighter Digital Future.</span>
        <a href="mailto:nexwavedigitalsolutions@gmail.com">Email NexWave <Arrow diagonal /></a>
      </div>
    </footer>
  );
}

function HomePage() {
  const homeServices = [
    { number: '01', title: 'Web Development', description: 'Fast, accessible, conversion-focused websites and platforms built with modern stacks.', href: '/services/websites-digital-experiences', note: 'Websites & digital experiences' },
    { number: '02', title: 'Branding & Identity', description: 'Visual systems, logos, and brand voices that make you unmistakable in a crowded feed.', href: '/services/digital-strategy-brand-clarity', note: 'Brand clarity & direction' },
    { number: '03', title: 'Digital Strategy', description: 'Growth roadmaps, funnels, and content systems that turn attention into revenue.', href: '/services/digital-strategy-brand-clarity', note: 'Strategy & content planning' },
    { number: '04', title: 'AI Workflows', description: 'Custom GPTs, automations, and AI dashboards designed around a clearly scoped workflow.', href: '/services/workflows-automation', note: 'Workflow & automation' },
    { number: '05', title: 'E-commerce Builds', description: 'Storefronts, checkout journeys, and product pages planned for African and global markets.', href: '/services/ecommerce-online-selling', note: 'E-commerce & online selling' },
    { number: '06', title: 'Launch Sprints', description: 'Focused two-to-four-week engagements to plan, build, and prepare a product for launch. Scope and readiness depend on the brief.', href: '/contact?service=Launch%20Sprint&returnTo=%2Fservices', note: 'Enquiry-led, agreed scope' },
  ];
  const process = [
    ['01', 'Discover', 'We map your goals, audience, and constraints in one focused session.'],
    ['02', 'Design', 'Wireframes, brand direction, and a build plan you can actually read.'],
    ['03', 'Build', 'Weekly demos. Real progress you can see, click, and share.'],
    ['04', 'Scale', 'Analytics, optimization, and growth experiments after launch, where in scope.'],
  ];
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> NEXWAVE DIGITAL SOLUTIONS · KENYA</p>
          <h1>Transforming ideas<br /><em>into digital solutions.</em></h1>
          <p className="hero-intro">We design, build, and grow digital products for founders and teams who want to move fast without breaking trust.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/contact">Work With Us</a>
            <a className="text-link" href="/#services">View Services</a>
            <a className="text-link hero-tertiary" href="/our-story">Learn More</a>
          </div>
          <div className="hero-note"><span className="note-rule" /> A founder-led digital solutions practice focused on clear scope, thoughtful engineering and useful outcomes.</div>
        </div>
        <div className="hero-visual" aria-label="Abstract architectural illustration representing connected digital systems" role="img">
          <div className="visual-label">IDEAS, CONNECTED TO ACTION</div><div className="visual-grid" /><div className="visual-frame frame-back" />
          <div className="visual-frame frame-front"><div className="frame-top"><span>N / W</span><span>01—04</span></div><div className="frame-structure"><span /><span /><span /><span /></div><div className="frame-base" /></div>
          <div className="visual-coordinate coordinate-a">00.01<br />DISCOVER</div><div className="visual-coordinate coordinate-b">BUILD WITH INTENT.</div><div className="visual-index">NX / 001</div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Our approach"><div className="section-wrap strip-inner"><span>OUR APPROACH</span><p>Clear thinking. Useful technology. Work built around real needs.</p><span className="strip-end">01 — 04</span></div></section>
      <section id="services" className="services section-wrap">
        <div className="section-heading"><div><p className="eyebrow">WHAT WE DO</p><h2>Services built<br /><em>for momentum.</em></h2></div><p>From first sketch to scaled rollout. Pick one, or stack them. We confirm feasibility, scope, timing and costs before work begins.</p></div>
        <div className="home-service-grid">
          {homeServices.map((service) => <a className="home-service-card" href={service.href} key={service.number}>
            <span className="service-number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><span className="home-service-destination">{service.note} <Arrow diagonal /></span>
          </a>)}
        </div>
        <p className="scope-note">Capabilities and deliverables depend on the agreed brief, technical feasibility, third-party providers and available access. No commercial results are guaranteed.</p>
        <div className="services-overview-link"><a className="text-link" href="/services">Explore service details <Arrow /></a></div>
      </section>
      <section className="process-section">
        <div className="section-wrap">
          <div className="section-heading process-heading"><div><p className="eyebrow">HOW WE WORK</p><h2>A four step rhythm<br /><em>that ships.</em></h2></div><p>No bloated decks. No mystery process. Just a clear path from idea to live product.</p></div>
          <div className="process-grid">{process.map(([number, title, description]) => <article className="process-step" key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        </div>
      </section>
      <section className="story-band"><div className="section-wrap story-layout"><div className="story-kicker"><span className="eyebrow-line" /> NEXWAVE / IN PROGRESS</div><div className="story-content"><p className="eyebrow">OUR DEVELOPING STORY</p><h2>Building what<br /><em>comes next.</em></h2><p>NexWave is growing at the intersection of digital innovation, technology and practical problem-solving. We explore emerging approaches, understand real-world challenges and shape digital experiences designed to create meaningful value.</p><p>Our journey is ongoing. Every project begins with understanding a problem, refining the right approach and turning promising ideas into reliable solutions.</p><a className="text-link text-link-light" href="/our-story">Read our story <Arrow /></a></div><div className="story-index"><span>RESEARCH</span><span className="story-index-line" /><span>DESIGN</span><span className="story-index-line" /><span>DEVELOP</span><span className="story-index-line" /><span>IMPROVE</span></div></div></section>
      <section className="about section-wrap"><div className="about-label"><p className="eyebrow">A PRACTICAL MINDSET</p><span>KENYA, WITH A GLOBAL OUTLOOK</span></div><div className="about-content"><h2>Technology should solve a real problem — <em>and make the next step clearer.</em></h2><p>NexWave Digital Solutions is a founder-led digital business based in Kenya. Our approach is straightforward: understand the need, agree on the work, build with care and be honest about what a solution can deliver.</p><a className="text-link" href="/about">Learn about NexWave <Arrow /></a></div></section>
      <section className="newsletter-section">
        <div className="section-wrap newsletter-layout">
          <div><p className="eyebrow">NEXWAVE DIGITAL INSIGHTS</p><h2>NexWave Digital<br /><em>Insights.</em></h2></div>
          <div className="newsletter-copy"><p>Weekly insights on AI, digital innovation, startups, and scalable tech solutions across Africa’s digital economy.</p><a className="button button-primary" href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7458460529456726016" target="_blank" rel="noopener noreferrer">Subscribe on LinkedIn</a><p className="newsletter-note">Opens LinkedIn directly. Subscription is completed on LinkedIn, not on this website.</p></div>
        </div>
      </section>
      <section className="contact-band"><div className="section-wrap contact-inner"><div><p className="eyebrow">READY TO BUILD?</p><h2>Ready to build<br /><em>something that lasts?</em></h2></div><div className="contact-action"><p>Tell us where you are and where you want to go. We'll bring the engineering, the brand, and the strategy.</p><a className="button button-light" href="/contact">Work With Us <Arrow /></a><span>Prefer a direct message? <a href="https://wa.me/254700670136?text=Hello%20NexWave%20Digital%20Solutions%2C%20I%27d%20like%20to%20make%20an%20enquiry" target="_blank" rel="noreferrer">Contact via WhatsApp</a></span></div></div></section>
    </>
  );
}

function ServicesPage() {
  const services = [
    { number: '01', title: 'Web Development', intro: 'Fast, accessible, conversion-focused websites and platforms built with modern stacks.', href: '/services/websites-digital-experiences', link: 'Explore website services' },
    { number: '02', title: 'Branding & Identity', intro: 'Visual identity, brand messaging and practical guidance for a clearer, more consistent presence.', href: '/services/digital-strategy-brand-clarity', link: 'Explore brand and strategy services' },
    { number: '03', title: 'Digital Strategy', intro: 'Growth roadmaps, funnels and content systems planned around your audience and goals.', href: '/services/digital-strategy-brand-clarity', link: 'Explore strategy services' },
    { number: '04', title: 'AI Workflows', intro: 'Scoped workflow automation, AI-assisted processes and dashboard concepts where feasible.', href: '/services/workflows-automation', link: 'Explore workflow services' },
    { number: '05', title: 'E-commerce Builds', intro: 'Storefront structure, product pages and buying journeys suited to your business and chosen providers.', href: '/services/ecommerce-online-selling', link: 'Explore e-commerce services' },
    { number: '06', title: 'Launch Sprints', intro: 'Focused two-to-four-week engagements to define, build and prepare a product for launch. Scope and readiness depend on the brief.', href: '/contact?service=Launch%20Sprint&returnTo=%2Fservices', link: 'Enquire about a launch sprint' },
  ];
  return <PageLayout eyebrow="SERVICES" title={<>Services built<br /><em>for momentum.</em></>} intro="From first sketch to scaled rollout. Pick one, or stack them. We agree the brief, feasibility, scope, timing and cost before work begins.">
    <div className="service-detail-list service-overview-list">{services.map((service) => <article className="service-detail service-overview-item" key={service.number}><span className="service-number">{service.number}</span><div><h2>{service.title}</h2><p>{service.intro}</p><a className="text-link" href={service.href}>{service.link} <Arrow /></a></div></article>)}</div>
    <p className="scope-note">Offerings are scoped to the actual brief and available implementation. Third-party services, provider access, privacy considerations, subscriptions and fees are discussed where relevant. No commercial outcomes are guaranteed.</p>
    <div className="page-cta"><h2>Not sure where to start?</h2><p>Tell us what you want to improve. We can talk through the options before any work is agreed.</p><a className="button button-primary" href="/contact">Work With Us <Arrow /></a></div>
  </PageLayout>;
}


const servicePages: Record<string, { eyebrow: string; title: ReactNode; intro: string; capabilities: string[]; deliverables: string[]; process: string[]; enquiry: string; service: string }> = {
  '/services/websites-digital-experiences': {
    eyebrow: 'SERVICE 01 / WEBSITES', title: <>Websites & digital<br /><em>experiences.</em></>,
    intro: 'Build a clear, responsive digital home that helps visitors understand your offer, find important information and take the next step. The right scope depends on your audience, content and business goals.',
    capabilities: ['Information architecture and page structure', 'Responsive front-end design and implementation', 'Contact and enquiry journeys', 'Search-friendly page titles and metadata', 'Agreed third-party integrations and handover'],
    deliverables: ['An agreed sitemap and page plan', 'A responsive website within the approved scope', 'Contact links or forms appropriate to the setup', 'Launch checklist and handover notes where included'],
    process: ['Discuss the audience, goals, content and constraints', 'Agree the page scope, responsibilities, timing and cost', 'Design and build the agreed experience', 'Review, test and prepare the handover'],
    enquiry: 'Tell us about the website you need.', service: 'Website design & development'
  },
  '/services/ecommerce-online-selling': {
    eyebrow: 'SERVICE 02 / ONLINE SELLING', title: <>E-commerce &<br /><em>online selling.</em></>,
    intro: 'Make it easier for customers to understand what you offer and move through an online buying journey. The setup should fit your catalogue, operations, payment provider and delivery model.',
    capabilities: ['Product and offer information structure', 'Storefront and category presentation', 'Customer journey and checkout handoff review', 'Links to suitable third-party selling platforms', 'Practical content and store-management guidance'],
    deliverables: ['A scoped store or storefront improvement plan', 'Product-page and catalogue structure as agreed', 'Configured links or integrations within scope', 'A handover covering agreed workflows and limitations'],
    process: ['Review products, customers and how orders are handled', 'Agree the platform, scope, dependencies and provider costs', 'Implement the agreed presentation and buying journey', 'Check the customer handoff and document next steps'],
    enquiry: 'Describe your products and selling goals.', service: 'E-commerce & online selling'
  },
  '/services/digital-strategy-brand-clarity': {
    eyebrow: 'SERVICE 03 / STRATEGY', title: <>Digital strategy &<br /><em>brand clarity.</em></>,
    intro: 'Create a clearer direction for your digital presence by aligning your goals, audience, messaging and content. Recommendations are based on the materials and context available, not guaranteed commercial outcomes.',
    capabilities: ['Digital presence and content review', 'Audience and offer clarification', 'Website messaging and content hierarchy', 'Brand consistency across agreed touchpoints', 'Prioritised, practical next-step recommendations'],
    deliverables: ['A concise priorities and opportunities summary', 'Messaging or page-structure recommendations', 'An agreed content outline or brand-use guidance', 'A practical action plan matched to the agreed scope'],
    process: ['Understand your goals, audience and current materials', 'Identify gaps and agree the questions to resolve', 'Develop recommendations and draft content direction', 'Review together and prioritise practical next steps'],
    enquiry: 'Tell us what needs to become clearer.', service: 'Digital strategy & branding'
  },
  '/services/workflows-automation': {
    eyebrow: 'SERVICE 04 / WORKFLOWS', title: <>Practical workflows<br /><em>& automation.</em></>,
    intro: 'Explore carefully scoped ways to reduce repetitive work and organise information with suitable digital tools. Feasibility, data handling, account access, provider limits and ongoing costs are considered before implementation.',
    capabilities: ['Mapping current repetitive tasks and handoffs', 'Identifying suitable low-risk automation opportunities', 'Workflow prototypes and small digital utilities', 'Agreed AI or third-party tool connections where appropriate', 'Basic documentation and operating guidance'],
    deliverables: ['A current-state workflow summary', 'A prioritised automation opportunity list', 'An agreed prototype or workflow configuration if feasible', 'Usage notes, dependencies and known limitations'],
    process: ['Map the task, inputs, outputs and failure cases', 'Review privacy, access, provider and cost constraints', 'Agree a small scope and testable acceptance criteria', 'Test with appropriate sample data and document handover'],
    enquiry: 'Explain the repetitive work you want to improve.', service: 'Workflow & automation'
  }
};

function ServiceDetailPage({ page }: { page: typeof servicePages[string] }) {
  return <PageLayout eyebrow={page.eyebrow} title={page.title} intro={page.intro}>
    <div className="service-detail-content">
      <section aria-labelledby="service-capabilities"><h2 id="service-capabilities">What we can explore</h2><ul>{page.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section aria-labelledby="service-deliverables"><h2 id="service-deliverables">Potential deliverables</h2><p>Deliverables depend on the agreed brief and feasibility. Examples may include:</p><ul>{page.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section>
      <section aria-labelledby="service-process"><h2 id="service-process">How an engagement works</h2><ol>{page.process.map((item) => <li key={item}>{item}</li>)}</ol></section>
    </div>
    <div className="page-cta"><h2>Discuss this service</h2><p>{page.enquiry} We’ll review the context before agreeing scope, timing and cost.</p><a className="button button-primary" href={`/contact?service=${encodeURIComponent(page.service)}&returnTo=${encodeURIComponent(window.location.pathname)}`}>Make a service enquiry <Arrow /></a><p className="scope-note">No scope, delivery date or outcome is promised until it is agreed.</p></div>
  </PageLayout>;
}

function AboutPage() {
  return <PageLayout eyebrow="ABOUT NEXWAVE" title={<>Useful technology<br /><em>starts with a real need.</em></>} intro="NexWave Digital Solutions is a founder-led digital business based in Kenya. We work across websites, online selling journeys, digital workflows and practical digital learning, with a focus on clear scope and useful outcomes.">
    <div className="principles-grid"><article><span>01</span><h2>Understand first</h2><p>We begin with the challenge, the people affected and the outcome that would make a difference.</p></article><article><span>02</span><h2>Agree the work</h2><p>Scope, timing, responsibilities and costs should be clear before implementation begins.</p></article><article><span>03</span><h2>Build with care</h2><p>We value clarity, accessibility, maintainability and honest communication about limitations.</p></article></div>
    <div className="founder-panel"><div><p className="eyebrow">FOUNDER</p><h2>Namunane Emmanuel</h2></div><div><p>NexWave was founded to build useful digital products, websites, practical AI learning and digital skills initiatives.</p><a className="text-link" href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Visit the founder’s website <Arrow diagonal /></a></div></div>
  </PageLayout>;
}

function StoryPage() {
  return <PageLayout eyebrow="NEXWAVE / IN PROGRESS" title={<>Our Developing Story:<br /><em>building what comes next.</em></>} intro="NexWave is growing at the intersection of digital innovation, technology and practical business solutions. We explore emerging technologies, identify real-world challenges and develop thoughtful digital experiences designed to create meaningful value.">
    <div className="story-prose"><p>Our journey is ongoing. Every project begins with understanding a problem, refining the right approach and turning promising ideas into reliable solutions. We believe progress comes from asking better questions, building deliberately and learning from what happens in the real world.</p><div className="story-steps"><article><span>01 / RESEARCH</span><h2>Understand the challenge.</h2><p>Listen carefully, explore context and define what useful progress would look like.</p></article><article><span>02 / DESIGN & DEVELOPMENT</span><h2>Make the approach practical.</h2><p>Turn requirements into purposeful digital products and services with a clear scope.</p></article><article><span>03 / CONTINUOUS IMPROVEMENT</span><h2>Learn, test and refine.</h2><p>Review what works, address gaps and prepare solutions for real-world use.</p></article></div></div>
    <div className="page-cta"><h2>Have a challenge worth solving?</h2><p>We are open to discussing practical digital work with businesses and teams.</p><a className="button button-primary" href="/contact">Start a conversation <Arrow /></a></div>
  </PageLayout>;
}

function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'prepared'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(() => { const requested = new URLSearchParams(window.location.search).get('service'); const allowed = ['Website design & development', 'E-commerce & online selling', 'Digital strategy & branding', 'Workflow & automation', 'Launch Sprint', 'Custom digital tool', 'Something else']; return requested && allowed.includes(requested) ? requested : 'Website design & development'; });
  const [details, setDetails] = useState('');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`NexWave project enquiry — ${service}`);
    const body = encodeURIComponent(`Name: ${name}\nReply email: ${email}\nService: ${service}\n\nProject details:\n${details}`);
    setFormState('prepared');
    window.location.href = `mailto:nexwavedigitalsolutions@gmail.com?subject=${subject}&body=${body}`;
  };
  return <PageLayout eyebrow="CONTACT" title={<>Tell us what you want<br /><em>to make possible.</em></>} intro="Share the problem you are trying to solve, the outcome you need, and any important timing or budget constraints. We can review the brief and discuss fit, scope and next steps.">
    <div className="contact-page-grid"><form className="contact-form" onSubmit={submit}>
      <p className="form-notice" role="status">Automated message delivery is not configured yet. Submitting this form prepares an email in your device’s email application; it does not send anything automatically.</p>
      <label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} />
      <label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="contact-service">What do you need help with?</label><select id="contact-service" name="service" value={service} onChange={(event) => setService(event.target.value)}><option>Website design & development</option><option>E-commerce & online selling</option><option>Digital strategy & branding</option><option>Workflow & automation</option><option>Launch Sprint</option><option>Custom digital tool</option><option>Something else</option></select>
      <label htmlFor="contact-details">Tell us about your project</label><textarea id="contact-details" name="details" required minLength={10} maxLength={5000} rows={6} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="What are you trying to achieve? Include any timing or budget details you are comfortable sharing." />
      <button className="button button-primary" type="submit">Prepare email <Arrow /></button>
      {formState === 'prepared' && <p className="form-feedback" role="status">Your email application should open if one is configured. If it does not, contact us directly using the details alongside this form.</p>}
    </form><aside className="contact-details"><h2>Prefer direct contact?</h2><p>Use the channel that works best for you.</p><a href="mailto:nexwavedigitalsolutions@gmail.com">nexwavedigitalsolutions@gmail.com <Arrow diagonal /></a><a href="tel:+254700670136">+254 700 670 136 <Arrow diagonal /></a><a href="https://wa.me/254700670136?text=Hello%20NexWave%20Digital%20Solutions%2C%20I%27d%20like%20to%20make%20an%20enquiry" target="_blank" rel="noreferrer">WhatsApp NexWave <Arrow diagonal /></a><p className="privacy-hint">Please do not send passwords, payment details or sensitive personal information. See our <a href="/privacy">privacy notice</a>.</p></aside></div>
  </PageLayout>;
}

function PrivacyPage() {
  return <PageLayout eyebrow="PRIVACY" title={<>A clear note about<br /><em>your information.</em></>} intro="This page describes the intended handling of information shared through this website. It is a practical notice, not a legal certification; the details should be reviewed before public launch.">
    <div className="privacy-copy"><h2>Information you provide</h2><p>If you contact NexWave by email, phone or WhatsApp, the information you choose to share may include your name, contact details and enquiry. Please do not send passwords, payment-card details or sensitive personal information.</p><h2>How it is used</h2><p>Information you send is used to respond to your enquiry and discuss possible work. This site does not currently advertise analytics or advertising trackers as part of its implementation.</p><h2>Third-party services</h2><p>Email, telephone and WhatsApp are operated by their respective providers and are subject to their own terms and privacy practices. Automated website contact delivery is not configured in this release. Hosting providers may process technical request data as part of operating and securing the website.</p><h2>Retention and requests</h2><p>Enquiry information should be retained only as long as reasonably needed to respond, maintain relevant business records or meet applicable obligations. For access, correction or deletion requests, contact <a href="mailto:nexwavedigitalsolutions@gmail.com">NexWave by email</a>. Requests will be considered subject to applicable law and legitimate recordkeeping needs.</p><h2>Before publication</h2><p>The company should confirm its legal entity details, contact details, retention practices and any applicable Kenyan data-protection obligations with an appropriate adviser. This notice must be updated if analytics, forms, CRM tools or other integrations are introduced.</p></div>
  </PageLayout>;
}


function StorePage() {
  return <PageLayout eyebrow="NEXWAVE / DIGITAL STORE" title={<>Digital tools for<br /><em>your next step.</em></>} intro="Explore digital resources from NexWave Digital Solutions. Product availability, full descriptions, current pricing and delivery details are maintained on our Selar storefront.">
    <section className="store-panel" aria-labelledby="store-heading">
      <div className="store-panel-copy">
        <p className="eyebrow">SECURE CHECKOUT BY SELAR</p>
        <h2 id="store-heading">Browse the current catalogue.</h2>
        <p>Choose a resource from the official store to review its details and current price. Purchases and digital delivery are handled by Selar; NexWave does not collect payment-card details on this website.</p>
        <a className="button button-primary" href="https://selar.com/m/nexwave-digital-solutions1952019" target="_blank" rel="noopener noreferrer">Store — Visit NexWave on Selar <Arrow diagonal /></a>
        <p className="store-note">You’ll continue to Selar to review product information and complete any purchase. Prices, availability and payment methods shown there are authoritative.</p>
      </div>
      <div className="store-panel-aside" aria-hidden="true"><span className="store-index">NW / STORE</span><div className="store-orbit"><span /><span /><span /></div><p>LEARN · CREATE · GROW</p></div>
    </section>
  </PageLayout>;
}

function NotFoundPage() {
  return <section className="not-found section-wrap"><p className="eyebrow">ERROR / 404</p><h1>This page could<br /><em>not be found.</em></h1><p>The address may have changed or the link may be incorrect. Return to the homepage or browse the services available on this site.</p><div className="hero-actions"><a className="button button-primary" href="/">Return home <Arrow /></a><a className="text-link" href="/services">Browse services <Arrow /></a></div></section>;
}

function Breadcrumbs({ route }: { route: string }) {
  if (route === '/') return null;
  const labels: Record<string, string> = {
    '/services': 'Services',
    '/services/websites-digital-experiences': 'Websites & Digital Experiences',
    '/services/ecommerce-online-selling': 'E-commerce & Online Selling',
    '/services/digital-strategy-brand-clarity': 'Digital Strategy & Brand Clarity',
    '/services/workflows-automation': 'Workflows & Automation',
    '/about': 'About',
    '/our-story': 'Our Story',
    '/contact': 'Contact',
    '/privacy': 'Privacy',
    '/store': 'Store',
    '/404': 'Page Not Found',
  };
  const isServiceDetail = Boolean(servicePages[route]);
  const segments = isServiceDetail
    ? [{ label: 'Home', href: '/' }, { label: 'Services', href: '/services' }, { label: labels[route] }]
    : [{ label: 'Home', href: '/' }, { label: labels[route] ?? 'Page' }];
  return <nav className="breadcrumbs section-wrap" aria-label="Breadcrumb">
    <ol>{segments.map((item, index) => <li key={item.href ?? item.label}>{item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}{index < segments.length - 1 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}</li>)}</ol>
  </nav>;
}

function ContextualBackLink({ route }: { route: string }) {
  if (servicePages[route]) return <div className="contextual-back section-wrap"><a href="/services">← Back to Services</a></div>;
  if (route === '/contact') {
    const params = new URLSearchParams(window.location.search);
    const requestedReturn = params.get('returnTo');
    const safeReturn = requestedReturn && (Object.prototype.hasOwnProperty.call(servicePages, requestedReturn) || requestedReturn === '/services') ? requestedReturn : undefined;
    const requestedService = params.get('service');
    const serviceRoute = safeReturn ?? Object.entries(servicePages).find(([, page]) => page.service === requestedService)?.[0];
    if (serviceRoute) {
      const label = servicePages[serviceRoute]?.service ?? 'Services';
      return <div className="contextual-back section-wrap"><a href={serviceRoute}>← Back to {label}</a></div>;
    }
  }
  if (route === '/store') {
    return <div className="contextual-back section-wrap"><a href="/services" onClick={(event) => {
      const referrer = document.referrer;
      if (window.history.length > 1 && referrer.startsWith(window.location.origin)) {
        event.preventDefault();
        window.history.back();
      }
    }}>← Back to previous page</a></div>;
  }
  return null;
}

function PageLayout({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: string; children: ReactNode }) {
  return <><section className="page-hero section-wrap"><p className="eyebrow"><span className="eyebrow-line" /> {eyebrow}</p><h1>{title}</h1><p className="page-intro">{intro}</p></section><section className="page-body section-wrap">{children}</section></>;
}


function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 360);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const goTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  return <button className={`back-to-top ${visible ? 'is-visible' : ''}`} type="button" aria-label="Back to top" title="Back to top" tabIndex={visible ? 0 : -1} onClick={goTop}><svg aria-hidden="true" viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg></button>;
}

function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const route = pageMeta[path] ? path : '/404';
  useEffect(() => {
    document.title = pageMeta[route].title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = pageMeta[route].description;
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = `https://nexwavedigitalsolutions.co.ke${route === '/' ? '/' : route}`;
  }, [route]);

  return <><a className="skip-link" href="#main-content">Skip to content</a><div className="site-shell"><div className="utility-bar"><span>Digital solutions, thoughtfully built.</span><LocalClock /></div><Header /><Breadcrumbs route={route} /><ContextualBackLink route={route} /><main id="main-content">{route === '/' ? <HomePage /> : route === '/services' ? <ServicesPage /> : servicePages[route] ? <ServiceDetailPage page={servicePages[route]} /> : route === '/about' ? <AboutPage /> : route === '/our-story' ? <StoryPage /> : route === '/contact' ? <ContactPage /> : route === '/privacy' ? <PrivacyPage /> : route === '/store' ? <StorePage /> : <NotFoundPage />}</main><Footer /></div><BackToTop /></>;
}

export default App;