import { existsSync, rmdirSync, mkdirSync, copySync } from 'fs-extra';
import { join } from 'path';
import apps from './apps.config.json';

const ROOT_DIR = join(__dirname, '..');
const BUILD_DIR = join(ROOT_DIR, 'build');
const APPS_DIR = join(ROOT_DIR, 'apps');

if (existsSync(BUILD_DIR)) {
  rmdirSync(BUILD_DIR);
}

mkdirSync(BUILD_DIR);

apps.forEach(({ name, path, output }) => {
  console.log(`Copying ${name} output artifacts...`);

  copySync(join(APPS_DIR, name, output), join(BUILD_DIR, path));
});
