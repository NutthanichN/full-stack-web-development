import type { RequestHandler, RequestEvent, EndpointOutput } from "@sveltejs/kit"
import { api } from './_api';


export function get(requestEvent)  {
  return api(requestEvent);
}

export async function post(requestEvent: RequestEvent): Promise<EndpointOutput> {
  const { params, request } = requestEvent
  const body = await request.formData();
  
  const text = body.get("text");
  const todo = {
    created_at: new Date(),
    done: false,
    text: text.toString(),
    uid: `${Date.now()}`
  }

  return api(requestEvent, todo);
}