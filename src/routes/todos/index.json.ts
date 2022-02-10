import type { RequestHandler, RequestEvent, EndpointOutput } from "@sveltejs/kit"

let todos: Todo[] = [];

export function get({ params })  {
  return {
    status: 200,
    body: todos
  }
}

export async function post(requstEvent: RequestEvent): Promise<EndpointOutput> {
  let { params, request } = requstEvent
  const body = await request.formData();
  
  let text = body.get("text");
  todos.push({
    created_at: new Date(),
    done: false,
    text: text.toString()
  });

  console.log(text);

  return {
    status: 303,
    headers: {
      location: '/'
    }
  }
}