import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';

import { RolPage } from './rol';

@NgModule({
  declarations: [
    RolPage,
  ],
  imports: [
    IonicPageModule.forChild(RolPage),
    TranslateModule.forChild()
  ],
})
export class RolPageModule {}
