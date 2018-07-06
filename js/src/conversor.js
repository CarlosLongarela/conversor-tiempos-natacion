/**
 * Las tres matrices de tiempos de la RFEN (Temporada 2017-2018)
 * http://www.rfen.es/publicacion/userfiles/NAT_00_Normativa_ASPECTOS_GENERALES_2017-2018.pdf
 *
 * Tienen el formato:
 *
 *
 *                   matriz[ 50, 100, 200, 400, 800, 1500, 4x50, 4x100, 4x200 ]
 * matriz[ Libre ]
 * matriz[ Espalda ]
 * matriz[ Braza ]
 * matriz[ Mariposa ]
 * matriz[ Estilos ]
 */

var crono_e = [];

crono_e[0] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
crono_e[1] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
crono_e[2] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
crono_e[3] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
crono_e[4] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];

var sex_male = [];

sex_male[0] = [  70, 160, 340,  720, 1570, 2950, 280, 640, 1360 ];
sex_male[1] = [ 110, 250, 570,    0,    0,    0,   0,   0,    0 ];
sex_male[2] = [  80, 230, 600,    0,    0,    0,   0,   0,    0 ];
sex_male[3] = [  30, 130, 310,    0,    0,    0,   0,   0,    0 ];
sex_male[4] = [   0,   0, 490, 1000,    0,    0, 290, 770,    0 ];

var sex_female = [];
sex_female[0] = [  40, 100, 240, 520, 1190, 2230, 160, 400, 960 ];
sex_female[1] = [ 100, 220, 570,   0,    0,    0,   0,   0,   0 ];
sex_female[2] = [  60, 200, 450,   0,    0,    0,   0,   0,   0 ];
sex_female[3] = [  30,  80, 240,   0,    0,    0,   0,   0,   0 ];
sex_female[4] = [   0,   0, 310, 750,    0,    0, 230, 600,   0 ];

//SI EL TIEMPO ES EN MANUAL SE LE SUMA 19 O 29 SEGUN PRUEBA

function format_times( t ) {
	var minutes    = Math.floor( t / 6000 );
	var seconds    = Math.floor( ( t - ( minutes * 6000 ) ) / 100 );
	var hundredths = t - ( minutes * 6000 ) - ( seconds * 100 );
	var result     = '';

	minutes    = ( minutes < 10 && minutes > -1 ) ? '0' + minutes : minutes;
	seconds    = ( seconds < 10 && seconds > -1 )? '0' + seconds : seconds;
	hundredths = ( hundredths < 10 && hundredths > -1 ) ? '0' + hundredths : hundredths;

	result = minutes + ':' + seconds + '.' + hundredths;

	return result;
}

function convertir() {
	var time             = 0;
	var time_50m         = 0;
	var time_50e         = 0;
	var time_25m         = 0;
	var time_25e         = 0;
	var minutes_value    = document.getElementById( 'minutes' ).value;
	var seconds_value    = document.getElementById( 'seconds' ).value;
	var hundredths_value = document.getElementById( 'hundredths' ).value;
	var style_value      = document.getElementById( 'js-cl-style' ).value;
	var distance_value   = document.getElementById( 'js-cl-distance' ).value;

	time = ( isNaN( parseInt( minutes_value, 10 ) ) ? 0 : parseInt( minutes_value, 10 ) * 6000 )
			+ ( isNaN( parseInt( seconds_value, 10 ) ) ? 0 : parseInt( seconds_value, 10 ) * 100 )
			+ ( isNaN( parseInt( hundredths_value, 10 ) ) ? 0 : parseInt( hundredths_value, 10 ) );

	if ( document.getElementById( 'js-cl-timer-m' ).checked ) { // Medición con cronómetro manual.
		if ( document.getElementById( 'js-cl-size-25' ).checked ) { // Piscina de 25m (y cronómetro manual).
			if ( document.getElementById( 'js-cl-sex-male' ).checked ) { // Masculino (piscina de 25m y cronómetro manual).
				time_50m = time + sex_male[ style_value ][ distance_value ];
				time_50e = time + sex_male[ style_value ][ distance_value ] + crono_e[ style_value ][ distance_value ];
				time_25m = time;
				time_25e = time + crono_e[ style_value ][ distance_value ];
			} else { // Femenino (piscina de 25m y cronómetro manual).
				time_50m = time + sex_female[ style_value ][ distance_value ];
				time_50e = time + sex_female[ style_value ][ distance_value ] + crono_e[ style_value ][ distance_value ];
				time_25m = time;
				time_25e = time + crono_e[ style_value ][ distance_value ];
			}
		} else { // Piscina de 50m (y cronómetro manual).
			if (document.getElementById( 'js-cl-sex-male' ).checked ) { // Masculino (piscina de 50m y cronómetro manual).
				time_50m = time;
				time_50e = time + crono_e[ style_value ][ distance_value ];
				time_25m = time - sex_male[ style_value ][ distance_value ];
				time_25e = time - sex_male[ style_value ][ distance_value ] + crono_e[ style_value ][ distance_value ];
			} else { // Femenino (piscina de 50m y cronómetro manual).
				time_50m = time;
				time_50e = time + crono_e[ style_value ][ distance_value ];
				time_25m = time - sex_female[ style_value ][ distance_value ];
				time_25e = time - sex_female[ style_value ][ distance_value ] + crono_e[ style_value ][ distance_value ];
			}
		}
	} else { // Medición con cronómetro electrónico.
		if ( document.getElementById( 'js-cl-size-25' ).checked ) { // Piscina de 25m (y cronómetro electrónico).
			if ( document.getElementById( 'js-cl-sex-male' ).checked ) { // Masculino (piscina de 25m y cronómetro electrónico).
				time_50m = time + sex_male[ style_value ][ distance_value ] - crono_e[ style_value ][ distance_value ];
				time_50e = time + sex_male[ style_value ][ distance_value ];
				time_25m = time - crono_e[ style_value ][ distance_value ];
				time_25e = time;
			} else { // Femenino (piscina de 25m y cronómetro electrónico).
				time_50m = time + sex_female[ style_value ][ distance_value ] - crono_e[ style_value ][ distance_value ];
				time_50e = time + sex_female[ style_value ][ distance_value ];
				time_25m = time - crono_e[ style_value ][ distance_value ];
				time_25e = time;
			}
		} else { // Piscina de 50m (y cronómetro electrónico).
			if ( document.getElementById( 'js-cl-sex-male' ).checked ) { // Masculino (piscina de 50m y cronómetro electrónico).
				time_50m = time - crono_e[ style_value ][ distance_value ];
				time_50e = time;
				time_25m = time - sex_male[ style_value ][ distance_value ] - crono_e[ style_value ][ distance_value ];
				time_25e = time - sex_male[ style_value ][ distance_value ];
			} else { // Femenino (piscina de 50m y cronómetro electrónico).
				time_50m = time - crono_e[ style_value ][ distance_value ];
				time_50e = time;
				time_25m = time - sex_female[ style_value ][ distance_value ] - crono_e[ style_value ][ distance_value ];
				time_25e = time - sex_female[ style_value ][ distance_value ];
			}
		}
	}

	document.getElementById( 'js-cl-50m' ).innerHTML = format_times( time_50m );
	document.getElementById( 'js-cl-50e' ).innerHTML = format_times( time_50e );
	document.getElementById( 'js-cl-25m' ).innerHTML = format_times( time_25m );
	document.getElementById( 'js-cl-25e' ).innerHTML = format_times( time_25e );
}

function show_hide_info() {
	var info_div = document.getElementById( 'js-cl-info' );
 console.log('HOLA');
	if ( 'hidden' === info_div.dataset.state ) {
		info_div.dataset.state = 'visible';
	} else {
		info_div.dataset.state = 'hidden';
	}
}

function cl_load() {
	var sex        = document.getElementById( 'js-cl-sex-male' );
	var size       = document.getElementById( 'js-cl-size-25' );
	var timer      = document.getElementById( 'js-cl-timer-m' );
	var style      = document.getElementById( 'js-cl-style' );
	var distance   = document.getElementById( 'js-cl-distance' );
	var minutes    = document.getElementById( 'minutes' );
	var seconds    = document.getElementById( 'seconds' );
	var hundredths = document.getElementById( 'hundredths' );
	var info       = document.getElementById( 'js-cl-more-info' );

	convertir(); // Primera conversión con el tiempo por defecto.

	sex.addEventListener( 'change', convertir, false );
	size.addEventListener( 'change', convertir, false );
	timer.addEventListener( 'change', convertir, false );
	style.addEventListener( 'change', convertir, false );
	distance.addEventListener( 'change', convertir, false );
	minutes.addEventListener( 'change', convertir, false );
	seconds.addEventListener( 'change', convertir, false );
	hundredths.addEventListener( 'change', convertir, false );

	info.addEventListener( 'click', show_hide_info, false );
}

document.addEventListener( 'DOMContentLoaded', cl_load, false );
