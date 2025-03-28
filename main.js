import { serveDir } from 'jsr:@std/http/file-server';

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (pathname == '/api/bookings') {
    const file = Deno.readTextFileSync("db.json")
    return new Response(file);
  }

  if (pathname == '/api/booking') {
    const formData = await req.formData();
    
    const navn= formData.get("navn");
    const telefon = formData.get("telefon");
    const bordId = formData.get("bordId");

    const file = Deno.readTextFileSync("db.json")
    const data = JSON.parse(file)

    data.bord[bordId].reservationer.push({"navn": navn, "telefon": telefon})

    Deno.writeTextFileSync("db.json", JSON.stringify(data))

    return Response.json({message: "succes"});
  }

  return serveDir(req, {
    fsRoot: 'public',
    showIndex: true,
  });
});
