let canvas;
document.addEventListener("DOMContentLoaded", () => {
  canvas = new fabric.Canvas("caseCanvas");

  // Function to set canvas size based on selected device
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
  }

  // Initialize default device
  updateCanvasSize(deviceModelSelect.value);

  // Upload image
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

  // Add text
  const addTextBtn = document.getElementById("addTextBtn");
  if (addTextBtn) {
    addTextBtn.addEventListener("click", () => {
      const text = new fabric.Text("Your Text", {
        left: 50,
        top: 50,
        fill: "#000",
        fontFamily: "Rubik",
        fontSize: 22,
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    });
  }

  // Color picker (for text or shapes)
  const colorPicker = document.getElementById("colorPicker");
  if (colorPicker) {
    colorPicker.addEventListener("change", (e) => {
      const activeObj = canvas.getActiveObject();
      if (activeObj && (activeObj.type === "text" || activeObj.type === "rect" || activeObj.type === "circle" || activeObj.type === "path")) {
        activeObj.set("fill", e.target.value);
        canvas.renderAll();
      }
    });
  }

  // Delete selected object
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

  // Clear canvas
  const clearCanvasBtn = document.getElementById("clearCanvasBtn");
  if (clearCanvasBtn) {
    clearCanvasBtn.addEventListener("click", () => {
      canvas.clear();
    });
  }

  // Add rectangle
  const addRectBtn = document.getElementById("addRectBtn");
  if (addRectBtn) {
    addRectBtn.addEventListener("click", () => {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: "rgba(255,0,0,0.5)",
        width: 100,
        height: 100,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    });
  }

  // Add circle
  const addCircleBtn = document.getElementById("addCircleBtn");
  if (addCircleBtn) {
    addCircleBtn.addEventListener("click", () => {
      const circle = new fabric.Circle({
        left: 150,
        top: 150,
        radius: 50,
        fill: "rgba(0,0,255,0.5)",
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    });
  }

  // Change case background color
  const changeCaseColorBtn = document.getElementById("changeCaseColorBtn");
  if (changeCaseColorBtn) {
    changeCaseColorBtn.addEventListener("click", () => {
      const bgColor = prompt("Enter a hex color code (e.g. #ffffff) or color name:");
      if (bgColor) {
        canvas.setBackgroundColor(bgColor, () => canvas.renderAll());
      }
    });
  }

  // Add to Cart
  const addToCartBtn = document.getElementById("addToCartBtn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // Convert canvas to data URL for saving or sending to cart
      const designDataURL = canvas.toDataURL({
        format: "png",
        quality: 1.0,
      });
      alert("Design added to cart! (Placeholder action)");
      // In a real app, you'd send designDataURL to your server/cart logic
    });
  }
});
