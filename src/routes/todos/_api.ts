import type { RequestEvent } from "@sveltejs/kit"
import PrismaClient from "$lib/prisma";

// let todos: Todo[] = [];
type UpdatedData = {
  text?: string,
  done?: boolean
}

const prisma = new PrismaClient();

export async function api(requestEvent: RequestEvent, data?: Record<string, unknown>) {
  let body = {};
  let status = 500;

  const request = requestEvent.request;

  switch (request.method.toUpperCase()) {
    case "GET":
      body = await prisma.todo.findMany();
      status = 200;
      break;
    case "POST":
      body = await prisma.todo.create({
        data: {
          created_at: data.created_at as Date,
          done: data.done as boolean,
          text: data.text as string
        }
      })
      status = 201;
      break;
    case "DELETE":
      body = await prisma.todo.delete({
        where: {
          uid: requestEvent.params.uid
        }
      })
      status = 200;
      break;
    case "PATCH":
      // todos = todos.map(todo => {
      //   if (todo.uid === requestEvent.params.uid) {
      //     if (data.text) {
      //       todo.text = data.text as string;
      //     } else {
      //       todo.done = data.done as boolean;
      //     }
      //   }
      //   return todo;
      // });
      // body = todos.find(todo => todo.uid === requestEvent.params.uid);

      
      let updatedData: UpdatedData = {};
      if (data.text) {
        updatedData.text = data.text as string
      }
      if (data.done) {
        updatedData.done = data.done as boolean
      }

      body = await prisma.todo.update({
        where: {
          uid: requestEvent.params.uid
        },
        data: updatedData
      })
      status = 200;
      break;
    default:
      break;
  }

  
  if (request.method.toUpperCase() !== "GET" && request.headers.get("accept") !== "application/json") {
    return {
      status: 303,
      headers: {
        location: "/"
      }
    }
  }

  return {
    status,
    body
  }
}