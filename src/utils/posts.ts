export interface PostLike {
  id: string;
  data: {
    pubDate: Date;
    draft: boolean;
    tags: string[];
  };
}

/** Remove draft posts. */
export function filterPublished<T extends PostLike>(posts: T[]): T[] {
  return posts.filter((p) => !p.data.draft);
}

/** Newest first. Returns a new array; does not mutate the input. */
export function sortByDateDesc<T extends PostLike>(posts: T[]): T[] {
  return [...posts].sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export interface TaggedLike {
  data: { tags: string[]; draft?: boolean };
}

/** Unique tags across non-draft items (posts, references), sorted by count desc then name asc. */
export function getAllTags(items: TaggedLike[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const item of items.filter((i) => !i.data.draft)) {
    for (const tag of item.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
