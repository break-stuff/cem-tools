
export function log(message: string, skip?: boolean, color = '\x1b') {
  if(skip) {
    return;
  }

  console.log(color, message);
}

export function logRed(message: any, skip?: boolean) {
  log(message, skip, '\x1b[31m%s\x1b[0m');
}

export function logGreen(message: any, skip?: boolean) {
  log(message, skip, '\x1b[32m%s\x1b[0m');
}

export function logYellow(message: any, skip?: boolean) {
  log(message, skip,'\x1b[33m%s\x1b[0m');
}

export function logBlue(message: any, skip?: boolean) {
  log(message, skip, '\x1b[34m%s\x1b[0m');
}

export function logMagenta(message: any, skip?: boolean) {
  log(message, skip, '\x1b[35m%s\x1b[0m');
}

export function logCyan(message: any, skip?: boolean) {
  log(message, skip, '\x1b[36m%s\x1b[0m');
}