import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { MayorEdadDorective } from '../../directives/mayor-edad';
import { ResaltarDirective } from '../../directives/resaltar-directive';
/**
 * Componente que muestra los detalles de un usuario específico.
 * Obtiene los datos desde un ID recibido por URL y los muestra en una tarjeta.
 */
@Component({
  selector: 'app-user-detail',
  standalone:true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MayorEdadDorective,ResaltarDirective
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  /** Objeto que contiene los datos del usuario obtenido desde la API */
  user: any = null;
  /** Estado de carga mientras se consulta la API */
  loading = false;
    /** Mensaje de error si no se puede obtener el usuario */
  error: string | null = null;

  /**
   * Constructor del componente.
   * @param route - Servicio que permite obtener parámetros de la URL (como el ID)
   * @param api - Servicio que realiza la consulta al servicio (json-server)
   * @param router - Permite redirigir al listado de usuarios al accionar el boton volver
   */
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Obtiene el ID desde la URL y llama a la función que trae los datos del usuario.
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchUser(parseInt(id, 10));
    } else {
      this.error = 'ID no valido';
    }
  }

  /**
   * Llama al servicio para obtener los datos del usuario según el ID.
   * Maneja los estados de carga y error.
   * @param id - ID del usuario a consultar
   */
  fetchUser(id: number): void {
    this.loading=true
    this.api.getUserById(id).subscribe({
      next:(data)=>{
        this.user=data
        this.loading=false
      },
      error:()=>{
        this.error="No se pudo cargar el usuario"
        this.loading=false
      }
    })
  }

  /**
   * Redirige al listado de usuarios.
   */
  goBack():void{
    this.router.navigate(["/users"])
  }
}
