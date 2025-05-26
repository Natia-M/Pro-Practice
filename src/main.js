// პირველი toggle (მენიუს ღილაკი)

const mobileMenu = document.getElementById('mobileMenu');
const dragHandle = document.getElementById('dragHandle');

let startY = 0;
let currentY = 0;
let isDragging = false;
let isOpen = false;

function getMenuHeight() {
  return mobileMenu.getBoundingClientRect().height;
}

function setInitialPosition() {
  const h = getMenuHeight();
  mobileMenu.style.bottom = `-${h}px`;
}

setInitialPosition();

function openMenuAction() {
  mobileMenu.classList.add('open');
  mobileMenu.style.bottom = '0';
  isOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  const h = getMenuHeight();
  mobileMenu.style.bottom = `-${h}px`;
  isOpen = false;
  document.body.style.overflow = '';
}

function openMenu() {
  if (isOpen) {
    closeMenu();
  } else {
    openMenuAction();
  }
}

function onDragStart(y) {
  isDragging = true;
  startY = y;
  mobileMenu.style.transition = 'none';
}

function onDragMove(y) {
  if (!isDragging) return;
  currentY = y;
  let deltaY = currentY - startY;
  const h = getMenuHeight();

  if (isOpen) {
    if (deltaY > 0) {
      mobileMenu.style.bottom = `-${deltaY}px`;
    } else {
      mobileMenu.style.bottom = '0';
    }
  } else {
    if (deltaY < 0) {
      let newBottom = Math.min(0, -h - deltaY);
      mobileMenu.style.bottom = `${newBottom}px`;
    } else {
      mobileMenu.style.bottom = `-${h}px`;
    }
  }
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  mobileMenu.style.transition = 'bottom 0.3s ease';
  const deltaY = currentY - startY;
  const threshold = 100;
  const h = getMenuHeight();

  if (isOpen) {
    if (deltaY > threshold) {
      closeMenu();
    } else {
      mobileMenu.style.bottom = '0';
    }
  } else {
    if (deltaY < -threshold) {
      openMenuAction();
    } else {
      mobileMenu.style.bottom = `-${h}px`;
    }
  }
}

dragHandle.addEventListener('touchstart', (e) => {
  onDragStart(e.touches[0].clientY);
});

dragHandle.addEventListener('touchmove', (e) => {
  onDragMove(e.touches[0].clientY);
});

dragHandle.addEventListener('touchend', () => {
  onDragEnd();
});

dragHandle.addEventListener('mousedown', (e) => {
  e.preventDefault();
  onDragStart(e.clientY);

  function onMouseMove(event) {
    onDragMove(event.clientY);
  }

  function onMouseUp(event) {
    onDragEnd();
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
  }

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

const overlay = document.getElementById('overlay');

function openMenuAction() {
  mobileMenu.classList.add('open');
  mobileMenu.style.bottom = '0';
  overlay.classList.add('active');
  isOpen = true;
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  const h = getMenuHeight();
  mobileMenu.style.bottom = `-${h}px`;
  overlay.classList.remove('active');
  isOpen = false;
  document.body.style.overflow = '';
}

overlay.addEventListener('click', () => {
  closeMenu();
});

// მეორე toggle (ენის მოდალი)

document.addEventListener("DOMContentLoaded", () => {
  const languageToggle = document.getElementById("languageToggle");
  const languageModal = document.getElementById("languageModal");

  languageToggle.addEventListener("click", () => {
    languageModal.classList.toggle("hidden");
  });

  document.querySelectorAll(".language-option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelectorAll(".custom-radio").forEach((r) => r.classList.remove("active"));
      option.querySelector(".custom-radio").classList.add("active");

      const selectedText = option.querySelector(".language-label").textContent;
      languageToggle.querySelector("div").textContent = selectedText;

      languageModal.classList.add("hidden");
    });
  });
});
