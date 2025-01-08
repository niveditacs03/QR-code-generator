import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);

  const generateQRCode = async () => {
    try {
      if (!text.trim()) {
        alert('Please enter some text');
        return;
      }
      
      const url = await QRCode.toDataURL(text);
      setQrCodeUrl(url);
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
      alert('Failed to generate QR code');
    }
  };

  const handleReset = () => {
    setText('');
    setQrCodeUrl('');
    setIsGenerated(false);
  };

  return (
    <div className="container">
      {!isGenerated ? (
        <>
          <textarea
            className="textarea"
            placeholder="Enter text to generate QR code..."
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={generateQRCode} className="submit">
            Generate QR Code
          </button>
        </>
      ) : (
        <div className="newContainer">
          <img
            src={qrCodeUrl}
            alt="Generated QR Code"
            className="border rounded-lg"
          />
          <button
            onClick={handleReset}
            className="smallersubmit" >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;