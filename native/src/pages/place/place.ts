import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';

@Component({
	selector: 'page-place',
	templateUrl: 'place.html'
})
export class PlacePage {
	placeData: any;

	constructor(
		public navController: NavController,
		public platform: Platform,
		private navParams: NavParams,
		private mapsProvider: MapsProvider
	) {
		const item = this.navParams.get('item');
		this.placeData = this.mapsProvider.getLocation(item.index);
		console.log(this.placeData.name)
	}

}