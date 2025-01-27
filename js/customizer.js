let canvas;
document.addEventListener("DOMContentLoaded", () => {
  canvas = new fabric.Canvas("caseCanvas");

  const deviceModelSelect = document.getElementById("device-model");
  const fontSelect = document.getElementById("fontSelect");
  const colorPicker = document.getElementById("colorPicker");

  function loadPhoneSkeleton(imageName) {
    const path = `assets/phone-skeletons/${imageName}`;
    fabric.Image.fromURL(path, (img) => {
      canvas.clear();
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });
  }

  if (deviceModelSelect) {
    deviceModelSelect.addEventListener("change", (e) => {
      loadPhoneSkeleton(e.target.value);
    });
    loadPhoneSkeleton(deviceModelSelect.value);
  }

  // Upload Image
  const uploadBtn = document.getElementById("uploadImageBtn");
  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => {
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
  }

  // Add Text
  const addTextBtn = document.getElementById("addTextBtn");
  if (addTextBtn) {
    addTextBtn.addEventListener("click", () => {
      const textObj = new fabric.Text("Your Text Here", {
        left: 50,
        top: 50,
        fill: "#ffffff",
        fontFamily: fontSelect.value,
        fontSize: 24
      });
      canvas.add(textObj);
      canvas.setActiveObject(textObj);
      canvas.renderAll();
    });
  }

  // Font Select
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "text") {
        activeObj.set("fontFamily", e.target.value);
        canvas.renderAll();
      }
    });
  }

  // Color Picker
  if (colorPicker) {
    colorPicker.addEventListener("change", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        activeObj.set("fill", e.target.value);
        canvas.renderAll();
      }
    });
  }

  // Add shapes (Rect, Circle, Triangle, Star)
  document.getElementById("addRectBtn")?.addEventListener("click", () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "rgba(0,204,170,0.5)",
      width: 100,
      height: 100
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  });
  document.getElementById("addCircleBtn")?.addEventListener("click", () => {
    const circle = new fabric.Circle({
      left: 120,
      top: 120,
      radius: 50,
      fill: "rgba(0,204,170,0.5)"
    });
    canvas.add(circle);
    canvas.setActiveObject(circle);
    canvas.renderAll();
  });
  document.getElementById("addTriangleBtn")?.addEventListener("click", () => {
    const triangle = new fabric.Triangle({
      left: 140,
      top: 140,
      width: 80,
      height: 80,
      fill: "rgba(0,204,170,0.5)"
    });
    canvas.add(triangle);
    canvas.setActiveObject(triangle);
    canvas.renderAll();
  });
  document.getElementById("addStarBtn")?.addEventListener("click", () => {
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
      left: 160,
      top: 160,
      fill: "rgba(0,204,170,0.5)"
    });
    canvas.add(star);
    canvas.setActiveObject(star);
    canvas.renderAll();
  });

  // Delete Selected
  document.getElementById("deleteObjBtn")?.addEventListener("click", () => {
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      canvas.remove(activeObj);
      canvas.renderAll();
    }
  });

  // Clear Canvas
  document.getElementById("clearCanvasBtn")?.addEventListener("click", () => {
    canvas.clear();
    loadPhoneSkeleton(deviceModelSelect.value);
  });

  // Change Canvas BG
  document.getElementById("changeCaseColorBtn")?.addEventListener("click", () => {
    const bg = prompt("Enter a background color (e.g. #000000):");
    if (bg) {
      canvas.setBackgroundColor(bg, canvas.renderAll.bind(canvas));
    }
  });

  // Gradient
  const gradColor1 = document.getElementById("gradColor1");
  const gradColor2 = document.getElementById("gradColor2");
  document.getElementById("applyGradientBtn")?.addEventListener("click", () => {
    const activeObj = canvas.getActiveObject();
    if (!activeObj) {
      alert("No object selected!");
      return;
    }
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

  // Shadow
  const shadowX = document.getElementById("shadowX");
  const shadowY = document.getElementById("shadowY");
  const shadowBlur = document.getElementById("shadowBlur");
  const shadowColor = document.getElementById("shadowColor");
  document.getElementById("applyShadowBtn")?.addEventListener("click", () => {
    const activeObj = canvas.getActiveObject();
    if (!activeObj) {
      alert("No object selected!");
      return;
    }
    activeObj.setShadow({
      color: shadowColor.value,
      blur: parseInt(shadowBlur.value) || 5,
      offsetX: parseInt(shadowX.value) || 0,
      offsetY: parseInt(shadowY.value) || 0
    });
    canvas.renderAll();
  });

  // Save / Load
  document.getElementById("saveDesignBtn")?.addEventListener("click", () => {
    const json = JSON.stringify(canvas.toJSON());
    localStorage.setItem("rizzDesign", json);
    alert("Design saved locally!");
  });
  document.getElementById("loadDesignBtn")?.addEventListener("click", () => {
    const saved = localStorage.getItem("rizzDesign");
    if (!saved) {
      alert("No saved design found!");
      return;
    }
    canvas.clear();
    canvas.loadFromJSON(saved, () => {
      canvas.renderAll();
      alert("Design loaded from Local Storage!");
    });
  });

  // Sync with 3D
  document.getElementById("sync3DTextureBtn")?.addEventListener("click", () => {
    const dataURL = canvas.toDataURL({ format: "png", quality: 1 });
    if (window.updateCaseTexture) {
      window.updateCaseTexture(dataURL);
      alert("Your design has been applied to the 3D phone model!");
    } else {
      alert("3D Sync function not found!");
    }
  });

  // Add to Cart
  document.getElementById("addToCartBtn")?.addEventListener("click", () => {
    const finalImage = canvas.toDataURL({ format: "png", quality: 1.0 });
    alert("Design added to cart (placeholder).");
    // Real logic: send finalImage to server or store in DB
  });
});
