import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
import { MayorEdadDorective } from '../../directives/mayor-edad';
@Component({
  selector: 'app-user-detail',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MayorEdadDorective,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  user: any = null;
  loading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchUser(parseInt(id, 10));
    } else {
      this.error = 'ID no valido';
    }
  }

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

  goBack():void{
    this.router.navigate(["/users"])
  }
}
