import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0
  };

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	latitude: Number = 0;
	longitude: Number = 0;
	map: any;

	constructor(
		public navController: NavController, 
		public platform: Platform, 
		private geolocation: Geolocation
	) { 
		
	}

	ionViewWillLoad() {
		this.geolocation.getCurrentPosition(options).then((resp) => {
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

	ionViewDidEnter() {
		this.geolocation.getCurrentPosition(options).then((resp) => {
			this.latitude = resp.coords.latitude;
			this.longitude = resp.coords.longitude;
			console.log('current position')
			console.log(this.latitude + ' ' + this.longitude)
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: this.latitude || 0, lng: this.longitude || 0 },
				zoom: 15
			});
		}).catch((error) => {
			console.log('Error getting location', error);
		});		
	}

}
