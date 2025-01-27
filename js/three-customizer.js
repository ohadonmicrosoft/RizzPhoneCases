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
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
  
    // Turquoise directional light
    const dirLight = new THREE.DirectionalLight(0x00ffe0, 0.5);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);
  
    let caseMesh = null; // We'll store a reference to the phone case mesh
    let model = null;    // The main loaded glTF scene
  
    // Load the phone-case model
    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/phone-case-model.glb",
      (gltf) => {
        model = gltf.scene;
        model.position.set(0, -1, 0);
        scene.add(model);
  
        // Attempt to find the mesh named "CaseMesh" (make sure your model uses that name)
        caseMesh = model.getObjectByName("CaseMesh");
  
        // Simple rotation
        function animate() {
          requestAnimationFrame(animate);
          model.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading 3D phone case model:", error);
      }
    );
  
    // Expose a global function to update the texture from dataURL
    window.updateCaseTexture = function(dataURL) {
      if (!caseMesh) {
        console.warn("CaseMesh not found in the 3D model!");
        return;
      }
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(dataURL, (texture) => {
        // Assign as the map on the case material
        caseMesh.material.map = texture;
        caseMesh.material.needsUpdate = true;
        console.log("Case texture updated from dataURL");
      });
    };
  
    // Handle resizing
    window.addEventListener("resize", onWindowResize);
    function onWindowResize() {
      camera.aspect = threeDContainer.clientWidth / threeDContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    }
  });
  