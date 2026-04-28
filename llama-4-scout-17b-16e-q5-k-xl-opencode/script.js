let scene, camera, renderer;

function init() {
    // Load three.js library
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js';
    document.head.appendChild(script);

    script.onload = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('canvas'),
            antialias: true
        });

        // Add some basic lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Create the greenhouse
        const greenhouseGeometry = new THREE.BoxGeometry(10, 10, 10);
        const greenhouseMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const greenhouse = new THREE.Mesh(greenhouseGeometry, greenhouseMaterial);
        scene.add(greenhouse);

        // Position the camera
        camera.position.z = 5;

        // Animate the scene
        animate();
    };
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the greenhouse
    scene.children[2].rotation.x += 0.01;
    scene.children[2].rotation.y += 0.01;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
}

init();
