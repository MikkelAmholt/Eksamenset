import { serveDir } from 'jsr:@std/http/file-server';
import { Database } from 'jsr:@db/sqlite';

const db = new Database(':memory:');

db.exec(
  'CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT not null, sirName TEXT not null,age INTEGER not null)'
);

Deno.serve(async (req) => {
  const pathname = new URL(req.url).pathname;

  if (pathname == '/api/people') {
    return Response.json(db.prepare('select * from people').all());
  }

  if (pathname == '/api/booking') {
    const formData = await req.formData();'
    
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
