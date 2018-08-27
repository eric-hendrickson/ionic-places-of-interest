import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare let google: any;
let map: any;
let infowindow: any;
const options = {
	enableHighAccuracy: true,
	timeout: 20000,
	maximumAge: 0
};

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	latitude: Number = 0;
	longitude: Number = 0;
	infowindow: any;

	constructor(
		public navController: NavController,
		public platform: Platform,
		private geolocation: Geolocation
	) {

	}

	ionViewDidEnter() {
		this.initMap();
	}

	initMap() {
		this.geolocation.getCurrentPosition(options).then((resp) => {
			this.latitude = resp.coords.latitude;
			this.longitude = resp.coords.longitude;
			console.log('current position')
			console.log(this.latitude + ' ' + this.longitude)
			map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: this.latitude, lng: this.longitude },
				zoom: 15
			});

			infowindow = new google.maps.InfoWindow();
			let service = new google.maps.places.PlacesService(map);
			service.nearbySearch({
				location: { lat: this.latitude, lng: this.longitude },
				radius: 500,
				type: ['store']
			}, (results, status) => {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					for (let i = 0; i < results.length; i++) {
						this.createMarker(results[i]);
					}
				}
			});
		}).catch((error) => {
			console.log('Error getting location', error);
		});
	}

	createMarker(place) {
		let placeLoc = place.geometry.location;
		let marker = new google.maps.Marker({
			map: map,
			position: placeLoc
		});

		google.maps.event.addListener(marker, 'click', function () {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
	}

}
