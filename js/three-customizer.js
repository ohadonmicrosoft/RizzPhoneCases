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
    camera.position.set(0, 1.5, 3);
  
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeDContainer.appendChild(renderer.domElement);
  
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
  
    const spotLight = new THREE.SpotLight(0x14ffec, 1);
    spotLight.position.set(5, 5, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);
  
    // DirectionalLight
    const directionalLight = new THREE.DirectionalLight(0x0d7377, 0.5);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);
  
    // Environment (optional)
    const textureLoader = new THREE.TextureLoader();
    // example for reflection environment
    // const environmentMap = textureLoader.load("assets/images/environment.jpg", (texture) => {
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   scene.environment = texture;
    // });
  
    // Load phone model
    let phoneModel = null;
    let caseMesh = null;
  
    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/phone-wrap-model.glb",
      (gltf) => {
        phoneModel = gltf.scene;
        phoneModel.position.set(0, -1, 0);
        phoneModel.castShadow = true;
  
        caseMesh = phoneModel.getObjectByName("PhoneCaseMesh"); // check exact mesh name
        scene.add(phoneModel);
  
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading 3D phone wrap model:", error);
      }
    );
  
    // Animate
    function animate() {
      requestAnimationFrame(animate);
      if (phoneModel) {
        phoneModel.rotation.y += 0.005; // slow rotation
      }
      controls.update();
      composer.render();
    }
  
    // OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;
  
    // Post processing
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
  
    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = 0.21;
    bloomPass.strength = 0.7;
    bloomPass.radius = 0.55;
    composer.addPass(bloomPass);
  
    // Responsive
    window.addEventListener("resize", () => {
      camera.aspect = threeDContainer.clientWidth / threeDContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        threeDContainer.clientWidth,
        threeDContainer.clientHeight
      );
      composer.setSize(
        threeDContainer.clientWidth,
        threeDContainer.clientHeight
      );
    });
  
    // Expose function to update texture from customizer.js
    window.updateCaseTexture = function (dataURL) {
      if (!caseMesh) {
        console.warn("Case mesh not found in the model!");
        return;
      }
      const texture = textureLoader.load(dataURL, (tex) => {
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        caseMesh.material.map = tex;
        caseMesh.material.needsUpdate = true;
        console.log("Case texture updated with user design.");
      });
    };
  });
  