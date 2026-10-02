/** Shorten to at most `max` characters, cutting at a word boundary and adding an ellipsis. */
export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  // A space at index max-1 still leaves room for the ellipsis after the word before it.
  const lastSpace = text.lastIndexOf(' ', max - 1);
  const cut = lastSpace > 0 ? text.slice(0, lastSpace) : text.slice(0, max - 1);
  return cut.replace(/[\s.,;:]+$/, '') + '…';
}
