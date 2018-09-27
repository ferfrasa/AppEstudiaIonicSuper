import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProyectosPage } from './proyectos';

@NgModule({
  declarations: [
    ProyectosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProyectosPage),
  ],
})
export class ProyectosPageModule {}
