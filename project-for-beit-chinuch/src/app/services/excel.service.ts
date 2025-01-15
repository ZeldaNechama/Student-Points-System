// import * as XLSX from 'xlsx';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private _http:HttpClient) { }
 // private excelData: any[] = [];

  // readExcel(file: File): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       const data = new Uint8Array(event.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];
  //       this.excelData = XLSX.utils.sheet_to_json(worksheet);
  //       resolve(this.excelData);
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsArrayBuffer(file);
  //   });
  // }
  // pdateScoreById(id: string, newScore: number): boolean {
  //   const row = this.excelData.find((entry: any) => entry['ת.ז.'] === id);
  //   if (row) {
  //     row['ניקוד'] = newScore;
  //     return true;
  //   }
  //   return false;
  // }

  // שמירת נתונים לקובץ
  // saveExcel(fileName: string): void {
  //   const worksheet = XLSX.utils.json_to_sheet(this.excelData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   XLSX.writeFile(workbook, fileName);
  // }
  // updateScoreById(id: string, newScore: number): boolean {
  //   const row = this.excelData.find((entry: any) => entry['ת.ז.'] === id);
  //   if (row) {
  //     row['ניקוד'] = newScore;
  //     return true;
  //   }
  //   return false;
  // }

  // convertExcelToJson(file: File): Promise<any[]> {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       try {
  //         const binaryData = e.target.result;
  //         const workbook = XLSX.read(binaryData, { type: 'binary' });
  //         const sheetName = workbook.SheetNames[0]; // נבחר את הגיליון הראשון
  //         const worksheet = workbook.Sheets[sheetName];
  //         const jsonData = XLSX.utils.sheet_to_json(worksheet);
  //         resolve(jsonData);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsBinaryString(file);
  //   });
  // }

  //הורדת קובץ
  downloadExcelFile(): void {
    this._http
      .get('http://localhost:3000/files/download', {
        responseType: 'blob', // מקבלים את הקובץ כ-Blob
      })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'דוח תלמידות.xlsx'; // שם הקובץ שיורד
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => console.error('Error downloading Excel file:', err),
      });
  }
}
