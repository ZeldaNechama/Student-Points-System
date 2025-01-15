import { Component, OnInit } from '@angular/core';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-data',
  imports: [TopNavComponent, HttpClientModule],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.scss'
})
export class AddDataComponent implements OnInit {
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    Swal.fire({
      title: "!אזהרה",
      html: `
        <div>
          !שימו לב להעלאות רק קובץ אקסל בפורמט המתאים
          <br/>
          <span style="font-weight: bold;">המלצה:</span> כדאי להוריד קודם קובץ אקסל בפורמט המתאים 
        </div>
      `,
      icon: "warning",
    });
  }



  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files?.length) {
      this.selectedFile = target.files[0];
      this.uploadFile()
    }
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http.post('http://localhost:3000/files/upload', formData).subscribe((res) => {
      try {
        this.alertMessage();

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'התרחשה שגיאה, נסה שוב מאוחר יותר',
        });
      }
    });

  }

  alertMessage(): void {
    Swal.fire({
      title: "הנתונים הועלו בהצלחה",
      icon: "success",
      draggable: true
    });
  }

}
