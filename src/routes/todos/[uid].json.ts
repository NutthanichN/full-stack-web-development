import type { RequestHandler, RequestEvent, EndpointOutput } from "@sveltejs/kit"
import { api } from "./_api"

export function del(requestEvent: RequestEvent)  {
  return api(requestEvent);
}

export async function patch(requestEvent: RequestEvent) {
  const { params, request } = requestEvent
  const body = await request.formData();
  
  const text = body.get("text");
  const todo = {
    text: text.toString(),
  }

  return api(requestEvent, todo);
}