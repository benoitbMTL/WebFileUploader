const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const util = require("util");
const app = express();

app.use(fileUpload());
app.use(express.static("public"));
app.use("/upload", express.static("upload"));

app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).send("No files were uploaded.");
  }

  let uploadedFile = req.files.file;
  uploadedFile.mv(`upload/${uploadedFile.name}`, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true, fileName: uploadedFile.name });
  });
});

app.get("/upload", async (req, res) => {
  const directoryPath = path.join(__dirname, "upload");
  try {
    const files = await util.promisify(fs.readdir)(directoryPath);
    const fileInfos = await Promise.all(
      files.map(async (file) => {
        const stats = await util.promisify(fs.stat)(
          path.join(directoryPath, file)
        );
        return `<li><a href="/upload/${file}">${file}</a> (${(
          stats.size / 1024
        ).toFixed(2)} KB)</li>`;
      })
    );
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Uploaded Files</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <ul class="list-group">
                    ${fileInfos
                      .map((fileInfo) => `<li class="list-group-item">${fileInfo}</li>`)
                      .join("")}
                </ul>
            </body>
            </html>
        `);
  } catch (err) {
    res.status(500).send("Unable to scan directory: " + err);
  }
});

app.post("/delete-all", async (req, res) => {
  const directoryPath = path.join(__dirname, "upload");

  try {
    const files = await util.promisify(fs.readdir)(directoryPath);

    await Promise.all(
      files.map((file) => {
        return util.promisify(fs.unlink)(path.join(directoryPath, file));
      })
    );

    res.json({ success: true, message: "All files have been deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error deleting files: " + err });
  }
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
