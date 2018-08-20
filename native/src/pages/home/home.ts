import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	latitude: any;
	longitude: any;

	constructor(public navCtrl: NavController, private geolocation: Geolocation) {

	}

	ionViewWillLoad() {
		this.geolocation.getCurrentPosition().then((resp) => {
			this.latitude = resp.coords.latitude;
			this.longitude = resp.coords.longitude;
			console.log('current position')
			console.log(this.latitude + ' ' + this.longitude)
		}).catch((error) => {
			console.log('Error getting location', error);
		});

		let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
			this.latitude = data.coords.latitude;
			this.longitude = data.coords.longitude;

			console.log('watched position')
			console.log(data.coords.longitude + ' ' + data.coords.latitude);
		});
	}

}
