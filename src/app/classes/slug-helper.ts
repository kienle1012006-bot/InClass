export function createSlug(name: string, id: number): string {
  const sanitizedName = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  return `${sanitizedName}-p${id}`;
}

export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/-p(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

export function getIdentityType(identity: string): 'ID' | 'SLUG_WITH_ID' | 'PURE_SLUG' {
  if (!isNaN(Number(identity))) {
    return 'ID';
  }

  if (identity.includes('-p')) {
    const parts = identity.split('-p');
    const lastPart = parts[parts.length - 1];

    if (!isNaN(Number(lastPart))) {
      return 'SLUG_WITH_ID';
    }
  }

  return 'PURE_SLUG';
}
