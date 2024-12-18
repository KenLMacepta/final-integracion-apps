import { Component, OnInit } from '@angular/core';
import { PlatoService } from '../../services/plato.service';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { Plato } from '../../models/plato';
import { NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../pages/footer/footer.component';
@Component({
  selector: 'app-listar-platos',
  templateUrl: './listar-platos.component.html',
  styleUrls: ['./listar-platos.component.css'], // Cambiado a styleUrls
  imports: [NgFor, RouterLink, FooterComponent, NavbarComponent],
})

export class ListarPlatosComponent implements OnInit {
  platos: Plato[] = [];

  constructor(private platoService: PlatoService, private router: Router) {}

  ngOnInit(): void {
    this.platoService.getPlatos().subscribe((data) => {
      this.platos = data;
    });
  }

  deletePlato(id: string | undefined): void {
    if (id) { 
      this.platoService.deletePlato(id).subscribe(() => {
        this.platos = this.platos.filter((plato) => plato._id !== id); 
      });
    } else {
      console.error('ID no válido para eliminar el plato');
    }
  }
  
}
