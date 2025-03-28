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
    const tid = formData.get("tid");
    const antal = formData.get("antal");
    const bordId = formData.get("bordId");
     

    const file = Deno.readTextFileSync("db.json")
    const data = JSON.parse(file)

    data.bord[bordId].reservationer.push({"navn": navn, "telefon": telefon, "tid": tid, "antal": antal})

    Deno.writeTextFileSync("db.json", JSON.stringify(data))

    return Response.redirect("/Færdig/Index.html");
  }

  return serveDir(req, {
    fsRoot: 'public',
    showIndex: true,
  });
});
