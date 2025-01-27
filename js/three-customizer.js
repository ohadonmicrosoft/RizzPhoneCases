document.addEventListener("DOMContentLoaded", () => {
    const threeDContainer = document.getElementById("threeDContainer");
    if (!threeDContainer) return;
  
    // Basic Three.js setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
  
    const camera = new THREE.PerspectiveCamera(
      45,
      threeDContainer.clientWidth / threeDContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    threeDContainer.appendChild(renderer.domElement);
  
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
  
    const dirLight = new THREE.DirectionalLight(0xff00ff, 0.5);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);
  
    // Load phone case model
    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/phone-case-model.glb",
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, -1, 0);
        scene.add(model);
  
        // Optional: auto rotation
        function animate() {
          requestAnimationFrame(animate);
          model.rotation.y += 0.01; // rotate
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading phone-case model:", error);
      }
    );
  
    // (Optional) OrbitControls
    // const controls = new THREE.OrbitControls(camera, renderer.domElement);
    // function animate() {
    //   requestAnimationFrame(animate);
    //   controls.update();
    //   renderer.render(scene, camera);
    // }
    // animate();
  
    // Handle resizing
    window.addEventListener("resize", onWindowResize);
    function onWindowResize() {
      camera.aspect = threeDContainer.clientWidth / threeDContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    }
  });
  