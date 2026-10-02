import { describe, it, expect } from 'vitest';
import { truncate } from './text';

describe('truncate', () => {
  it('leaves short text alone', () => {
    expect(truncate('Short line.', 20)).toBe('Short line.');
  });

  it('cuts at a word boundary and adds an ellipsis within the limit', () => {
    const result = truncate('Why a downstream AWS WAF rule never fires, and how', 30);
    expect(result).toBe('Why a downstream AWS WAF rule…');
    expect(result.length).toBeLessThanOrEqual(30);
  });

  it('drops trailing punctuation before the ellipsis', () => {
    expect(truncate('One, two, three four', 10)).toBe('One, two…');
  });
});
