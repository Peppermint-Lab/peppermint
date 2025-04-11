import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { useUser } from '../../store/session';

export default function QrGenerator() {
  const { user } = useUser();
  if (!user?.isAdmin) return <div>Access Denied</div>;

  const [baseURL, setBaseURL] = useState('https://ticket-submission-link.com');
  const [roomsInput, setRoomsInput] = useState('10');
  const [qrCodes, setQrCodes] = useState<{ room: string; dataUrl: string }[]>([]);

  const generateQRs = async () => {
    if (!baseURL) {
      alert('Please enter the Ticket Submission URL');
      return;
    }
    const rooms = roomsInput.split(',').map(r => r.trim()).filter(r => r);
    const codes = await Promise.all(
      rooms.map(async room => {
        const url = `${baseURL}?room=${room}`;
        const dataUrl = await QRCode.toDataURL(url);
        return { room, dataUrl };
      })
    );
    setQrCodes(codes);
  };

  useEffect(() => {
    generateQRs();
  }, []);

  const printQR = (room: string, dataUrl: string) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              @page { margin: 0; }
              body { 
                margin: 0; 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                height: 100vh; 
                font-family: Arial, sans-serif; 
              }
              h2 { 
                margin-bottom: 16px; 
                font-size: 24px; 
              }
              img { 
                width: 200px; 
                height: 200px; 
              }
            </style>
          </head>
          <body>
            <h2>Room ${room}</h2>
            <img src="${dataUrl}" id="qrImage" />
            <script>
              const img = document.getElementById('qrImage');
              img.onload = function() {
                window.print();
                window.close();
              };
              img.onerror = function() {
                console.error('Failed to load QR code image');
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto shadow-md p-6 bg-white rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">QR Code Generator</h1>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">
            Enter ticket submission URL
          </label>
          <input
            type="text"
            value={baseURL}
            onChange={e => setBaseURL(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">
            Room
          </label>
          <input
            type="text"
            value={roomsInput}
            onChange={e => setRoomsInput(e.target.value)}
            className="border border-gray-300 p-2 mb-2 w-full"
          />
        </div>
        <button
          onClick={generateQRs}
          className="text-white px-4 py-2 rounded mb-4 w-full"
          style={{ backgroundColor: '#4caf50' }}
        >
          Generate QR Code
        </button>
        {qrCodes.length > 0 && (
          <div>
            {qrCodes.map(({ room, dataUrl }) => (
              <div key={room} className="mb-6">
                <img
                  src={dataUrl}
                  alt={`QR for Room ${room}`}
                  className="w-48 h-48 mx-0 mb-2"
                />
                <p className="font-semibold text-center mb-2">Room {room}</p>
                <div className="flex justify-center gap-2">
                  <a
                    href={dataUrl}
                    download={`qr_room_${room}.png`}
                    className="text-white px-4 py-2 rounded"
                    style={{ backgroundColor: '#4caf50' }}
                  >
                    Download QR Code
                  </a>
                  <button
                    onClick={() => printQR(room, dataUrl)}
                    className="text-white px-4 py-2 rounded"
                    style={{ backgroundColor: '#4caf50' }}
                  >
                    Print QR Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}