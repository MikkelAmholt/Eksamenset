import { serveDir } from 'jsr:@std/http/file-server';

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (pathname == '/api/bookings') {
    const file = Deno.readTextFileSync("db.json");
    const data = JSON.parse(file);

    return new Response(JSON.stringify(data, null, 4), {  // Formatteret JSON
      headers: { "Content-Type": "application/json" }
    });
  }

  if (pathname == "/api/delete_booking") {
    const formData = await req.formData();

    const bordId = formData.get("bordId");
    const tid = formData.get("tid");
    console.log("delte>", bordId, tid);

    const file = Deno.readTextFileSync("db.json");
    const data = JSON.parse(file);

    data.bord[bordId].reservationer = data.bord[bordId].reservationer.filter(reservation => reservation.tid !== tid);

    Deno.writeTextFileSync("db.json", JSON.stringify(data, null, 4));

    return new Response(JSON.stringify(data, null, 4), { // Returnerer opdateret JSON
      headers: { "Content-Type": "application/json" }
    });
  }

  if (pathname == '/api/booking') {
    const formData = await req.formData();
    
    const navn = formData.get("navn");
    const telefon = formData.get("telefon");
    const tid = formData.get("tid");
    const antal = formData.get("antal");
    const bordId = formData.get("bordId");

    const file = Deno.readTextFileSync("db.json");
    const data = JSON.parse(file);

    data.bord[bordId].reservationer.push({ "navn": navn, "telefon": telefon, "tid": tid, "antal": antal });

    Deno.writeTextFileSync("db.json", JSON.stringify(data, null, 4));

    return new Response(JSON.stringify(data, null, 4), { // Returnerer opdateret JSON
      headers: { "Content-Type": "application/json" }
    });
  }

  return serveDir(req, {
    fsRoot: 'public',
    showIndex: true,
  });
});