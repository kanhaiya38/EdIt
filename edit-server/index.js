require("dotenv").config();
const express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io")(server),
	cors = require("cors"),
	bodyParser = require("body-parser"),
	morgan = require("morgan"),
	errorHandler = require("./handlers/error"),
	authRoutes = require("./routes/auth"),
	documentRoutes = require("./routes/documents");

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/users/:user_id", documentRoutes);

app.use((req, res, next) => {
	let err = new Error("Page Not Found");
	err.status = 404;
	next(err);
});

app.use(errorHandler);

io.on("connection", (socket) => {
	console.log("user is connected");
	let count = 0;
	socket.on("doc", (id, data) => {
		console.log(count + "==============================================");
		console.log(data);
		console.log(count + "==============================================");
		socket.broadcast.emit("doc", id, data);
		count++;
	});
});

server.listen(PORT, () => {
	console.log("[*] EdIt server listening on port " + PORT);
});
