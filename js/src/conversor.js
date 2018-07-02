//Para la conversión de los tiempos realizados en piscina de 25 metros a piscina de 50 metros, se utilizará la tabla que se expresa
//en el apartado siguiente, sumando al tiempo de piscina de 25 metros, el tiempo expresado en segundos y décimas que se indica
//en la tabla para la prueba correspondiente. Para la conversión de piscina de 50 m. a 25 m. se aplicará el procedimiento pero
//inverso.
//
//La conversión para los tiempos acreditados en forma manual a electrónico se sumarán 19 centésimas, excepto para las pruebas
//de 50 metros que se sumarán 29 centésimas.
//
//             m[50,100,200,400,800,1500,4x50,4x100,4x200]
// m[Libre]
// m[Espalda]
// m[Braza]
// m[Mariposa]
// m[Estilos];

//POR DEFECTO ES: Libre - 50m - Masculino - 50m - manual
//   Y SE PASA A: Libre - 50m - Masculino - 50m - electronico
//   Y SE PASA A: Libre - 50m - Masculino - 25m - manual
//   Y SE PASA A: Libre - 50m - Masculino - 25m - electronico

//DE 25 A 50 SE SUMAN LOS VALORES DE LAS TABLAS
//SI EL TIEMPO ES EN ELECTRONICO
var e = [];

e[0] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
e[1] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
e[2] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
e[3] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
e[4] = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];

var m = [];

m[0] = [  70, 160, 340,  720, 1570, 2950, 280, 640, 1360 ];
m[1] = [ 110, 250, 570,    0,    0,    0,   0,   0,    0 ];
m[2] = [  80, 230, 600,    0,    0,    0,   0,   0,    0 ];
m[3] = [  30, 130, 310,    0,    0,    0,   0,   0,    0 ];
m[4] = [   0,   0, 490, 1000,    0,    0, 290, 770,    0 ];

var f = [];
f[0] = [  40, 100, 240, 520, 1190, 2230, 160, 400, 960 ];
f[1] = [ 100, 220, 570,   0,    0,    0,   0,   0,   0 ];
f[2] = [  60, 200, 450,   0,    0,    0,   0,   0,   0 ];
f[3] = [  30,  80, 240,   0,    0,    0,   0,   0,   0 ];
f[4] = [   0,   0, 310, 750,    0,    0, 230, 600,   0 ];

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
	var time = 0;
	var minutos = 0;
	var segundos = 0;
	var centesimas = 0;
	var time_50m = 0;
	var time_50e = 0;
	var time_25m = 0;
	var time_25e = 0;
	var salida = "";

	var minutes_value    = document.getElementById( 'minutos' ).value;
	var seconds_value    = document.getElementById( 'segundos' ).value;
	var hundredths_value = document.getElementById( 'centesimas' ).value;
	var style_value      = document.getElementById( 'estilo' ).value;
	var distance_value   = document.getElementById( 'prueba' ).value;

	time = ( isNaN( parseInt( minutes_value, 10 ) ) ? 0 : parseInt( minutes_value, 10 ) * 6000 )
			+ ( isNaN( parseInt( seconds_value, 10 ) ) ? 0 : parseInt( seconds_value, 10 ) * 100 )
			+ ( isNaN( parseInt( hundredths_value, 10 ) ) ? 0 : parseInt( hundredths_value, 10 ) );


	//Estilo,prueba, Sexo, piscina, cronometro
	if ( document.getElementById( 'crono_0' ).checked ) {//form.crono.value == "M") {//MANUAL
		if ( document.getElementById( 'piscina_1' ).checked ) {//form.crono.value == "25") {//PISCINA DE 25 + MANUAL
			if ( document.getElementById( 'sexo_0' ).checked ) {//form.crono.value == "M") {//MASCULINO + PISCINA DE 25 + MANUAL
				time_50m = time + m[ style_value ][ distance_value ];
				time_50e = time + m[ style_value ][ distance_value ] + e[ style_value ][ distance_value ];
				time_25m = time;
				time_25e = time + e[ style_value ][ distance_value ];
			} else { //FEMENINO + PISCINA DE 25 + MANUAL
				time_50m = time + f[ style_value ][ distance_value ];
				time_50e = time + f[ style_value ][ distance_value ] + e[ style_value ][ distance_value ];
				time_25m = time;
				time_25e = time + e[ style_value ][ distance_value ];
			}
		} else {
			if (document.getElementById( 'sexo_0' ).checked ) {//form.crono.value == "M") {//MASCULINO + PISCINA DE 50 + MANUAL
				time_50m = time;
				time_50e = time + e[ style_value ][ distance_value ];
				time_25m = time - m[ style_value ][ distance_value ];
				time_25e = time - m[ style_value ][ distance_value ] + e[ style_value ][ distance_value ];
			}else {//FEMENINO + PISCINA DE 50 + MANUAL
				time_50m = time;
				time_50e = time + e[ style_value ][ distance_value ];
				time_25m = time - f[ style_value ][ distance_value ];
				time_25e = time - f[ style_value ][ distance_value ] + e[ style_value ][ distance_value ];
			}
		}
	} else {//ELECTRONICO
		if ( document.getElementById( 'piscina_1' ).checked ) { //form.crono.value == "25") {//PISCINA DE 25 + ELECTRONICO
			if ( document.getElementById( 'sexo_0' ).checked ) { //form.crono.value == "M") {//MASCULINO + PISCINA DE 25 + ELECTRONICO
				time_50m = time + m[ style_value ][ distance_value ] - e[ style_value ][ distance_value ];
				time_50e = time + m[ style_value ][ distance_value ];
				time_25m = time - e[ style_value ][ distance_value ];
				time_25e = time;
			} else { //FEMENINO + PISCINA DE 25 + ELECTRONICO
				time_50m = time + f[ style_value ][ distance_value ] - e[ style_value ][ distance_value ];
				time_50e = time + f[ style_value ][ distance_value ];
				time_25m = time - e[ style_value ][ distance_value ];
				time_25e = time;
			}
		} else { //PISCINA DE 50
			if ( document.getElementById( 'sexo_0' ).checked ) {//form.crono.value == "M") {//MASCULINO + PISCINA DE 50 + ELECTRONICO
				time_50m = time - e[ style_value ][ distance_value ];
				time_50e = time;
				time_25m = time - m[ style_value ][ distance_value ] - e[ style_value ][ distance_value ];
				time_25e = time - m[ style_value ][ distance_value ];
			} else {//FEMENINO + PISCINA DE 50 + ELECTRONICO
				time_50m = time - e[ style_value ][ distance_value ];
				time_50e = time;
				time_25m = time - f[ style_value ][ distance_value ] - e[ style_value ][ distance_value ];
				time_25e = time - f[ style_value ][ distance_value ];
			}
		}
	}
/*    salida = "Tiempo en piscina de <strong>50 metros</strong>, cronómetro <strong>manual</strong>: <strong>"+ darformato(tiempo50M)+"</strong>";
	salida += "Tiempo en piscina de <strong>50 metros</strong>, cronómetro <strong>electrónico</strong>: <strong>"+ darformato(time_50e)+"</strong>";
	salida += "Tiempo en piscina de <strong>25 metros</strong>, cronómetro <strong>manual</strong>: <strong>"+ darformato(time_25m)+"</strong>";
	salida += "Tiempo en piscina de <strong>25 metros</strong>, cronómetro <strong>electrónico</strong>: <strong>"+ darformato(time_25e)+"</strong>";*/
	document.getElementById( 'js-cl-50m' ).innerHTML = format_times( time_50m );
	document.getElementById( 'js-cl-50e' ).innerHTML = format_times( time_50e );
	document.getElementById( 'js-cl-25m' ).innerHTML = format_times( time_25m );
	document.getElementById( 'js-cl-25e' ).innerHTML = format_times( time_25e );
}

function convertir2() {
	console.log( 'Pulsado' );
}
// Function to add event listener to t
function cl_load() {
	var btn = document.getElementById( 'js-cl-calculate' );

	btn.addEventListener( 'click', convertir, false );
}

document.addEventListener( 'DOMContentLoaded', cl_load, false );
