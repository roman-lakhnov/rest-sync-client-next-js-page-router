// pages/api/download.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { fileType, fileName } = req.query;

  let filePath;

  if (fileType === 'asic') {
    filePath = path.join(process.cwd(), 'asic', fileName);
  } else if (fileType === 'cert') {
    filePath = path.join(process.cwd(), 'certs', 'cert.pem');
  } else {
    return res.status(400).json({ error: 'Invalid file type' });
  }

  try {
    if (fs.existsSync(filePath)) {
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      res.setHeader('Content-Type', 'application/octet-stream');
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to download file' });
  }
}