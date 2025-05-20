import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-user-list',
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
  users: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'age', 'actions'];
  loading = false;
  error: string | null = null;

  constructor(private api:ApiService, private router:Router){}

  ngOnInit(): void {
    this.getUsers();
  }

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

  goDetails(id:number):void{
    this.router.navigate(["/users",id])
  }
}
