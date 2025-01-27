let canvas;
document.addEventListener("DOMContentLoaded", () => {
  canvas = new fabric.Canvas("caseCanvas");

  // Set canvas size based on the selected device
  const deviceModelSelect = document.getElementById("device-model");
  function updateCanvasSize(device) {
    switch (device) {
      case "iphone14":
        canvas.setWidth(300);
        canvas.setHeight(600);
        break;
      case "iphone13":
        canvas.setWidth(290);
        canvas.setHeight(580);
        break;
      case "samsungS22":
        canvas.setWidth(320);
        canvas.setHeight(640);
        break;
      case "pixel7":
        canvas.setWidth(280);
        canvas.setHeight(560);
        break;
      default:
        canvas.setWidth(300);
        canvas.setHeight(600);
        break;
    }
    canvas.renderAll();
  }

  if (deviceModelSelect) {
    deviceModelSelect.addEventListener("change", (e) => {
      updateCanvasSize(e.target.value);
    });
    // Initialize default
    updateCanvasSize(deviceModelSelect.value);
  }

  // Upload Image
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  if (uploadImageBtn) {
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
            img.scaleToWidth(200);
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
      const text = new fabric.Text("Your Text", {
        left: 50,
        top: 50,
        fill: "#fff",
        fontFamily: "Rubik",
        fontSize: 24,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    });
  }

  // Color Picker
  const colorPicker = document.getElementById("colorPicker");
  if (colorPicker) {
    colorPicker.addEventListener("change", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && (activeObj.type === "text" || activeObj.type === "rect" || activeObj.type === "circle" || activeObj.type === "path" || activeObj.type === "image")) {
        activeObj.set("fill", e.target.value);
        canvas.renderAll();
      }
    });
  }

  // Delete Selected
  const deleteObjBtn = document.getElementById("deleteObjBtn");
  if (deleteObjBtn) {
    deleteObjBtn.addEventListener("click", () => {
      const activeObj = canvas.getActiveObject();
      if (activeObj) {
        canvas.remove(activeObj);
        canvas.renderAll();
      }
    });
  }

  // Clear Canvas
  const clearCanvasBtn = document.getElementById("clearCanvasBtn");
  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener("click", () => {
      canvas.clear();
    });
  }

  // Add Rectangle
  const addRectBtn = document.getElementById("addRectBtn");
  if (addRectBtn) {
    addRectBtn.addEventListener("click", () => {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "rgba(255,0,255,0.5)",
        width: 100,
        height: 100,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    });
  }

  // Add Circle
  const addCircleBtn = document.getElementById("addCircleBtn");
  if (addCircleBtn) {
    addCircleBtn.addEventListener("click", () => {
      const circle = new fabric.Circle({
        left: 150,
        top: 150,
        radius: 50,
        fill: "rgba(255,0,255,0.5)",
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    });
  }

  // Change Case Background Color
  const changeCaseColorBtn = document.getElementById("changeCaseColorBtn");
  if (changeCaseColorBtn) {
    changeCaseColorBtn.addEventListener("click", () => {
      const color = prompt("Enter a background color (e.g. #000 or 'blue'):");
      if (color) {
        canvas.setBackgroundColor(color, () => canvas.renderAll());
      }
    });
  }

  // Add to Cart
  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      const designDataURL = canvas.toDataURL({ format: "png", quality: 1.0 });
      alert("Design added to cart! (Placeholder)");
      // Send designDataURL to backend or localStorage if needed.
    });
  }
});
