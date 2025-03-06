import app from "./app.js";
import "./database.js";

async function main() {
    app.listen(5000);
    console.log("Sever running");
}

main();