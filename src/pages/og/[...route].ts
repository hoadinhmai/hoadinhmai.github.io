import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { filterPublished } from '../../utils/posts';
import { truncate } from '../../utils/text';

// Social preview images (1200x630) for every published post, plus a site-wide
// default at /og/index.png. Colors follow the dark theme in global.css.
const posts = filterPublished(await getCollection('blog'));

const pages: Record<string, { title: string; description: string }> = {
  index: { title: 'Hoa Mai', description: 'Cloud engineering notes on AWS, security, and platform teams.' },
  ...Object.fromEntries(
    posts.map((post) => [`blog/${post.id}`, { title: post.data.title, description: post.data.description }]),
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: truncate(page.description, 150),
    bgGradient: [[15, 23, 42], [30, 41, 59]],
    border: { color: [129, 140, 248], width: 16, side: 'inline-start' },
    padding: 72,
    fonts: ['./src/assets/fonts/inter-latin-700.ttf', './src/assets/fonts/inter-latin-400.ttf'],
    font: {
      title: { families: ['Inter'], weight: 'Bold', size: 64, lineHeight: 1.15, color: [226, 232, 240] },
      description: { families: ['Inter'], weight: 'Normal', size: 32, lineHeight: 1.4, color: [148, 163, 184] },
    },
  }),
});
