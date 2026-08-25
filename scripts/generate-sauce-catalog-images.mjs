import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, renameSync, statSync, unlinkSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = resolve(process.argv[2] ?? "/tmp/pdfs/deesheng/extracted");
const outputDir = join(projectRoot, "public/media/catalog-products/sauces");
const products = JSON.parse(readFileSync(join(projectRoot, "app/data/sauce-catalog.json"), "utf8"));

const row = (xs, y, width, height) => xs.map((x) => ({ x, y, width, height }));
const pageCrops = {
  4: [...row([170, 575, 960], 230, 312, 225), ...row([140, 470, 785, 1100], 690, 312, 225)],
  5: [...row([50, 520, 990], 175, 408, 295), ...row([20, 350, 690, 1020], 650, 415, 300)],
  6: [...row([250, 775], 165, 408, 295), ...row([60, 500, 970], 650, 415, 300)],
  7: [...row([50, 520, 930], 180, 415, 300), ...row([50, 500, 900], 650, 415, 300)],
  8: [...row([335, 830], 180, 388, 280), ...row([330, 830], 650, 422, 305)],
  9: [...row([110, 560, 1000], 160, 408, 295), ...row([50, 500, 950], 650, 408, 295)],
  10: [...row([50, 500, 950], 165, 408, 295), ...row([50, 500, 950], 650, 408, 295)],
  11: [...row([50, 500, 950], 175, 415, 300), ...row([50, 440, 850], 650, 408, 295)],
  12: [...row([60, 500, 980], 185, 415, 300), ...row([80, 535, 1000], 665, 395, 285)],
  13: [...row([270, 830], 175, 395, 285), ...row([50, 500, 950], 650, 415, 300)],
  14: [...row([150, 560, 950], 210, 346, 250), ...row([130, 540, 950], 660, 422, 305)],
  15: [
    ...row([120, 530, 950], 160, 430, 311),
    { x: 40, y: 690, width: 345, height: 249 },
    ...row([370, 700, 1030], 680, 360, 260),
  ],
  16: [...row([210, 600, 1000], 165, 408, 295), ...row([20, 350, 690, 1030], 650, 400, 289)],
  17: [
    { x: 100, y: 170, width: 360, height: 260 },
    { x: 450, y: 100, width: 457, height: 330 },
    { x: 850, y: 120, width: 457, height: 330 },
    ...row([100, 500, 900], 630, 420, 303),
  ],
  18: [...row([80, 500, 950], 170, 455, 329), ...row([100, 550, 1000], 700, 360, 260)],
  19: [...row([110, 530, 950], 190, 374, 270), ...row([120, 540, 950], 640, 360, 260)],
  20: [...row([130, 560, 990], 190, 346, 250), ...row([120, 540, 980], 640, 388, 280)],
  21: [...row([130, 540, 980], 190, 360, 260), ...row([130, 540, 980], 640, 374, 270)],
  22: [...row([100, 500, 930], 175, 339, 245), ...row([100, 500, 930], 610, 374, 270)],
};

mkdirSync(outputDir, { recursive: true });

for (const product of products) {
  const crop = pageCrops[product.page]?.[product.slot - 1];
  if (!crop) throw new Error(`Missing crop for PDF page ${product.page}, slot ${product.slot}`);

  const source = join(sourceDir, `page-${String(product.page - 1).padStart(3, "0")}.jpg`);
  const output = join(outputDir, `${product.image}.webp`);
  const temporaryOutput = `${output}.tmp.webp`;
  let generated = false;

  for (let attempt = 1; attempt <= 3 && !generated; attempt += 1) {
    try { unlinkSync(temporaryOutput); } catch {}
    execFileSync("convert", [
      source,
      "-crop", `${crop.width}x${crop.height}+${crop.x}+${crop.y}`,
      "+repage",
      "-filter", "Lanczos",
      "-resize", "900x650!",
      "-unsharp", "0x0.6+0.55+0.02",
      "-quality", "90",
      "-define", "webp:method=6",
      temporaryOutput,
    ], { env: { ...process.env, MAGICK_THREAD_LIMIT: "1" } });

    generated = statSync(temporaryOutput).size > 1_000;
  }

  if (!generated) throw new Error(`ImageMagick produced an invalid file for ${product.image}`);
  renameSync(temporaryOutput, output);
}

console.log(`Generated ${products.length} catalogue images in ${outputDir}`);
