# Research Website - English Edition

All page text, code comments, and instructions are in English.
All source files use UTF-8 encoding and ASCII characters only.
This package is an independent editable implementation inspired by MimicAgent.
It is not an exact copy of the original website.

## Run locally

1. Extract the ZIP archive.
2. Open this folder in VS Code.
3. Open a terminal in this folder.
4. Run: python3 -m http.server 8000
   On Windows, you can use: py -m http.server 8000
5. Visit http://localhost:8000 in your browser.
6. Save edits and refresh the page. Press Ctrl+C in the terminal to stop.

You can also open index.html directly in a browser.
Demo videos and posters are loaded from the original website and require internet access.

## Edit the files

- index.html: project title, authors, institution, abstract, section text, and citation.
- styles.css: readable, numbered sections for colors, layout, cards, and mobile rules.
- media-data.js: video titles, video paths, and poster paths.
- app.js: video grouping, comparison rows, carousel controls, and lazy loading.

## Replace demo media

The current comparison uses three methods and seven tasks.
To replace one clip while keeping the demo layout, edit its src and poster in
media-data.js. Use full HTTPS URLs for your own hosted videos while the demo
MEDIA_BASE is still active. For local files, replace all demo paths and change
MEDIA_BASE in app.js to './'. Upload the corresponding local media folders too.
The filters in app.js group media by their folder prefixes; retain these
prefixes or update the filters when changing the directory structure.
To change the number of comparison methods, update the HTML column headings,
the row slicing in app.js, and the CSS table widths together.
Video clips loop independently; they are not frame-synchronized.

## Avoid encoding problems

Open and save text files as UTF-8 in your editor.
Keep the meta charset declaration near the top of index.html.
Use a fresh extracted folder rather than mixing old and new files.
If the browser shows old content, hard-refresh the page or clear its cache.

## Publish on GitHub Pages

Upload the contents of this folder so index.html is at the repository root.
Do not upload only the ZIP archive.
In repository Settings > Pages, choose Deploy from a branch, main, and /(root).
Save and wait for deployment to finish. Use the URL shown in Pages settings.

## Credits and source

Reference website: https://luckykantnayak.github.io/mimic-agent/
Original website repository: https://github.com/Luckykantnayak/mimic-agent
Demo media belong to the original authors and are not included in this archive.
Use your own research text, figures, and videos for your public project.
The page contains explicitly labeled placeholder research text.
