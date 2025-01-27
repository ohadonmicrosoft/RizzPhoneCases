let canvas;
document.addEventListener("DOMContentLoaded", () => {
  canvas = new fabric.Canvas("caseCanvas");

  const deviceModelSelect = document.getElementById("device-model");
  const fontSelect = document.getElementById("fontSelect");

  // Load phone skeleton as background
  function loadPhoneSkeleton(imageName) {
    const path = `assets/phone-skeletons/${imageName}`;
    fabric.Image.fromURL(path, (img) => {
      // Clear canvas, then set background
      canvas.clear();
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }, {
      crossOrigin: 'anonymous'
    });
  }

  // Initialize default phone
  loadPhoneSkeleton(deviceModelSelect.value);

  // Change phone skeleton when device changes
  deviceModelSelect.addEventListener("change", (e) => {
    loadPhoneSkeleton(e.target.value);
  });

  // Upload Image
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  uploadImageBtn.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (evt) => {
      const file = evt.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        fabric.Image.fromURL(e.target.result, (img) => {
          img.scaleToWidth(canvas.width / 2);
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(file);
    };
    fileInput.click();
  });

  // Add Text
  const addTextBtn = document.getElementById("addTextBtn");
  addTextBtn.addEventListener("click", () => {
    const textSample = new fabric.Text("Your Text Here", {
      left: 50,
      top: 50,
      fill: "#ffffff",
      fontFamily: fontSelect.value,
      fontSize: 24
    });
    canvas.add(textSample);
    canvas.setActiveObject(textSample);
    canvas.renderAll();
  });

  // Change font of active text
  fontSelect.addEventListener("change", (e) => {
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.type === "text") {
      activeObj.set("fontFamily", e.target.value);
      canvas.renderAll();
    }
  });

  // Color Picker
  const colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("change", (e) => {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      if (activeObj.type === "text" || activeObj.type === "rect" ||
          activeObj.type === "circle" || activeObj.type === "triangle" ||
          activeObj.type === "polygon" || activeObj.type === "path") {
        activeObj.set("fill", e.target.value);
        canvas.renderAll();
      }
    }
  });

  // Add Shapes
  const addRectBtn = document.getElementById("addRectBtn");
  addRectBtn.addEventListener("click", () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "rgba(0,255,234,0.5)",
      width: 100,
      height: 100
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  });

  const addCircleBtn = document.getElementById("addCircleBtn");
  addCircleBtn.addEventListener("click", () => {
    const circle = new fabric.Circle({
      left: 140,
      top: 140,
      radius: 50,
      fill: "rgba(0,255,234,0.5)"
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  });

  const addTriangleBtn = document.getElementById("addTriangleBtn");
  addTriangleBtn.addEventListener("click", () => {
    const triangle = new fabric.Triangle({
      left: 120,
      top: 120,
      width: 80,
      height: 80,
      fill: "rgba(0,255,234,0.5)"
    });
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
  });

  const addStarBtn = document.getElementById("addStarBtn");
  addStarBtn.addEventListener("click", () => {
    // Create a star shape with polygons
    const star = new fabric.Polygon([
      { x: 0,  y: -50 },
      { x: 14, y: -20 },
      { x: 47, y: -15 },
      { x: 23, y: 7 },
      { x: 29, y: 40 },
      { x: 0,  y: 25 },
      { x: -29,y: 40 },
      { x: -23,y: 7 },
      { x: -47,y: -15 },
      { x: -14,y: -20 }
    ], {
      left: 150,
      top: 150,
      fill: "rgba(0,255,234,0.5)"
    });
    canvas.add(star);
    canvas.setActiveObject(star);
    canvas.renderAll();
  });

  // Delete Selected
  const deleteObjBtn = document.getElementById("deleteObjBtn");
  deleteObjBtn.addEventListener("click", () => {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      canvas.remove(activeObj);
      canvas.renderAll();
    }
  });

  // Clear Canvas
  const clearCanvasBtn = document.getElementById("clearCanvasBtn");
  clearCanvasBtn.addEventListener("click", () => {
    canvas.clear();
    loadPhoneSkeleton(deviceModelSelect.value);
  });

  // Change BG Color
  const changeCaseColorBtn = document.getElementById("changeCaseColorBtn");
  changeCaseColorBtn.addEventListener("click", () => {
    const color = prompt("Enter a background color (e.g. #000000):");
    if (color) {
      canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas));
    }
  });

  // Advanced: Gradient Fill
  const gradColor1 = document.getElementById("gradColor1");
  const gradColor2 = document.getElementById("gradColor2");
  const applyGradientBtn = document.getElementById("applyGradientBtn");
  applyGradientBtn.addEventListener("click", () => {
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return alert("No object selected!");
    // Create a linear gradient
    const gradient = new fabric.Gradient({
      type: 'linear',
      coords: { x1: 0, y1: 0, x2: activeObj.width, y2: 0 },
      colorStops: [
        { offset: 0, color: gradColor1.value },
        { offset: 1, color: gradColor2.value }
      ]
    });
    activeObj.set({ fill: gradient });
    canvas.renderAll();
  });

  // Advanced: Shadow
  const shadowX = document.getElementById("shadowX");
  const shadowY = document.getElementById("shadowY");
  const shadowBlur = document.getElementById("shadowBlur");
  const shadowColor = document.getElementById("shadowColor");
  const applyShadowBtn = document.getElementById("applyShadowBtn");

  applyShadowBtn.addEventListener("click", () => {
    const activeObj = canvas.getActiveObject();
    if (!activeObj) return alert("No object selected!");
    activeObj.setShadow({
      color: shadowColor.value,
      blur: parseInt(shadowBlur.value, 10) || 5,
      offsetX: parseInt(shadowX.value, 10) || 0,
      offsetY: parseInt(shadowY.value, 10) || 0
    });
    canvas.renderAll();
  });

  // Save Design (Local Storage)
  const saveDesignBtn = document.getElementById("saveDesignBtn");
  saveDesignBtn.addEventListener("click", () => {
    const json = JSON.stringify(canvas.toJSON());
    localStorage.setItem("meyrizzDesign", json);
    alert("Design saved locally!");
  });

  // Load Design (Local Storage)
  const loadDesignBtn = document.getElementById("loadDesignBtn");
  loadDesignBtn.addEventListener("click", () => {
    const saved = localStorage.getItem("meyrizzDesign");
    if (!saved) return alert("No saved design found!");
    canvas.clear();
    canvas.loadFromJSON(saved, () => {
      canvas.renderAll();
      alert("Design loaded from Local Storage!");
    });
  });

  // Sync with 3D Model
  const sync3DTextureBtn = document.getElementById("sync3DTextureBtn");
  sync3DTextureBtn.addEventListener("click", () => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 1
    });
    // We'll call a function in three-customizer.js to update the texture
    if (window.updateCaseTexture) {
      window.updateCaseTexture(dataURL);
      alert("3D Model texture updated!");
    } else {
      alert("3D sync function not found!");
    }
  });

  // Add to Cart
  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", () => {
    const designDataURL = canvas.toDataURL({ format: "png", quality: 1.0 });
    alert("Design added to cart. (Placeholder)");
    // Real logic: store design in backend or localStorage
  });
});
