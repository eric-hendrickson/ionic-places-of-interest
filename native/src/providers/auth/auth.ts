import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { dateDataSortValue } from '../../../node_modules/ionic-angular/umd/util/datetime-util';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

	token: String;
	expires: any;

	constructor(
		public http: HttpClient,
		public navCtrl: NavController, 
		public navParams: NavParams
	) {
		console.log('Hello AuthProvider Provider');
	}

	checkLogin() {
		if (!this.token || (Date.now() > this.expires)) {
			this.token = null;
			this.navCtrl.setRoot(LoginPage);
		} else {
			this.token = null;
		}
	}

	loginUser(username: string, password: string, passwordValidate: string) {
		if (password.valueOf() !== passwordValidate.valueOf()) {
			console.log('error')
		}
		const credentials = {
			username: username,
			password: password
		}
		const response = this.http.post('http://localhost:3000/api/appUsers/login', credentials);
		
	}

}
