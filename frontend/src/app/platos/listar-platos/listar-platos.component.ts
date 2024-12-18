import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { Plato } from '../../models/plato';
import { PlatoService } from '../../services/plato.service';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../pages/footer/footer.component';


@Component({
  selector: 'app-listar-platos',
  standalone: true,
  imports: [NavbarComponent, NgFor, NgIf, CommonModule, RouterLink, FooterComponent],
  templateUrl: './listar-platos.component.html',
  styleUrl: './listar-platos.component.css'
})
export class ListarPlatosComponent implements OnInit {
  platos: Plato[] = []; 

  constructor(private platoService: PlatoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPlatos(); 
  }

  cargarPlatos() {
    this.platoService.getPlatos().subscribe({
      next: (response: any) => {
        console.log('Datos recibidos:', response);
        this.platos = response; 
      },
      error: (error) => {
        console.error('Error al cargar los platos', error);
      }
    });
  }
  

  eliminarPlato(id: string | undefined): void {
    if (id) {
      if (confirm('¿Estás seguro de eliminar este plato?')) {
        this.platoService.deletePlato(id).subscribe({
          next: (response: any) => {
            this.platos = this.platos.filter(p => p._id !== id);
          },
          error: (error) => {
            console.error('Error al eliminar el plato', error);
          }
        });
      }
      this.router.navigate(['/platos']).then(() => {
        window.location.reload(); 
      });
    } else {
      console.error('ID no válido');
    }
  }

  
}
