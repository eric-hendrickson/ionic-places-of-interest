import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';

@Component({
	selector: 'place-home',
	templateUrl: 'place.html'
})
export class PlacePage {
	constructor(
		public navController: NavController,
		public platform: Platform,
		private mapsProvider: MapsProvider
	) {

	}

}