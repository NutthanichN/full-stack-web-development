import type { RequestHandler, RequestEvent, EndpointOutput } from "@sveltejs/kit"
import { api } from "./_api"

export function del(requestEvent)  {
  return api(requestEvent);
}