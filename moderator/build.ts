import { existsSync, rmSync, mkdirSync, copySync } from 'fs-extra';
import { join } from 'path';
import apps from './apps.config.json';

const ROOT_DIR = join(__dirname, '..');
const BUILD_DIR = join(ROOT_DIR, 'build');
const APPS_DIR = join(ROOT_DIR, 'apps');
const STATIC_PATH = 'static';

if (existsSync(BUILD_DIR)) {
  rmSync(BUILD_DIR, { recursive: true });
}

mkdirSync(BUILD_DIR);

apps.forEach(({ name, path, output }) => {
  console.log(`Copying ${name} output artifacts...`);
  copySync(join(APPS_DIR, name, output), join(BUILD_DIR, path));
});

console.log(`Copying static assets...`);
copySync(join(ROOT_DIR, STATIC_PATH), join(BUILD_DIR, STATIC_PATH));
