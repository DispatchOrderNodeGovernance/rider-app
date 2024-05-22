export function onRequestPost(context) {
    let body = JSON.parse(context.request.body);
    return new Response(`JSON sent successfully: ${JSON.stringify(body)}`);
}
