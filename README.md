# Personal website

Each main page is a standalone HTML file at the root of the repository.

- `static/site.js`: shared profile header, navigation, Google Analytics, and last-updated footer.
- `static/site.css`: shared styles.
- `static/`: photos and PDFs.
- `courses/`: existing standalone course slide exports.

To add a page, copy an existing HTML page and replace its title and body content.
Keep the stylesheet link, deferred script, and `nav-placeholder` div to use the
shared header and analytics.

Each page's `<body data-last-updated="YYYY-MM-DD">` declares its content update
date. The shared script displays it in italics at the bottom of the page. The
publishing script computes today's date each time it runs; stored page dates
are display values, not overrides.

Preview locally with `python3 -m http.server 8000`, then open
`http://localhost:8000`. There is no build step.

## Updating dates and publishing

With Python 3.9+ and Git installed, update dates without committing or pushing:

```sh
make stamp
```

To update dates, commit website changes, and push:

```sh
make publish MESSAGE="Update research statement"
```

The script compares the working files with the last commit, including staged and
untracked changes. It stamps changed root HTML pages using today's date in
US Eastern time (`America/New_York`, following EST/EDT). A change to
`static/cv.pdf` stamps `cv.html`; a change to
`static/research_statement.pdf` stamps `research.html`. Changes only to the date
attribute, shared header, or shared styles do not advance page dates.

Publishing includes website HTML, scripts, styles, PDFs, `static/`, `courses/`,
and the repository's publishing files. Other files remain unstaged; publishing
stops if unrelated files are already staged. It uses the current branch's
configured upstream. If the push fails after committing, the commit stays local;
retry with `git push` or the same publish command.

The script can also be called directly:

```sh
python3 scripts/publish.py stamp
python3 scripts/publish.py publish --message "Update research statement"
```
