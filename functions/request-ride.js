export async function onRequestPost(context) {
    let body = await context.request.json();
    let {
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        ride_type: rideType
      } = body;
    let uuid = Math.random().toString(36).substring(7);
    let forwardTo = "https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/dispatch"
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 2000);
    let dispatchResponse = await fetch(forwardTo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            action: "dispatch",
            uuid: uuid,
            pickup_location: pickupLocation,
            dropoff_location: dropoffLocation,
            ride_type: rideType
        }),
        signal: controller.signal
    });

    return new Response(JSON.stringify(await dispatchResponse.json()), { status: 200, headers: { 'Content-Type': 'application/json' } });
}
