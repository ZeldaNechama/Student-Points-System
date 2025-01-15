import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { TopNavComponent } from "../top-nav/top-nav.component";
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-search',
  imports: [ButtonModule, MegaMenuModule, BadgeModule, AvatarModule, InputTextModule, InputNumberModule, TopNavComponent, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/user';
  showStudendsSearc: boolean = false;
  showClassSearch: boolean = false;
  showSearch: boolean = true;

  studentPassword: string = "";
  grade: string = "";
  classNumber: number = 0;

  curentStudent: any = {}
  ansScore: number = 0


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.showStudendsSearc = false;
    this.showClassSearch = false;
    this.showSearch = true;
  }

  searchStudent(): void {
    this.showSearch = false
    this.showClassSearch = false;
    this.showStudendsSearc = true;

  }
  searchClass(): void {
    this.showSearch = false;
    this.showStudendsSearc = false;
    this.showClassSearch = true;
  }
  findStudent() {
    this.http.get(`${this.apiUrl}/getStudent/${this.studentPassword}`)
      .subscribe(
        (res) => {
          try {
            if (res) {
              this.curentStudent = res;
              console.log('current student', res);
            }
            else {
              Swal.fire({
                icon: "error",
                title: "לא נמצאה תלמידה כזו",
              });
            }

          } catch (error) {

            console.log('error');

          }
        }
      )
  }

  clearStudent() {
    this.showStudendsSearc = false;
    this.showSearch = true;
    this.studentPassword = ""
  }
  findClass() {
    const grade = this.grade;
    const classNumber = this.classNumber;

    this.http.get(`${this.apiUrl}/getScoreForClass?grade=${grade}&classNumber=${classNumber}`).subscribe(
      (res) => {
        if (res) {
          this.ansScore = parseInt(JSON.stringify(res), 10);
        }
        else {
          Swal.fire({
            icon: "error",
            title: "לא נמצאה כיתה כזו",
          });
        }



      },
      (error) => {
        console.error('Error:', error);
      }
    );

  }

  clearClass() {
    this.showClassSearch = false;
    this.showSearch = true;
    this.classNumber = 0;
    this.grade = "";
  }
}



