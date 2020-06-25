var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 300;

scene.background = new THREE.Color(0x050505);
var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);

scene.add(new THREE.AmbientLight(0xffffff, 0.6));

var container = document.getElementById('container');
container.appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);

var uniforms1 =
{
    amplitude: { value: 1.0 },
    color: { value: new THREE.Color(0xffffff) },
    texture: { value: new THREE.TextureLoader().load("images/Rock26_col.png") }

};
uniforms1.texture.value.wrapS = uniforms1.texture.value.wrapT = THREE.RepeatWrapping;

var radius = 50, segments = 128, rings = 64;
var sphereGeometry = new THREE.SphereBufferGeometry(radius, segments, rings);
var sphereMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms1,
    vertexShader: document.getElementById('vertexshader').textContent,
    fragmentShader: document.getElementById('fragmentshader').textContent
});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.name = "BaseModel";
scene.add(sphere);

var cubeGeometry = new THREE.CubeGeometry(60, 60, 100);

//other materials
var colorMaterial = new THREE.ShaderMaterial({                             //color material
    vertexShader: document.getElementById("vertexshader_color").textContent,
    fragmentShader: document.getElementById("fragmentshader_color").textContent
});
var lightMaterial = new THREE.ShaderMaterial({                             //light material
    vertexShader: document.getElementById("vertexshader_light").textContent,
    fragmentShader: document.getElementById("fragmentshader_light").textContent
});

var customUniforms = { delta: { value: 0 } };
var uvMaterial = new THREE.ShaderMaterial({                                //uvMaterial
    uniforms: customUniforms,
    vertexShader: document.getElementById('vertexshader_uv').textContent,
    fragmentShader: document.getElementById('fragmentshader_uv').textContent
});
var uvGeometry = new THREE.SphereBufferGeometry(radius, segments, rings);
var vertexDisplacement = new Float32Array(uvGeometry.attributes.position.count);
for (var i = 0; i < vertexDisplacement.length; i++) {
    vertexDisplacement[i] = Math.sin(i);
}
uvGeometry.setAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1));
var delta = 0;

var bump = new THREE.TextureLoader().load("images/Rock26_nrm.png");
var normal = new THREE.TextureLoader().load("images/Rock26_col.png");
var materialNormal = new THREE.MeshPhongMaterial({
    map: normal
});
materialNormal.normalMap = bump;

var bump = new THREE.TextureLoader().load("images/Rocks06_nrm.png");
var normal = new THREE.TextureLoader().load("images/Rocks06_col.png");
var rocksMaterial = new THREE.MeshPhongMaterial({
    map: normal
});
rocksMaterial.normalMap = bump;

var bump = new THREE.TextureLoader().load("images/Wood30_nrm.png");
var normal = new THREE.TextureLoader().load("images/Wood30_col.png");
var woodMaterial = new THREE.MeshPhongMaterial({
    map: normal
});
woodMaterial.normalMap = bump;

var bump = new THREE.TextureLoader().load("images/Metal03_nrm.png");
var normal = new THREE.TextureLoader().load("images/Metal03_col.png");
var metalMaterial = new THREE.MeshPhongMaterial({
    map: normal
});
metalMaterial.normalMap = bump;

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}
animate();
function render() {
    delta += 0.1;
    uvMaterial.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;
    for (var i = 0; i < vertexDisplacement.length; i++) {
        vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
    }
    uvGeometry.attributes.vertexDisplacement.needsUpdate = true;
    renderer.render(scene, camera);
}


function keyDown() {
    var keycode = event.keyCode;
    var realkey = String.fromCharCode(event.keyCode);
    var model = scene.getObjectByName('BaseModel');
    switch (realkey) {
        case '1':
            model.material = sphereMaterial;
            model.material.needUpdate = true;
            model.geometry = cubeGeometry;
            model.geometry.needUpdate = true;
            break;
        case '2':
            model.material = rocksMaterial;
            model.material.needUpdate = true;
            model.geometry = sphereGeometry;
            model.geometry.needUpdate = true;
            break;
        case '3':
            model.material = colorMaterial;
            model.material.needUpdate = true;
            model.geometry = sphereGeometry;
            model.geometry.needUpdate = true;
            break;
        case '4':
            model.material = lightMaterial;
            model.material.needUpdate = true;
            model.geometry = sphereGeometry;
            model.geometry.needUpdate = true;
            break;
        case '5':
            model.material = uvMaterial;
            model.material.needUpdate = true;
            model.geometry = uvGeometry;
            model.geometry.needUpdate = true;
            break;
        case '6':
            model.material = woodMaterial;
            model.material.needUpdate = true;
            model.geometry = uvGeometry;
            model.geometry.needUpdate = true;
            break;
        case '7':
            model.material = metalMaterial;
            model.material.needUpdate = true;
            model.geometry = uvGeometry;
            model.geometry.needUpdate = true;
            break;
        default:
            model.material = materialNormal;
            model.material.needUpdate = true;
            model.geometry = sphereGeometry;
            model.geometry.needUpdate = true;
            break;
    }
}
document.onkeydown = keyDown