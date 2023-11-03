import { searchPhotos } from "@/lib/unsplash";

export async function POST(request: Request) {
    const { query }: { query: unknown } = await request.json();
    if(typeof query !== 'string' ) {
        return new Response('query is not string', {
            status: 400
        });
    }
    const searchPhotosResponse = await searchPhotos(query);
    return new Response(JSON.stringify(searchPhotosResponse), {
        status: 200,
        headers: {
            'Content-Type': 'application-json'
        }
    });
}