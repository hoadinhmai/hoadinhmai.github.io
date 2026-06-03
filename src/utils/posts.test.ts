import { describe, it, expect } from 'vitest';
import { filterPublished, sortByDateDesc, getAllTags, type PostLike } from './posts';

const post = (id: string, date: string, draft = false, tags: string[] = []): PostLike => ({
  id,
  data: { pubDate: new Date(date), draft, tags },
});

describe('filterPublished', () => {
  it('drops drafts', () => {
    const result = filterPublished([post('a', '2026-01-01'), post('b', '2026-01-02', true)]);
    expect(result.map((p) => p.id)).toEqual(['a']);
  });
});

describe('sortByDateDesc', () => {
  it('orders newest first without mutating input', () => {
    const input = [post('old', '2026-01-01'), post('new', '2026-02-01')];
    const result = sortByDateDesc(input);
    expect(result.map((p) => p.id)).toEqual(['new', 'old']);
    expect(input.map((p) => p.id)).toEqual(['old', 'new']);
  });
});

describe('getAllTags', () => {
  it('returns unique tags sorted with counts', () => {
    const result = getAllTags([
      post('a', '2026-01-01', false, ['aws', 'k8s']),
      post('b', '2026-01-02', false, ['aws']),
      post('c', '2026-01-03', true, ['secret']),
    ]);
    expect(result).toEqual([
      { tag: 'aws', count: 2 },
      { tag: 'k8s', count: 1 },
    ]);
  });
});
