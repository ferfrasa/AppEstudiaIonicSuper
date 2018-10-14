import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyProjectDetailPage } from './my-project-detail';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MyProjectDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyProjectDetailPage),
    TranslateModule.forChild()
  ],
})
export class MyProjectDetailPageModule {}
