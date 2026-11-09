# earthbbmp.github.io

Personal website of **Suphachat Sriharan** (Earth), an engineering student at Chulalongkorn University (ISE) working on robots, AI systems and software.

**Live:** https://earthbbmp.github.io

<picture>
  <source media="(prefers-color-scheme: dark)" srcset=".github/preview-dark.jpg">
  <img alt="Home page: 'Keeping it down to Earth' next to a globe centred on Bangkok" src=".github/preview-light.jpg">
</picture>

## Pages

| Path | What's there |
| --- | --- |
| `/` | Globe hero, about, experience, selected work, research, honours, writing |
| `/work` | All projects by year, filterable by robotics / AI / software |
| `/research` | Papers, with code links |
| `/writing` | Posts from Medium |
| `/about` | Bio, full experience, education, skills, CV download |

## Built with

- Plain HTML, CSS and JavaScript. No framework and no build step.
- [d3-geo](https://github.com/d3/d3-geo) and [topojson-client](https://github.com/topojson/topojson-client) for the globe, with map data from [world-atlas](https://github.com/topojson/world-atlas).
- Poppins, Figtree, IBM Plex Mono and Courgette from Google Fonts, plus Prompt and IBM Plex Sans Thai for Thai text.
- Night and day themes, following the system setting until you pick one.
- Hosted on GitHub Pages.

## Structure

```
.
├── index.html          home
├── work.html
├── research.html
├── writing.html
├── about.html
├── 404.html
└── assets/
    ├── css/style.css   all styles, theme colours at the top
    ├── js/main.js      theme toggle, nav, work filters
    ├── js/sky.js       stars and globe on the home page
    ├── vendor/         d3-geo, topojson, world map data, LICENSES.txt
    ├── img/            banner, favicon, writing covers
    └── docs/           CV (PDF)
```

## Running locally

Open `index.html` in a browser. Nothing to install.

To serve it instead:

```sh
python -m http.server 8000
```

then go to http://localhost:8000.

## Editing

| To change | Edit |
| --- | --- |
| Projects | `work.html`. Each project is an `<article class="entry">` with `data-cat` set to `robotics`, `ai` or `software`. |
| Papers | `research.html` |
| Posts | `writing.html`, with the cover image in `assets/img/writing/` |
| CV | Replace `assets/docs/Suphachat_Sriharan_CV.pdf` |
| Colours | CSS variables at the top of `assets/css/style.css` |

## Deploying

Push to `main`. GitHub Pages publishes the site in about a minute, and serves pages without the `.html` extension (`/work`, `/about`).

## Credits

- d3-array, d3-geo, topojson-client and world-atlas by Mike Bostock, ISC license. d3-geo includes GeographicLib by Charles Karney, MIT license. Full texts are in [`assets/vendor/LICENSES.txt`](assets/vendor/LICENSES.txt).
- Map data from [Natural Earth](https://www.naturalearthdata.com/), public domain.
- Fonts from [Google Fonts](https://fonts.google.com/), SIL Open Font License.
- Writing cover photos by Janis Ringli and madeleine craine on [Unsplash](https://unsplash.com/).

## License

Text, CV and images © 2026 Suphachat Sriharan. Third-party code and fonts keep their own licenses, listed above.
