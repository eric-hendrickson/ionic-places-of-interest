import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	constructor(
		public navController: NavController,
		public platform: Platform,
		private mapsProvider: MapsProvider
	) {

	}

	ionViewDidEnter() {
		this.mapsProvider.initMap();
	}
}
