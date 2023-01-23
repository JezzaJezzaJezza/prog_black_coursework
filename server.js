const app = require("./app.js")
const hostname = "127.0.0.1"
const port = 5510

app.listen(port, hostname, () => {
	console.log("server is working")
})