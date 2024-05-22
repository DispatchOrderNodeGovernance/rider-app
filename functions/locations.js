export function onRequestPost(context) {
    let body = context.request.json();
    return new Response(`JSON sent successfully: ${JSON.stringify(body)}`);
}
