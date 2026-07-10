const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">`;

function navHtml(depth) {
  const r = "../".repeat(depth);
  const home = `${r}index.html`;
  return `<nav class="nav" id="nav">
  <div class="container">
    <a href="${home}" class="nav__brand">Abdul Hanan Sheikh<small>Mathematics &amp; Statistics · QUEST</small></a>
    <ul class="nav__links">
      <li><a href="${home}#about">About</a></li>
      <li><a href="${home}#education">Education</a></li>
      <li><a href="${home}#work">Work</a></li>
      <li><a href="${home}#contact">Contact</a></li>
    </ul>
    <div class="nav__cta">
      <a class="btn btn--ghost" href="${r}CV/cv_HananSheikh.pdf" target="_blank" rel="noopener">CV</a>
      <a class="btn btn--primary" href="${home}#contact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/></svg>
        Contact
      </a>
      <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</nav>`;
}

function footerHtml(depth) {
  const r = "../".repeat(depth);
  return `<footer class="footer" id="contact">
  <svg class="footer__mesh" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <pattern id="meshPattern" width="46" height="46" patternUnits="userSpaceOnUse">
        <path d="M0 0h46v46H0z M0 0l46 46 M46 0L0 46" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="0.6"/>
      </pattern>
    </defs>
    <rect width="400" height="300" fill="url(#meshPattern)"/>
  </svg>
  <div class="container">
    <p class="eyebrow">Contact</p>
    <h2>Let&rsquo;s talk numerics, teaching, or research</h2>
    <div class="footer__grid">
      <div class="footer__col">
        <h3>Office</h3>
        <address>
          Department of Mathematics &amp; Statistics<br>
          Quaid-e-Awam University of Engineering,<br>
          Science &amp; Technology (QUEST)<br>
          Sakrand Road, Nawabshah&ndash;67480, Sindh, Pakistan<br><br>
          Tel: +92&ndash;244&ndash;9370381 to 85
        </address>
      </div>
      <div class="footer__col">
        <h3>Reach me</h3>
        <ul class="footer__list">
          <li>
            <button class="footer__email-btn" id="emailBtn" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/></svg>
              <span id="emailLabel">Reveal email address</span>
            </button>
          </li>
          <li><a href="http://nl.linkedin.com/in/ahsheikh" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h3>CV &amp; profile</h3>
        <ul class="footer__list">
          <li><a href="${r}CV/cv_HananSheikh.pdf" target="_blank" rel="noopener">Download full CV (PDF)</a></li>
          <li><a href="${r}publications.html">Publications list</a></li>
          <li><a href="${r}Courses/Teaching.html">Courses taught</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <span id="year"></span> Abdul Hanan Sheikh. Built with care in Nawabshah.</span>
      <a class="to-top" href="#top">Back to top</a>
    </div>
  </div>
</footer>`;
}

function pageHeader(breadcrumbHref, breadcrumbLabel, eyebrow, title, intro) {
  const introHtml = intro ? `<p class="page-header__intro">${intro}</p>` : "";
  return `<header class="page-header" id="top">
    <svg class="page-header__field" viewBox="0 0 900 900" aria-hidden="true">
      <g fill="none" style="stroke:var(--delft);opacity:0.35">
        <circle cx="560" cy="260" r="100" stroke-width="1.4"/>
        <circle cx="560" cy="260" r="200" stroke-width="1.2"/>
        <circle cx="560" cy="260" r="300" stroke-width="1"/>
      </g>
    </svg>
    <div class="container">
      <a class="breadcrumb" href="${breadcrumbHref}">&larr; ${breadcrumbLabel}</a>
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      ${introHtml}
    </div>
  </header>`;
}

function cleanLegacyHtml(raw) {
  return raw
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<hr[^>]*>[\s\S]*?Back to[\s\S]*/gi, "")
    .replace(/<\?php[\s\S]*?\?>/gi, "")
    .replace(/<\/?body[^>]*>/gi, "")
    .replace(/<\/?html[^>]*>/gi, "")
    .replace(/<h2[^>]*class="western"[^>]*>/gi, "<h2>")
    .replace(/<h2[^>]*>/gi, "<h2>")
    .replace(/<\/h2>/gi, "</h2>")
    .replace(/<p[^>]*align="justify"[^>]*>/gi, "<p>")
    .replace(/<p[^>]*style="[^"]*"[^>]*>/gi, "<p>")
    .replace(/<li><p[^>]*>/gi, "<li>")
    .replace(/<\/p>\s*<\/li>/gi, "</li>")
    .replace(/<i>/gi, "<em>")
    .replace(/<\/i>/gi, "</em>")
    .replace(/<a\s+/gi, "<a ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function extractTitleAndBody(text) {
  const h2Match = text.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  let title = h2Match ? h2Match[1].replace(/<[^>]+>/g, "").trim() : "";
  const bodyMatch = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : text;
  if (h2Match) body = body.slice(h2Match.index + h2Match[0].length);
  body = cleanLegacyHtml(body);
  return { title, body };
}

function buildPage({ depth, title, description, eyebrow, h1, intro, breadcrumbHref, breadcrumbLabel, contentHtml }) {
  const r = "../".repeat(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${description}">
<link rel="icon" href="${r}book.ico" type="image/x-icon">
${FONTS}
<link rel="stylesheet" href="${r}style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
${navHtml(depth)}
<main id="main">
${pageHeader(breadcrumbHref, breadcrumbLabel, eyebrow, h1, intro)}
  <section class="section" style="border-bottom:none;">
    <div class="container">
      <div class="content-prose reveal">
${contentHtml}
      </div>
    </div>
  </section>
</main>
${footerHtml(depth)}
<script src="${r}site.js" defer></script>
</body>
</html>
`;
}

const FILES = [
  "Courses/LinAlg/LinAlg.html",
  "Courses/MG/mgmethods.html",
  "Courses/MT/MeasureTh.html",
  "Courses/NA/NACA.html",
  "Courses/NA/NumAnalysis.html",
  "Courses/NumMod/LectureMaterial.html",
  "Courses/NumMod/NumMod.html",
  "Courses/PreCal/PreCal.html",
  "Courses/QBA/qba.html",
  "Courses/SI/SI.html",
  "Courses/TensorAnalysis/tensoranalysis.html",
];

const updated = [];
for (const rel of FILES) {
  const filePath = path.join(ROOT, rel);
  const text = fs.readFileSync(filePath, "utf8");
  const { title, body } = extractTitleAndBody(text);
  const html = buildPage({
    depth: 2,
    title: `${title} — Dr. Abdul Hanan Sheikh`,
    description: `Course materials: ${title}. Dr. Abdul Hanan Sheikh, QUEST Nawabshah.`,
    eyebrow: "Teaching",
    h1: title,
    intro: "Lecture materials, syllabi and useful links for this course.",
    breadcrumbHref: "../../Courses/Teaching.html",
    breadcrumbLabel: "Back to courses",
    contentHtml: body,
  });
  fs.writeFileSync(filePath, html, "utf8");
  updated.push(rel);
  console.log(`Updated ${rel}`);
}
console.log(JSON.stringify(updated));
