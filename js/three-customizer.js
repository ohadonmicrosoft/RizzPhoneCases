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
  
    const dirLight = new THREE.DirectionalLight(0x00ffe0, 0.5);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);
  
    let phoneModel = null;
    let caseMesh = null; // the main phone body that should receive the texture
  
    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/phone-wrap-model.glb",
      (gltf) => {
        phoneModel = gltf.scene;
        phoneModel.position.set(0, -1, 0);
  
        // Attempt to find a mesh named "PhoneCaseMesh" (or the relevant name in your 3D model)
        caseMesh = phoneModel.getObjectByName("PhoneCaseMesh");
  
        scene.add(phoneModel);
  
        // Basic rotation loop
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
  
    // Expose a global function to update the mesh texture
    window.updateCaseTexture = function(dataURL) {
      if (!caseMesh) {
        console.warn("PhoneCaseMesh not found in the 3D model!");
        return;
      }
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(dataURL, (texture) => {
        // Apply the texture to the phone case
        caseMesh.material.map = texture;
        caseMesh.material.needsUpdate = true;
        console.log("3D wrap texture updated from user design!");
      });
    };
  
    // Resizing
    window.addEventListener("resize", onWindowResize);
    function onWindowResize() {
      camera.aspect = threeDContainer.clientWidth / threeDContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    }
  });
  