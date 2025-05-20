import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

/**
 * Servicio que se encarga de gestionar todas las peticiones HTTP de la aplicación.
 * Usa HttpClient para comunicarse con el backend simulado por json-server.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /** URL base del backend json-server */
  private baseUrl = 'http://localhost:3000';

  /**
   * Constructor que inyecta el servicio HttpClient
   * @param http - Servicio de Angular para hacer peticiones HTTP
   */
  constructor(private http: HttpClient) { }
  

  /**
   * Valida las credenciales del usuario haciendo una consulta al endpoint /auth
   * @param username - nombre de usuario 
   * @param password - contraseña 
   * @returns un array de usuarios que coincidan
   */
  validateLogin(username: string, password: string): Observable<any[]> {
    const url = `${this.baseUrl}/auth?username=${username}&password=${password}`;
    return this.http.get<any[]>(url);
  }

  /**
   * Obtiene todos los usuarios del endpoint /users
   * @returns un array de usuarios
   */
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  /**
   * Obtiene un usuario específico según su ID
   * @param id - ID del usuario a consultar
   * @returns un único objeto de usuario
   */
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }
}
