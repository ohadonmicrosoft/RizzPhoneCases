document.addEventListener("DOMContentLoaded", () => {
    const threeDContainer = document.getElementById("threeDContainer");
    if (!threeDContainer) return;
  
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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
  
    const dirLight = new THREE.DirectionalLight(0x00ccaa, 0.5);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);
  
    let phoneModel = null;
    let caseMesh = null; // For the phone shell
  
    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/phone-wrap-model.glb",
      (gltf) => {
        phoneModel = gltf.scene;
        phoneModel.position.set(0, -1, 0);
        caseMesh = phoneModel.getObjectByName("PhoneCaseMesh"); // Must match your model's mesh name
  
        scene.add(phoneModel);
  
        function animate() {
          requestAnimationFrame(animate);
          phoneModel.rotation.y += 0.005;
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading 3D phone wrap model:", error);
      }
    );
  
    // Make a global function so the 2D customizer can pass the dataURL
    window.updateCaseTexture = function(dataURL) {
      if (!caseMesh) {
        console.warn("Case mesh not found in the model!");
        return;
      }
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(dataURL, (texture) => {
        caseMesh.material.map = texture;
        caseMesh.material.needsUpdate = true;
        console.log("Case texture updated with user design.");
      });
    };
  
    // Handle window resize
    window.addEventListener("resize", onWindowResize);
    function onWindowResize() {
      camera.aspect = threeDContainer.clientWidth / threeDContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    }
  });
  