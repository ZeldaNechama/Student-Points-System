const path = require('path');
const { readJsonFile, writeJsonFile } = require('../services/jsonService');
const { calculateScore } = require('../services/userService');

const JSON_FILE_PATH = path.join(__dirname, '../users.json');

function getStudentById(req, res) {
    const id = parseInt(req.params.id, 10);
    const users = readJsonFile(JSON_FILE_PATH);
    const user = users.find((u) => u['ת.ז.'] === id);
    res.json(user);
}

function getScoreForClass(req, res) {
    const grade = req.query.grade;
    const classNumber = req.query.classNumber;
    const users = readJsonFile(JSON_FILE_PATH);
    const score = calculateScore(users, grade, classNumber);
    res.json(score);
}

function updateScore(req, res) {
    const id = parseInt(req.params.id, 10);
    const score = parseInt(req.query.score, 10);
    const users = readJsonFile(JSON_FILE_PATH);

    const user = users.find((u) => u['ת.ז.'] === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    user['ניקוד'] = (user['ניקוד'] || 0) + score;
    user['מס יום של מבצע'] = (user['מס יום של מבצע'] || 0) + 1;

    writeJsonFile(JSON_FILE_PATH, users);
    res.json(user);
}

module.exports = {
    getStudentById,
    getScoreForClass,
    updateScore,
};
