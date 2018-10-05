import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioPage } from './inicio';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InicioPage,
  ],
  imports: [
    IonicPageModule.forChild(InicioPage),
    TranslateModule.forChild()
  ],
})
export class InicioPageModule {}
