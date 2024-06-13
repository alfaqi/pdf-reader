# PDF Reader

## Overview

This React application extracts text from PDF files using Optical Character Recognition (OCR). The application leverages `pdfjs-dist` to read the PDF content and `tesseract.js` to perform the OCR on the rendered pages. The extracted text, along with positional data for each word, is displayed in JSON format.

## Features

- Upload and process PDF files.
- Extract text from each page using OCR.
- Display the extracted text and word positions in JSON format.

## Technologies Used

- React: For building the user interface.
- pdfjs-dist: For reading and rendering PDF files.
- tesseract.js: For performing OCR on rendered PDF pages.

## Setup and Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/alfaqi/pdf-reader.git
    cd pdf-reader
    ```

2. **Install the dependencies:**

    ```sh
    npm install
    ```

3. **Start the application:**

    ```sh
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

1. Open the application in your web browser.
2. Click on the file input to upload a PDF file.
3. The application will process the file and extract text from each page.
4. The extracted text and positional data for each word will be displayed in JSON format below the file input.

## Code Explanation

The core functionality of the application is implemented in the `App` component.

### State Management

- `output`: Stores the JSON string of the extracted data.

### File Handling

- `handleFileChange`: This asynchronous function handles file selection, processes the PDF, and performs OCR on each page.

### PDF Processing

- The PDF file is read as an `ArrayBuffer`.
- `pdfjs-dist` is used to load the PDF and get the number of pages.
- Each page is rendered onto a canvas.

### OCR Processing

- `tesseract.js` is used to recognize text from the rendered canvas.
- The recognized words and their bounding boxes are stored.

## Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

