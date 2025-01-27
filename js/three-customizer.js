document.addEventListener("DOMContentLoaded", () => {
    const threeDContainer = document.getElementById("threeDContainer");
    if (!threeDContainer) return;
  
    // === יצירת סצנה בסיסית ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // רקע כהה
  
    // === הגדרת מצלמה ===
    const camera = new THREE.PerspectiveCamera(
      45,
      threeDContainer.clientWidth / threeDContainer.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 3); // זווית טובה יותר למבט על המודל
  
    // === הגדרת Renderer ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // שיפור איכות ב-High-Resolution
    renderer.shadowMap.enabled = true; // אפקטים של צללים
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    threeDContainer.appendChild(renderer.domElement);
  
    // === תאורה ===
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // תאורה רכה
    scene.add(ambientLight);
  
    const spotLight = new THREE.SpotLight(0x14ffec, 1);
    spotLight.position.set(5, 5, 5);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    scene.add(spotLight);
  
    const directionalLight = new THREE.DirectionalLight(0x0d7377, 0.5);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);
  
    // === טקסטורה סביבתית (HDR Reflection) ===
    const textureLoader = new THREE.TextureLoader();
    const environmentMap = textureLoader.load("assets/images/environment.jpg", (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
    });
  
    // === טענת המודל של הטלפון ===
    let phoneModel = null;
    let caseMesh = null; // Mesh של הכיסוי
    const loader = new THREE.GLTFLoader();
    loader.load(
      "assets/models/phone-wrap-model.glb",
      (gltf) => {
        phoneModel = gltf.scene;
        phoneModel.position.set(0, -1, 0);
        phoneModel.castShadow = true;
  
        // זיהוי הכיסוי
        caseMesh = phoneModel.getObjectByName("PhoneCaseMesh"); // יש לוודא את שם ה-Mesh בקובץ GLB
  
        scene.add(phoneModel);
  
        // === אנימציית רוטציה ===
        function animate() {
          requestAnimationFrame(animate);
          phoneModel.rotation.y += 0.005; // סיבוב עדין
          renderer.render(scene, camera);
        }
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading 3D phone wrap model:", error);
      }
    );
  
    // === פונקציה לעדכון הטקסטורה ===
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
  
    // === התאמה אישית של התאורה ===
    function updateLighting(color, intensity) {
      spotLight.color.set(color);
      spotLight.intensity = intensity;
    }
  
    // === אפקטים של Zoom אינטראקטיבי ===
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;
  
    // === התאמה למידות חלון ===
    window.addEventListener("resize", () => {
      camera.aspect = threeDContainer.clientWidth / threeDContainer.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeDContainer.clientWidth, threeDContainer.clientHeight);
    });
  
    // === אפקטי Post Processing (Bloom) ===
    const composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);
  
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0.21;
    bloomPass.strength = 0.7;
    bloomPass.radius = 0.55;
    composer.addPass(bloomPass);
  
    // === אנימציית רינדור ===
    function animateScene() {
      requestAnimationFrame(animateScene);
      controls.update();
      composer.render();
    }
    animateScene();
  });
  