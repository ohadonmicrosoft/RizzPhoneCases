document.addEventListener("DOMContentLoaded", () => {
  const canvas = new fabric.Canvas("caseCanvas");

  // Example: Upload image
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  if (uploadImageBtn) {
    uploadImageBtn.addEventListener("click", () => {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = (e) => {
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
      };
      fileInput.click();
    });
  }

  // Add Text
  const addTextBtn = document.getElementById("addTextBtn");
  if (addTextBtn) {
    addTextBtn.addEventListener("click", () => {
      const textObj = new fabric.Text("Custom Text", {
        fontSize: 24,
        fill: "#333",
      });
      canvas.add(textObj).setActiveObject(textObj);
    });
  }

  // Color picker
  const colorPicker = document.getElementById("colorPicker");
  if (colorPicker) {
    colorPicker.addEventListener("input", (e) => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj) return;
      activeObj.set("fill", e.target.value);
      canvas.renderAll();
    });
  }

  // Font select
  const fontSelect = document.getElementById("fontSelect");
  if (fontSelect) {
    fontSelect.addEventListener("change", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && activeObj.type === "text") {
        activeObj.set("fontFamily", e.target.value);
        canvas.renderAll();
      }
    });
  }

  // Add Shape (Rect for example)
  const addShapeBtn = document.getElementById("addShapeBtn");
  if (addShapeBtn) {
    addShapeBtn.addEventListener("click", () => {
      const rect = new fabric.Rect({
        width: 100,
        height: 100,
        fill: colorPicker.value || "#333",
      });
      canvas.add(rect).setActiveObject(rect);
    });
  }

  // Gradient example
  const addGradientBtn = document.getElementById("addGradientBtn");
  if (addGradientBtn) {
    addGradientBtn.addEventListener("click", () => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj || activeObj.type !== "rect") {
        alert("Select a rectangle shape first!");
        return;
      }
      activeObj.setGradient("fill", {
        x1: 0,
        y1: 0,
        x2: activeObj.width,
        y2: activeObj.height,
        colorStops: {
          0: "#f07cab",
          1: "#8fc3f9",
        },
      });
      canvas.renderAll();
    });
  }

  // Clear Canvas
  const clearCanvasBtn = document.getElementById("clearCanvasBtn");
  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener("click", () => {
      if (confirm("Clear the canvas?")) {
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
        alert("3D sync not available.");
      }
    });
  }
});
