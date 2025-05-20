import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
/**
 * Componente que muestra una tabla con todos los usuarios.
 * Carga los datos desde el API al inicializarse y permite navegar a los detalles de cada usuario.
 */
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit{
  /** Arreglo que contiene los usuarios obtenidos desde la API */
  users: any[] = [];
  /** Columnas que se muestran en la tabla */
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'actions'];
  /** Estado que indica si los datos están cargando */
  loading = false;
  /** Almacena el mensaje de error si ocurre un fallo al obtener los datos */
  error: string | null = null;

  /**
   * Constructor que inyecta el servicio de API y el enrutador
   * @param api - Servicio que obtiene los usuarios
   * @param router - Permite navegar hacia los detalles del usuario
   */
  constructor(private api:ApiService, private router:Router){}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Llama al servicio para obtener los usuarios.
   */
  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Llama al servicio para obtener los usuarios y los guarda.
   * Maneja estados de carga y errores.
   */
  getUsers(): void{
    this.loading=true
    this.api.getUsers().subscribe({
      next:(data)=>{
        this.users=data
        this.loading=false
      },
      error:()=>{
        this.error="No se pudieron cargar los datos"
        this.loading=false
      }
    })
  }

  /**
   * Redirige al detalle del usuario correspondiente al ID pasado como parámetro.
   * @param id - ID del usuario al que se desea ver el detalle
   */
  goDetails(id:number):void{
    this.router.navigate(["/users",id])
  }
}
