import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
	selector: 'page-place',
	templateUrl: 'place.html'
})
export class PlacePage {
	constructor(
		public navController: NavController,
		public platform: Platform
	) {

	}

}