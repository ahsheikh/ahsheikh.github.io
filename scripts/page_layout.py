#!/usr/bin/env python3
"""Wrap legacy HTML body content in the site layout used by index.html."""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FONTS = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">"""


def asset_root(depth: int) -> str:
    return "../" * depth if depth else ""


def nav_html(depth: int) -> str:
    r = asset_root(depth)
    home = f"{r}index.html"
    return f"""<nav class="nav" id="nav">
  <div class="container">
    <a href="{home}" class="nav__brand">Abdul Hanan Sheikh<small>Mathematics &amp; Statistics · QUEST</small></a>
    <ul class="nav__links">
      <li><a href="{home}#about">About</a></li>
      <li><a href="{home}#education">Education</a></li>
      <li><a href="{home}#work">Work</a></li>
      <li><a href="{home}#contact">Contact</a></li>
    </ul>
    <div class="nav__cta">
      <a class="btn btn--ghost" href="{r}CV/cv_HananSheikh.pdf" target="_blank" rel="noopener">CV</a>
      <a class="btn btn--primary" href="{home}#contact">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7l9 6 9-6M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/></svg>
        Contact
      </a>
      <button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</nav>"""


def footer_html(depth: int) -> str:
    r = asset_root(depth)
    return f"""<footer class="footer" id="contact">
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
          <li><a href="{r}CV/cv_HananSheikh.pdf" target="_blank" rel="noopener">Download full CV (PDF)</a></li>
          <li><a href="{r}publications.html">Publications list</a></li>
          <li><a href="{r}Courses/Teaching.html">Courses taught</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>&copy; <span id="year"></span> Abdul Hanan Sheikh. Built with care in Nawabshah.</span>
      <a class="to-top" href="#top">Back to top</a>
    </div>
  </div>
</footer>"""


def page_header(breadcrumb_href: str, breadcrumb_label: str, eyebrow: str, title: str, intro: str = "") -> str:
    intro_html = f'<p class="page-header__intro">{intro}</p>' if intro else ""
    return f"""<header class="page-header" id="top">
    <svg class="page-header__field" viewBox="0 0 900 900" aria-hidden="true">
      <g fill="none" style="stroke:var(--delft);opacity:0.35">
        <circle cx="560" cy="260" r="100" stroke-width="1.4"/>
        <circle cx="560" cy="260" r="200" stroke-width="1.2"/>
        <circle cx="560" cy="260" r="300" stroke-width="1"/>
      </g>
    </svg>
    <div class="container">
      <a class="breadcrumb" href="{breadcrumb_href}">&larr; {breadcrumb_label}</a>
      <p class="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {intro_html}
    </div>
  </header>"""


def build_page(
    *,
    depth: int,
    title: str,
    description: str,
    eyebrow: str,
    h1: str,
    intro: str,
    breadcrumb_href: str,
    breadcrumb_label: str,
    content_html: str,
    section_border: str = "none",
) -> str:
    r = asset_root(depth)
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="icon" href="{r}book.ico" type="image/x-icon">
{FONTS}
<link rel="stylesheet" href="{r}style.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
{nav_html(depth)}
<main id="main">
{page_header(breadcrumb_href, breadcrumb_label, eyebrow, h1, intro)}
  <section class="section" style="border-bottom:{section_border};">
    <div class="container">
      <div class="content-prose reveal">
{content_html}
      </div>
    </div>
  </section>
</main>
{footer_html(depth)}
<script src="{r}site.js" defer></script>
</body>
</html>
"""


def clean_legacy_html(raw: str) -> str:
    raw = re.sub(r"(?is)<script[^>]*>.*?</script>", "", raw)
    raw = re.sub(r"(?is)<style[^>]*>.*?</style>", "", raw)
    raw = re.sub(r"(?is)<!--.*?-->", "", raw)
    raw = re.sub(r"(?is)<hr[^>]*>.*?Back to.*", "", raw)
    raw = re.sub(r"(?is)<\?php.*?\?>", "", raw)

  # normalize tags
    raw = re.sub(r"(?i)</?body[^>]*>", "", raw)
    raw = re.sub(r"(?i)</?html[^>]*>", "", raw)
    raw = re.sub(r"(?i)<h2[^>]*class=\"western\"[^>]*>", "<h2>", raw)
    raw = re.sub(r"(?i)<h2[^>]*>", "<h2>", raw)
    raw = re.sub(r"(?i)</h2>", "</h2>", raw)
    raw = re.sub(r"(?i)<p[^>]*align=\"justify\"[^>]*>", "<p>", raw)
    raw = re.sub(r"(?i)<p[^>]*style=\"[^\"]*\"[^>]*>", "<p>", raw)
    raw = re.sub(r"(?i)<li><p[^>]*>", "<li>", raw)
    raw = re.sub(r"(?i)</p>\s*</li>", "</li>", raw)
    raw = re.sub(r"(?i)<i>", "<em>", raw)
    raw = re.sub(r"(?i)</i>", "</em>", raw)
    raw = re.sub(r"(?i)<a\s+", '<a ', raw)
    raw = re.sub(r"\s{2,}", " ", raw)
    return raw.strip()


def extract_title_and_body(path: Path) -> tuple[str, str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    title_match = re.search(r"(?is)<title[^>]*>(.*?)</title>", text)
    h2_match = re.search(r"(?is)<h2[^>]*>(.*?)</h2>", text)
    title = re.sub(r"<[^>]+>", "", h2_match.group(1)).strip() if h2_match else ""
    if not title and title_match:
        title = re.sub(r"<[^>]+>", "", title_match.group(1)).strip()
    body_match = re.search(r"(?is)<body[^>]*>(.*)</body>", text)
    body = body_match.group(1) if body_match else text
    if h2_match:
        body = body[h2_match.end() :]
    body = clean_legacy_html(body)
    return title or path.stem, body


def depth_for(path: Path) -> int:
    rel = path.relative_to(ROOT)
    return len(rel.parts) - 1


def wrap_course_page(path: Path) -> None:
    title, body = extract_title_and_body(path)
    depth = depth_for(path)
    r = asset_root(depth)
    teaching = f"{r}Courses/Teaching.html" if depth >= 1 else "Courses/Teaching.html"
    html = build_page(
        depth=depth,
        title=f"{title} — Dr. Abdul Hanan Sheikh",
        description=f"Course materials: {title}. Dr. Abdul Hanan Sheikh, QUEST Nawabshah.",
        eyebrow="Teaching",
        h1=title,
        intro="Lecture materials, syllabi and useful links for this course.",
        breadcrumb_href=teaching,
        breadcrumb_label="Back to courses",
        content_html=body,
    )
    path.write_text(html, encoding="utf-8")
    print(f"Updated {path.relative_to(ROOT)}")


COURSE_GLOBS = [
    "Courses/**/*.html",
]

SKIP = {
    "Courses/Teaching.html",
    "Courses/TeachingOLD.html",
    "Courses/CompMethods/CompMethodsOLD.html",
    "Courses/LASpring26/LA24DS.html",
}


def main() -> int:
    for pattern in COURSE_GLOBS:
        for path in sorted(ROOT.glob(pattern)):
            rel = path.relative_to(ROOT).as_posix()
            if rel in SKIP or "_files" in rel or "OLD" in path.name:
                continue
            wrap_course_page(path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
