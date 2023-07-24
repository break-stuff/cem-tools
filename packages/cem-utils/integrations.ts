import fs from "fs";
import path from "path";
import prettier from "prettier";

export function createOutdir(outdir: string) {
  if (outdir !== "./" && !fs.existsSync(outdir)) {
    fs.mkdirSync(outdir, { recursive: true });
  }
}

export function saveFile(outdir: string, fileName: string, contents: string) {
  fs.writeFileSync(
    path.join(outdir, fileName),
    prettier.format(contents, { parser: "json" })
  );
}

export function greenConsoleLog(message: string) {
  console.log(
    "\u001b[" +
      32 +
      "m" +
      message +
      "\u001b[0m"
  );
}
