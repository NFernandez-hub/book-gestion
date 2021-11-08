import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SubCategoriaService } from '../sub-categoria.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../categoria/categoria.service';
import { Categoria } from '../../categoria/categoria.interface';
import { SubCategoria } from '../sub-categoria.interfaces';

@Component({
  selector: 'app-crear-sub-categoria',
  templateUrl: './crear-sub-categoria.component.html',
  styles: [
  ]
})
export class CrearSubCategoriaComponent implements OnInit {

  subCategoria: SubCategoria = {
    ok: false,
    _id: '',
    nombre: '',
    categoria: {
      _id: '',
      nombre: ''
    }
  }

  categorias: Categoria[] = []

  constructor(private subCategoriaService: SubCategoriaService,
    private activatedRRoute: ActivatedRoute,
    private categoriaService: CategoriaService,
    private router: Router) { }

  ngOnInit(): void {

    this.getCategorias()
    if (!this.router.url.includes('editar')) {
      return
    }

    this.activatedRRoute.params
      .pipe(
        switchMap(({ id }) => this.subCategoriaService.getSubCategoriaPorId(id))
      )
      .subscribe(subCategoria => this.subCategoria = subCategoria)
  }

  getCategorias() {
    this.categoriaService.getCategorias()
      .subscribe(categorias => {
        this.categorias = categorias
      })
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z]*$/;   
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
      // invalid character, prevent input

    }
  }

  guardar() {

    if (this.subCategoria.nombre.trim().length === 0 || this.subCategoria.categoria._id?.trim().length === 0) {
      Swal.fire('Error', 'Campos obligatorios vacios', 'error')
    } else {
      if (this.subCategoria._id) {
        this.subCategoriaService.actualizarSubCategoria(this.subCategoria._id, this.subCategoria.nombre)
          .subscribe(resp => {
            Swal.fire('Sub-Categoria actualizada correctamente', this.subCategoria.nombre, 'success')
            this.router.navigate(['/gestion/subCategoria'])
          })
      } else {
        this.subCategoriaService.nuevaSubCategoria(this.subCategoria.nombre, this.subCategoria.categoria._id!)
          .subscribe(ok => {
            if (ok === true) {
              Swal.fire('Sub-Categoria agregada correctamente', this.subCategoria.nombre, 'success')
              this.router.navigate(['/gestion/subCategoria'])
            }
          })
      }
    }
  }

}
