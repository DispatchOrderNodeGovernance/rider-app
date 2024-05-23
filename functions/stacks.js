export async function onRequestGet() {
    const cache = caches.default;
    const cacheKey = new Request("https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/stacks");

    let response = await cache.match(cacheKey);
    if (!response) {
        response = await fetch(cacheKey, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Cache the response for 300 seconds (5 minutes)
        /* const cacheOptions = {
            status: response.status,
            statusText: response.statusText,
            headers: {
                ...response.headers,
                'Cache-Control': 'public, max-age=300'
            }
        }; */
        
        const responseClone = response.clone();
        cache.put(cacheKey, responseClone);
    }

    const stacks = await response.json();
    return new Response(JSON.stringify(stacks), { status: 200, headers: { 'Content-Type': 'application/json' } });
}