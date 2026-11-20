# Keyword research: nine OSS packages (oss.saimulislam.com)

- **Tool:** Google Ads Keyword Planner (Get search volume and forecasts, plus Discover new keywords)
- **Account:** the owner's own account, DeveloperLook (829-291-0005). Read-only use; no campaign, billing or setting changed. The account has no ad spend, so Google returns volume ranges only (not exact numbers).
- **Locations:** All locations. **Language:** all languages for the volume check (the language control is locked on that screen); English for the discovery runs. **Network:** Google search. **Period:** last 12 months, Nov 2025 to Oct 2026.
- **Date run:** 2026-11-20.
- **Columns:** avg monthly searches (range), competition (Low/Medium; this is paid-ad competition, not SEO difficulty), intent fit for developers looking for a library, CLI or technique. 3-month and YoY change shown as `3m / YoY` where listed in discovery tables; in the volume tables see notes.
- **Reading the numbers:** ranges are Google's buckets. A move between buckets shows as a jump of +900% or -90%; these are not real percentage changes. Treat +900% and -90% as "bucket moved" and everything else as flat. "No data" means Keyword Planner returned no measurable volume (not necessarily zero searches).
- Caveat: 96 candidates were submitted; Google returned 95 rows (it merged "check broken links" into "broken link checker"; "active-win" came back as "active win").
- Side effect: Keyword Planner saved the checks as draft "Plan from ..." entries in the account's Keyword Planner list (it does this automatically; they are not campaigns and cost nothing).


## 1. siteprobe

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| website speed test | 100K – 1M | Low | 0% / 0% | low |
| website seo checker | 10K – 100K | Low | 0% / 0% | low |
| check security headers | 1K – 10K | Low | 0% / 0% | high |
| csp checker | 1K – 10K | Low | 0% / 0% | high |
| hsts checker | 1K – 10K | Low | 0% / 0% | high |
| page speed checker | 1K – 10K | Low | 0% / 0% | low |
| security headers checker | 1K – 10K | Low | 0% / 0% | high |
| seo audit tool | 1K – 10K | Low | 0% / 0% | medium |
| website audit tool | 1K – 10K | Low | 0% / 0% | medium |
| website security scanner | 1K – 10K | Medium | 0% / 0% | medium |
| http security headers | 100 – 1K | Low | 0% / 0% | high |
| seo checker npm | no data | – | – | high |

### New ideas from Discover new keywords (seeds: website security scanner, security headers checker, website seo checker; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| seo checker | 10K – 100K | Low | 0% / 0% | low |
| website security checker | 10K – 100K | Medium | +900% / 0% | medium |
| free seo audit tool | 1K – 10K | Low | 0% / 0% | low |
| google seo checker | 1K – 10K | Low | 0% / 0% | low |
| scan website for malware | 1K – 10K | Low | 0% / 0% | low |
| seo scan | 1K – 10K | Medium | +900% / 0% | low |
| seo score checker | 1K – 10K | Low | 0% / 0% | low |
| website vulnerability scanner | 1K – 10K | Medium | 0% / 0% | low |
| website vulnerability scanner online | 1K – 10K | Medium | +900% / 0% | low |
| website seo analyzer | 100 – 1K | Low | 0% / 0% | low |

### Recommendation

- **Primary:** `security headers checker`: High-fit developer term, 1K-10K, low competition, matches the core check set and the CLI use case.
- **Secondary:**
  - `check security headers`: same intent, 1K-10K, phrase variant for the README and H2
  - `csp checker`: 1K-10K, a single header people look up; deep-link section on the page
  - `hsts checker`: 1K-10K, same pattern as csp checker
  - `http security headers`: 100-1K, informational query that feeds the 'what we check' section
  - `website security scanner`: 1K-10K, broader umbrella term the tool genuinely fits, Medium competition

**Flags:** seo checker npm has no measurable volume; keep it only as a descriptive npm keyword (zero cost). Head terms like website seo checker, website speed test and html-style 'checker' queries are consumer intent (online tools) so they are not targets.


## 2. redirect-lint

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| redirect checker | 10K – 100K | Low | 0% / 0% | medium |
| 301 redirect checker | 1K – 10K | Low | 0% / 0% | medium |
| cloudflare redirects | 1K – 10K | Low | 0% / 0% | medium |
| bulk redirect checker | 100 – 1K | Low | 0% / 0% | high |
| cloudflare bulk redirects | 100 – 1K | Low | 0% / 0% | high |
| netlify redirects | 100 – 1K | Low | -90% / -90% | high |
| redirect chain checker | 100 – 1K | Low | 0% / 0% | high |
| redirect loop | 100 – 1K | Low | +900% / +900% | medium |
| redirect map | 100 – 1K | Low | 0% / 0% | high |
| _redirects file | 10 – 100 | Low | 0% / 0% | high |
| redirect csv | no data | – | – | high |
| website migration redirects | no data | – | – | medium |

### New ideas from Discover new keywords (seeds: redirect checker, redirect chain checker, netlify redirects; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| url redirect checker | 10K – 100K | Low | 0% / 0% | low |
| check for 301 redirect | 1K – 10K | Low | 0% / 0% | medium |
| check redirect link | 1K – 10K | Low | 0% / -90% | low |
| _redirects | 100 – 1K | Low | 0% / -90% | high |
| bulk url redirect checker | 100 – 1K | Low | 0% / 0% | high |
| check redirect online | 100 – 1K | Low | 0% / 0% | low |
| check website for redirects | 100 – 1K | Low | 0% / 0% | medium |
| website redirect checker | 100 – 1K | Low | 0% / 0% | low |
| _redirects netlify | 10 – 100 | Low | 0% / 0% | high |
| bulk redirect checker tool | 10 – 100 | Low | 0% / 0% | high |

### Recommendation

- **Primary:** `redirect chain checker`: High fit (chains are a core finding), 100-1K, low competition; the broader redirect checker (10K-100K) is dominated by online URL tools.
- **Secondary:**
  - `bulk redirect checker`: 100-1K, matches CSV/list input; strongest developer-intent bulk query
  - `netlify redirects`: 100-1K, matches _redirects parsing; note -90% bucket drift, treat as flat
  - `cloudflare bulk redirects`: 100-1K, matches Cloudflare list support
  - `_redirects file`: 10-100, tiny but exact; pair with 'netlify _redirects' (10-100 / 100-1K for '_redirects')
  - `301 redirect checker`: 1K-10K, bigger reach, medium fit because most searchers want a one-off URL check

**Flags:** website migration redirects and redirect csv have no measurable volume (still natural on-page phrases). redirect checker / url redirect checker / check redirect link are consumer one-off URL checks (low fit).


## 3. static-preflight

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| broken link checker | 10K – 100K | Low | 0% / 0% | medium |
| check broken links | 10K – 100K | Low | merged into "broken link checker" | medium |
| html validator | 10K – 100K | Low | 0% / 0% | low |
| find broken links on website | 1K – 10K | Low | +900% / 0% | medium |
| sitemap validator | 1K – 10K | Low | 0% / 0% | high |
| website launch checklist | 100 – 1K | Low | 0% / 0% | medium |
| website qa checklist | 100 – 1K | Low | -90% / -90% | medium |
| pre launch website checklist | 10 – 100 | Low | 0% / 0% | medium |
| static site seo | 10 – 100 | Low | 0% / -90% | high |
| static site checker | no data | – | – | high |

### New ideas from Discover new keywords (seeds: broken link checker, website launch checklist, sitemap validator; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| link checker | 100K – 1M | Low | 0% / 0% | low |
| broken links | 10K – 100K | Low | 0% / 0% | low |
| find broken links | 10K – 100K | Low | 0% / 0% | medium |
| 404 checker | 1K – 10K | Low | 0% / 0% | medium |
| check website for broken links | 1K – 10K | Low | +900% / 0% | medium |
| dead link checker | 1K – 10K | Low | 0% / 0% | medium |
| free broken link checker | 1K – 10K | Low | -90% / -90% | low |
| internal link checker | 1K – 10K | Low | 0% / -90% | medium |
| website link checker | 1K – 10K | Low | 0% / 0% | medium |
| website go live checklist | 10 – 100 | Low | 0% / 0% | high |

### Recommendation

- **Primary:** `broken link checker`: Highest-volume term that a pre-deploy crawler really answers (10K-100K, Low competition); medium fit because SERPs are online tools, so pair it with 'static site' wording.
- **Secondary:**
  - `sitemap validator`: 1K-10K, high fit, one of the 18 checks
  - `find broken links on website`: 1K-10K, +900% 3-month is a bucket artefact, still solid phrase for H2
  - `internal link checker`: 1K-10K, matches a built-folder crawl
  - `website launch checklist`: 100-1K, matches the 'pre-deploy' framing
  - `static site seo`: 10-100, tiny but exact, no better static-site term exists

**Flags:** 'check broken links' was not returned separately: Google merged it into the broken link checker group (treat as the same 10K-100K). static site checker has no measurable volume. html validator (10K-100K) is the W3C validator audience, low fit.


## 4. translation-facts

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| localization qa | 100 – 1K | Low | 0% / 0% | medium |
| localization testing | 100 – 1K | Low | 0% / 0% | medium |
| translation checker | 100 – 1K | Low | 0% / 0% | high |
| translation quality assurance | 100 – 1K | Low | 0% / 0% | medium |
| i18n json | 10 – 100 | Low | 0% / -90% | high |
| i18n lint | 10 – 100 | Low | 0% / 0% | high |
| i18n testing | 10 – 100 | Low | 0% / 0% | high |
| missing translations | 10 – 100 | Low | 0% / 0% | high |
| check translation accuracy | no data | – | – | medium |
| translation qa tool | no data | – | – | high |

### New ideas from Discover new keywords (seeds: translation quality assurance, i18n testing, localization testing; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| internationalization testing | 100 – 1K | Low | 0% / -90% | medium |
| linguistic quality assurance | 100 – 1K | Low | 0% / 0% | low |
| localisation testing | 100 – 1K | Low | 0% / 0% | medium |
| localization quality assurance | 100 – 1K | Low | 0% / 0% | medium |
| i18n testing tools | 10 – 100 | none shown | 0% / 0% | high |
| i18next testing | 10 – 100 | Low | 0% / 0% | high |
| localization testing tools | 10 – 100 | Low | 0% / 0% | medium |
| translation qa tools | 10 – 100 | Low | 0% / 0% | high |
| translation quality assurance tools | 10 – 100 | Low | 0% / 0% | high |
| translation quality control | 10 – 100 | Low | 0% / 0% | medium |

### Recommendation

- **Primary:** `translation quality assurance`: Best volume among terms that describe the job (100-1K), Low competition; the whole niche is small, so it is a category word rather than a traffic play.
- **Secondary:**
  - `localization qa`: 100-1K, same audience, shorter form
  - `translation checker`: 100-1K, plain-language entry point
  - `localization testing`: 100-1K, higher bids ($4-$22) show commercial interest, medium fit (mostly UI/test-team)
  - `i18n testing`: 10-100, exact developer term
  - `missing translations`: 10-100, developer pain query; fits the 'what it catches' section

**Flags:** translation qa tool and check translation accuracy have no measurable volume. Whole cluster is max 100-1K per term: expect GitHub/npm discovery to matter more than search.


## 5. gpx-privacy

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| gpx editor | 1K – 10K | Low | 0% / 0% | low |
| edit gpx file | 100 – 1K | Low | 0% / 0% | medium |
| gpx to geojson | 100 – 1K | Low | 0% / 0% | medium |
| gpx parser | 10 – 100 | Low | 0% / 0% | high |
| gpx simplify | 10 – 100 | Low | 0% / +∞ | high |
| strava privacy zones | 10 – 100 | Low | 0% / 0% | high |
| trim gpx file | 10 – 100 | Low | 0% / 0% | high |
| gpx privacy | no data | – | – | high |
| hide home location strava | no data | – | – | high |
| remove timestamps from gpx | no data | – | – | high |

### New ideas from Discover new keywords (seeds: gpx editor, trim gpx file, strava privacy zones; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| edit gpx online | 1K – 10K | Low | 0% / 0% | low |
| edit gpx file online | 100 – 1K | Low | 0% / 0% | low |
| edit gpx track | 100 – 1K | Low | 0% / 0% | low |
| free gpx editor | 100 – 1K | Low | 0% / 0% | low |
| online gpx creator | 100 – 1K | Low | -90% / 0% | low |
| best gpx editor | 10 – 100 | Low | 0% / 0% | low |
| gpx editor open source | 10 – 100 | Low | 0% / 0% | medium |
| gpx text editor | 10 – 100 | Low | 0% / 0% | medium |
| gpx track editor online | 10 – 100 | Low | 0% / 0% | low |
| gpx waypoint editor | 10 – 100 | Low | 0% / 0% | low |

### Recommendation

- **Primary:** `edit gpx file`: Best volume (100-1K) among terms the package can honestly serve; mixed intent (many want a web editor), so lead with 'trim' and 'privacy' wording in the body.
- **Secondary:**
  - `trim gpx file`: 10-100, exact use case (cut start/end), high fit
  - `strava privacy zones`: 10-100, the real motivation, high fit
  - `gpx to geojson`: 100-1K, adjacent conversion query; fits parse/write API
  - `gpx parser`: 10-100, developer term, high fit
  - `gpx simplify`: 10-100, exact feature; ignore the +infinity YoY (bucket artefact)

**Flags:** gpx privacy, hide home location strava and remove timestamps from gpx have no measurable volume (still the best on-page phrasing). gpx editor and the online-editor ideas are consumer intent (low fit); the discovery list is dominated by them.


## 6. mcp-guardrails

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| mcp server | 100K – 1M | Low | 0% / 0% | medium |
| model context protocol | 10K – 100K | Low | 0% / 0% | medium |
| llm guardrails | 1K – 10K | Low | 0% / 0% | medium |
| mcp security | 1K – 10K | Medium | 0% / 0% | high |
| mcp tools | 1K – 10K | Low | +900% / 0% | medium |
| ai agent guardrails | 100 – 1K | Medium | 0% / 0% | medium |
| build mcp server | 100 – 1K | Low | 0% / -90% | medium |
| human in the loop ai agent | 100 – 1K | Low | +900% / 0% | medium |
| mcp server typescript | 100 – 1K | Low | 0% / 0% | high |
| mcp typescript sdk | 100 – 1K | Low | 0% / -90% | high |

### New ideas from Discover new keywords (seeds: mcp server, build mcp server, mcp security (then model context protocol, mcp server typescript, llm guardrails; then claude mcp, ai agent tools, agentic ai security); top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| claude mcp | 10K – 100K | Low | 0% / 0% | medium |
| agentic ai security | 1K – 10K | Medium | 0% / +900% | medium |
| ai agent tools | 1K – 10K | Medium | 0% / 0% | low |
| mcp site | 100 – 1K | Low | 0% / 0% | low (noise: Microsoft MCP cert) |
| mcp sql server | 100 – 1K | Low | 0% / 0% | low (noise) |

### Recommendation

- **Primary:** `mcp security`: Closest high-fit term with real volume (1K-10K); Medium competition, bids $3.84-$28 show commercial interest. Head terms mcp server (100K-1M) and model context protocol (10K-100K) are too broad to own.
- **Secondary:**
  - `llm guardrails`: 1K-10K, matches the safety framing, medium fit
  - `mcp server typescript`: 100-1K, high fit, matches the official TypeScript SDK integration
  - `mcp typescript sdk`: 100-1K, high fit, matches the SDK integration (YoY -90% is bucket drift)
  - `ai agent guardrails`: 100-1K, Medium competition, the buyer-language version
  - `human in the loop ai agent`: 100-1K, matches dry-run-then-confirm; +900% 3-month is a bucket artefact

**Flags:** Keyword Planner returned very few related ideas for MCP terms (mostly Microsoft MCP certification noise), so the discovery list is short. Use mcp server / model context protocol as context words in the description, not as targets.


## 7. safe-html-pdf

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| invoice pdf generator | 1K – 10K | Medium | 0% / 0% | low |
| playwright pdf | 1K – 10K | Low | 0% / -90% | high |
| generate pdf from html | 100 – 1K | Low | 0% / 0% | medium |
| html to pdf api | 100 – 1K | Low | 0% / 0% | low |
| html to pdf javascript | 100 – 1K | Low | 0% / -90% | high |
| html to pdf node | 100 – 1K | Low | 0% / -90% | high |
| puppeteer html to pdf | 100 – 1K | Low | -90% / -90% | high |
| puppeteer pdf | 100 – 1K | Low | 0% / -90% | high |
| convert html to pdf nodejs | 10 – 100 | Low | 0% / 0% | high |
| headless chrome pdf | 10 – 100 | Low | 0% / 0% | high |
| pdf generation nodejs | 10 – 100 | Low | 0% / 0% | high |

### New ideas from Discover new keywords (seeds: html to pdf node, playwright pdf, generate pdf from html; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| angular generate pdf from html | 10 – 100 | Medium | 0% / 0% | low |
| c# generate pdf from html | 10 – 100 | Medium | 0% / 0% | low (other language) |
| generate pdf from html javascript | 10 – 100 | Low | 0% / -90% | high |
| nodejs html to pdf | 10 – 100 | Low | 0% / -90% | high |

### Recommendation

- **Primary:** `playwright pdf`: Highest-volume exact-fit term (1K-10K, very low bids so mostly docs/developer traffic), directly names the engine.
- **Secondary:**
  - `html to pdf node`: 100-1K, core developer query
  - `html to pdf javascript`: 100-1K, core developer query
  - `puppeteer html to pdf`: 100-1K, people migrating from Puppeteer; the 'untrusted HTML' angle differentiates
  - `puppeteer pdf`: 100-1K, same audience
  - `generate pdf from html`: 100-1K, broad phrasing for the README

**Flags:** No candidate here is unmeasurable. Many show -90% YoY: this is a volume-bucket shift (e.g. 1K-10K to 100-1K), not a verified 90% drop; the trend is downward-to-flat. invoice pdf generator (1K-10K) and html to pdf api are consumer/SaaS intent (low fit). Discovery returned only 4 new ideas.


## 8. viewport-qa

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| cumulative layout shift | 1K – 10K | Low | 0% / 0% | medium |
| responsive design checker | 1K – 10K | Low | 0% / 0% | low |
| responsive design testing | 1K – 10K | Low | 0% / 0% | medium |
| visual regression testing | 1K – 10K | Low | 0% / 0% | medium |
| responsive testing tool | 100 – 1K | Low | 0% / 0% | medium |
| test website on different screen sizes | 100 – 1K | Low | 0% / 0% | medium |
| playwright responsive testing | 10 – 100 | Low | 0% / +∞ | high |
| viewport testing | 10 – 100 | Low | 0% / 0% | high |
| horizontal scroll fix | no data | – | – | medium |
| layout shift checker | no data | – | – | medium |

### New ideas from Discover new keywords (seeds: responsive design testing, test website on different screen sizes, layout shift checker; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| test responsive website | 1K – 10K | Low | 0% / -90% | medium |
| website responsive checker | 1K – 10K | Low | 0% / 0% | low |
| responsive test tool | 100 – 1K | Low | 0% / 0% | medium |
| responsive web design tester | 100 – 1K | Low | -90% / -90% | low |
| responsive design testing on real devices | 10 – 100 | Medium | 0% / 0% | low |

### Recommendation

- **Primary:** `responsive design testing`: Top-volume term that describes the job (1K-10K, Low competition); developer/QA intent is mixed with designers, medium fit.
- **Secondary:**
  - `visual regression testing`: 1K-10K, adjacent category the tool is an alternative to; competitive SERP (Playwright, Percy)
  - `cumulative layout shift`: 1K-10K, matches the layout-shift check; informational (web.dev), good for a supporting section
  - `test website on different screen sizes`: 100-1K, plain-language query for the viewport sweep
  - `responsive testing tool`: 100-1K, tool-seeking intent
  - `playwright responsive testing`: 10-100, exact stack match

**Flags:** layout shift checker and horizontal scroll fix have no measurable volume. responsive design checker / website responsive checker are consumer online tools (low fit). Only 5 new ideas returned.


## 9. active-window-sessions

### Candidate keywords (volume check)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| active-win (Google shows "active win") | 1K – 10K | Low | 0% / 0% | medium |
| automatic time tracking | 1K – 10K | Low | -90% / -90% | low |
| productivity tracker | 1K – 10K | Medium | 0% / 0% | low |
| time tracking app | 1K – 10K | Medium | 0% / -90% | low |
| app usage tracker | 100 – 1K | Low | 0% / 0% | low |
| rescuetime alternative | 100 – 1K | Low | +9,900% / +900% | low |
| screen time tracker mac | 10 – 100 | Low | 0% / 0% | low |
| track time spent on apps | 10 – 100 | Low | 0% / 0% | low |
| active window tracker | no data | – | – | medium |
| electron time tracking | no data | – | – | high |
| get active window nodejs | no data | – | – | high |

### New ideas from Discover new keywords (seeds: active window tracker, app usage tracker, automatic time tracking; top related ideas that fit, sorted by volume)

| keyword | avg monthly searches | competition | 3m / YoY | intent fit |
|---|---|---|---|---|
| automatic time tracking software | 1K – 10K | Low | -90% / -90% | low |
| auto time tracking app | 100 – 1K | Medium | -90% / 0% | low |
| automatic time tracking app | 100 – 1K | Medium | -90% / 0% | low |
| automatic time tracking mac | 10 – 100 | Medium | 0% / 0% | low |
| best automatic time tracking app | 10 – 100 | Medium | 0% / 0% | low |

### Recommendation

- **Primary:** `active-win`: Only developer-fit term with volume (1K-10K as 'active win'); Google strips the hyphen and the phrase is ambiguous, so confirm with Search Console data after launch. Every other measurable term is consumer time tracking.
- **Secondary:**
  - `app usage tracker`: 100-1K, closest descriptive phrase, medium-low fit (searchers want an app)
  - `track time spent on apps`: 10-100, describes the output
  - `screen time tracker mac`: 10-100, matches macOS helpers, low fit (consumer)
  - `get active window nodejs`: no measurable volume, exact developer phrase (keep for on-page use)
  - `rescuetime alternative`: 100-1K, +9,900% 3-month is a bucket artefact; consumer intent, low fit

**Flags:** active window tracker, get active window nodejs and electron time tracking have no measurable volume. The measurable terms (automatic time tracking, time tracking app, productivity tracker) are consumer app searches: low fit, do not optimise the page for them.
