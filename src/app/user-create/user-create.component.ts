import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {
  title = signal<string>('');
  id:string='';
  form!: FormGroup;

  constructor(private fb: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    if(this.id!='new'){
      this.title.set('Editar Usuario');
      this.loadData();
    }
    else{
      this.title.set('Crear Usuario');
    }
  }
  async loadData() {
    try {
      const res = await this.usuarioService.get(Number(this.id)).toPromise();
      if (res) {
        res.password='';
        this.form.patchValue({...res,confirmPassword:''});
      } else {
        Swal.fire('Error', 'No se encontraron datos.', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Ocurrio un error al traer los datos.', 'error');
    }
  }
  initializeForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(50)]],

      confirmPassword: ['', [Validators.required]], password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{10,}$')]],
      sexo: ['', [Validators.required, Validators.pattern('^[MFmf]$')]],
      isActive:[true]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulario enviado:', this.form.value);
      if(this.id!='new')
        this.updateUser();
      else this.newUser();
    } else {
      console.log('Formulario no válido');
    }
  }
  newUser(){
    this.usuarioService.create(this.form.value).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Registro exitoso!',
          text: 'Usuario registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/login']);
          }
        });
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo registrar el usuario',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
  updateUser() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirmar si deseas guardar los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, guardar cambios!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.update(Number(this.id), this.form.value).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Registro exitoso!',
              text: 'Usuario actualizado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/user']);
              }
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo actualizar el usuario',
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo'
            });
          }
        });
      }
    });
  }
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors?.['mustMatch']) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
}
