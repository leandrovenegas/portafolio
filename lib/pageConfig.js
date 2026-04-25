import { promises as fs } from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'pageConfig.json');

export async function readPageConfig() {
  try {
    const file = await fs.readFile(configPath, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Return default basic structure if it doesn't exist
      return {
        pages: {
          videos: {
            title: 'Videos',
            description: 'Colección de videos seleccionados para tu página. Solo se muestran los videos activados en el panel de configuración.'
          }
        }
      };
    }
    throw error;
  }
}

export async function writePageConfig(config) {
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
  return config;
}

export async function getPageText(pageKey) {
  const config = await readPageConfig();
  return config.pages?.[pageKey] || null;
}
