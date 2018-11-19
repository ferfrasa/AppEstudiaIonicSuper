import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditprojectPage } from './editproject';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    EditprojectPage,
  ],
  imports: [
    IonicPageModule.forChild(EditprojectPage),
    TranslateModule.forChild()

  ],
})
export class EditprojectPageModule {}
