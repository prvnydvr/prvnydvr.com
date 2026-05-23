import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  BLOG_SEO,
  PAGE_SEO,
  PROJECT_SEO,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
  STATIC_ROUTES,
} from '../src/seoConfig.js';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');
const baseHtml = await readFile(indexPath, 'utf8');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const absoluteUrl = (routePath) => `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
const absoluteAsset = (assetPath) => `${SITE_URL}${assetPath.startsWith('/') ? assetPath : `/${assetPath}`}`;

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Praveen Yadav',
  alternateName: 'prvnydvr',
  url: SITE_URL,
  email: 'mailto:praveenyadav.contact@gmail.com',
  sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram],
  jobTitle: 'Student Builder',
  knowsAbout: [
    'Computer Science',
    'Frontend Development',
    'Product Design',
    '3D Design',
    'Firebase',
    'Supabase',
    'React',
    'Tailwind CSS',
    'Blender',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: 'prvnydvr',
  url: SITE_URL,
  inLanguage: 'en-IN',
  publisher: {
    '@id': `${SITE_URL}/#person`,
  },
};

const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const projectTitleFromMeta = (title) => title.split(' — ')[0];
const blogTitleFromMeta = (title) => title.replace(' — Praveen Yadav', '');

const schemaForRoute = (route) => {
  const canonicalUrl = absoluteUrl(route.path);
  const graph = [personSchema, websiteSchema];
  const projectEntry = Object.entries(PROJECT_SEO).find(([, value]) => value.path === route.path);
  const blogEntry = Object.entries(BLOG_SEO).find(([, value]) => value.path === route.path);

  if (route.path === PAGE_SEO.about.path) {
    graph.push({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: PAGE_SEO.about.title,
      url: canonicalUrl,
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    });
  }

  if (projectEntry) {
    const [, project] = projectEntry;
    const base = {
      '@context': 'https://schema.org',
      '@type': project.schemaType || 'CreativeWork',
      name: projectTitleFromMeta(project.title),
      description: project.description,
      creator: {
        '@id': `${SITE_URL}/#person`,
      },
      url: canonicalUrl,
    };
    graph.push(
      project.schemaType === 'SoftwareApplication'
        ? {
            ...base,
            applicationCategory: project.applicationCategory,
            operatingSystem: 'Web',
            codeRepository: project.repository,
          }
        : base,
      breadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Projects', url: absoluteUrl('/projects') },
        { name: projectTitleFromMeta(project.title), url: canonicalUrl },
      ]),
    );
  }

  if (blogEntry) {
    const [, blog] = blogEntry;
    graph.push(
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blogTitleFromMeta(blog.title),
        description: blog.description,
        author: {
          '@id': `${SITE_URL}/#person`,
        },
        datePublished: blog.datePublished,
        dateModified: blog.datePublished,
        image: absoluteAsset(blog.image),
        mainEntityOfPage: canonicalUrl,
      },
      breadcrumbSchema([
        { name: 'Home', url: absoluteUrl('/') },
        { name: 'Writing', url: absoluteUrl('/blog') },
        { name: blogTitleFromMeta(blog.title), url: canonicalUrl },
      ]),
    );
  }

  return graph.length === 1 ? graph[0] : { '@context': 'https://schema.org', '@graph': graph };
};

const replaceMeta = (html, route) => {
  const canonicalUrl = absoluteUrl(route.path);
  const imageUrl = absoluteAsset(route.image || '/og/default-og.png');
  const jsonLd = JSON.stringify(schemaForRoute(route));

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(route.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapeHtml(route.description)}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:type" content=".*?" \/>/s, `<meta property="og:type" content="${route.type || 'website'}" />`)
    .replace(/<meta property="og:site_name" content=".*?" \/>/s, `<meta property="og:site_name" content="${SITE_NAME}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${imageUrl}" />`)
    .replace(/<meta name="twitter:card" content=".*?" \/>/s, '<meta name="twitter:card" content="summary_large_image" />')
    .replace(/<meta name="twitter:title" content=".*?" \/>/s, `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/s, `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`)
    .replace(/<meta name="twitter:image" content=".*?" \/>/s, `<meta name="twitter:image" content="${imageUrl}" />`)
    .replace(
      /<script id="seo-jsonld-static" type="application\/ld\+json">.*?<\/script>/s,
      `<script id="seo-jsonld-static" type="application/ld+json">${jsonLd}</script>`,
    );
};

const writeRoute = async (route) => {
  const html = replaceMeta(baseHtml, route);
  if (route.path === '/') {
    await writeFile(indexPath, html);
    return;
  }

  const routeDir = path.join(distDir, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, 'index.html'), html);
};

for (const route of STATIC_ROUTES) {
  await writeRoute(route);
}

await writeFile(path.join(distDir, '404.html'), replaceMeta(baseHtml, PAGE_SEO['404']));

console.log(`SEO prerendered ${STATIC_ROUTES.length} route HTML files plus 404.html.`);
