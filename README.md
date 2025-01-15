# Student Points Management System

## Project Description
The **Student Points Management System** is a web-based application designed to manage and track students' participation and scores in a specific activity or competition. The system provides functionalities for both administrators and students, ensuring a seamless and user-friendly experience.

---

## Features

### Student Portal
- **Add Points via Barcode or ID**:
  - Students can scan a barcode or manually enter their ID number to add points.
  - Default points added per action: 10 (modifiable by administrators).
  - After adding points, a message will display:
    - Greeting the student by name.
    - Showing the points added and the total accumulated points.
    - Encouraging the student with a success message.

### Administrator Portal
1. **Change Default Points**:
   - Update the default points awarded to students.
   - The interface includes:
     - Current default points display.
     - Input field for new points.
     - Button to apply changes.
     - Confirmation message: "Points successfully updated."

2. **Generate Excel Report**:
   - Download an Excel file with details of all participating students and their respective points.

3. **Search Functionality**:
   - **Search by Student ID**:
     - Enter a student's ID to retrieve their name and total points.
   - **Search by Class**:
     - Specify grade level and class number to retrieve details of students and their total points in that class.

4. **Add Students via Excel File**:
   - Upload a properly formatted Excel file to bulk-add students.
   - Important Notes:
     - Ensure the Excel file format is correct to avoid duplication.
     - Re-uploading the same file without changes may cause duplicate entries.

---

## Technical Specifications

### General Requirements
- Separate portals for **students** and **administrators**.
- Transactions are recorded line-by-line in the Excel report.

### User Interaction Flows
#### Student Flow:
1. Scan barcode or enter ID.
2. System identifies the student and adds points.
3. Display confirmation message with:
   - Student name.
   - Points added.
   - Total points.
4. Log the transaction in the system.

#### Administrator Flow:
1. Log in with an admin password.
2. Access features:
   - Update default points.
   - Generate Excel reports.
   - Search for students (by ID or class).
   - Add students via Excel.
3. Perform selected action and receive confirmation.

### Design Notes
- **Homepage**:
  - Option to add a custom logo for the campaign.

---

## File Upload Format
Ensure the Excel file follows the format:
| ת.ז.         | שם           | שכבה | כיתה | ניקוד | מס' יום של מבצע |
|--------------|--------------|-------|-------|-------|-----------------|
| **דוגמה למילוי הטבלה**: |
| 123456789    | שרה כהן      | 3     | 10    | 85    | 2               |
| 987654321    | רחל לוי      | 2     | 9     | 90    | 3               |

---

## Packaging the Project for Local Use
The project can be packaged to run locally on a USB stick for users without Node.js installed.

### Packaging Steps
1. **Build the Angular Application**:
   - Run:
     ```bash
     ng build --configuration production
     ```
   - The built files will be located in the `dist/` folder.

2. **Set Up the Node.js Server**:
   - Ensure the `server/` folder contains:
     - `index.js` (the server entry point).
     - `node_modules` (with all required dependencies installed).

3. **Include a Portable Node.js Version**:
   - Download the portable Node.js version for Windows.
   - Place the extracted folder in the project directory.

4. **Create a Start Script**:
   - Add a `start.bat` file with the following content:
     ```bat
     @echo off
     SET /p PORT=Enter the desired port (default is 3000):
     IF "%PORT%"=="" SET PORT=3000
     echo Starting server on port %PORT%
     .\node-vXX.X.X-win-x64\node.exe server\index.js
     pause
     ```
   - Replace `node-vXX.X.X-win-x64` with the actual folder name of the portable Node.js version.

5. **Package the Project**:
   - Ensure the folder structure includes:
     - `dist/` (Angular build).
     - `server/` (Node.js server).
     - Portable Node.js folder.
     - `start.bat`.

6. **Transfer to USB**:
   - Copy the entire folder to a USB drive.
   - Users can double-click `start.bat` to run the application.

---

## Support
For assistance or inquiries regarding this system, please contact the project administrator.

---

