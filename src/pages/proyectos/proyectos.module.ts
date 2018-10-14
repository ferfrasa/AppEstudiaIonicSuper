import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProyectosPage } from './proyectos';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ProyectosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProyectosPage),
    TranslateModule.forChild()
  ],
})
export class ProyectosPageModule {}
