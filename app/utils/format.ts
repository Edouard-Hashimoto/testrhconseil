export const useAssetUrl = (path: string, type: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  const folders: Record<string, string> = {
    equipe: '/equipe-images/',
    category: '/category-images/',
    news: '/uploads/news/',
    particulier: '/particulier-images/',
    qualiopi: '/qualiopi-images/',
    logos: '/logos/',
    logo: '/logos/',
    statistics: '/uploads/stats/',
    stats: '/uploads/stats/'
  };
  
  const folder = folders[type] || '/';
  return `${folder}${path}`;
};
