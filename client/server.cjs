/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const express = require("express");
const PORT = process.env.CLIENT_PORT;
const app = express();
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, "./dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "./dist", "index.html"));
});
