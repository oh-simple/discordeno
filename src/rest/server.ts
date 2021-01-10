// serverless rest client that can work across shards/workers to communicate global rate limits easily
import { restCache } from "./cache.ts";
import { serve, ServerRequest } from "./deps.ts";
import { processRequest } from "./request.ts";
import { RestServerOptions } from "./types/mod.ts";

/** Begins an http server that will handle incoming requests. */
export async function startRESTServer(options: RestServerOptions) {
  const server = serve({ port: options.port });

  for await (const request of server) {
    handlePayload(request, options).catch((error) => {
      restCache.eventHandlers.error("processRequest", error);
    });
  }
}

/** Handler function for every request. Converts to json, verified authorization & requirements and begins processing the request */
async function handlePayload(
  request: ServerRequest,
  options: RestServerOptions,
) {
  // instantly ignore any requests that don't have the secret authorization key
  const authorization = request.headers.get("authorization");
  if (authorization !== options.authorization) return;

  // read buffer after auth check
  const buffer = await Deno.readAll(request.body);

  try {
    // convert the body to json
    const data = JSON.parse(new TextDecoder().decode(buffer));
    if (!data.url) {
      return request.respond(
        {
          status: 400,
          body: JSON.stringify({ error: "No URL was provided." }),
        },
      );
    }
    if (!data.method) {
      return request.respond(
        {
          status: 400,
          body: JSON.stringify({ error: "No METHOD was provided." }),
        },
      );
    }

    // process the request
    await processRequest(
      request,
      { method: data.method, url: data.url, body: data.body, retryCount: 0 },
      options,
    );
  } catch (error) {
    restCache.eventHandlers.error("serverRequest", error);
  }
}
