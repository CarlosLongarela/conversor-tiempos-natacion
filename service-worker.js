// Copyright 2016 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var dataCacheName = 'CLSwimgConversor';
var cacheName = 'CLSwimgConversor-1';
var filesToCache = [
	'./',
	'./index.html',
	'./js/conversor.min.js',
	'./css/styles.min.css',
	'./icons/swimming-conversor-144.png',
	'./icons/swimming-conversor-152.png',
	'./icons/swimming-conversor-512.png'
];

self.addEventListener( 'install', function( event ) {
	console.log( '[ServiceWorker] Install' );
	event.waitUntil(
		caches.open( cacheName ).then( function( cache ) {
			console.log( '[ServiceWorker] Caching app shell' );

			return cache.addAll( filesToCache );
		} )
	);
} );


self.addEventListener( 'activate', function( event ) {
	console.log( '[ServiceWorker] Activate' );
	event.waitUntil(
		caches.keys().then( function( keyList ) {
			return Promise.all( keyList.map( function( key ) {
				if ( key !== cacheName && key !== dataCacheName ) {
					console.log( '[ServiceWorker] Removing old cache', key );

					return caches.delete( key );
				}
			} ) );
		})
	);
	/*
	* Fixes a corner case in which the app wasn't returning the latest data.
	* You can reproduce the corner case by commenting out the line below and
	* then doing the following steps: 1) load app for first time so that the
	* initial New York City data is shown 2) press the refresh button on the
	* app 3) go offline 4) reload the app. You expect to see the newer NYC
	* data, but you actually see the initial data. This happens because the
	* service worker is not yet activated. The code below essentially lets
	* you activate the service worker faster.
	*/
	return self.clients.claim();
} );



self.addEventListener( 'fetch', function( event ) {
	console.log( 'URL: ' + event.request.url );
	if ( ! ( 0 === event.request.url.indexOf( 'http' ) ) ) {
		console.log( 'SI' );
		return;
	}

	event.respondWith(
		caches.open( cacheName ).then( function( cache ) {
			return cache.match( event.request ).then( function( response ) {
				var fetchPromise = fetch( event.request ).then( function( networkResponse ) {
					cache.put( event.request, networkResponse.clone() );
					return networkResponse;
				} );
				return response || fetchPromise;
			} );
		} )
	);
} );
