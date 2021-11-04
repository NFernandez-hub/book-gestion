import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorComponent } from './pages/autor/autor.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { EditorialComponent } from './pages/editorial/editorial.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { AgregarUsuarioComponent } from './pages/usuario/agregar-usuario/agregar-usuario.component';
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


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'autor', component: AutorComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'editorial', component: EditorialComponent },
      { path: 'producto', component: ProductoComponent },
      { path: 'usuario', component: UsuarioComponent },
      { path: 'subCategoria', component: SubCategoriaComponent },
      { path: 'usuario/agregar', component: AgregarUsuarioComponent },
      { path: 'usuario/editar/:id', component: ModificarUsuarioComponent },
      { path: 'subCategoria/agregar', component: CrearSubCategoriaComponent },
      { path: 'subCategoria/editar/:id', component: CrearSubCategoriaComponent },
      { path: 'producto/agregar', component: CrearProductoComponent },
      { path: 'producto/editar/:id', component: ModificarProductoComponent },
      { path: 'evento', component: EventoComponent },
      { path: 'evento/agregar', component: CrearEventoComponent },
      { path: 'evento/editar/:id', component: ModificarEventoComponent },
      { path: 'comprobante', component: ComprobanteComponent },
      { path: 'comprobante/:id', component: VerComprobanteComponent },
      { path: 'preguntasFrecuentes', component: PreguntasFrecuentesComponent },
      { path: 'preguntasFrecuentes/agregar', component: AgregarPreguntaFrecuenteComponent },
      { path: 'preguntasFrecuentes/editar/:id', component: ModificarPreguntaFrecuenteComponent },
      { path: 'cupon', component: CuponComponent },
      { path: 'cupon/agregar', component: CrearCuponComponent },
      { path: 'cupon/editar/:id', component: CrearCuponComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
