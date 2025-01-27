document.addEventListener("DOMContentLoaded", () => {
  const canvas = new fabric.Canvas("caseCanvas");

  // Load Default Phone Skeleton
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
  deviceModelSelect?.addEventListener("change", (e) => loadPhoneSkeleton(e.target.value));
  if (deviceModelSelect) loadPhoneSkeleton(deviceModelSelect.value);

  // Add Image to Canvas
  const uploadImageBtn = document.getElementById("uploadImageBtn");
  uploadImageBtn?.addEventListener("click", () => {
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

  // Sync 2D Design to 3D Viewer
  const sync3DTextureBtn = document.getElementById("sync3DTextureBtn");
  sync3DTextureBtn?.addEventListener("click", () => {
    const dataURL = canvas.toDataURL();
    if (window.updateCaseTexture) {
      window.updateCaseTexture(dataURL);
      alert("Design synced to 3D viewer!");
    } else {
      alert("3D sync function not available.");
    }
  });
});
