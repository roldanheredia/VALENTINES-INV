// DOM Elements
const landing = document.getElementById('landing');
const dateForm = document.getElementById('date-form');
const greeting = document.getElementById('greeting');
const nameInput = document.getElementById('name-input');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const confirmBtn = document.getElementById('confirm-btn');
const greetingText = document.getElementById('greeting-text');
const userNameSpan = document.getElementById('user-name');
const bgMusic = document.getElementById('bg-music');

// Detect screen size for responsive animations (reduce elements on mobile for performance)
const isMobile = window.innerWidth <= 768;
const heartInterval = isMobile ? 3000 : 2000; // Slower creation on mobile
const sparkleInterval = isMobile ? 1000 : 500;

// Floating Hearts Animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDelay = Math.random() * 10 + 's';
    document.querySelector('.floating-hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 10000);
}
setInterval(createFloatingHeart, heartInterval);

// Sparkles Animation (Bonus)
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.animationDelay = Math.random() * 3 + 's';
    document.querySelector('.sparkles').appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 3000);
}
setInterval(createSparkle, sparkleInterval);

// Yes Button Click
yesBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if (name) {
        landing.classList.add('hidden');
        dateForm.classList.remove('hidden');
        userNameSpan.textContent = name;
    } else {
        alert('Please enter your name!');
    }
});

// No Button Click (Shrinks, Yes grows, optional move)
let noClickCount = 0;
noBtn.addEventListener('click', () => {
    noClickCount++;
    const scale = Math.max(0.5, 1 - noClickCount * 0.1); // Shrink No button
    const yesScale = 1 + noClickCount * 0.1; // Grow Yes button
    noBtn.style.transform = `scale(${scale})`;
    yesBtn.style.transform = `scale(${yesScale})`;
    // Optional: Move No button playfully (limited on mobile for usability)
    if (!isMobile) {
        const randomX = (Math.random() - 0.5) * 100;
        noBtn.style.left = randomX + 'px';
    }
});

// No Button Hover (Avoid Cursor) - New Feature
if (!isMobile) { // Only on desktop for mouse interactions
    noBtn.addEventListener('mouseenter', () => {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;

        // Ensure the button stays within the container bounds
        const maxX = containerRect.width - buttonWidth;
        const maxY = containerRect.height - buttonHeight;

        // Generate random position within container
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        // Set position (make absolute if not already)
        noBtn.style.position = 'absolute';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
    });
}

// Confirm Date Button Click
confirmBtn.addEventListener('click', () => {
    const date = document.getElementById('date-picker').value;
    const time = document.getElementById('time-picker').value;
    const place = document.getElementById('location-input').value.trim();
    const name = nameInput.value.trim();

    if (date && time && place) {
        dateForm.classList.add('hidden');
        greeting.classList.remove('hidden');

        // Typing Animation for Greeting (Bonus)
        const message = `It’s a date, ${name}! ❤️ I can’t wait to see you on ${date} at ${time} in ${place}.`;
        typeText(greetingText, message);

        // Burst of Hearts (Confetti) - Fewer on mobile
        const confettiCount = isMobile ? 30 : 50;
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }

        // Play Music
        bgMusic.play().catch(() => {}); // Autoplay may be blocked; user interaction handles it
    } else {
        alert('Please fill in all fields!');
    }
});

// Typing Animation Function (Bonus)
function typeText(element, text) {
    element.textContent = '';
    element.classList.add('typing');
    let i = 0;
    const interval = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            element.classList.remove('typing');
        }
    }, 50);
}