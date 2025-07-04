window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

  
  
  const editBtn = document.querySelector('.edit-btn');
  const saveBtn = document.querySelector('.save-btn');
  const profileInfo = document.querySelector('.profile-info');
  const profileImg = document.getElementById('profile-img');
  const imgInput = document.getElementById('img-input');

  let originalContent = {};

  editBtn.addEventListener('click', () => {
    const children = profileInfo.children;
    for (let i = 0; i < children.length; i++) {
      const el = children[i];
      originalContent[i] = el.textContent;
      const input = document.createElement('input');
      input.type = 'text';
      input.value = el.textContent;
      input.className = 'editable-input';
      el.replaceWith(input);
    }

    // Trigger image file input on clicking the image
    profileImg.style.cursor = 'pointer';
    profileImg.title = 'Click to change image';
    profileImg.addEventListener('click', () => {
      imgInput.click();
    });

    // Preview selected image
    imgInput.addEventListener('change', () => {
      const file = imgInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  });

  saveBtn.addEventListener('click', () => {
    const inputs = profileInfo.querySelectorAll('input');
    profileInfo.innerHTML = ''; // Clear current content

    inputs.forEach((input, index) => {
      const tag = index === 0 ? 'h2' : 'p';
      const newEl = document.createElement(tag);
      newEl.textContent = input.value;
      profileInfo.appendChild(newEl);
    });

    // Remove cursor and click event after saving
    profileImg.style.cursor = 'default';
    profileImg.title = '';
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