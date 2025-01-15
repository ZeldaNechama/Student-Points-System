const { Router } = require('express');
const fs = require('fs');
const upload = require('multer')();
const xlsx = require('xlsx');

const excelFileService = require('../services/excelFiles.services');

const router = Router();

router.get('/download', async (req, res) => {

    const excelFilePath = await excelFileService.downloadExcelFile();

    res.download(excelFilePath, 'דוח תלמידות וניקוד.xlsx', (err) => {
        if (err) {
            console.error('Error sending file:', err);
        }
        // מחיקת קובץ Excel לאחר שליחה
        fs.unlinkSync(excelFilePath);
    });
});

  
router.post('/upload', upload.single('file'), async(req, res) => {
    const filePath = req.file.path;
  
    try {
      // קריאה לשירות לעיבוד הקובץ
      // uploadService.processUploadedFile(filePath);
     await excelFileService.uploadExcelFile(filePath);
  
      // שליחה חזרה של הודעת הצלחה
      res.json({ message: 'File uploaded and data added successfully' });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({ message: 'Error processing file' });
    }
  });
  
  module.exports = router;