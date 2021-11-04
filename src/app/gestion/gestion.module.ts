import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GestionRoutingModule } from './gestion-routing.module';
import { ProductoComponent } from './pages/producto/producto.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { AutorComponent } from './pages/autor/autor.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';
import { AgregarUsuarioComponent } from './pages/usuario/agregar-usuario/agregar-usuario.component';
import { FormsModule } from '@angular/forms';
import { SubCategoriaComponent } from './pages/sub-categoria/sub-categoria.component';
import { CrearSubCategoriaComponent } from './pages/sub-categoria/crear-sub-categoria/crear-sub-categoria.component';
import { CrearProductoComponent } from './pages/producto/crearProducto/crear-producto/crear-producto.component';
import { ModificarProductoComponent } from './pages/producto/modificarProducto/modificar-producto/modificar-producto.component';
import { EventoComponent } from './pages/evento/evento/evento.component';
import { CrearEventoComponent } from './pages/evento/crear-evento/crear-evento/crear-evento.component';
import { ModificarEventoComponent } from './pages/evento/modificar-evento/modificar-evento/modificar-evento.component';
import { ComprobanteComponent } from './pages/comprobante/comprobante.component';
import { VerComprobanteComponent } from './pages/comprobante/ver-comprobante/ver-comprobante/ver-comprobante.component';
import { ModificarUsuarioComponent } from './pages/usuario/modificar-usuario/modificar-usuario/modificar-usuario.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { AgregarPreguntaFrecuenteComponent } from './pages/preguntas-frecuentes/agregar-preguntaFrecuente/agregar-pregunta-frecuente/agregar-pregunta-frecuente.component';
import { ModificarPreguntaFrecuenteComponent } from './pages/preguntas-frecuentes/modificar-preguntaFrecuente/modificar-pregunta-frecuente/modificar-pregunta-frecuente.component';
import { CuponComponent } from './pages/cupon/cupon.component';
import { CrearCuponComponent } from './pages/cupon/crear-cupon/crear-cupon/crear-cupon.component';

@NgModule({
  declarations: [
    ProductoComponent,
    EditorialComponent,
    UsuarioComponent,
    CategoriaComponent,
    AutorComponent,
    HomeComponent,
    AgregarUsuarioComponent,
    SubCategoriaComponent,
    CrearSubCategoriaComponent,
    CrearProductoComponent,
    ModificarProductoComponent,
    EventoComponent,
    CrearEventoComponent,
    ModificarEventoComponent,
    ComprobanteComponent,
    VerComprobanteComponent,
    ModificarUsuarioComponent,
    PreguntasFrecuentesComponent,
    AgregarPreguntaFrecuenteComponent,
    ModificarPreguntaFrecuenteComponent,
    CuponComponent,
    CrearCuponComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    GestionRoutingModule,
  ]
})
export class GestionModule { }
