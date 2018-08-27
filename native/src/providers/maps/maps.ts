import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare let google: any;
let map: any;
let infowindow: any;
const options = {
	enableHighAccuracy: true,
	timeout: 20000,
	maximumAge: 0
};

/*
  Generated class for the MapsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MapsProvider {
	latitude: Number = 0;
	longitude: Number = 0;
	infowindow: any;

	constructor(
		public http: HttpClient, 
		private geolocation: Geolocation,
	) {
		console.log('Hello MapsProvider Provider');
	}

	do() {
		console.log('do maps')
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
