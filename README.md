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
| ת.ז. |  שם | שכבה  | כתה |ניקוד| מס יום של מבצע|
|------------|-----------------|--------|-------|-----|-----|

Example:
| 123456789  | Sarah Cohen     | 3      | 10    |
| 987654321  | Rachel Levy     | 2      | 9     |

---

## Support
For assistance or inquiries regarding this system, please contact the project administrator.

---


