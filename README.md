# PicTranslate

## Features

### Image Upload and Translation
- **Image Upload**: Users can upload images in PNG or JPEG formats using a simple and intuitive interface.
- **Language Selection**: Users can select the source and target languages for translation from dropdown menus.
- **Translation**: The application detects text in the uploaded image using the Google Vision API and translates the text to the selected target language using the Google Translate API.
- **Loading Indicator**: A loading spinner and message are displayed while the image is being processed, ensuring users are informed about the ongoing operation.
- **Translated Text Display**: Once the processing is complete, the translated text is displayed prominently on the screen.

### Code Overview

#### Frontend (React)
The frontend is built with React, using components and hooks to manage state and handle user interactions efficiently.

- **State Management**: The application uses React hooks to manage various states, including selected languages, loading status, translated text, image URL, and modal state for image selection.
- **Event Handlers**: Functions handle user interactions such as updating the selected image, changing languages, and initiating the file upload process.
- **API Calls**: Axios is used for making HTTP requests to the backend. The frontend periodically checks the processing status from the backend and updates the translated text upon completion.

#### Backend (Node.js and Express)
The backend is implemented using Node.js with the Express framework, integrating Google Cloud Vision and Translate APIs for processing.

- **File Upload**: Multer is used to handle file uploads and store files in memory.
- **Text Detection and Translation**: The backend processes the uploaded image to detect text using the Vision API and translates the detected text using the Translate API.
- **Status Checking**: The backend includes an endpoint to check the current processing status and return the translated text.

### Summary
PicTranslate demonstrates a full-stack solution for uploading images, detecting text, and translating the text into a chosen language. This project showcases the integration of Google Cloud services with a React frontend and Node.js backend, providing a seamless and interactive user experience. 