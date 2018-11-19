import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListProjectPage } from './list-project';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ListProjectPage,
  ],
  imports: [
    IonicPageModule.forChild(ListProjectPage),
    TranslateModule.forChild()
  ],
})
export class ListProjectPageModule {}
