export async function onRequestPost(context) {
    let body = await context.request.json();
    let {
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        ride_type: rideType
      } = body;
    let forwardTo = "https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/dispatch"
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 6);
    let dispatchResponse = await fetch(forwardTo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pickup_location: pickupLocation,
            dropoff_location: dropoffLocation,
            ride_type: rideType
        }),
        signal: controller.signal
    });

    return new Response(JSON.stringify(await dispatchResponse.json()), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
