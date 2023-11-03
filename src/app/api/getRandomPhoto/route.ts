import { getRandomPhotos } from "@/lib/utils";

export async function GET() {
  const getRandomPhotoResponse = await getRandomPhotos();
  return new Response(JSON.stringify(getRandomPhotoResponse), {
      status: 200,
      headers: {
          'Content-Type': 'application-json'
      }
  });
}