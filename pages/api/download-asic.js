import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { fileName } = req.query;
  const filePath = path.join(process.cwd(), 'asic', fileName);

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
