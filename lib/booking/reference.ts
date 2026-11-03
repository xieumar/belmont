// No 0/O/1/I/L so references are easy to read out and type.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
const LENGTH = 6;

export const REFERENCE_PATTERN = new RegExp(`^BLM-[${ALPHABET}]{${LENGTH}}$`);

export function generateReference(): string {
  const bytes = new Uint8Array(LENGTH);
  const limit = 256 - (256 % ALPHABET.length); // avoid modulo bias
  let code = "";
  while (code.length < LENGTH) {
    crypto.getRandomValues(bytes);
    for (const byte of bytes) {
      if (byte < limit && code.length < LENGTH) {
        code += ALPHABET[byte % ALPHABET.length];
      }
    }
  }
  return `BLM-${code}`;
}
