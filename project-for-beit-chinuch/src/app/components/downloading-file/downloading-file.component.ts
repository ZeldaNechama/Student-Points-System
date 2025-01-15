import { Component } from '@angular/core';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-downloading-file',
  imports: [TopNavComponent, HttpClientModule, CommonModule, ButtonModule],
  templateUrl: './downloading-file.component.html',
  styleUrl: './downloading-file.component.scss'
})
export class DownloadingFileComponent {
  constructor(private http: HttpClient) { }

  downloadExcel(): void {
    this.http
      .get('http://localhost:3000/files/download', {
        responseType: 'blob',
      })
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'דוח תלמידות.xlsx';
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => console.error('Error downloading Excel file:', err),
      });
  }
}
