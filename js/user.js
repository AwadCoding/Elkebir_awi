window.onload = function () {
  const heartRate = 95;
  const bpSystolic = 110;
  const bpDiastolic = 70;
  const spo2 = 98;
  const respiratoryRate = 12;

  document.getElementById("heart-value").textContent = `Value: ${heartRate} bpm`;
  document.getElementById("heart-status-text").textContent =
    heartRate < 60 ? "Bradycardia (Low)" : heartRate > 100 ? "Tachycardia (High)" : "Normal";
  document.getElementById("heart-status").style.backgroundColor =
    heartRate >= 60 && heartRate <= 100 ? "#2ecc71" : "#e74c3c";

  document.getElementById("bp-value").textContent = `Value: ${bpSystolic}/${bpDiastolic} mmHg`;
  const bpNote =
    bpSystolic < 120 && bpDiastolic < 80
      ? "Normal"
      : bpSystolic <= 129 && bpDiastolic < 80
      ? "Elevated"
      : bpSystolic <= 139 || bpDiastolic <= 89
      ? "Hypertension Stage 1"
      : bpSystolic < 180 || bpDiastolic < 120
      ? "Hypertension Stage 2"
      : "Hypertensive Crisis!";
  document.getElementById("bp-status-text").textContent = `Status: ${bpNote}`;
  document.getElementById("bp-status").style.backgroundColor =
    bpNote === "Normal" ? "#2ecc71" : "#e74c3c";

  document.getElementById("spo2-value").textContent = `Value: ${spo2}%`;
  const spo2Note = spo2 >= 95 ? "Normal" : spo2 >= 90 ? "Mild Hypoxemia" : "Severe Hypoxemia";
  document.getElementById("spo2-status-text").textContent = `Status: ${spo2Note}`;
  document.getElementById("spo2-status").style.backgroundColor =
    spo2Note === "Normal" ? "#2ecc71" : "#e74c3c";

  document.getElementById("rr-value").textContent = `Value: ${respiratoryRate} breaths/min`;
  const rrNote =
    respiratoryRate >= 12 && respiratoryRate <= 20
      ? "Normal"
      : respiratoryRate < 12
      ? "Bradypnea (Low)"
      : "Tachypnea (High)";
  document.getElementById("rr-status-text").textContent = `Status: ${rrNote}`;
  document.getElementById("rr-status").style.backgroundColor =
    rrNote === "Normal" ? "#2ecc71" : "#e74c3c";

  // Disable photo click initially
  document.getElementById("avatar-container").style.pointerEvents = "none";
};

// ⏺️ Enable edit mode
document.getElementById("edit-btn").addEventListener("click", function () {
  ["name", "email", "location"].forEach((field) => {
    document.getElementById(`${field}-display`).style.display = "none";
    document.getElementById(`${field}-input`).style.display = "block";
  });

  // Enable avatar click
  document.getElementById("avatar-container").style.pointerEvents = "auto";

  this.style.display = "none";
  document.getElementById("save-btn").style.display = "inline-block";
  document.getElementById("exit-btn").style.display = "inline-block";
});

// ⏺️ Click on image (only in edit mode)
document.getElementById("avatar-container").addEventListener("click", function () {
  if (document.getElementById("save-btn").style.display !== "none") {
    document.getElementById("file-input").click();
  }
});

// ⏺️ Change image
document.getElementById("file-input").addEventListener("change", function () {
  const file = this.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("profile-pic").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// ⏺️ Save changes
document.getElementById("save-btn").addEventListener("click", function () {
  ["name", "email", "location"].forEach((field) => {
    const newValue = document.getElementById(`${field}-input`).value;
    const displayText = field === "location" ? `Location: ${newValue}` : newValue;
    document.getElementById(`${field}-display`).textContent = displayText;
    document.getElementById(`${field}-display`).style.display = "block";
    document.getElementById(`${field}-input`).style.display = "none";
  });

  // Disable image editing again
  document.getElementById("avatar-container").style.pointerEvents = "none";

  this.style.display = "none";
  document.getElementById("edit-btn").style.display = "inline-block";
  document.getElementById("exit-btn").style.display = "none";
});

// ⏺️ Cancel edit
document.getElementById("exit-btn").addEventListener("click", function () {
  ["name", "email", "location"].forEach((field) => {
    document.getElementById(`${field}-input`).style.display = "none";
    document.getElementById(`${field}-display`).style.display = "block";
  });

  // Disable image editing again
  document.getElementById("avatar-container").style.pointerEvents = "none";

  this.style.display = "none";
  document.getElementById("edit-btn").style.display = "inline-block";
  document.getElementById("save-btn").style.display = "none";
});
const openBtn = document.getElementById("open-camera");
const closeBtn = document.getElementById("close-camera");
const video = document.getElementById("camera-stream");
const cameraBox = document.querySelector(".camera-box");
let stream = null;

openBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    cameraBox.classList.remove("hidden");
  } catch (err) {
    alert("Camera access denied or not supported.");
    console.error(err);
  }
});

closeBtn.addEventListener("click", () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
  }
  cameraBox.classList.add("hidden");
});
