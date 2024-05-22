export async function onRequestPost(context) {
    let body = await context.request.json();
    let { driver_id, status, in_trip, latitude, longitude } = body;
    let forwardTo = "https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/locations"
    try{
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 20)
        let response = await fetch(forwardTo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ driver_id, status, in_trip, latitude, longitude }),
            timeout: 20,
            signal: controller.signal
        });
        clearTimeout(timeoutId)
        return new Response(await response.text(), {status: response.status});
    }catch(e){
        return new Response({error: e.message}, {status: 500});
    }
}
