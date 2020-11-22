var express = require('express');
var path = require('path');
var router = express.Router();

router.post('/upload', (req, res) => {
    let filedata = req.file;
    if (!filedata)
        res.send('Uploading error...');
    else
        res.send('Upload Complete');
});

router.get('/:filename', (req, res) => {
    console.log(path.join(__dirname + '/uploads/', req.params.filename));
    res.sendFile(path.join(__dirname + '/uploads/', req.params.filename))
});

module.exports = router;