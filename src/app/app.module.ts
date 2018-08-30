import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { PlacePage } from '../pages/place/place';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MapsProvider } from '../providers/maps/maps';

import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule } from '@angular/common/http';

export function tokenOptionsFactory(storage: Storage) {
	return {
		tokenGetter: () => storage.get('token'),
		whitelistedDomains: ['localhost:3000']
	  }
}

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		ListPage,
		PlacePage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		HttpClientModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		ListPage,
		PlacePage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		Geolocation,
		MapsProvider
	]
})
export class AppModule { }
