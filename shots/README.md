# Screenshots for the package pages and READMEs

`studio/` turns real command output into the framed images on oss.saimulislam.com and in each package's README.

- `studio/term.html?id=<name>` draws one terminal window from `studio/data/<name>.json`: the command, the output exactly as the tool printed it, and line rules that colour it (errors, warnings, passes, dim). The words are never changed.
- `studio/*.html` pages draw the visuals that are not terminals (the GPX map, the activity timeline, the MCP flow, the viewport and PDF diagrams), each from the package's own output.
- `raw/` holds the PNG masters (git-ignored). The WebP files the site serves are in `client/public/shots/<slug>/`.

Serve the folder (`python3 -m http.server 4820` from `shots/studio`), open a page at 1272 px wide, capture at 2x, then convert with `cwebp -q 82 -m 6`.

bug-finder's shots come from its own demo app (`npm run demo` in the bug-finder repo).
