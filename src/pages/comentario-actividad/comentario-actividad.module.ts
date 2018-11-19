import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentarioActividadPage } from './comentario-actividad';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ComentarioActividadPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentarioActividadPage),
    TranslateModule.forChild()

  ],
})
export class ComentarioActividadPageModule {}
