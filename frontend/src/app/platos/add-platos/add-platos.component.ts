import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../models/plato';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { FooterComponent } from '../../pages/footer/footer.component';

@Component({
  selector: 'app-add-platos',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './add-platos.component.html',
  styleUrls: ['./add-platos.component.css']
})
export class AddPlatosComponent {
  addPlatoForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private platoService: PlatoService) {
    this.addPlatoForm = this.fb.group({
      nombre: ['', Validators.required],
      ingredientes: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      categoria: ['', Validators.required],
    });
  }

  addPlato() {
    if (this.addPlatoForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    const plato: Plato = {
      nombre: this.addPlatoForm.get('nombre')?.value,
      ingredientes: this.addPlatoForm.get('ingredientes')?.value,
      precio: this.addPlatoForm.get('precio')?.value,
      categoria: this.addPlatoForm.get('categoria')?.value,
    };

    this.platoService.addPlato(plato).subscribe({
      next: () => {
        this.router.navigate(['/platos']);
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || 'Error al añadir el plato. Intente de nuevo.';
      },
    });
  }
}
