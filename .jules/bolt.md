## 2026-09-26 - Mousemove Event Optimization
**Learning:** The custom cursor implementation spawned a new setTimeout on every single mousemove event, which causes severe memory allocation overhead and jank on lower-end devices.
**Action:** Use requestAnimationFrame and cache the mouse coordinates to update UI components smoothly without overwhelming the event loop.
## 2026-09-26 - GitHub Actions Cloudflare Deployment
**Learning:** The deploy command `pages project create` does not deploy code; it only ensures the project exists on Cloudflare Pages. Deployment of files requires the `pages deploy` command. Additionally, Wrangler deployments fail silently on unbuilt dist directories unless preceded by `npm run build`.
**Action:** Use `npx wrangler pages deploy dist --project-name <name> --branch main` and ensure the build script is run immediately prior.
