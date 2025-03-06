// Load table data
function loadTables() {
    return JSON.parse(fs.readFileSync(FILE_PATH));
}

// Save table data
function saveTables(data) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 4));
}

// Get all tables
app.get("/tables", (req, res) => {
    res.json(loadTables());
});

// Reserve a table
app.post("/reserve", (req, res) => {
    let { antal, time } = req.body;
    let data = loadTables();

    let availableTable = data.bord.find(table => 
        table.pladser >= antal &&
        !table.reservationer.some(res => res.tid === time)
    );

    if (!availableTable) {
        return res.status(400).json({ message: "Ingen ledige borde på dette tidspunkt." });
    }

    availableTable.reservationer.push({ tid: time, customer: "Anonymous" });
    saveTables(data);
    res.json({ message: `Bord ${availableTable.id} reserveret kl. ${time}` });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));