const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("", (req, res) => {
	res.sendFile(path.join(__dirname, "pages/index.html"));
});

app.post("/", (req, res) => {
	console.log(req.body);
	const {
		"first-name": first_name,
		"last-name": last_name,
		email,
		"query-type": query_type,
		message,
		consent,
	} = req.body;
	if (
		first_name == "" ||
		last_name == "" ||
		email == "" ||
		query_type == "" ||
		message == "" ||
		consent == ""
	) {
		return res.send("you are foolish");
	}
	try {
		const insertUser = db.prepare(
			`
            INSERT INTO users (first_name, last_name, email, query_type, message, consent)
            VALUES (?, ?, ?, ?, ?, ?)
            `,
		);
		insertUser.run(first_name, last_name, email, query_type, message, consent);
		res.sendFile(path.join(__dirname, "pages/thank_you.html"));
	} catch (e) {
		console.error("database error", e);
		res.status(500).send("error saving user to the database");
	}
});

app.get("/list-users", (req, res) => {
	try {
		const users = db.prepare(`
			SELECT * FROM users
			`).all()
		
		res.json(users);

	} catch (e) {
		console.error("database error", e);
		res.status(500).send(e.message);
	}
});

app.get("/admin", (req, res) => {
	res.sendFile(path.join(__dirname, "pages/admin.html"));
});

app.listen(6969, () => {
	console.log("app is now listening on port 6969");
});
