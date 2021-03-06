var scene = new THREE.Scene();

function cubo(x, y, z, color, material, alambrado){
    var cubeGeometry = new THREE.BoxGeometry(x, y, z);
    var cubeMaterial;
    switch(material){
     case 'Basic': cubeMaterial = new THREE.MeshBasicMaterial({color: color, wireframe: alambrado});
      break;

     case 'Standard': cubeMaterial = new THREE.MeshStandardMaterial({color: color, wireframe: alambrado});
      break;

     case 'Physical': cubeMaterial = new THREE.MeshPhysicalMaterial({color: color, wireframe: alambrado});
      break;

     case 'Phong': cubeMaterial = new THREE.MeshPhongMaterial({color: color, wireframe: alambrado});
      break;

     case 'Lambert': cubeMaterial = new THREE.MeshLambertMaterial({color: color, wireframe: alambrado});
      break;
    }
    
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    // add the cube to the scene
    scene.add(cube);
    return(cube);
}
function init() {
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render and set the size
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0x000000));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Mostrar ejes del mundo
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    Cubo = [];  // Array
    lado = 5; //variable de lado 
    Cubo.push(cubo(lado, lado, lado, 0xFFDD00, 'Basic', false));   //Creación del primer cubo con lado=1
    Cubo.push(cubo(lado, lado, lado, 0xFF0000, 'Basic', false));   //Creación del segundo cubo con escala de lado/2
    Cubo.push(cubo(lado, lado, lado, 0x00FFFF0, 'Basic', false));  //Creación del segundo cubo con escala de lado/4

//Traslación de los Cubos
for (i=0; i<3; i++){
    Cubo[i].translateX(lado/2); //Traslado en X
    Cubo[i].translateY(lado/2); //Traslado en Y
    Cubo[i].translateZ(lado/2); //Traslado en Z
}

// Escalado y Traslación en eje Y
for (i=0; i<3; i++) if(i==1 || i==2){
    escala = 1/(2*i);  //Escalado de dimensiones a la mitad del anterior
    unidades = (lado/2)+(lado/4)+((lado/2+lado/4)/2)*(i-1); //Da la posición para ubicarlos uno encima de otro
    Cubo[i].scale.set(escala, escala, escala); //
    Cubo [i].translateY (unidades); 
}


/* Cubo[0].position.set(0, 0, 0);
    Cubo[0].translateZ ( 0.5 );  //Se aplica la traslación del primer cubo en el eje Z
    Cubo[0].translateY ( 0.5 );  //Se aplica la traslación del primer cubo en el eje Y
    Cubo[0].translateX ( 0.5 );  //Se aplica la traslación del primer cubo en el eje X
    scene.add(Cubo[0]);      

    Cubo[1].position.set(0, 0, 0);
    Cubo[1].translateZ ( 0.5 );      //Se aplica la traslación del segundo cubo en el eje Z
    Cubo[1].translateY ( 1.3 );     //Se aplica la traslación del segundo cubo en el eje Y
    Cubo[1].translateX ( 0.5 );     //Se aplica la traslación del segundo cubo en el eje X
    scene.add(Cubo[1]);  

    Cubo[2].position.set(0, 0, 0);
    Cubo[2].translateZ ( 0.5 );      //Se aplica la traslación del ultimo cubo en el eje Z
    Cubo[2].translateY ( 1.7);      //Se aplica la traslación del ultimo cubo en el eje Y
    Cubo[2].translateX ( 0.5 );     //Se aplica la traslación del ultimo cubo en el eje X
    scene.add(Cubo[2]);  
*/


    //Luz (requerida para el material MeshLambertMaterial)
    light = new THREE.PointLight(0xFFFF00);       //  Luz proveniente de un punto en el espacio, semejante al sol.
    light.position.set( -15, 5, 10 );             //  Localización de la luz. (x, y, z).
    scene.add( light ); 

    // Posición de la cámara
    camera.position.set(30, 40, 30);
    camera.lookAt(scene.position);

    // agregar la salida render al HTML
    document.getElementById("webgl-output").appendChild(renderer.domElement);

    // render the scene
    renderer.render(scene, camera);
}