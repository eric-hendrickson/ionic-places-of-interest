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
	position: any = {
		lat: 0,
		lng: 0
	};
	infowindow: any;
	locations: any[] = [];
	service: any;

	constructor(
		public http: HttpClient, 
		private geolocation: Geolocation,
	) {
	}

	initMap() {
		this.locations = [];
		this.geolocation.getCurrentPosition(options).then((resp) => {
			this.position = {
				lat: resp.coords.latitude,
				lng: resp.coords.longitude
			};
			map = new google.maps.Map(document.getElementById('map'), {
				center: this.position,
				zoom: 15
			});

			infowindow = new google.maps.InfoWindow();
			this.service = new google.maps.places.PlacesService(map);
			this.service.nearbySearch({
				location: this.position,
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

		this.locations.push(place);
	}

	getLocations() {
		return this.locations;
	}

	getLocation(index) {
		return this.locations[index];
	}
}
