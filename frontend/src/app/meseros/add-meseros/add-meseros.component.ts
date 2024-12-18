import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { MeseroService } from '../../services/mesero.service';
import { Meseros } from '../../models/meseros';
import { NavbarComponent } from '../../pages/navbar/navbar.component';
import { FooterComponent } from '../../pages/footer/footer.component';

@Component({
    selector: 'app-add-meseros',
    imports: [NgIf, ReactiveFormsModule, NavbarComponent, FooterComponent],
    templateUrl: './add-meseros.component.html',
    styleUrl: './add-meseros.component.css'
})
export class AddMeserosComponent {
  addMeseroForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private dataAdd: MeseroService) {
    this.addMeseroForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', Validators.required],
      contraseña: ['', Validators.required],
      telefono: ['', Validators.required],
      activo: [true],
    })
  }

  addMesero() {
    const mesero: Meseros = {
      nombre: this.addMeseroForm.get('nombre')?.value,
      correo: this.addMeseroForm.get('correo')?.value,
      contraseña: this.addMeseroForm.get('contraseña')?.value,
      telefono: this.addMeseroForm.get('telefono')?.value,
      activo: this.addMeseroForm.get('activo')?.value,
    }

    this.dataAdd.addMesero(mesero).subscribe({
      next: (response: any) => {
        this.router.navigate(['/meseros']);
      },
      error: (error: any) => {
        this.errorMessage = 'Error al añadir. Intente de nuevo.';
      }
    });
  }
}
