import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDocsTree, getAllDocsFlat } from '$lib/docs/api';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const load: PageServerLoad = async ({ params }) => {
  const slug = params.slug;
  const filePath = path.resolve(process.cwd(), `src/content/docs/${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw error(404, 'Documentation page not found');
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const tree = getDocsTree();
  const flatDocs = getAllDocsFlat();
  
  // Find current index for Prev/Next
  const currentIndex = flatDocs.findIndex(doc => doc.slug === slug);
  const prev = currentIndex > 0 ? flatDocs[currentIndex - 1] : null;
  const next = currentIndex < flatDocs.length - 1 ? flatDocs[currentIndex + 1] : null;

  return {
    slug,
    title: data.title,
    description: data.description,
    content,
    tree,
    prev,
    next
  };
};
