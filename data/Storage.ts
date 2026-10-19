import { supabase } from '../Supabase';

const BUCKET = 'recipe-images';

type ImageType = { ext: 'png' | 'jpg'; contentType: 'image/png' | 'image/jpeg' };

// Read file magic bytes (This was referenced from geeks for geek/claude)
export function detectImageType(buf: ArrayBuffer): ImageType | null {
  const b = new Uint8Array(buf, 0, Math.min(4, buf.byteLength));
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47)
    return { ext: 'png', contentType: 'image/png' };
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff)
    return { ext: 'jpg', contentType: 'image/jpeg' };
  return null;
}

// image_url could be a full URL or a bucket path like "seed/overnight-oats.png"
export function resolveImageUrl(value: string | null): string | null {
  if (!value) return null;
  if (/^https?:\/\//.test(value)) return value;
  return supabase.storage.from(BUCKET).getPublicUrl(value).data.publicUrl;
}

export async function uploadRecipeImage(userId: string, uri: string): Promise<string> {
  const body = await (await fetch(uri)).arrayBuffer();
  const type = detectImageType(body);
  if (!type) throw new Error('Only PNG or JPG images are supported.');

  const path = `${userId}/${Date.now()}.${type.ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, body, { contentType: type.contentType });
  if (error) throw error;
  return path;
}
