import { Photo, PhotoSearchResponse } from '@/lib/types';

export const getRandomPhotos = async (photoCount: number = 10, page: string = '1'): Promise<Photo[]> => {
  const params = new URLSearchParams({
    client_id: process.env.UNSPLASH_API_ACCESS_KEY ?? '',
    count: photoCount.toString(),
    page: page.toString(), // ページパラメータを追加
  });
  const response = await fetch(`https://api.unsplash.com/photos/random?${params.toString()}`, {
    method: 'GET',
    // Next.jsでは再検証の設定はfetchオプションには含めません
  });
  if (!response.ok) throw new Error('Unsplash APIから写真を取得できませんでした。');

  return response.json();
};

export const searchPhotos = async (query: string, page: string = '1'): Promise<PhotoSearchResponse> => {
    const params = new URLSearchParams({
      client_id: process.env.UNSPLASH_API_ACCESS_KEY ?? '',
      query: query,
      per_page: '10',
      page: page
    });
    const response = await fetch(
        `https://api.unsplash.com/search/photos?${params.toString()}`,
        { method: 'GET', next: { revalidate: 60 * 30 }}
    );

    return response.json();
};