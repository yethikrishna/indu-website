import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.resolve(process.cwd(), 'src/content/docs');

export interface DocMeta {
  slug: string;
  title: string;
  description: string;
  order: number;
  section: string;
}

export interface DocSection {
  title: string;
  items: DocMeta[];
}

function formatSectionTitle(dirName: string) {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getDocsTree(): DocSection[] {
  const sections: DocSection[] = [];
  
  if (!fs.existsSync(contentDir)) return [];

  const dirs = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory());

  // Define exact section ordering
  const sectionOrder = ['getting-started', 'core-concepts', 'framework', 'cli', 'api'];

  const sortedDirs = dirs.sort((a, b) => {
    const indexA = sectionOrder.indexOf(a.name);
    const indexB = sectionOrder.indexOf(b.name);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const dir of sortedDirs) {
    const dirPath = path.join(contentDir, dir.name);
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.md'));
    
    const items: DocMeta[] = files.map(file => {
      const filePath = path.join(dirPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      return {
        slug: `${dir.name}/${file.replace('.md', '')}`,
        title: data.title || file.replace('.md', ''),
        description: data.description || '',
        order: data.order || 99,
        section: formatSectionTitle(dir.name)
      };
    });

    items.sort((a, b) => a.order - b.order);

    sections.push({
      title: formatSectionTitle(dir.name),
      items
    });
  }

  return sections;
}

export function getAllDocsFlat(): DocMeta[] {
  const tree = getDocsTree();
  return tree.flatMap(section => section.items);
}
