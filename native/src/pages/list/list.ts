import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapsProvider } from '../../providers/maps/maps';
import { PlacePage } from '../place/place';

@Component({
	selector: 'page-list',
	templateUrl: 'list.html'
})
export class ListPage {
	selectedItem: any;
	icons: string[];
	items: any[];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private mapsProvider: MapsProvider
	) {
		// If we navigated to this page, we will have an item available as a nav param
		this.selectedItem = navParams.get('item');

		const locations = this.mapsProvider.getLocations();

		this.items = [];
		for (let i = 1; i < locations.length; i++) {
			this.items.push({
				title: locations[i].name,
			});
		}
	}

	itemTapped(event, item) {
		this.navCtrl.push(PlacePage, {
			item: item
		});
	}
}
