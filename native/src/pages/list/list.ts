import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {
	selectedItem: any;
	icons: string[];
	items: Array<{ title: string }>;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private mapsProvider: MapsProvider
	) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');

		// Let's populate this page with some filler content for funzies
		this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
			'american-football', 'boat', 'bluetooth', 'build'];

		const locations = this.mapsProvider.getLocations();

		this.items = [];
		for (let i = 1; i < locations.length; i++) {
			this.items.push({title: locations[i].name});
		}
	}

	itemTapped(event, item) {
		// That's right, we're pushing to ourselves!
		this.navCtrl.push(ListPage, {
			item: item
		});
	}
}
