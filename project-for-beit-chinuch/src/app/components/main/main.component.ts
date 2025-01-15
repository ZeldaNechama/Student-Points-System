import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ScoreService } from '../../services/score.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  imports: [RouterLink, FormsModule, PasswordModule, HttpClientModule, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  password: string = "";
  score: number = 10;
  currentUser: User = { "ת.ז.": 111, שם: "", "מס יום של מבצע": 0 }

  constructor(private http: HttpClient, private scoreService: ScoreService, private router: Router) {
    this.scoreService.score$.subscribe((newScore) => {
      this.score = newScore;
    })
  }

  updateScore(): void {
    console.log('password', this.password);

    this.http.put(`http://localhost:3000/user/update-score/${this.password}?score=${this.score}`, {}).subscribe(
      (res) => {
        try {
          console.log(res);

          if (res) {
            const user = res as User;
            this.currentUser = user;
            this.scoreService.setCurrentUser(user);
            this.router.navigate(['/message']);
          } else {
            console.log('in');
            Swal.fire({
              icon: "error",
              title: "לא נמצאה כזו תלמידה",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "לא נמצאה כזו תלמידה",
          });
        }
      },
      (error) => {
        if (error.status === 404) {
          Swal.fire({
            icon: 'error',
            title: 'לא נמצאה כזו תלמידה',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'התרחשה שגיאה, נסה שוב מאוחר יותר',
          });
        }
      }
    );
  }

  onBarcodeScan(event: any): void {
    const scannedData = event.target.value;
    console.log('Scanned Barcode:', scannedData);
  }


}
