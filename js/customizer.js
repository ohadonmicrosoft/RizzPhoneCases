document.addEventListener("DOMContentLoaded", () => {
  // יצירת Toast Container במעלה הדף
  let toastDiv = document.createElement("div");
  toastDiv.className = "toast-message";
  document.body.appendChild(toastDiv);

  function showToast(msg) {
    toastDiv.textContent = msg;
    toastDiv.classList.add("show");
    setTimeout(() => {
      toastDiv.classList.remove("show");
    }, 2000);
  }

  const canvas = new fabric.Canvas("caseCanvas");

  // Upload Image
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
            showToast("Image added to canvas.");
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
        fill: "#333"
      });
      canvas.add(textObj).setActiveObject(textObj);
      showToast("Text added to canvas.");
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
        showToast(`Font changed to ${e.target.value}`);
      }
    });
  }

  // Add Shape
  const addShapeBtn = document.getElementById("addShapeBtn");
  if (addShapeBtn) {
    addShapeBtn.addEventListener("click", () => {
      const shapeType = prompt("Enter shape type: rect or circle", "rect");
      let shape;
      if (shapeType === "circle") {
        shape = new fabric.Circle({
          radius: 50,
          fill: colorPicker ? colorPicker.value : "#333",
          left: 100,
          top: 100
        });
      } else {
        // Default rect
        shape = new fabric.Rect({
          width: 100,
          height: 100,
          fill: colorPicker ? colorPicker.value : "#333",
          left: 100,
          top: 100
        });
      }
      canvas.add(shape).setActiveObject(shape);
      showToast(`${shapeType} shape added to canvas.`);
    });
  }

  // Gradient
  const addGradientBtn = document.getElementById("addGradientBtn");
  if (addGradientBtn) {
    addGradientBtn.addEventListener("click", () => {
      const activeObj = canvas.getActiveObject();
      if (!activeObj || (activeObj.type !== "rect" && activeObj.type !== "circle")) {
        showToast("Select a rectangle or circle first!");
        return;
      }
      // apply gradient
      activeObj.setGradient("fill", {
        x1: 0,
        y1: 0,
        x2: activeObj.width || (activeObj.radius * 2),
        y2: activeObj.height || (activeObj.radius * 2),
        colorStops: {
          0: "#f07cab",
          1: "#8fc3f9",
        },
      });
      canvas.renderAll();
      showToast("Gradient applied to shape!");
    });
  }

  // Clear Canvas
  const clearCanvasBtn = document.getElementById("clearCanvasBtn");
  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener("click", () => {
      if (confirm("Clear the entire canvas?")) {
        canvas.clear();
        showToast("Canvas cleared.");
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
        showToast("Design synced to 3D viewer!");
      } else {
        showToast("3D sync function not available.");
      }
    });
  }
});
