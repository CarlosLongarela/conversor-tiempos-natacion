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
 e[0]  = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
 e[1]  = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
 e[2]  = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
 e[3]  = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];
 e[4]  = [ 29, 19, 19, 19, 19, 19, 29, 19, 19 ];

var m = [];
 m[0]  = [  70, 160, 340,  720, 1570, 2950, 280, 640, 1360 ];
 m[1]  = [ 110, 250, 570,    0,    0,    0,   0,   0,    0 ];
 m[2]  = [  80, 230, 600,    0,    0,    0,   0,   0,    0 ];
 m[3]  = [  30, 130, 310,    0,    0,    0,   0,   0,    0 ];
 m[4]  = [   0,   0, 490, 1000,    0,    0, 290, 770,    0 ];

var f = [];
f[0]   = [  40, 100, 240, 520, 1190, 2230, 160, 400, 960 ];
f[1]   = [ 100, 220, 570,   0,    0,    0,   0,   0,   0 ];
f[2]   = [  60, 200, 450,   0,    0,    0,   0,   0,   0 ];
f[3]   = [  30,  80, 240,   0,    0,    0,   0,   0,   0 ];
f[4]   = [   0,   0, 310, 750,    0,    0, 230, 600,   0 ];

//SI EL TIEMPO ES EN MANUAL SE LE SUMA 19 O 29 SEGUN PRUEBA

function darformato( t ) {
	minutos = Math.floor( t / 6000 );
	segundos = Math.floor( ( t - ( minutos * 6000 ) ) / 100 );
	centesimas = t - ( minutos * 6000 ) - ( segundos * 100 );

	minutos = ( minutos < 10 && minutos > -1 ) ? "0" + minutos : minutos;
	segundos = ( segundos < 10 && segundos > -1 )?"0" + segundos : segundos;
	centesimas = ( centesimas < 10 && centesimas > -1 ) ? "0" + centesimas : centesimas;

	return minutos + ":" + segundos + "." + centesimas + "<br \/>";
}

function convertir( form ) {
	var tiempo = 0;
	var minutos = 0;
	var segundos = 0;
	var centesimas = 0;
	var tiempo50M = 0, tiempo50E = 0, tiempo25M = 0, tiempo25E = 0;
	var salida = "";

	tiempo = ( isNaN( parseInt( form.minutos.value, 10 ) ) ? 0 : parseInt( form.minutos.value, 10 ) * 6000 )
			+ ( isNaN( parseInt( form.segundos.value, 10 ) ) ? 0 : parseInt( form.segundos.value, 10 ) * 100 )
			+ ( isNaN( parseInt( form.centesimas.value, 10 ) ) ? 0 : parseInt( form.centesimas.value, 10 ) );


	//Estilo,prueba, Sexo, piscina, cronometro
	if ( document.getElementById( 'crono_0' ).checked ) {//form.crono.value == "M") {//MANUAL
		if ( document.getElementById( 'piscina_1' ).checked ) {//form.crono.value == "25") {//PISCINA DE 25 + MANUAL
			if ( document.getElementById( 'sexo_0' ).checked ) {//form.crono.value == "M") {//MASCULINO + PISCINA DE 25 + MANUAL
				tiempo50M = tiempo + m[ form.estilo.value ][ form.prueba.value ];
				tiempo50E = tiempo + m[ form.estilo.value ][ form.prueba.value ] + e[ form.estilo.value ][ form.prueba.value ];
				tiempo25M = tiempo;
				tiempo25E = tiempo + e[ form.estilo.value ][ form.prueba.value ];
			} else { //FEMENINO + PISCINA DE 25 + MANUAL
				tiempo50M = tiempo + f[ form.estilo.value ][ form.prueba.value ];
				tiempo50E = tiempo + f[ form.estilo.value ][ form.prueba.value ] + e[ form.estilo.value ][ form.prueba.value ];
				tiempo25M = tiempo;
				tiempo25E = tiempo + e[ form.estilo.value ][ form.prueba.value ];
			}
		} else {
			if (document.getElementById( 'sexo_0' ).checked ) {//form.crono.value == "M") {//MASCULINO + PISCINA DE 50 + MANUAL
				tiempo50M = tiempo;
				tiempo50E = tiempo + e[ form.estilo.value ][ form.prueba.value ];
				tiempo25M = tiempo - m[ form.estilo.value ][ form.prueba.value ];
				tiempo25E = tiempo - m[ form.estilo.value ][ form.prueba.value ] + e[ form.estilo.value ][ form.prueba.value ];
			}else {//FEMENINO + PISCINA DE 50 + MANUAL
				tiempo50M = tiempo;
				tiempo50E = tiempo + e[ form.estilo.value ][ form.prueba.value ];
				tiempo25M = tiempo - f[ form.estilo.value ][ form.prueba.value ];
				tiempo25E = tiempo - f[ form.estilo.value ][ form.prueba.value ] + e[ form.estilo.value ][ form.prueba.value ];
			}
		}
	} else {//ELECTRONICO
		if ( document.getElementById( 'piscina_1' ).checked ) { //form.crono.value == "25") {//PISCINA DE 25 + ELECTRONICO
			if ( document.getElementById( 'sexo_0' ).checked ) { //form.crono.value == "M") {//MASCULINO + PISCINA DE 25 + ELECTRONICO
				tiempo50M = tiempo + m[ form.estilo.value ][ form.prueba.value ] - e[ form.estilo.value ][ form.prueba.value ];
				tiempo50E = tiempo + m[ form.estilo.value ][ form.prueba.value ];
				tiempo25M = tiempo - e[ form.estilo.value ][ form.prueba.value ];
				tiempo25E = tiempo;
			} else { //FEMENINO + PISCINA DE 25 + ELECTRONICO
				tiempo50M = tiempo + f[ form.estilo.value ][ form.prueba.value ] - e[ form.estilo.value ][ form.prueba.value ];
				tiempo50E = tiempo + f[ form.estilo.value ][ form.prueba.value ];
				tiempo25M = tiempo - e[ form.estilo.value ][ form.prueba.value ];
				tiempo25E = tiempo;
			}
		} else { //PISCINA DE 50
			if ( document.getElementById( 'sexo_0' ).checked ) {//form.crono.value == "M") {//MASCULINO + PISCINA DE 50 + ELECTRONICO
				tiempo50M = tiempo - e[ form.estilo.value ][ form.prueba.value ];
				tiempo50E = tiempo;
				tiempo25M = tiempo - m[ form.estilo.value ][ form.prueba.value ] - e[ form.estilo.value ][ form.prueba.value ];
				tiempo25E = tiempo - m[ form.estilo.value ][ form.prueba.value ];
			} else {//FEMENINO + PISCINA DE 50 + ELECTRONICO
				tiempo50M = tiempo - e[ form.estilo.value ][ form.prueba.value ];
				tiempo50E = tiempo;
				tiempo25M = tiempo - f[ form.estilo.value ][ form.prueba.value ] - e[ form.estilo.value ][ form.prueba.value ];
				tiempo25E = tiempo - f[ form.estilo.value ][ form.prueba.value ];
			}
		}
	}
/*    salida = "Tiempo en piscina de <strong>50 metros</strong>, cronómetro <strong>manual</strong>: <strong>"+ darformato(tiempo50M)+"</strong>";
	salida += "Tiempo en piscina de <strong>50 metros</strong>, cronómetro <strong>electrónico</strong>: <strong>"+ darformato(tiempo50E)+"</strong>";
	salida += "Tiempo en piscina de <strong>25 metros</strong>, cronómetro <strong>manual</strong>: <strong>"+ darformato(tiempo25M)+"</strong>";
	salida += "Tiempo en piscina de <strong>25 metros</strong>, cronómetro <strong>electrónico</strong>: <strong>"+ darformato(tiempo25E)+"</strong>";*/
	document.getElementById( 'salida1' ).innerHTML = darformato( tiempo50M );
	document.getElementById( 'salida2' ).innerHTML = darformato( tiempo50E );
	document.getElementById( 'salida3' ).innerHTML = darformato( tiempo25M );
	document.getElementById( 'salida4' ).innerHTML = darformato( tiempo25E );
}
