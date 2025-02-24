const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors()); 


const upload = multer({ dest: 'uploads/' });


const outputFolder = 'resized/';
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}


const sizes = [100, 300, 500];


app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Image not selected'});
    }

    const originalPath = req.file.path;
    const filename = path.parse(req.file.originalname).name; 
    const resizedImages = [];

    try {
        for (let size of sizes) {
            const newFilename = `${filename}_${size}.jpg`;
            const outputPath = path.join(outputFolder, newFilename);

            await sharp(originalPath)
                .resize(size, size)
                .toFormat('jpeg')
                .toFile(outputPath);

            resizedImages.push({ size, url: `http://localhost:5000/${newFilename}` });
        }

        fs.unlinkSync(originalPath); 

        res.json({ images: resizedImages });
    } catch (error) {
        console.error('Error processing the image:', error);
        res.status(500).json({ error: 'Error processing the image'});
    }
});

app.use(express.static(outputFolder));


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
