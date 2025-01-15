const path = require('path');
const fs = require('fs');
const { readJsonFile, writeJsonFile } = require('../services/jsonService');
const { readExcelFile, writeExcelFile } = require('../services/excelService');

const JSON_FILE_PATH = path.join(__dirname, '../users.json');

function uploadFile(req, res) {
    const filePath = req.file.path;

    try {
        const newData = readExcelFile(filePath);
        const currentData = readJsonFile(JSON_FILE_PATH);

        const dataMap = new Map(currentData.map(item => [item['ת.ז.'], item]));
        newData.forEach(row => {
            const existingRow = dataMap.get(row['ת.ז.']);
            if (existingRow) {
                dataMap.set(row['ת.ז.'], { ...existingRow, ...row });
            } else {
                dataMap.set(row['ת.ז.'], row);
            }
        });

        const updatedData = Array.from(dataMap.values());
        writeJsonFile(JSON_FILE_PATH, updatedData);
        fs.unlinkSync(filePath);

        res.json({ message: 'File uploaded and data updated successfully' });
    } catch (error) {
        console.error('Error processing the file:', error);
        res.status(500).json({ message: 'An error occurred while processing the file' });
    }
}

function downloadFile(req, res) {
    const data = readJsonFile(JSON_FILE_PATH);
    const excelFilePath = path.join(__dirname, '../דוח תלמידות וניקוד.xlsx');

    writeExcelFile(data, excelFilePath);

    res.download(excelFilePath, 'דוח תלמידות וניקוד.xlsx', (err) => {
        if (err) {
            console.error('Error sending file:', err);
        }
        fs.unlinkSync(excelFilePath);
    });
}

module.exports = {
    uploadFile,
    downloadFile,
};
