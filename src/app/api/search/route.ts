import { searchPhotos } from "@/lib/unsplash";

export async function POST(request: Request) {
    const { query }: { query: unknown } = await request.json();
    if(typeof query !== 'string' ) {
        return new Response('no query', {
            status: 400
        });
    }
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const searchPhotosResponse = await searchPhotos(query, page);
    return new Response(JSON.stringify(searchPhotosResponse), {
        status: 200,
        headers: {
            'Content-Type': 'application-json'
        }
    });
}