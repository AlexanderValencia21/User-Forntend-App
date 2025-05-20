import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
/**
 * Directiva estructural personalizada que evalúa si una persona es mayor de edad.
 * Si la edad es igual o mayor a 18, muestra el contenido; de lo contrario, lo oculta.
 */
@Directive({
  selector: '[appEsMayor]',
  standalone: true,
})
export class MayorEdadDorective {
  /**
   * Constructor de la directiva.
   * @param templateRef - Referencia al bloque de HTML donde se aplica la directiva.
   * @param viewContainer - Contenedor donde se inserta o remueve el contenido dinámicamente.
   */
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  /**
   * Setter del input de la directiva.
   * Se ejecuta automáticamente cuando Angular evalúa *appEsMayor.
   * @param edad - número que representa la edad del usuario
   */
  @Input() set appEsMayor(edad: number) {
    if (edad >= 18) {
      // Si es mayor o igual a 18 años, se renderiza el contenido
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // Si no, se remueve del DOM
      this.viewContainer.clear();
    }
  }
}
