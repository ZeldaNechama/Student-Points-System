const path = require('path');
const { readJsonFile, writeJsonFile } = require('../services/jsonService');

const JSON_FILE_PATH = path.join(__dirname, '../users.json');

function getData(req, res) {
    const data = readJsonFile(JSON_FILE_PATH);
    res.json(data);
}

function addData(req, res) {
    const newEntry = req.body;
    const currentData = readJsonFile(JSON_FILE_PATH);
    currentData.push(newEntry);
    writeJsonFile(JSON_FILE_PATH, currentData);
    res.json({ message: 'Data added successfully', data: newEntry });
}

module.exports = {
    getData,
    addData,
};
