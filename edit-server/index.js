require("dotenv").config();
const express = require("express"),
	app = express(),
	cors = require("cors"),
	bodyParser = require("body-parser"),
	errorHandler = require("./handlers/error"),
	authRoutes = require("./routes/auth"),
	documentRoutes = require("./routes/documents");

const PORT = 5000;


app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);

app.use("/api/users/:user_id", documentRoutes);


app.use((req, res, next) => {
	let err = new Error("Page Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

// io.on("connection", (socket) => {
// 	console.log("user is connected");
// });

app.listen(PORT, () => {
	console.log("[*] EdIt server listening on port " + PORT);
});
