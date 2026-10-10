"""Stamp page dates, or stamp, commit, and push the website. Python 3.9+."""

import argparse
from datetime import datetime
import os
from pathlib import Path
import re
import subprocess
import sys
from zoneinfo import ZoneInfo


ROOT = Path(__file__).resolve().parents[1]
DOCUMENT_PAGES = {
    "static/cv.pdf": "cv.html",
    "static/research_statement.pdf": "research.html",
}
DATE_ATTRIBUTE = re.compile(r"\s+data-last-updated\s*=\s*([\"'])(.*?)\1")
BODY_TAG = re.compile(r"<body\b[^>]*>", re.IGNORECASE)


def git(*args, capture=True):
    return subprocess.run(
        ["git", "-C", str(ROOT), *args],
        check=True,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
    ).stdout


def paths(output):
    return set(output.rstrip("\0").split("\0")) if output else set()


def changed_paths():
    return paths(git("diff", "--name-only", "--no-renames", "-z", "HEAD", "--")) | paths(
        git("ls-files", "--others", "--exclude-standard", "-z")
    )


def website_file(name):
    path = Path(name)
    return (
        path.parts[0] in {"static", "courses", "scripts"}
        or name in {".gitignore", "CNAME", "Makefile", "README.md"}
        or (len(path.parts) == 1 and path.suffix in {".html", ".pdf", ".js", ".css"})
    )


def without_date(source):
    return BODY_TAG.sub(lambda match: DATE_ATTRIBUTE.sub("", match[0]), source, count=1)


def content_changed(page, current):
    previous = subprocess.run(
        ["git", "-C", str(ROOT), "show", f"HEAD:{page.name}"],
        capture_output=True,
        text=True,
    )
    return previous.returncode != 0 or without_date(previous.stdout) != without_date(current)


def stamp(changed):
    today = datetime.now(ZoneInfo("America/New_York")).date().isoformat()
    document_updates = {page for document, page in DOCUMENT_PAGES.items() if document in changed}
    updates = []

    for page in sorted(ROOT.glob("*.html")):
        source = page.read_text(encoding="utf-8")
        if page.name not in document_updates and not (
            page.name in changed and content_changed(page, source)
        ):
            continue

        body = BODY_TAG.search(source)
        if body is None:
            raise RuntimeError(f"Cannot stamp {page.name}: missing <body> tag.")
        tag = DATE_ATTRIBUTE.sub("", body[0])
        tag = tag[:-1] + f' data-last-updated="{today}">'
        updated = source[:body.start()] + tag + source[body.end():]
        if updated != source:
            updates.append((page, updated))

    for page, source in updates:
        page.write_text(source, encoding="utf-8")
        print(f"{page.name}: Last Updated {today}")
    if not updates:
        print("No page dates need updating.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("stamp", "publish"))
    parser.add_argument("--message", default=os.environ.get("MESSAGE", ""))
    args = parser.parse_args()
    if args.action == "publish" and not args.message.strip():
        parser.error('Publishing requires a message: make publish MESSAGE="Describe the update"')

    if git("ls-files", "--unmerged", "-z"):
        raise RuntimeError("Resolve Git merge conflicts before updating dates or publishing.")

    staged = paths(git("diff", "--cached", "--name-only", "--no-renames", "-z"))
    if args.action == "publish":
        unrelated = sorted(name for name in staged if not website_file(name))
        if unrelated:
            raise RuntimeError("Unstage unrelated files before publishing: " + ", ".join(unrelated))

    stamp(changed_paths())
    if args.action == "stamp":
        return

    # Include deleted and already-staged website files, without staging unrelated files.
    files = sorted(name for name in changed_paths() | staged if website_file(name))
    if files:
        git("add", "--all", "--", *files, capture=False)
    if git("diff", "--cached", "--name-only", "-z"):
        git("commit", "-m", args.message, capture=False)
    else:
        print("No website changes to commit.")

    # A normal push uses the current branch's configured upstream. No force pushing.
    print("Pushing the current branch...", flush=True)
    git("push", capture=False)


if __name__ == "__main__":
    try:
        main()
    except (RuntimeError, OSError, subprocess.CalledProcessError) as error:
        print(getattr(error, "stderr", None) or str(error), file=sys.stderr)
        sys.exit(1)
