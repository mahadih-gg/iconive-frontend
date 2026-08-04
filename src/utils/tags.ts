export function parseTags(value: string | undefined): string[] {
  if (!value?.trim()) return [];

  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function formatTags(tags: string[]): string {
  return tags.join(", ");
}

export function formatTagsFromString(value: string): string {
  return formatTags(parseTags(value));
}
