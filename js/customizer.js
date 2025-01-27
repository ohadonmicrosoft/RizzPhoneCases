document.addEventListener("DOMContentLoaded", () => {
  const canvas = new fabric.Canvas("caseCanvas");

  // Example: If you have device model selection:
  /*
  const deviceModelSelect = document.getElementById("device-model");
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
    deviceModelSelect.addEventListener("change", (e) => loadPhoneSkeleton(e.target.value));
    loadPhoneSkeleton(deviceModelSelect.value);
  }
  */

  // Add Image
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  if (uploadImageBtn) {
    uploadImageBtn.addEventListener("click", () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          fabric.Image.fromURL(reader.result, (img) => {
            img.scaleToWidth(canvas.width / 2);
            canvas.add(img);
          });
        };
        reader.readAsDataURL(file);
      });
      fileInput.click();
    });
  }

  // Add Text
  const addTextBtn = document.getElementById("addTextBtn");
  if (addTextBtn) {
    addTextBtn.addEventListener("click", () => {
      const text = new fabric.Text("Custom Text", {
        fill: "#ffffff",
        fontSize: 24,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
    });
  }

  // Change Color
  const colorPicker = document.getElementById("colorPicker");
  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "text") {
        activeObj.set({ fill: e.target.value });
        canvas.renderAll();
      } else if (activeObj && activeObj.type === "path" /* shape */) {
        activeObj.set({ fill: e.target.value });
        canvas.renderAll();
      }
    });
  }

  // Font Selector
  const fontSelect = document.getElementById("fontSelect");
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "text") {
        activeObj.set({ fontFamily: e.target.value });
        canvas.renderAll();
      }
    });
  }

  // Add Shape
  const addShapeBtn = document.getElementById("addShapeBtn");
  if (addShapeBtn) {
    addShapeBtn.addEventListener("click", () => {
      const rect = new fabric.Rect({
        width: 100,
        height: 100,
        fill: colorPicker ? colorPicker.value : "#00ccaa",
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
    });
  }

  // Add Gradient (Simple example)
  const addGradientBtn = document.getElementById("addGradientBtn");
  if (addGradientBtn) {
    addGradientBtn.addEventListener("click", () => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "rect") {
        activeObj.setGradient("fill", {
          x1: 0,
          y1: 0,
          x2: activeObj.width,
          y2: activeObj.height,
          colorStops: {
            0: "#00ccaa",
            1: "#00ffe0",
          },
        });
        canvas.renderAll();
      } else {
        alert("Select a rectangle/shape first to apply gradient.");
      }
    });
  }

  // Clear Canvas
  const clearCanvasBtn = document.getElementById("clearCanvasBtn");
  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear the canvas?")) {
        canvas.clear();
      }
    });
  }

  // Sync to 3D
  const sync3DTextureBtn = document.getElementById("sync3DTextureBtn");
  if (sync3DTextureBtn) {
    sync3DTextureBtn.addEventListener("click", () => {
      const dataURL = canvas.toDataURL();
      if (window.updateCaseTexture) {
        window.updateCaseTexture(dataURL);
        alert("Design synced to 3D viewer!");
      } else {
        alert("3D sync function not available.");
      }
    });
  }
});
