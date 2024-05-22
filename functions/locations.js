export async function onRequestPost(context) {
    let body = await context.request.json();
    let { driver_id, status, in_trip, latitude, longitude } = body;
    let forwardTo = "https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/locations"
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 6);
    fetch(forwardTo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ driver_id, status, in_trip, latitude, longitude }),
        signal: controller.signal
    });
    return new Response(JSON.stringify({
        driver_id,
        status,
        in_trip,
        latitude,
        longitude
    }), {status: 200});
}
