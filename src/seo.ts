import { BlogPost, Project } from './types';
import {
  BLOG_SEO,
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  PROJECT_SEO,
  PROJECT_SLUG_ALIASES,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LINKS,
} from './seoConfig.js';

type RouteName = 'home' | 'projects' | 'blog' | '3d' | 'about' | 'resume' | 'contact' | '404';

interface ParsedRoute {
  route: RouteName;
  slug: string;
}

interface SeoInput {
  route: string;
  slug?: string;
  project?: Project;
  blog?: BlogPost;
  isNotFound?: boolean;
}

interface SeoState {
  title: string;
  description: string;
  canonicalPath: string;
  canonicalUrl: string;
  imagePath: string;
  imageUrl: string;
  type: string;
  jsonLd: object[];
}

const validRoutes = new Set<RouteName>(['home', 'projects', 'blog', '3d', 'about', 'resume', 'contact', '404']);

export const normalizeProjectSlug = (slug = '') => {
  return PROJECT_SLUG_ALIASES[slug as keyof typeof PROJECT_SLUG_ALIASES] || slug;
};

export const getAbsoluteUrl = (path = '/') => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === '/' ? '/' : cleanPath}`;
};

export const getAssetUrl = (path = DEFAULT_OG_IMAGE) => {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
};

export const getRoutePath = (route: string, slug = '') => {
  if (route === 'home' || route === '') return '/';
  if (route === 'projects' && slug) return `/projects/${normalizeProjectSlug(slug)}`;
  if (route === 'blog' && slug) return `/blog/${slug}`;
  if (route === 'projects') return '/projects';
  if (route === 'blog') return '/blog';
  if (route === '3d') return '/3d';
  if (route === 'about') return '/about';
  if (route === 'resume') return '/resume';
  if (route === 'contact') return '/contact';
  return '/404';
};

export const getProjectPath = (slug: string) => getRoutePath('projects', slug);
export const getBlogPath = (slug: string) => getRoutePath('blog', slug);

export const parseLocationToRoute = (location: Location): ParsedRoute => {
  const rawHash = location.hash.startsWith('#/') ? location.hash.slice(1) : '';
  const rawPath = rawHash || location.pathname || '/';
  const path = rawPath.replace(/\/+$/, '') || '/';
  const parts = path.split('/').filter(Boolean);

  if (parts.length === 0) return { route: 'home', slug: '' };
  if (parts[0] === 'home') return { route: 'home', slug: '' };
  if (parts[0] === 'projects') return { route: 'projects', slug: normalizeProjectSlug(parts[1] || '') };
  if (parts[0] === 'blog') return { route: 'blog', slug: parts[1] || '' };
  if (parts.length === 1 && validRoutes.has(parts[0] as RouteName)) {
    return { route: parts[0] as RouteName, slug: '' };
  }

  return { route: '404', slug: '' };
};

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

const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

const projectSchema = (project: Project, canonicalUrl: string) => {
  const projectSeo = PROJECT_SEO[project.slug as keyof typeof PROJECT_SEO];
  const base = {
    '@context': 'https://schema.org',
    '@type': projectSeo?.schemaType || 'CreativeWork',
    name: project.title,
    description: project.shortDescription,
    creator: {
      '@id': `${SITE_URL}/#person`,
    },
    url: canonicalUrl,
  };

  if (projectSeo?.schemaType === 'SoftwareApplication') {
    return {
      ...base,
      applicationCategory: projectSeo.applicationCategory || project.category,
      operatingSystem: 'Web',
      codeRepository: projectSeo.repository || project.links.github,
    };
  }

  return base;
};

const blogSchema = (post: BlogPost, canonicalUrl: string, imageUrl: string) => {
  const blogSeo = BLOG_SEO[post.slug as keyof typeof BLOG_SEO];
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@id': `${SITE_URL}/#person`,
    },
    datePublished: blogSeo?.datePublished || `${post.date}-01-01`,
    dateModified: blogSeo?.datePublished || `${post.date}-01-01`,
    image: imageUrl,
    mainEntityOfPage: canonicalUrl,
  };
};

export const getSeoState = ({ route, slug = '', project, blog, isNotFound }: SeoInput): SeoState => {
  if (isNotFound || route === '404') {
    const meta = PAGE_SEO['404'];
    return buildSeoState(meta, [personSchema, websiteSchema]);
  }

  if (route === 'projects' && project) {
    const projectMeta = PROJECT_SEO[project.slug as keyof typeof PROJECT_SEO];
    const meta = projectMeta || {
      title: `${project.title} — Praveen Yadav`,
      description: project.shortDescription,
      path: getProjectPath(project.slug),
      image: DEFAULT_OG_IMAGE,
      type: 'website',
    };
    const state = buildSeoState({ ...meta, type: 'website' }, []);
    return {
      ...state,
      jsonLd: [
        personSchema,
        websiteSchema,
        projectSchema(project, state.canonicalUrl),
        breadcrumbSchema([
          { name: 'Home', url: getAbsoluteUrl('/') },
          { name: 'Projects', url: getAbsoluteUrl('/projects') },
          { name: project.title, url: state.canonicalUrl },
        ]),
      ],
    };
  }

  if (route === 'blog' && blog) {
    const blogMeta = BLOG_SEO[blog.slug as keyof typeof BLOG_SEO];
    const meta = blogMeta || {
      title: `${blog.title} — Praveen Yadav`,
      description: blog.excerpt,
      path: getBlogPath(blog.slug),
      image: '/og/blog-og.png',
      type: 'article',
    };
    const state = buildSeoState({ ...meta, type: 'article' }, []);
    return {
      ...state,
      jsonLd: [
        personSchema,
        websiteSchema,
        blogSchema(blog, state.canonicalUrl, state.imageUrl),
        breadcrumbSchema([
          { name: 'Home', url: getAbsoluteUrl('/') },
          { name: 'Writing', url: getAbsoluteUrl('/blog') },
          { name: blog.title, url: state.canonicalUrl },
        ]),
      ],
    };
  }

  const routeKey = (route || 'home') as keyof typeof PAGE_SEO;
  const meta = PAGE_SEO[routeKey] || PAGE_SEO.home;
  const state = buildSeoState(meta, []);
  const jsonLd: object[] = [personSchema, websiteSchema];

  if (route === 'about') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      name: PAGE_SEO.about.title,
      url: state.canonicalUrl,
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    });
  }

  return {
    ...state,
    jsonLd,
  };
};

const buildSeoState = (
  meta: { title: string; description: string; path: string; image?: string; type?: string },
  jsonLd: object[],
): SeoState => {
  const imagePath = meta.image || DEFAULT_OG_IMAGE;
  return {
    title: meta.title,
    description: meta.description,
    canonicalPath: meta.path,
    canonicalUrl: getAbsoluteUrl(meta.path),
    imagePath,
    imageUrl: getAssetUrl(imagePath),
    type: meta.type || 'website',
    jsonLd,
  };
};

const upsertMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
};

export const applySeo = (input: SeoInput) => {
  const seo = getSeoState(input);

  document.title = seo.title;
  upsertMeta('meta[name="description"]', 'name', 'description', seo.description);
  upsertMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seo.canonicalUrl);

  upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
  upsertMeta('meta[property="og:type"]', 'property', 'og:type', seo.type);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonicalUrl);
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', seo.imageUrl);
  upsertMeta('meta[property="og:site_name"]', 'property', 'og:site_name', SITE_NAME);

  upsertMeta('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.imageUrl);

  let jsonLd = document.head.querySelector<HTMLScriptElement>('script#seo-jsonld-static');
  if (!jsonLd) {
    jsonLd = document.createElement('script');
    jsonLd.id = 'seo-jsonld-static';
    jsonLd.type = 'application/ld+json';
    document.head.appendChild(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(
    seo.jsonLd.length === 1 ? seo.jsonLd[0] : { '@context': 'https://schema.org', '@graph': seo.jsonLd },
  );

  return seo;
};
