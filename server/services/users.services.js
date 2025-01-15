const fs = require('fs/promises');
const path = require('path');

const JSON_FILE_PATH = path.join(__dirname, '../users.json');

const readJsonFile = async () => fs.readFile('./data/businesses.json').then(data => JSON.parse(data));
const writeJsonFile = async (data) => fs.writeFile('./data/businesses.json', JSON.stringify(data));

const getStudentById = async (id) => {
    const users = await readJsonFile(JSON_FILE_PATH);
    return users.find((u) => u['ת.ז.'] === id);
}

const getScoreForClass = async (grade, classNumber) => {
    const users = await readJsonFile(JSON_FILE_PATH);
    let score = 0;
    users.forEach((user) => {
        if (user['שכבה'] === grade && user['כתה'].toString() === classNumber) {
            score = score + user['ניקוד'];
        }
    })
    return score;

}

const updateScoreByUserId = async (id) => {
    console.log('1');
    
    const users = await readJsonFile(JSON_FILE_PATH);
    const user = users.find((u) => u['ת.ז.'] === id);
    console.log('user');
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    console.log('1');
    user['ניקוד'] = (user['ניקוד'] || 0) + 10;
    user['מס יום של מבצע'] = (user['מס יום של מבצע'] || 0) + 1;

    await writeJsonFile(JSON_FILE_PATH, users);
    return user;

}


module.exports = { getStudentById, getScoreForClass, updateScoreByUserId };