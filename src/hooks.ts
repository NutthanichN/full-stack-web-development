import { RequestEvent } from "@sveltejs/kit"

export async function handle({event: requestEvent, resolve}) {
  // if (request.query.has('_method')) {
  //   request.method = request.query.get("_method").toUpperCase();
  // }
  if ('_method' in requestEvent.params) {
    
    requestEvent.request.method = requestEvent.params._method;
  }
  const response = await resolve(requestEvent);
  return response;
}