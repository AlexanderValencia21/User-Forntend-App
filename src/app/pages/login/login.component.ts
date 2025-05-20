import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';
import { MatCard, MatCardTitle } from '@angular/material/card';

/**
 * Componente responsable de gestionar el formulario de inicio de sesión.
 * Implementado como componente standalone y estilizado con Angular Material.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatError,
    MatCard,
    MatCardTitle,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  /** Formulario que contiene los campos username y password */
  loginForm: FormGroup;
  /** Estado que indica si la petición está en curso mostrando una animacion de carga*/
  loading = false;
  /** Almacena el mensaje de error en caso de credenciales inválidas o fallo del servidor */
  error: string | null = null;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para construir el formulario
   * @param api - Servicio para validar las credenciales del usuario
   * @param router - Servicio de rutas para redireccionar después del login
   */

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {
    // Inicialización del formulario con las validaciones requeridas
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /**
   * Método que se ejecuta al enviar el formulario.
   * Valida las credenciales y redirige a /users si son correctas.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    const { username, password } = this.loginForm.value;

    // Llamado al servicio API para validar usuario y contraseña
    this.api.validateLogin(username, password).subscribe({
      next: (result) => {
        if (result.length > 0) {
          // Login exitoso, redirecciona a la vista de usuarios
          this.router.navigate(['/users']);
        } else {
          // Login fallido: usuario no encontrado
          this.error = 'Credenciales inválidas';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error en el servidor';
        this.loading = false;
      },
    });
  }
}
