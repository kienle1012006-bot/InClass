import { Fashion } from './Fashion';

/** Creates a stable, URL-safe Vietnamese slug for a Fashion item. */
export function createFashionSlug(
  fashion: Pick<Fashion, 'fashion_subject' | 'IdF'>,
  includeId = false,
): string {
  const name = (fashion.fashion_subject || '')
    .toLowerCase()
    .replace(/[đ]/g, 'd')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const baseSlug = name || 'fashion';
  return includeId ? `${baseSlug}-${fashion.IdF}` : baseSlug;
}

/** Adds IdF only when names collide, keeping ordinary slugs short and readable. */
export function createUniqueFashionSlug(
  fashion: Fashion,
  fashions: Fashion[],
): string {
  const baseSlug = createFashionSlug(fashion);
  const sameNameCount = fashions.filter((item) => createFashionSlug(item) === baseSlug).length;
  return createFashionSlug(fashion, sameNameCount > 1);
}
