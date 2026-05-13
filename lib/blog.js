import fs from 'fs/promises';
import path from 'path';

const blogDirectory = path.join(process.cwd(), 'public', 'content', 'blog');

export async function getBlogPosts() {
  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.md'))
        .map(async (file) => {
          const filePath = path.join(blogDirectory, file);
          const content = await fs.readFile(filePath, 'utf8');
          const slug = file.replace(/\.md$/, '');
          
          // Simple frontmatter parser
          const match = content.match(/^---\n([\s\S]*?)\n---/);
          const frontmatterRaw = match ? match[1] : '';
          const body = match ? content.slice(match[0].length).trim() : content;
          
          const frontmatter = {};
          frontmatterRaw.split('\n').forEach((line) => {
            const [key, ...value] = line.split(':');
            if (key && value) {
              frontmatter[key.trim()] = value.join(':').trim();
            }
          });

          return {
            slug,
            body,
            ...frontmatter,
          };
        })
    );

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const filePath = path.join(blogDirectory, `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf8');
    
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatterRaw = match ? match[1] : '';
    const body = match ? content.slice(match[0].length).trim() : content;
    
    const frontmatter = {};
    frontmatterRaw.split('\n').forEach((line) => {
      const [key, ...value] = line.split(':');
      if (key && value) {
        frontmatter[key.trim()] = value.join(':').trim();
      }
    });

    return {
      slug,
      body,
      ...frontmatter,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
