# Deploy to Vercel

Import this repository into Vercel, or open its existing Vercel project.

- Framework preset: Vite
- Root directory: the directory containing this package.json
- Install command: npm ci
- Build command: npm run build
- Output directory: dist

Preserve the project's existing environment variables. Add triosis.in in the
project's Domains settings if it is not already connected, then apply the DNS
records Vercel shows for that domain.

Deploy the branch containing these files using the project's Git integration.
For CLI deployment from this directory, run:

```sh
npx vercel login
npx vercel link
npx vercel --prod
```

Select the existing project that serves triosis.in when linking.

After deployment, confirm these URLs return the actual files rather than the
React application:

- https://triosis.in/sitemap.xml
- https://triosis.in/robots.txt
- https://triosis.in/google68da7a3fb2e4bdfa.html

Submit https://triosis.in/sitemap.xml in Google Search Console's Sitemaps page.
Keep the verification HTML file deployed after verification succeeds.

The sitemap includes the nine built-in public routes in src/routes.js. Update
public/sitemap.xml when adding or removing public routes, including published
CMS pages. Do not include editor or preview URLs.
