const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const dataController = require('./controllers/dataController');
const userController = require('./controllers/userController');
const fileController = require('./controllers/fileController');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.get('/api/data', dataController.getData);
app.get('/user/getStudent/:id', userController.getStudentById);
app.get('/user/getScoreForClass', userController.getScoreForClass);
app.post('/files/upload', upload.single('file'), fileController.uploadFile);
app.post('/api/add', dataController.addData);
app.get('/files/download', fileController.downloadFile);
app.put('/user/update-score/:id', userController.updateScore);


//for running this app as an applection and not a website.
app.use(express.static(path.join(__dirname, '../dist/project-for-beit-chinuch/browser')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/project-for-beit-chinuch/browser/index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
