import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../providers';

/**
 * Generated class for the MyProjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-project-detail',
  templateUrl: 'my-project-detail.html',
})
export class MyProjectDetailPage {
  item: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,items: Items,) {
    this.item = navParams.get('item') || items.defaultItem;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyProjectDetailPage');
  }

}
