const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let img = new Image();
let fileName = "";

const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");

// Filter & Effect Handlers
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("filter-btn")) {
    const filterAction = e.target.classList.item(1); // Get the second class which indicates the filter
    Caman("#canvas", img, function () {
      switch (filterAction) {
        case "brightness-add":
          this.brightness(5).render(() =>{
            saveToLocalStorage();
          });
          break;
        case "brightness-remove":
          this.brightness(-5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "contrast-add":
          this.contrast(5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "contrast-remove":
          this.contrast(-5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "saturation-add":
          this.saturation(5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "saturation-remove":
          this.saturation(-5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "vibrance-add":
          this.vibrance(5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "vibrance-remove":
          this.vibrance(-5).render( () =>{
            saveToLocalStorage();
          });
          break;
        case "vintage-add":
          this.vintage().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "lomo-add":
          this.lomo().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "clarity-add":
          this.clarity().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "sincity-add":
          this.sinCity().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "crossprocess-add":
          this.crossProcess().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "pinhole-add":
          this.pinhole().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "nostalgia-add":
          this.nostalgia().render( () =>{
            saveToLocalStorage();
          });
          break;
        case "hermajesty-add":
          this.herMajesty().render( () =>{
            saveToLocalStorage();
          });
          break;
        default:
          break;
      }
    });
  }
});

// Revert Filters
revertBtn.addEventListener("click", () => {
  Caman("#canvas", img, function () {
    this.revert();
  });
});

// Upload File
uploadFile.addEventListener("change", () => {
  const file = uploadFile.files[0];
  const reader = new FileReader();

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }
    fileName = file.name;
    reader.readAsDataURL(file);
  }

  reader.addEventListener("load", () => {
    img = new Image();
    img.src = reader.result;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
  }, false);
});

// Download Event
downloadBtn.addEventListener("click", () => {
  const fileExtension = fileName.slice(-4);
  let newFilename;

  if (fileExtension === ".jpg" || fileExtension === ".png") {
    newFilename = fileName.substring(0, fileName.length - 4) + "-edited.jpg";
  } else {
    alert("Unsupported file type. Please upload a .jpg or .png file.");
    return;
  }

  download(canvas, newFilename);
});

// Download Function
function download(canvas, filename) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);
  link.click(); // Simulate a click to download
}

function saveToLocalStorage() {
  const imageData = canvas.toDataURL("image/png");
  localStorage.setItem("editedImage", imageData);
}

window.addEventListener("load", () => {
  const savedImage = localStorage.getItem("editedImage");
  if (savedImage) {
    img = new Image();
    img.src = savedImage;
    img.onload = function () {
      canvas.width = 500;  // or your desired size
      canvas.height = 400;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }
});
document.getElementById("clear-storage-btn").addEventListener("click", () => {
  localStorage.removeItem("editedImage");
  alert("Saved image cleared.");
});



