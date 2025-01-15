const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());






// נתיב לקובץ JSON
const JSON_FILE_PATH = path.join(__dirname, 'users.json');

// Multer להגדרת העלאת קבצים
const upload = multer({ dest: 'uploads/' });

// פונקציה לקריאת קובץ JSON
function readJsonFile(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return [];
  }
}

// פונקציה לכתיבה לקובץ JSON
function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing JSON file:', err);
  }
}

// מסלול לקריאת נתונים מקובץ JSON
app.get('/api/data', (req, res) => {
  const data = readJsonFile(JSON_FILE_PATH);
  res.json(data);
});

// חיפוש תלמידה לפי תז
app.get('/user/getStudent/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const users = readJsonFile(JSON_FILE_PATH);
  const user = users.find((u) => u['ת.ז.'] === id);
  res.json(user);
});

// חיפוש כיצה לפי שכבה וכיתה
app.get('/user/getScoreForClass', (req, res) => {
  const grade = req.query.grade;
  const classNumber = req.query.classNumber;
  const users = readJsonFile(JSON_FILE_PATH);
  let score = 0;
  users.forEach((user) => {
    if (user['שכבה'] === grade && user['כתה'].toString() === classNumber) {
      score = score + user['ניקוד'];
    }
  })
  console.log('score', score);

  res.json(score);
});



//זה עובד
// מסלול להעלאת קובץ Excel ושמירתו כ-JSON
app.post('/files/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  try {
    // קריאת הנתונים מה-Excel
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const newData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // קריאת נתונים קיימים מה-JSON
    const currentData = readJsonFile(JSON_FILE_PATH);

    // יצירת מיפוי על בסיס "ת.ז."
    const dataMap = new Map(currentData.map(item => [item["ת.ז."], item]));

    // עדכון נתונים קיימים והוספת נתונים חדשים
    newData.forEach(row => {
      const existingRow = dataMap.get(row["ת.ז."]);
      if (existingRow) {
        // עדכון נתונים קיימים
        dataMap.set(row["ת.ז."], { ...existingRow, ...row });
      } else {
        // הוספת שורות חדשות
        dataMap.set(row["ת.ז."], row);
      }
    });

    // המרת המיפוי לרשימה מעודכנת
    const updatedData = Array.from(dataMap.values());

    // כתיבת הנתונים המעודכנים ל-JSON
    writeJsonFile(JSON_FILE_PATH, updatedData);

    // מחיקת קובץ זמני
    fs.unlinkSync(filePath);

    res.json({ message: 'File uploaded and data updated successfully' });
  } catch (error) {
    console.error('Error processing the file:', error);
    res.status(500).json({ message: 'An error occurred while processing the file' });
  }
});


// didnt use at all
// מסלול להוספת נתונים ידניים ל-JSON
app.post('/api/add', (req, res) => {
  const newEntry = req.body;
  const currentData = readJsonFile(JSON_FILE_PATH);
  currentData.push(newEntry);
  writeJsonFile(JSON_FILE_PATH, currentData);
  res.json({ message: 'Data added successfully', data: newEntry });
});

// מסלול להורדת נתוני JSON כקובץ Excel
app.get('/files/download', (req, res) => {
  const data = readJsonFile(JSON_FILE_PATH);
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelFilePath = path.join(__dirname, 'דוח תלמידות וניקוד.xlsx');
  xlsx.writeFile(workbook, excelFilePath);

  res.download(excelFilePath, 'דוח תלמידות וניקוד.xlsx', (err) => {
    if (err) {
      console.error('Error sending file:', err);
    }
    // מחיקת קובץ Excel לאחר שליחה
    fs.unlinkSync(excelFilePath);
  });
});

// מסלול לעדכון ניקוד למשתמש
app.put('/user/update-score/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // תעודת זהות
  const score=parseInt(req.query.score,10);
  const users = readJsonFile(JSON_FILE_PATH); // שימוש בנתיב הקובץ הנכון

  const user = users.find((u) => u['ת.ז.'] === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // עדכון ניקוד ומספר הימים של המבצע
  user['ניקוד'] = (user['ניקוד'] || 0) + score;
  user['מס יום של מבצע'] = (user['מס יום של מבצע'] || 0) + 1;

  writeJsonFile(JSON_FILE_PATH, users); // שימוש בנתיב הקובץ הנכון לכתיבה

  res.json(
    user
);
});



// הפעלת השרת
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});







// const express = require('express');
// const cors = require('cors');
// const excelFilesController = require('./controllers/excelFiles.controller');
// const userController=require('./controllers/user.controller');
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use('/files',excelFilesController);
// app.use('/user' ,userController);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
