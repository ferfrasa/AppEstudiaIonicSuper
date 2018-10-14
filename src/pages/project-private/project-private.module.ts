import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectPrivatePage } from './project-private';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProjectPrivatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProjectPrivatePage),
    TranslateModule.forChild()
  ],
})
export class ProjectPrivatePageModule {}
