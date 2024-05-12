import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z0-9]*$') 
      ]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          Swal.fire({
            position: 'center', 
            icon: 'success',  
            title: 'Inicio de sesión exitoso', 
            text: 'Has iniciado sesión correctamente!',
            showConfirmButton: false, 
            timer: 1000, 
            timerProgressBar: true
          });
          this.router.navigate(['/user']);
          
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Por favor verifica tus credenciales e intenta nuevamente.',
            confirmButtonText: 'Reintentar'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor completa todos los campos requeridos.',
        confirmButtonText: 'Aceptar'
      });
    }
  }
  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
