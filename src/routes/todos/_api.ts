import type { RequestEvent } from "@sveltejs/kit"

let todos: Todo[] = [];

export function api(requestEvent: RequestEvent, todo?: Todo) {
  let body = {};
  let status = 500;

  switch (requestEvent.request.method.toUpperCase()) {
    case 'GET':
      body = todos;
      status = 200;
      break;
    case 'POST':
      todos.push(todo);
      body = todo;
      status = 201;
      break;
    case 'DELETE':
      todos = todos.filter(todo => todo.uid !== requestEvent.params.uid);
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