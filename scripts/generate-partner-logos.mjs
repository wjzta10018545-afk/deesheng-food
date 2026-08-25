import { mkdirSync, rmSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { spawnSync } from "node:child_process";

const [koreanBoard, globalBoard, outputDirectory = "public/media/partners"] = process.argv.slice(2);

if (!koreanBoard || !globalBoard) {
  console.error("Usage: node scripts/generate-partner-logos.mjs <korean-board.png> <global-board.png> [output-directory]");
  process.exit(1);
}

const logos = [
  { slug: "nongshim", source: koreanBoard, crop: "250x180+112+160" },
  { slug: "sias", source: koreanBoard, crop: "245x180+410+155" },
  { slug: "midangnae", source: koreanBoard, crop: "215x175+705+155" },
  { slug: "cj", source: koreanBoard, crop: "280x180+995+150" },
  { slug: "cu", source: koreanBoard, crop: "235x160+1355+170" },
  { slug: "hwangbo-village", source: koreanBoard, crop: "220x205+112+355" },
  { slug: "myeong-ryun-jinsa", source: koreanBoard, crop: "290x215+355+350" },
  { slug: "haessalchan", source: koreanBoard, crop: "200x215+690+350" },
  { slug: "deoksugung", source: koreanBoard, crop: "320x215+960+350" },
  { slug: "korean-color-mark", source: koreanBoard, crop: "240x220+1340+350" },
  { slug: "daesang", source: koreanBoard, crop: "225x230+105+590" },
  { slug: "sempio", source: koreanBoard, crop: "490x170+345+630" },
  { slug: "fresh-village", source: koreanBoard, crop: "210x225+870+575" },
  { slug: "ongukmin", source: koreanBoard, crop: "325x200+1120+600" },
  { slug: "gaya-kimchi", source: koreanBoard, crop: "305x150+1495+625" },
  { slug: "farmpia", source: koreanBoard, crop: "280x190+85+855" },
  { slug: "gidae-manjok", source: koreanBoard, crop: "310x140+390+845" },
  { slug: "cheonnyeon-banchan", source: koreanBoard, crop: "350x175+735+835" },
  { slug: "ottogi", source: koreanBoard, crop: "260x245+1080+805" },
  { slug: "modeun-banchan", source: koreanBoard, crop: "285x180+1410+825" },

  { slug: "tesco", source: globalBoard, crop: "270x175+455+55" },
  { slug: "aldi", source: globalBoard, crop: "190x195+790+55" },
  { slug: "hela", source: globalBoard, crop: "290x200+995+55" },
  { slug: "gemuse-meyer", source: globalBoard, crop: "320x170+1315+75" },
  { slug: "nissin", source: globalBoard, crop: "275x190+1650+55" },
  { slug: "nestle", source: globalBoard, crop: "335x155+55+290", monochrome: true },
  { slug: "maimon", source: globalBoard, crop: "300x165+425+275" },
  { slug: "national-frozen-foods", source: globalBoard, crop: "260x180+780+275" },
  { slug: "pran", source: globalBoard, crop: "210x180+1040+275" },
  { slug: "freddy-hirsch", source: globalBoard, crop: "315x175+1310+285" },
  { slug: "rb", source: globalBoard, crop: "180x205+1670+285" },
  { slug: "fararo", source: globalBoard, crop: "315x175+60+450" },
  { slug: "hanguk-kitchen", source: globalBoard, crop: "235x195+440+455" },
  { slug: "myungga", source: globalBoard, crop: "270x225+675+445" },
  { slug: "otosan", source: globalBoard, crop: "270x200+995+460" },
  { slug: "farmfoods", source: globalBoard, crop: "345x150+1305+490" },
  { slug: "montabo", source: globalBoard, crop: "400x160+40+665" },
  { slug: "seco-spice", source: globalBoard, crop: "360x180+440+680" },
  { slug: "roshen", source: globalBoard, crop: "420x175+790+685" },
  { slug: "pmj-foods", source: globalBoard, crop: "305x180+1225+685" },
  { slug: "yoshinoya", source: globalBoard, crop: "305x180+1570+675" },
  { slug: "seabrook", source: globalBoard, crop: "370x140+35+865" },
  { slug: "vestey", source: globalBoard, crop: "330x150+440+880" },
  { slug: "indofood", source: globalBoard, crop: "400x150+795+880" },
  { slug: "mayora", source: globalBoard, crop: "530x165+1205+870" },
];

mkdirSync(outputDirectory, { recursive: true });
const tempDirectory = join(outputDirectory, ".partner-logo-tmp");
rmSync(tempDirectory, { recursive: true, force: true });
mkdirSync(tempDirectory, { recursive: true });

for (const logo of logos) {
  const cropped = join(tempDirectory, `${logo.slug}-crop.png`);
  const output = join(outputDirectory, `${logo.slug}.png`);

  const crop = spawnSync("convert", [
    logo.source,
    "-crop", logo.crop,
    "+repage",
    "-colorspace", "sRGB",
    cropped,
  ], { encoding: "utf8" });
  if (crop.status !== 0) throw new Error(`Crop failed for ${logo.slug}: ${crop.stderr}`);

  const enhance = [
    cropped,
    "-level", "5%,92%",
    "-fuzz", "12%",
    "-trim",
    "+repage",
  ];

  if (logo.monochrome) {
    enhance.push("-colorspace", "Gray", "-contrast-stretch", "6%x2%", "-colorspace", "sRGB");
  }

  enhance.push(
    "-filter", "Lanczos",
    "-resize", "700x280>",
    "-unsharp", "0x0.75+0.75+0.02",
    "-bordercolor", "white",
    "-border", "20",
    "-gravity", "center",
    "-background", "white",
    "-extent", "800x400",
    "-strip",
    "-define", "png:compression-level=9",
    output,
  );

  const result = spawnSync("convert", enhance, { encoding: "utf8" });
  if (result.status !== 0) throw new Error(`Enhancement failed for ${logo.slug}: ${result.stderr}`);
  console.log(`${logo.slug}.png <- ${basename(logo.source)} (${logo.crop})`);
}

rmSync(tempDirectory, { recursive: true, force: true });
console.log(`Generated ${logos.length} partner logos in ${dirname(join(outputDirectory, "placeholder"))}`);
