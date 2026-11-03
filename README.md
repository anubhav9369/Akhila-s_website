# P. V. Akhila — Personal Brand Website

A dual-profile personal website for **P. V. Akhila** — storyteller, author of
*Pragma: A Soulful Journey of Love*, and quantum machine learning researcher.

## Two worlds. One Akhila.

One toggle switches the entire site between two fully separate profiles:

- **The Storyteller** — soft light pink/beige "day" theme: year-by-year storytelling
  journey, the *Pragma* book section with a 3D CSS cover, stages & shows, and a
  storytelling-only contact card.
- **The Quantum Mind** — minimal dark "night" theme: tech trajectory timeline,
  the Lab (projects link out to GitHub), core stack, certifications, and a
  research-only contact card with LinkedIn + GitHub.

The toggle caption reads *"Meet the other Akhila"* — it is the only bridge
between the two profiles.

## Highlights

- Interactive **Three.js 3D hero**: a floating open book with orbiting pages and
  gold particles on the story side morphs into a wireframe quantum lattice with
  orbiting qubits on the tech side; particles react to the cursor.
- Creative **year-by-year timelines**, one per profile, rendered from data.
- Theme memory via `localStorage`; fully responsive with a mobile nav.

## Run it

No build step — it's static. Either open `index.html` directly, or serve the
folder:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

To go live on GitHub Pages: repo **Settings → Pages → Deploy from a branch →
`main` / root**.

## Files

| File           | What it is                                  |
|----------------|---------------------------------------------|
| `index.html`   | All sections and both profile copies        |
| `styles.css`   | Day/night theme system + layout             |
| `app.js`       | 3D hero, toggle, timeline data + rendering  |
| `assets/`      | Stage/show photography                      |
