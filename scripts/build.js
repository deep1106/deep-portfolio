const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(process.cwd());
const distDir = path.join(rootDir, 'dist');

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}
fs.mkdirSync(distDir, { recursive: true });

const copyRecursive = (src, dest) => {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((file) => {
      copyRecursive(path.join(src, file), path.join(dest, file));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

['public', 'functions'].forEach((dir) => {
  const src = path.join(rootDir, dir);
  const dest = path.join(distDir, dir);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing source directory: ${src}`);
  }
  copyRecursive(src, dest);
});

// Ensure index.html and graphify visualizers are served from root
['index.html', 'graph.html'].forEach((file) => {
  const src = path.join(distDir, 'public', file);
  const dest = path.join(distDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
});

const publicGraphify = path.join(distDir, 'public', 'graphify-out');
const rootGraphify = path.join(distDir, 'graphify-out');
if (fs.existsSync(publicGraphify) && !fs.existsSync(rootGraphify)) {
  copyRecursive(publicGraphify, rootGraphify);
}

console.log('Build complete!');
