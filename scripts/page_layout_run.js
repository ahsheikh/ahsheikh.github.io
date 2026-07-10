#!/usr/bin/env node
/** One-shot runner mirroring scripts/page_layout.py for course HTML files. */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">`;

const SKIP = new Set([
  'Courses/Teaching.html',
  'Courses/TeachingOLD.html',
  'Courses/CompMethods/CompMethodsOLD.html',
  'Courses/LASpring26/LA24DS.html',
]);

function assetRoot(depth) {
  return depth ? '../'.repeat(depth) : '';
}

function navHtml(depth) {
  const r = assetRoot(depth);
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
  const r = assetRoot(depth);
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

function pageHeader(breadcrumbHref, breadcrumbLabel, eyebrow, title, intro = '') {
  const introHtml = intro ? `<p class="page-header__intro">${intro}</p>` : '';
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

function buildPage({ depth, title, description, eyebrow, h1, intro, breadcrumbHref, breadcrumbLabel, contentHtml, sectionBorder = 'none' }) {
  const r = assetRoot(depth);
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
  <section class="section" style="border-bottom:${sectionBorder};">
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

function cleanLegacyHtml(raw) {
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<hr[^>]*>[\s\S]*Back to.*/gi, '')
    .replace(/<\?php[\s\S]*?\?>/gi, '')
    .replace(/<\/?body[^>]*>/gi, '')
    .replace(/<\/?html[^>]*>/gi, '')
    .replace(/<h2[^>]*class="western"[^>]*>/gi, '<h2>')
    .replace(/<h2[^>]*>/gi, '<h2>')
    .replace(/<\/h2>/gi, '</h2>')
    .replace(/<p[^>]*align="justify"[^>]*>/gi, '<p>')
    .replace(/<p[^>]*style="[^"]*"[^>]*>/gi, '<p>')
    .replace(/<li><p[^>]*>/gi, '<li>')
    .replace(/<\/p>\s*<\/li>/gi, '</li>')
    .replace(/<i>/gi, '<em>')
    .replace(/<\/i>/gi, '</em>')
    .replace(/<a\s+/gi, '<a ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function extractTitleAndBody(text, stem) {
  const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const h2Match = text.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  let title = '';
  if (h2Match) {
    title = h2Match[1].replace(/<[^>]+>/g, '').trim();
  } else if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }
  const bodyMatch = text.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : text;
  if (h2Match) {
    const idx = text.search(/<h2[^>]*>[\s\S]*?<\/h2>/i);
    if (idx >= 0) {
      const afterH2 = text.slice(idx);
      const endH2 = afterH2.search(/<\/h2>/i);
      if (endH2 >= 0) {
        const rest = afterH2.slice(endH2 + 5);
        const bm = rest.match(/([\s\S]*?)(?:<\/body>|$)/i);
        body = bm ? bm[1] : rest;
      }
    }
  }
  body = cleanLegacyHtml(body);
  return [title || stem, body];
}

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.includes('_files')) continue;
      walkDir(full, files);
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function depthFor(filePath) {
  const rel = path.relative(ROOT, filePath);
  return rel.split(path.sep).length - 1;
}

function wrapCoursePage(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const stem = path.basename(filePath, '.html');
  const [title, body] = extractTitleAndBody(text, stem);
  const depth = depthFor(filePath);
  const r = assetRoot(depth);
  const teaching = depth >= 1 ? `${r}Courses/Teaching.html` : 'Courses/Teaching.html';
  const html = buildPage({
    depth,
    title: `${title} — Dr. Abdul Hanan Sheikh`,
    description: `Course materials: ${title}. Dr. Abdul Hanan Sheikh, QUEST Nawabshah.`,
    eyebrow: 'Teaching',
    h1: title,
    intro: 'Lecture materials, syllabi and useful links for this course.',
    breadcrumbHref: teaching,
    breadcrumbLabel: 'Back to courses',
    contentHtml: body,
  });
  fs.writeFileSync(filePath, html, 'utf8');
  const rel = path.relative(ROOT, filePath).split(path.sep).join('/');
  return rel;
}

const coursesDir = path.join(ROOT, 'Courses');
const allFiles = walkDir(coursesDir).sort();
const updated = [];
const skipped = [];
const failures = [];

for (const filePath of allFiles) {
  const rel = path.relative(ROOT, filePath).split(path.sep).join('/');
  if (SKIP.has(rel) || rel.includes('_files') || path.basename(filePath).includes('OLD')) {
    skipped.push(rel);
    continue;
  }
  try {
    updated.push(wrapCoursePage(filePath));
    console.log(`Updated ${rel}`);
  } catch (err) {
    failures.push({ file: rel, error: String(err) });
    console.error(`FAILED ${rel}: ${err}`);
  }
}

const logPath = path.join(ROOT, '_page_layout_result.json');
fs.writeFileSync(logPath, JSON.stringify({ updated, skipped, failures }, null, 2));
console.log(`Done: ${updated.length} updated, ${skipped.length} skipped, ${failures.length} failed`);
