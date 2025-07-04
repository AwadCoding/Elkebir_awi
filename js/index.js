// Scroll effect card hero
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Reveal About section
  const about = document.querySelector(".about");
  const rect = about.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    about.classList.add("visible");
  }

  // Reveal features
  const featureCards = document.querySelectorAll(".feature-card");
  featureCards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    if (cardRect.top < window.innerHeight - 50) {
      card.classList.add("visible");
    }
  });

  // Reveal why-choose
  const cards = document.querySelectorAll(".why-choose .feature-card");
  cards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add("visible");
    }
  });
});

// Mobile nav toggle
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const toggleIcon = toggle.querySelector("i");

toggle.addEventListener("click", () => {
  const isActive = navLinks.classList.toggle("active");
  toggleIcon.classList.toggle("fa-bars", !isActive);
  toggleIcon.classList.toggle("fa-times", isActive);
});

// Close menu when click on link
const links = navLinks.querySelectorAll("a");
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    toggleIcon.classList.add("fa-bars");
    toggleIcon.classList.remove("fa-times");
  });
});

// Typing effect on hero
const text = [
  "Medication Alerts",
  "Room Temperature Control",
  "Hydration Reminders",
  "Motion Detection",
  "CCTV Monitoring",
];
let index = 0;
let charIndex = 0;
const typedText = document.getElementById("typed-text");

function typeEffect() {
  if (charIndex < text[index].length) {
    typedText.textContent += text[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 80);
  } else {
    setTimeout(eraseEffect, 2000);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    typedText.textContent = text[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, 50);
  } else {
    index = (index + 1) % text.length;
    setTimeout(typeEffect, 300);
  }
}

document.addEventListener("DOMContentLoaded", typeEffect);

// Add review modal
function openModal() {
  document.getElementById("review-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("review-modal").style.display = "none";
}

// ⭐⭐ تقييم النجوم
let selectedRating = 0;

const stars = document.querySelectorAll("#star-select i");
stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.getAttribute("data-value"));
    stars.forEach((s) => s.classList.remove("selected"));
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("selected");
    }
  });
});

let reviewCount = 1;

function submitReview() {
  const text = document.getElementById("review-text").value.trim();
  if (text === "") return;

  if (selectedRating === 0) {
    alert("Please select a star rating ⭐");
    return;
  }

  const review = document.createElement("div");
  review.className = "review";

  const avatarURL = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

  const now = new Date();
  const timestamp = now.toLocaleString();

  let starsDisplay = "";
  for (let i = 0; i < selectedRating; i++) starsDisplay += "⭐";

  review.innerHTML = `
    <img src="${avatarURL}" alt="User Avatar">
    <div class="review-content">
      <h4>User ${reviewCount}</h4>
      <div class="stars">${starsDisplay}</div>
      <p>${text}</p>
      <div class="timestamp">${timestamp}</div>
    </div>
  `;

  reviewCount++;
  document.getElementById("reviews-container").prepend(review);
  document.getElementById("review-text").value = "";
  stars.forEach((s) => s.classList.remove("selected"));
  selectedRating = 0;
  closeModal();
}
//     Subscribe
function sendMessage(event) {
  event.preventDefault();

  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();
  const status = document.getElementById("message-status");

  if (email && message) {
    // هنا ممكن تبعت البيانات لسيرفر مستقبلاً
    status.textContent = "✅ Your message has been sent!";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-message").value = "";
  } else {
    status.textContent = "❌ Please fill in all fields.";
    status.style.color = "red";
  }
}

// ===================================




