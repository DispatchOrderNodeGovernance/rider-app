export async function onRequestPost(context) {
    let body = await context.request.json();
    return new Response(`JSON sent successfully: ${JSON.stringify(body)}`);
}
