import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../models/plato';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent,  } from '../../pages/footer/footer.component';

@Component({
  selector: 'app-update-plato',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, ReactiveFormsModule],
  templateUrl: './update-platos.component.html',
  styleUrls: ['./update-platos.component.css']
})
export class UpdatePlatoComponent implements OnInit {
  plato: Plato | undefined;
  platoForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private platoService: PlatoService, 
    private router: Router
  ) {
    this.platoForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.cargarPlato();
  }

  cargarPlato(): void {
    const platoId = this.route.snapshot.paramMap.get('id');

    if (platoId) {
      this.platoService.getPlatos().subscribe({
        next: (response: any) => {
          this.plato = response.data;
          if (this.plato) {
            this.platoForm.patchValue({
              nombre: this.plato.nombre,
              ingredientes: this.plato.ingredientes,
              precio: this.plato.precio,
            });
          }
        },
        error: (error) => {
          console.error('Error al cargar los datos del plato', error);
        }
      });
    }
  }

  actualizarPlato(): void {
    if (this.platoForm.valid && this.plato) {
      const platoId = this.route.snapshot.paramMap.get('id');
      if (platoId) {
        const updatedPlato = this.platoForm.value;

        this.platoService.updatePlato(platoId, updatedPlato).subscribe({
          next: (response: any) => {
            console.log('Plato actualizado exitosamente');
            this.router.navigate(['/platos']);
          },
          error: (error) => {
            console.error('Error al actualizar el plato', error);
          }
        });
      }
    }
  }
}
