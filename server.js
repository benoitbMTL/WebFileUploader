const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

app.use(fileUpload());
app.use(express.static('public'));
app.use('/upload', express.static('upload'));

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.file;
    uploadedFile.mv(`upload/${uploadedFile.name}`, err => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, fileName: uploadedFile.name });
    });
});

app.get('/upload', (req, res) => {
});

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
