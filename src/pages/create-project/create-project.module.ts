import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CreateProjectPage } from './create-project';

@NgModule({
  declarations: [
    CreateProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateProjectPage),
    TranslateModule.forChild()
  ],
  exports: [
    CreateProjectPage
  ]
})
export class CreateProjectPageModule {}
