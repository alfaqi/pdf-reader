import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { getDocument } from 'pdfjs-dist/webpack';

const App = () => {
  const [output, setOutput] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const pageData = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.0 });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport: viewport }).promise;
      const imageUrl = canvas.toDataURL();

      const ocrResult = await Tesseract.recognize(
        canvas.toDataURL(),
        'eng',
        { logger: m => console.log(m) }
      );

      const words = ocrResult.data.words.map(word => ({
        text: word.text,
        xmin: word.bbox.x0,
        ymin: word.bbox.y0,
        xmax: word.bbox.x1,
        ymax: word.bbox.y1
      }));

      pageData.push({
        page: i - 1,
        image_url: imageUrl,
        size: {
          width: viewport.width,
          height: viewport.height
        },
        words
      });
    }

    const result = {
      filename: file.name,
      page_data: pageData
    };

    setOutput(JSON.stringify(result, null, 2));
  };

  return (
    <div>
      <input type="file" accept='.pdf' onChange={handleFileChange} />
      <pre>{output}</pre>
    </div>
  );
};

export default App;
