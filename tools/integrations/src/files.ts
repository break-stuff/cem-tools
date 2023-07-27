import fs from "fs";
import path from "path";
import prettier from "prettier";

export function createOutDir(outDir: string) {
  if (outDir !== "./" && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
}

export function saveFile(
  outDir: string,
  fileName: string,
  contents: string,
  parser: "json" | "typescript" = "json"
) {
  fs.writeFileSync(
    path.join(outDir, fileName),
    prettier.format(contents, { parser })
  );
}
