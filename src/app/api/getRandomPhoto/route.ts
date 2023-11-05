// pages/api/getRandomPhoto.ts

import { getRandomPhotos } from "@/lib/unsplash";

// `GET` 関数は、リクエストオブジェクトを引数にとるように変更します。
export async function GET(request: Request) {
  // URL インスタンスを使用してリクエストのURLを解析し、
  // URLSearchParamsオブジェクトを取得します。
  const url = new URL(request.url);
  // URLSearchParamsオブジェクトからページ番号を取得します。
  const page = url.searchParams.get('page') || '0'; // デフォルトはページ1
  console.log(page);
  const getRandomPhotoResponse = await getRandomPhotos(10, parseInt(page));

  return new Response(JSON.stringify(getRandomPhotoResponse), {
      status: 200,
      headers: {
          'Content-Type': 'application-json'
      }
  });
}
