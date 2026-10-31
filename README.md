# Annie — Selected Work

A responsive, pitch-dark portfolio for a software engineer and hobby developer. Built using plain HTML, CSS and JavaScript (no dependencies or build step).

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a **public** GitHub repository named `gengannie.github.io` (for the assumed GitHub username `gengannie`).
2. Upload **the contents** of this folder, including `.github/workflows/deploy.yml`, to the repository's `main` branch. GitHub's web uploader may hide dotfiles depending on your local system; using Git is most reliable.
3. Go to repository **Settings → Pages → Build and deployment**. Select **GitHub Actions** as the source.
4. The included workflow will deploy on each push. Visit `https://gengannie.github.io/` when the workflow succeeds.

Alternatively, name the repo anything and GitHub Pages will publish under `https://gengannie.github.io/<repo>/`; all local asset paths in this site are relative.

## Customize

- Update headings, copy and links in `index.html`.
- Change colors, illustrations and spacing in `styles.css`.
- The project visuals are original, CSS-built conceptual illustrations, **not** actual game screenshots. Replace with real project screenshots for higher fidelity when available.
- Demo buttons point to an older `chatgpt.site` deployment and may require that deployment to be publicly accessible. Host standalone demos under this repo or elsewhere to make the portfolio independent.
- Check external link URLs and project statuses prior to publishing.

## Accessibility

Includes semantic sections, visible focus states, reduced-motion support, a skip link, and responsive layouts.
