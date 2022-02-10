import { Handle } from "@sveltejs/kit"

export async function handle({ request, resolve}) {
  if (request.query.has('_method')) {
    request.method = request.query.get("_method").toUpperCase();
  }
  
  const response = await resolve(request); 
  return response;
}