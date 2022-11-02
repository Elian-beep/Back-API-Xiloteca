import app from "./src/app.js";

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server listener in http://localhost:${port}`);
})