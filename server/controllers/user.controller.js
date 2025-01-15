const { Router } = require('express');
const userService = require("../services/users.services");

const router = Router();

router.get('/getStudent/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = userService.getStudentById(id);
        res.json(user);
    } catch (error) {
        res.status(500).send(`error in finding user ${error.message}`);
    }

});

router.get('/getScoreForClass', async (req, res) => {
    try {
        const grade = req.query.grade;
        const classNumber = req.query.classNumber;
        const score = await userService.getScoreForClass(grade, classNumber);
        res.json(score);

    } catch (error) {
        res.status(500).send(`error in finding class ${error.message}`);
    }

});

router.put('/update-score/:id', async (req, res) => {
    try {

        const id = parseInt(req.params.id, 10);
        const user = await userService.updateScoreByUserId(id);
        console.log('user',user);
        

        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(500).send(`error in updating user ${error.message}`);
    }

});

module.exports = router;