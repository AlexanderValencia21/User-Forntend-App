import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailComponent } from './pages/user-detail/user-detail.component';

/**
 * Archivo de configuración de rutas para la aplicación.
 */

export const routes: Routes = [
  /* Ruta raíz: redirige automáticamente a la página de login*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  /* Ruta para el login*/
  { path: 'login', component: LoginComponent },
  /*Ruta que muestra la tabla de usuarios*/
  { path: 'users', component: UserListComponent },
  /*Ruta para ver el detalle de un usuario , utilizando su ID*/
  { path: 'users/:id', component: UserDetailComponent },
];
