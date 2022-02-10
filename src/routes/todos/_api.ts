import type { RequestEvent } from "@sveltejs/kit"

let todos: Todo[] = [];

export function api(requestEvent: RequestEvent, data?: Record<string, unknown>) {
  let body = {};
  let status = 500;

  switch (requestEvent.request.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;
    case 'POST':
      todos.push(data as Todo);
      body = data;
      status = 201;
      break;
    case 'DELETE':
      todos = todos.filter(todo => todo.uid !== requestEvent.params.uid);
      status = 200;
      break;
    case 'PATCH':
      todos = todos.map(todo => {
        if (todo.uid === requestEvent.params.uid) {
          todo.text = data.text as string;
        }
        return todo;
      });
      status = 200;
      break;
    default:
      break;
  }

  if (requestEvent.request.method.toUpperCase() !== 'GET') {
    return {
      status: 303,
      headers: {
        location: '/'
      }
    }
  }

  return {
    status,
    body
  }
}