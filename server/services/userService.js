function calculateScore(users, grade, classNumber) {
    let score = 0;
    users.forEach((user) => {
        if (user['שכבה'] === grade && user['כתה'].toString() === classNumber) {
            score += user['ניקוד'];
        }
    });
    return score;
}

module.exports = {
    calculateScore,
};
