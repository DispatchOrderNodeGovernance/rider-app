export async function onRequestPost(context) {
    let body = await context.request.json();
    let {
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        ride_type: rideType
      } = body;
    /* let forwardTo = "https://0xyshn92yf.execute-api.ap-southeast-1.amazonaws.com/production_stage/locations"
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 6);
    fetch(forwardTo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ driver_id, status, in_trip, latitude, longitude }),
        signal: controller.signal
    }); */
    return new Response(JSON.stringify({
        ride_id: 'ride_123',
        status: 'in_progress',
        pickup_location: pickupLocation,
        dropoff_location: dropoffLocation,
        estimated_arrival_time: '2021-09-01T12:00:00Z',
        ride_type: rideType
    }), {status: 200});
}
