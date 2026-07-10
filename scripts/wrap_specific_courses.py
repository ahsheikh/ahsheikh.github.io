#!/usr/bin/env python3
"""Wrap specific course HTML files in site layout."""

from pathlib import Path

from page_layout import build_page, extract_title_and_body

FILES = [
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\LinAlg\LinAlg.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\MG\mgmethods.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\MT\MeasureTh.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\NA\NACA.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\NA\NumAnalysis.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\NumMod\LectureMaterial.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\NumMod\NumMod.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\PreCal\PreCal.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\QBA\qba.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\SI\SI.html"),
    Path(r"c:\Users\user\Documents\GitHub\ahsheikh.github.io\Courses\TensorAnalysis\tensoranalysis.html"),
]


def main() -> None:
    for path in FILES:
        title, body = extract_title_and_body(path)
        html = build_page(
            depth=2,
            title=f"{title} — Dr. Abdul Hanan Sheikh",
            description=f"Course materials: {title}. Dr. Abdul Hanan Sheikh, QUEST Nawabshah.",
            eyebrow="Teaching",
            h1=title,
            intro="Lecture materials, syllabi and useful links for this course.",
            breadcrumb_href="../../Courses/Teaching.html",
            breadcrumb_label="Back to courses",
            content_html=body,
        )
        path.write_text(html, encoding="utf-8")
        print(f"Updated {path}")


if __name__ == "__main__":
    main()
