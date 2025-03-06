import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  let filePath = decodeURIComponent(url.pathname.substring(1)); // Fjern leading "/"

  if (!filePath) {
    return new Response(null, {
      status: 302,
      headers: new Headers({ "Location": "/Main.html" }),
    });
  }

  try {
    return await serveFile(req, filePath);
  } catch (error) {
    console.error("File not found:", filePath); // Debugging output
    return new Response("404 Not Found", { status: 404 });
  }
};

serve(handler, { port: 3000 });
console.log("Deno server running at http://localhost:3000");
