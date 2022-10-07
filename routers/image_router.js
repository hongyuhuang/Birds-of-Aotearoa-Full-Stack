const express = require('express');
const path = require('path');
const fs = require('fs');

/* create a router (to export) */
const router = express.Router();

/* Routes image URLs */
router.get('/:filename?', (req, res) => {
    const filename = req.params.filename;
    var image_path = path.resolve(__dirname, `../public/images/${filename}`);

    // if image doesn't exist, use a default image
    if (!fs.existsSync(image_path)) {
        console.error(`Error image file not found: ${filename}`);
        image_path = path.resolve(__dirname, '../public/images/default.png');
    }

    res.sendFile(image_path);
});

module.exports = router; // export the router
