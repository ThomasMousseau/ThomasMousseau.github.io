import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = true;

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const sorted = posts.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const body = JSON.stringify(
    sorted.map((p) => ({
      slug: p.data.slug,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date.toISOString(),
      heroImage: p.data.heroImage ?? null,
    })),
  );
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
};
