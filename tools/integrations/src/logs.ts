export function logRed(message: any) {
  console.log("\x1b[31m%s\x1b[0m", message);
}

export function logGreen(message: any) {
  console.log("\x1b[32m%s\x1b[0m", message);
}

export function logYellow(message: any) {
  console.log("\x1b[33m%s\x1b[0m", message);
}

export function logBlue(message: any) {
  console.log("\x1b[34m%s\x1b[0m", message);
}

export function logMagenta(message: any) {
  console.log("\x1b[35m%s\x1b[0m", message);
}

export function logCyan(message: any) {
  console.log("\x1b[36m%s\x1b[0m", message);
}
