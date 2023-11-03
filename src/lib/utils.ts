import { Photo } from '@/lib/types';

export const getRandomPhotos = async (photoCount: number = 10): Promise<Photo[]> => {
  const params = new URLSearchParams();
  params.append(
    'client_id',
    process.env.UNSPLASH_API_ACCESS_KEY ?? ''
  );
  params.append('count', `${photoCount}`);
  const response = await fetch(
    `https://api.unsplash.com/photos/random?${params.toString()}`,
    { method: 'GET', cache: 'no-cache'}
  );
  return response.json();
}