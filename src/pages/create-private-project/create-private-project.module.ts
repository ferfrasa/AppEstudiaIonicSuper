import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePrivateProjectPage } from './create-private-project';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreatePrivateProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePrivateProjectPage),
    TranslateModule.forChild()
  ],
})
export class CreatePrivateProjectPageModule {}
