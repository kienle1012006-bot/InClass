import { describe, expect, it } from 'vitest';
import { createFashionSlug, createUniqueFashionSlug } from './fashion-slug';

describe('createFashionSlug', () => {
  it('removes Vietnamese accents and normalizes punctuation', () => {
    expect(createFashionSlug({ fashion_subject: 'Áo Sơ Mi Trắng', IdF: 12 })).toBe('ao-so-mi-trang');
    expect(createFashionSlug({ fashion_subject: 'Đầm Dạ Hội Cao Cấp', IdF: 13 })).toBe('dam-da-hoi-cao-cap');
    expect(createFashionSlug({ fashion_subject: 'Quần Jean Nam', IdF: 14 })).toBe('quan-jean-nam');
  });

  it('keeps same-name Fashion slugs unique through IdF', () => {
    const first = { fashion_subject: 'Áo Sơ Mi', IdF: 1 } as import('./Fashion').Fashion;
    const second = { fashion_subject: 'Áo Sơ Mi', IdF: 2 } as import('./Fashion').Fashion;
    expect(createUniqueFashionSlug(first, [first, second])).toBe('ao-so-mi-1');
    expect(createUniqueFashionSlug(second, [first, second])).toBe('ao-so-mi-2');
  });
});
