/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { RouteList } from "./routes.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    for (const route of RouteList) {
      if (url.pathname === route.path) {
        return route.handler(request, env, ctx);
      }
    }
    return new Response("Not found", { status: 404 });
  },
};
