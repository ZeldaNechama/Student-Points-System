const xlsx = require('xlsx');

function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const processedData = data.map(row => {
        for (const key in row) {
            if (!isNaN(row[key])) {
                row[key] = Number(row[key]);
            }
        }
        return row;
    });

    return processedData;
}


function writeExcelFile(data, filePath) {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    xlsx.writeFile(workbook, filePath);
}

module.exports = {
    readExcelFile,
    writeExcelFile,
};
