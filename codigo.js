/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var palabra = "TRIBUTACION";
var palabras=["PERRO",
                "LIBELULA",
                "MOSQUITO",
                "ELEFANTE",
                "HIPOPOTAMO",
                "OVEJA",
                "CABALLO",
                "CHIMPANCE",
                "GORILA",
                "PANTERA",
                "TIGRE",
                "ZEBRA",
                "LEOPARDO",
                "JIRAFA",
                "ESCARABAJO",
                "CUCARACHA",
                "GATO",
                "FOCA",
                "BALLENA",
                "SARDINA",
                "TIBURON",
                "CANGRAJO",
                "ALMEJA",
                "MEJILLON",
                "PERCEBE",
                "GALLINA",
                "GALLO",
                "CONEJOS",
                "CHOTO",
                "JABALI",
                "CUERVO",
                "MURCIELAGO",
                "COCODRILO",
                "SERPIENTE"];
             
var hombre, l,espacio,f;
var Ahorcado = function (con) {
    this.contexto = con;
    this.maximo = 5;
    this.intentos = 0;
    this.vivo = true;
    this.dibujar();
}
Ahorcado.prototype.dibujar = function () {
    var dibujo = this.contexto;

    //dibujando el poste
    dibujo.beginPath();
    dibujo.moveTo(150, 100);//colocar cursor
    dibujo.lineTo(150, 50);//dibuja hasta
    dibujo.lineTo(400, 50);
    dibujo.lineTo(400, 350);
    dibujo.lineWidth = 12;
    dibujo.strokeStyle = "peru";
    dibujo.stroke();
    dibujo.closePath();
    if (this.intentos > 0) {

        //intentos=1 dibujar rostro
        dibujo.beginPath();
        dibujo.arc(150, 140, 40, 0, Math.PI * 2, false);
        dibujo.strokeStyle = "red";
        dibujo.lineWidth = 4;
        dibujo.stroke();
        dibujo.closePath();
        if (this.intentos > 1) {
            //intentos=2 dibujo el torso:
            dibujo.beginPath();
            dibujo.moveTo(150, 180);
            dibujo.lineTo(150, 250)
            dibujo.strokeStyle = "red";
            dibujo.lineWidth = 4;
            dibujo.stroke();
            dibujo.closePath();

            if (this.intentos > 2) {
                //intentos=3 dibujo los brazos
                dibujo.beginPath();
                dibujo.moveTo(120, 220);
                dibujo.lineTo(150, 180);
                dibujo.lineTo(180, 220);
                dibujo.strokeStyle = "red";
                dibujo.lineWidth = 4;
                dibujo.stroke();
                dibujo.closePath();

                if (this.intentos > 3) {
                    //intentos=4 dibujo las piernas
                    dibujo.beginPath();
                    dibujo.moveTo(120, 290);
                    dibujo.lineTo(150, 250);
                    dibujo.lineTo(180, 290);
                    dibujo.strokeStyle = "red";
                    dibujo.lineWidth = 4;
                    dibujo.stroke();
                    dibujo.closePath();
                    if (this.intentos > 4) {
                        //intentos=5 ojos muertos
                        dibujo.beginPath();
                        //ojo izquierdo
                        dibujo.moveTo(125, 120);
                        dibujo.lineTo(145, 145);
                        dibujo.moveTo(145, 120);
                        dibujo.lineTo(125, 145);
                        
                         //ojo derecho
                        dibujo.moveTo(155, 120);
                        dibujo.lineTo(175, 145);
                        dibujo.moveTo(175, 120);
                        dibujo.lineTo(155, 145);
                        
                        dibujo.strokeStyle = "green";
                        dibujo.lineWidth = 4;
                        dibujo.stroke();
                        dibujo.closePath();

                    }

                }

            }
        }
    }
}
Ahorcado.prototype.trazar = function () {
    this.intentos++;
    if (this.intentos >= this.maximo) {
        this.vivo = false;
        //alert("Estas muerto!");
    }
    this.dibujar();
}
function iniciar() {
     l =document.getElementById("letra");
    f=document.getElementById("fallos");
    var b=document.getElementById("boton");
    var canvas = document.getElementById("c");
    
    //GENERAMOS PALABRA ALEATORIA:
    var ale = Math.round(Math.random()*palabras.length);
    palabra=palabras[ale];

    
    canvas.width = 500;
    canvas.height = 400;
   
    var contexto = canvas.getContext("2d");
     hombre=new Ahorcado(contexto);
    palabra=palabra.toUpperCase();
    
    espacio=new Array(palabra.length);//declaro un array de acuerdo al tam de la palabra a adivinar
    //agregamos una funcion que se dispare al dar click:
    b.addEventListener("click",agregarLetra);
   
    mostrarPista(espacio);
}
function agregarLetra(e){
   var letra=l.value;
    l.value="";
   
   mostrarPalabra(palabra,hombre,letra);
    
}
function pulsaEnter(e) {
    if (e.keyCode == 13) {
       var letra=l.value;
        l.value="";
        mostrarPalabra(palabra,hombre,letra);
        
    }
}
function mostrarPalabra(palabra,ahorcado,letra){
    var encontrado=false;
    var p;
    letra =letra.toUpperCase();
    //recorrer con un ciclo letra por letra
    for (p in palabra){ //p es el iterador
        if(letra==palabra[p]){
            espacio[p]=letra;
            
            encontrado=true;
       
        };
    }
    mostrarPista(espacio);
   
    if(!encontrado){
        ahorcado.trazar();
        f.innerText+=letra+", "
    }
    if(!ahorcado.vivo){
        //mostrar la palabra entera
        alert("Has perdido zoquetico!!");
    }
     comprobarCompleta();
    
}
function mostrarPista(espacio){
    var pista=document.getElementById("pista");
    var texto="";
    var i;
    var largo=espacio.length;
    for(i=0;i<largo;i++){
        if(espacio[i]!= undefined){
            texto=texto+espacio[i]+" ";
        }else{
            texto+="_ ";
        };
    }
    pista.innerText=texto;
   
    
}
function comprobarCompleta(){
    var largo=espacio.length;
    var contador=0;
    for(i=0;i<largo;i++){
         if(espacio[i]>="A" && espacio[i]<="Z"){
             contador++;
        }
    }
  
    
    if (contador==espacio.length){
        alert("La has acertado! MUY BIEN!!");
    }
}