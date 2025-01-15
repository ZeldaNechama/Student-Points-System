const fs = require('fs/promises');
const uuid = require('uuid');
const xlsx = require('xlsx');
// const uuidv4 = uuid.v4;
// const multer = require('multer');
const path = require('path');


const JSON_FILE_PATH = path.join(__dirname, '../users.json');

const readJsonFile = async () => fs.readFile('./data/businesses.json').then(data => JSON.parse(data));
const writeJsonFile = async (data) => fs.writeFile('./data/businesses.json', JSON.stringify(data));

// /api/download
const downloadExcelFile = async () => {
    const data = readJsonFile(JSON_FILE_PATH);

    // יצירת Workbook ו-Worksheet
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // שמירת קובץ ה-Excel בתיקייה זמנית
    const excelFilePath = path.join(__dirname, 'דוח תלמידות וניקוד.xlsx');
    xlsx.writeFile(workbook, excelFilePath);

    return excelFilePath;



}
const uploadExcelFile = async (filePath) => {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const newData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // קריאת נתונים קיימים
    const currentData = readJsonFile(JSON_FILE_PATH);
    const updatedData = [...currentData, ...newData];

    // כתיבה לקובץ ה-JSON
    await writeJsonFile(JSON_FILE_PATH, updatedData);

    // מחיקת הקובץ הזמני
    fs.unlinkSync(filePath);

}

module.exports = { downloadExcelFile, uploadExcelFile } 