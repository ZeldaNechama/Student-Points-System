import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule,ButtonModule,RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  password: String = "";
  constructor(private router:Router){}

  login(): void{
    if (this.password == "A123456789A"){
        this.router.navigate(['main-admin']);
    }
    
    else{

      Swal.fire({
        icon: "error",
        title: "סיסמא שגויה",
      });
    }
  }

}
