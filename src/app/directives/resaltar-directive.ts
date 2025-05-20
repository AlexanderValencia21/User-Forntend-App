import { Directive, ElementRef, Renderer2, HostListener,Input } from '@angular/core';

/**
 * Directiva de atributo que aplica un estilo visual cuando el mouse entra o sale del elemento.
 */
@Directive({
  selector: '[appResaltar]',
  standalone: true
})
export class ResaltarDirective {
  /** Color de sombra personalizada opcional */
  @Input() appResaltar: string = 'rgba(0, 0, 0, 0.15)';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Al pasar el mouse, se aplica una sombra al elemento
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'boxShadow',
      `0 4px 12px ${this.appResaltar}`
    );
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'box-shadow 0.2s ease-in-out');
  }

  // Al salir el mouse, se elimina la sombra
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
  }
}
