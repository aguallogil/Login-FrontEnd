import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Usuario } from '../models/usuario.interfece';
import { UsuarioService } from '../services/user.service';
import { GenderPipe } from '../pipes/gender.pipe';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule,GenderPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{
  users=signal<Usuario[]>([]);
  constructor(private readonly usuarioService:UsuarioService, private router: Router){}
  ngOnInit(): void {
    this.usuarioService.getAll().subscribe(i=>this.users.set(i));
  }
  edit(id:number){
    this.router.navigate([`/user/${id}`]);
  }
  delete(id:number){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Confirmar si deseas eliminar el registro",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.delete(Number(id)).subscribe({
          next: (response) => {
            Swal.fire({
              title: '¡Eliminado exitoso!',
              text: 'el registro ha sido eliminado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.users.update(data=>[...data.map(i=>i.id==id?{...i,isActive:false}:i)]);
              }
            });
          },
          error: (error) => {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el registro',
              icon: 'error',
              confirmButtonText: 'Intentar de nuevo'
            });
          }
        });
      }
    });
  }
  nuevo(){
    this.router.navigate([`/user/new`]);
  }
}
