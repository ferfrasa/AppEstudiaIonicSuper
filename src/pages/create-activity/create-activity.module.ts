import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateActivityPage } from './create-activity';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CreateActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateActivityPage),
    TranslateModule.forChild()
  ],
})
export class CreateActivityPageModule {}
