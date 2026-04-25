import { promises as fs } from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'data', 'videoConfig.json');

export async function readVideoConfig() {
  try {
    const file = await fs.readFile(configPath, 'utf8');
    return JSON.parse(file);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { videos: [] };
    }
    throw error;
  }
}

export async function writeVideoConfig(config) {
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
  return config;
}

export async function getVideoConfigMap() {
  const config = await readVideoConfig();
  return new Map((config.videos || []).map((item) => [item.videoId, item]));
}

export async function getEnabledVideoIds() {
  const config = await readVideoConfig();
  return new Set((config.videos || []).filter((item) => item.enabled).map((item) => item.videoId));
}
