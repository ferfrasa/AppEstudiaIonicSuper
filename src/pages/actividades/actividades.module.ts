import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActividadesPage } from './actividades';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ActividadesPage,
  ],
  imports: [
    IonicPageModule.forChild(ActividadesPage),
    TranslateModule.forChild()
  ],
})
export class ActividadesPageModule {}
