const Database = require("better-sqlite3")
const db = new Database('contact.db', { verbose: console.log });


db.prepare(
	`
    CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE,
    query_type TEXT,
    message TEXT,
    consent TEXT
    )
    `,
).run();

module.exports = db;
