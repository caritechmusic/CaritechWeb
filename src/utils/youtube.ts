export function getYoutubeVideoId(rawUrl?: string): string | null {
  if (!rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    const videoId = parsed.searchParams.get('v');
    return videoId || null;
  } catch {
    return null;
  }
}

export function getYoutubeEmbedUrl(rawUrl?: string): string | null {
  const videoId = getYoutubeVideoId(rawUrl);
  if (!videoId || !rawUrl) return null;
  try {
    const parsed = new URL(rawUrl);
    const tParam = parsed.searchParams.get('t');
    const startSeconds = tParam ? parseInt(tParam.replace(/s$/i, ''), 10) : NaN;
    const startQuery =
      !Number.isNaN(startSeconds) && startSeconds > 0 ? `?start=${startSeconds}` : '';
    return `https://www.youtube.com/embed/${videoId}${startQuery}`;
  } catch {
    return `https://www.youtube.com/embed/${videoId}`;
  }
}

export function getYoutubeThumbnailUrl(rawUrl?: string): string | null {
  const videoId = getYoutubeVideoId(rawUrl);
  if (!videoId) return null;
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}
