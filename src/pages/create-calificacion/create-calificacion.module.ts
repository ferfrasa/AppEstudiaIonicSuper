import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCalificacionPage } from './create-calificacion';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateCalificacionPage,
    
  ],
  imports: [
    IonicPageModule.forChild(CreateCalificacionPage),
    TranslateModule.forChild()

  ],
})
export class CreateCalificacionPageModule {}
