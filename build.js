const fs = require("fs");
const path = require("path");
const { minify: minifyHtml } = require("html-minifier");
const postcss = require("postcss");
const cssnano = require("cssnano");
const { minify: minifyJs } = require("terser");

const distDir = path.join(__dirname, "dist");

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// 1. Minify HTML
async function buildHtml() {
  const htmlPath = path.join(__dirname, "index.html");
  let html = fs.readFileSync(htmlPath, "utf-8");

  // Update paths in HTML to work from dist
  html = html.replace('href="style.css"', 'href="style.min.css"');
  html = html.replace('src="script.js"', 'src="script.min.js"');

  const minified = minifyHtml(html, {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true,
    minifyJS: true,
    minifyCSS: true,
  });

  fs.writeFileSync(path.join(distDir, "index.html"), minified);
  console.log("✓ HTML minified: dist/index.html");
}

// 2. Minify CSS
async function buildCss() {
  const cssPath = path.join(__dirname, "style.css");
  const css = fs.readFileSync(cssPath, "utf-8");

  const result = await postcss([cssnano()]).process(css, { from: cssPath });

  fs.writeFileSync(path.join(distDir, "style.min.css"), result.css);
  console.log("✓ CSS minified: dist/style.min.css");
}

// 3. Minify JavaScript
async function buildJs() {
  const jsPath = path.join(__dirname, "script.js");
  const js = fs.readFileSync(jsPath, "utf-8");

  const result = await minifyJs({
    "script.js": js,
  });

  fs.writeFileSync(path.join(distDir, "script.min.js"), result.code);
  console.log("✓ JavaScript minified: dist/script.min.js");
}

// 4. Copy letters folder
function copyLetters() {
  const lettersDir = path.join(__dirname, "letters");
  const distLettersDir = path.join(distDir, "letters");

  if (fs.existsSync(lettersDir)) {
    fs.rmSync(distLettersDir, { recursive: true, force: true });
    fs.cpSync(lettersDir, distLettersDir, { recursive: true });
    console.log("✓ Letters folder copied: dist/letters/");
  }
}

// Run build
async function build() {
  console.log("🔨 Building minified distribution...\n");

  try {
    buildHtml();
    await buildCss();
    await buildJs();
    copyLetters();

    console.log("\n✅ Build complete! Files ready in dist/");
  } catch (error) {
    console.error("❌ Build failed:", error);
    process.exit(1);
  }
}

build();
