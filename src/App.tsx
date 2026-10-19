import { useEffect, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

const navItems = [
  { label: 'Services', href: '/services' },
  { label: 'Our story', href: '/our-story' },
  { label: 'About', href: '/about' },
  { label: 'Store', href: '/store' },
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
  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      const dark = preference === 'dark' || (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      root.dataset.theme = dark ? 'dark' : 'light';
      root.style.colorScheme = dark ? 'dark' : 'light';
    };
    apply();
    try { window.localStorage.setItem('nexwave-appearance', preference); } catch { /* storage may be unavailable */ }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if (preference === 'system') {
      media.addEventListener('change', apply);
      return () => media.removeEventListener('change', apply);
    }
  }, [preference]);
  return <div className="appearance-control"><label htmlFor="appearance-choice">Appearance</label><select id="appearance-choice" value={preference} onChange={(event) => setPreference(event.target.value as 'light' | 'dark' | 'system')}><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></div>;
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
      <a className="wordmark" href="/" aria-label="NexWave Digital Solutions home">
        <span className="brand-mark" aria-hidden="true"><span /></span>
        <span className="wordmark-text">NEXWAVE<span>DIGITAL SOLUTIONS</span></span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span><span className="menu-lines" aria-hidden="true" />
      </button>
      <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
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
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="wordmark-text">NEXWAVE<span>DIGITAL SOLUTIONS</span></span>
        </a>
        <p>Practical digital progress, built with purpose.</p>
        <a className="footer-founder" href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Meet the founder <Arrow diagonal /></a>
      </div>
      <div className="footer-links" aria-label="Footer navigation">
        <a href="/services">Services</a><a href="/our-story">Our story</a><a href="/about">About</a><a href="/store">Store</a><a href="/contact">Contact</a><a href="/privacy">Privacy</a>
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
  return (
    <>
      <section className="hero section-wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> KENYA · WORKING WITH AMBITION</p>
          <h1>Make digital work<br /><em>work for you.</em></h1>
          <p className="hero-intro">We help businesses and growing teams turn digital challenges into useful websites, clearer online selling and simpler day-to-day work.</p>
          <div className="hero-actions"><a className="button button-primary" href="/contact">Discuss a project <Arrow /></a><a className="text-link" href="/services">Explore our services <Arrow /></a></div>
          <div className="hero-note"><span className="note-rule" /> A founder-led digital solutions practice focused on practical outcomes, not technology for its own sake.</div>
        </div>
        <div className="hero-visual" aria-label="Abstract architectural illustration representing connected digital systems" role="img">
          <div className="visual-label">IDEAS, CONNECTED TO ACTION</div><div className="visual-grid" /><div className="visual-frame frame-back" />
          <div className="visual-frame frame-front"><div className="frame-top"><span>N / W</span><span>01—04</span></div><div className="frame-structure"><span /><span /><span /><span /></div><div className="frame-base" /></div>
          <div className="visual-coordinate coordinate-a">00.01<br />DISCOVER</div><div className="visual-coordinate coordinate-b">BUILD WITH INTENT.</div><div className="visual-index">NX / 001</div>
        </div>
      </section>
      <section className="trust-strip" aria-label="Our approach"><div className="section-wrap strip-inner"><span>OUR APPROACH</span><p>Clear thinking. Useful technology. Work built around real needs.</p><span className="strip-end">01 — 04</span></div></section>
      <section className="services section-wrap">
        <div className="section-heading"><div><p className="eyebrow">WHAT WE DO</p><h2>Digital capability,<br /><em>without the noise.</em></h2></div><p>Start with the problem you need to solve. We’ll help define a practical digital response, agree the scope and build with purpose.</p></div>
        <div className="service-list">
          <a className="service-row" href="/services/websites-digital-experiences"><span className="service-number">01</span><div><h3>Websites & digital experiences</h3><p>Clear, responsive websites that help people understand your business and take the next step.</p></div><span className="service-audience">For businesses & teams</span><Arrow diagonal /></a>
          <a className="service-row" href="/services/ecommerce-online-selling"><span className="service-number">02</span><div><h3>E-commerce & online selling</h3><p>Thoughtful product presentation and buying journeys shaped around your customers and operations.</p></div><span className="service-audience">For sellers & growing brands</span><Arrow diagonal /></a>
          <a className="service-row" href="/services/digital-strategy-brand-clarity"><span className="service-number">03</span><div><h3>Digital strategy & brand clarity</h3><p>Sharper messaging, useful content structure and a more consistent digital presence.</p></div><span className="service-audience">For teams finding their focus</span><Arrow diagonal /></a>
          <a className="service-row" href="/services/workflows-automation"><span className="service-number">04</span><div><h3>Practical workflows & automation</h3><p>Explore ways to reduce repetitive work and organise information with carefully scoped digital tools.</p></div><span className="service-audience">For everyday operations</span><Arrow diagonal /></a>
        </div>
        <p className="scope-note">Every engagement begins with a conversation about needs, scope, timing and cost. Services are agreed before work begins.</p>
      </section>
      <section className="story-band"><div className="section-wrap story-layout"><div className="story-kicker"><span className="eyebrow-line" /> NEXWAVE / IN PROGRESS</div><div className="story-content"><p className="eyebrow">OUR DEVELOPING STORY</p><h2>Building what<br /><em>comes next.</em></h2><p>NexWave is growing at the intersection of digital innovation, technology and practical problem-solving. We explore emerging approaches, understand real-world challenges and shape digital experiences designed to create meaningful value.</p><p>Our journey is ongoing. Every project begins with understanding a problem, refining the right approach and turning promising ideas into reliable solutions.</p><a className="text-link text-link-light" href="/our-story">Read our story <Arrow /></a></div><div className="story-index"><span>RESEARCH</span><span className="story-index-line" /><span>DESIGN</span><span className="story-index-line" /><span>DEVELOP</span><span className="story-index-line" /><span>IMPROVE</span></div></div></section>
      <section className="about section-wrap"><div className="about-label"><p className="eyebrow">A PRACTICAL MINDSET</p><span>KENYA, WITH A GLOBAL OUTLOOK</span></div><div className="about-content"><h2>Technology should solve a real problem — <em>and make the next step clearer.</em></h2><p>NexWave Digital Solutions is a founder-led digital business based in Kenya. Our approach is straightforward: understand the need, agree on the work, build with care and be honest about what a solution can deliver.</p><a className="text-link" href="https://www.namunane.co.ke/" target="_blank" rel="noreferrer">Discover the founder’s work <Arrow diagonal /></a></div></section>
      <section className="contact-band"><div className="section-wrap contact-inner"><div><p className="eyebrow">HAVE A PROJECT IN MIND?</p><h2>Let’s make a<br /><em>useful next move.</em></h2></div><div className="contact-action"><p>Tell us what you’re trying to achieve. We can discuss the challenge, explore fit and agree a practical next step.</p><a className="button button-light" href="/contact">Contact NexWave <Arrow /></a><span>Prefer a direct message? <a href="https://wa.me/254700670136?text=Hello%20NexWave%20Digital%20Solutions%2C%20I%27d%20like%20to%20make%20an%20enquiry" target="_blank" rel="noreferrer">Contact via WhatsApp</a></span></div></div></section>
    </>
  );
}

function ServicesPage() {
  const services = [
    ['01', 'Website design & development', 'Responsive business websites and focused digital experiences that make your offer clear and help visitors take the next step.', 'Typical scope can include site structure, responsive implementation, enquiry journeys, search-engine foundations and agreed integrations.'],
    ['02', 'E-commerce & online selling', 'Product presentation and buying journeys shaped around your customers, catalogue and business operations.', 'Platform subscriptions, payment processing, shipping and third-party integrations depend on the agreed setup and provider terms.'],
    ['03', 'Digital strategy & brand clarity', 'Positioning, messaging, content structure and brand consistency that make your digital presence easier to understand.', 'The work begins with your goals and current materials. Sales or growth outcomes are not guaranteed.'],
    ['04', 'Practical workflows & automation', 'Carefully scoped ways to reduce repetitive tasks and organise information using suitable digital tools.', 'Any AI or third-party integration is agreed in advance and requires appropriate account access, privacy review and any applicable provider fees.'],
    ['05', 'Custom digital tools', 'Small, focused web tools or dashboards considered around a specific operational need.', 'Feasibility, data access, maintenance and ownership are discussed before a build is approved.'],
  ];
  return <PageLayout eyebrow="SERVICES" title={<>Digital work, scoped<br /><em>around real needs.</em></>} intro="Choose the area closest to your goal. If you are unsure which service fits, describe the challenge and we can discuss the best next step before agreeing on scope, timing and cost.">
    <div className="service-detail-list">{services.map(([number, title, intro, scope]) => <article className="service-detail" key={number}><span className="service-number">{number}</span><div><h2>{title}</h2><p>{intro}</p><p className="detail-scope">{scope}</p></div></article>)}</div>
    <div className="page-cta"><h2>Not sure where to start?</h2><p>Tell us what you want to improve. We can talk through the options before any work is agreed.</p><a className="button button-primary" href="/contact">Discuss your project <Arrow /></a></div>
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
    <div className="page-cta"><h2>Discuss this service</h2><p>{page.enquiry} We’ll review the context before agreeing scope, timing and cost.</p><a className="button button-primary" href={`/contact?service=${encodeURIComponent(page.service)}`}>Make a service enquiry <Arrow /></a><p className="scope-note">No scope, delivery date or outcome is promised until it is agreed.</p></div>
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
  const [service, setService] = useState(() => { const requested = new URLSearchParams(window.location.search).get('service'); const allowed = ['Website design & development', 'E-commerce & online selling', 'Digital strategy & branding', 'Workflow & automation', 'Custom digital tool', 'Something else']; return requested && allowed.includes(requested) ? requested : 'Website design & development'; });
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
      <label htmlFor="contact-service">What do you need help with?</label><select id="contact-service" name="service" value={service} onChange={(event) => setService(event.target.value)}><option>Website design & development</option><option>E-commerce & online selling</option><option>Digital strategy & branding</option><option>Workflow & automation</option><option>Custom digital tool</option><option>Something else</option></select>
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
        <a className="button button-primary" href="https://selar.com/m/nexwave-digital-solutions1952019" target="_blank" rel="noopener noreferrer">Visit NexWave on Selar <Arrow diagonal /></a>
        <p className="store-note">You’ll continue to Selar to review product information and complete any purchase. Prices, availability and payment methods shown there are authoritative.</p>
      </div>
      <div className="store-panel-aside" aria-hidden="true"><span className="store-index">NW / STORE</span><div className="store-orbit"><span /><span /><span /></div><p>LEARN · CREATE · GROW</p></div>
    </section>
  </PageLayout>;
}

function NotFoundPage() {
  return <section className="not-found section-wrap"><p className="eyebrow">ERROR / 404</p><h1>This page could<br /><em>not be found.</em></h1><p>The address may have changed or the link may be incorrect. Return to the homepage or browse the services available on this site.</p><div className="hero-actions"><a className="button button-primary" href="/">Return home <Arrow /></a><a className="text-link" href="/services">Browse services <Arrow /></a></div></section>;
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

  return <><a className="skip-link" href="#main-content">Skip to content</a><div className="site-shell"><div className="utility-bar"><span>Digital solutions, thoughtfully built.</span><LocalClock /></div><Header /><main id="main-content">{route === '/' ? <HomePage /> : route === '/services' ? <ServicesPage /> : servicePages[route] ? <ServiceDetailPage page={servicePages[route]} /> : route === '/about' ? <AboutPage /> : route === '/our-story' ? <StoryPage /> : route === '/contact' ? <ContactPage /> : route === '/privacy' ? <PrivacyPage /> : route === '/store' ? <StorePage /> : <NotFoundPage />}</main><Footer /></div><BackToTop /></>;
}

export default App;