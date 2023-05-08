const express = require("express");
const router = express.Router();
const fs = require('fs');

const DATASET_DIRECTORY = __dirname + '/../data/';

router.get('/dataset', async (req, res) => {
    try {
        let files = await fs.promises.readdir(DATASET_DIRECTORY);
        let response = [];
        for(let file of files) {
            let fileInfo = await fs.promises.stat(DATASET_DIRECTORY + file);
            response.push({
                filename : file,
                size_in_byte : fileInfo.size,
                last_modified : fileInfo.mtime
            });
        }
        res.send(response);
    } catch(err) {
        console.error(err);
        res.status(500).send('Error while reading a file.');
        return;
    }
});


router.get('/dataset/:filename', async (req, res) => {
    const filePath = DATASET_DIRECTORY + req.params.filename + '.csv';
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('File not found.');
            return;
        }
        res.set('Content-Type', 'text/csv');
        res.send(data);
    });
});

module.exports = router;