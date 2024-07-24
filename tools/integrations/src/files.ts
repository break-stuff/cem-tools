import fs from "fs";
import path from "path";
import prettier from "@prettier/sync";

export function createOutDir(outDir: string) {
  if (outDir !== "./" && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
}

export function saveFile(
  outDir: string,
  fileName: string,
  contents: string,
  parser: "json" | "typescript" = "json",
  printWidth = 80,
) {
  const outputPath = path.join(outDir, fileName);

  fs.writeFileSync(
    outputPath,
    prettier.format(contents, { parser, printWidth }),
  );

  return outputPath;
}
