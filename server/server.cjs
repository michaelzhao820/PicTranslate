const result = require('dotenv').config({ path: '../.env' });
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const { Translate } = require('@google-cloud/translate').v2;

const { GOOGLE_APPLICATION_CREDENTIALS, PORT } = result.parsed;

const credentials = JSON.parse(GOOGLE_APPLICATION_CREDENTIALS);

const visionClient = new ImageAnnotatorClient({
  credentials
});

const translateClient = new Translate({
  credentials
});

const app = express();
const port = PORT || 3000;

// Set multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors({
  origin: 'https://pic-translate.vercel.app',
}));

// Initialize processing status and data
let processingStatus = 'Idle';
let processedData = null;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/upload', upload.single('myFile'), async (req, res) => {
  try {
    console.log('Image received!');
    processingStatus = 'Processing';
    const sourceLanguage = req.body.sourceLanguage;
    const targetLanguage = req.body.targetLanguage;
    const text = await detectText(req.file.buffer, sourceLanguage, targetLanguage);
    processedData = text;
    processingStatus = 'Processed';
    res.status(200).send({ message: 'Processing complete!', data: text });
  } catch (error) {
    console.error('Error during processing:', error);
    processingStatus = 'Error';
    res.status(500).send({ message: 'Error during processing', error: error.message });
  }
});

app.get('/status', (req, res) => {
  res.send({ status: processingStatus, data: processedData });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/**
 * Detects the text in an image using the Google Vision API and translates it.
 *
 * @param {Buffer} imageBuffer Buffer of the image file.
 * @param {string} sourceLanguage The source language code.
 * @param {string} targetLanguage The target language code.
 * @returns {Promise<string>} The translated text.
 */
const detectText = async (imageBuffer, sourceLanguage, targetLanguage) => {
  try {
    console.log('Looking for text in image buffer');
    const [textDetections] = await visionClient.textDetection({ image: { content: imageBuffer } });
    const [annotation] = textDetections.textAnnotations;
    const text = annotation ? annotation.description.trim() : '';
    console.log('Extracted text from image:', text);
    const [translation] = await translateClient.translate(text, { from: sourceLanguage, to: targetLanguage });
    console.log('Translated text:', translation);
    return translation;
  } catch (error) {
    console.error('Error during text detection/translation:', error);
    throw error;
  }
};
