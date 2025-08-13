export default function convertirLink(link: string): string | null {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;
  const regExpImg = /\.(jpg|jpeg|png|webp|gif|bmp|svg)(\?.*)?$/i;

  const match = link.match(regExp);

  if (link.includes("youtube.com/embed")) {
    const match = link.match(/embed\/([a-zA-Z0-9_-]+)/);
    const videoId = match ? match[1] : null;
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }


  if (regExpImg.test(link)) {
    return link;
  }

  return null;
}
