import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { Package } from '@lough/npm-operate';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const root = new Package({ dirName: join(__dirname, '../') });

const dependencies = root.readConfig().dependencies;

const copy = (fromDir, toDir) => {
  if (!existsSync(fromDir)) return;

  if (lstatSync(fromDir).isFile()) {
    copyFileSync(fromDir, toDir);
  } else {
    if (!existsSync(toDir)) mkdirSync(toDir);
    const paths = readdirSync(fromDir);
    for (const filePath of paths) {
      copy(join(fromDir, filePath), join(toDir, filePath));
    }
  }
};

const autoMkdir = path => {
  let p = '';
  for (const partPath of path.split(`\\`)) {
    p = (p ? p + '\\' : '') + partPath;
    if (!existsSync(p)) mkdirSync(p);
  }
};

for (const moduleName in dependencies) {
  const module = new Package({ dirName: join(root.options.dirName, 'node_modules', moduleName) });
  const miniprogram = 'lib';
  // const miniprogram = module.readConfig().miniprogram;
  // if (!miniprogram) continue;

  const fromDir = join(module.options.dirName, miniprogram);
  if (!existsSync(fromDir)) throw new Error(`cannot find from dir: ${fromDir}`);

  const toDir = join(__dirname, '../src', 'miniprogram_npm', moduleName);
  if (!existsSync(toDir)) autoMkdir(toDir);

  copy(join(module.options.dirName, miniprogram), toDir);
}

console.log('\n自动扫描构建 NPM 成功.');
