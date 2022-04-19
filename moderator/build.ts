import { existsSync, rmSync, mkdirSync, copySync } from 'fs-extra';
import { join } from 'path';
import apps from './apps.config.json';
import assets from './assets.config.json';

const ROOT_DIR = join(__dirname, '..');
const BUILD_DIR = join(ROOT_DIR, 'build');
const APPS_DIR = join(ROOT_DIR, 'apps');

if (existsSync(BUILD_DIR)) {
  rmSync(BUILD_DIR, { recursive: true });
}

mkdirSync(BUILD_DIR);

apps.forEach(({ name, path, output, excludeFromProduction }) => {
  if (process.env.BUILD_ENV !== 'PRODUCTION' || !excludeFromProduction) {
    console.log(`Copying ${name} output artifacts...`);
    copySync(join(APPS_DIR, name, output), join(BUILD_DIR, path));
  } else {
    console.log(`Skipping ${name} output artifacts...`);
  }
});

assets.forEach(({ name, source, serve }) => {
  console.log(`Copying ${name} assets...`);
  copySync(join(ROOT_DIR, source), join(BUILD_DIR, serve));
});
