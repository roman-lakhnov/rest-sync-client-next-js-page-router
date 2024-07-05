import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const asisFolder = path.join(process.cwd(), 'asic');

  try {
    const files = fs.readdirSync(asisFolder).map(fileName => {
      const filePath = path.join(asisFolder, fileName);
      const stats = fs.statSync(filePath);
      return {
        name: fileName,
        createdAt: stats.birthtime
      };
    });
    res.status(200).json({ files });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Failed to read directory' });
  }
}
