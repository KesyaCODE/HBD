// Variabel Global
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let isAnimating = false;

// Music Control
const music = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let isPlaying = false;

// Auto-play music on page load
window.addEventListener('load', () => {
    music.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add('playing');
        console.log('🎵 Musik berhasil diputar otomatis!');
    }).catch(e => {
        console.log('Autoplay diblokir, klik untuk memutar musik');
        // Jika autoplay gagal, coba saat user klik pertama kali
        document.addEventListener('click', () => {
            if (!isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    musicToggle.classList.add('playing');
                });
            }
        }, { once: true });
    });
});

musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        music.pause();
        musicToggle.classList.remove('playing');
    } else {
        music.play().catch(e => console.log('Music play failed:', e));
        musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
});

// Navigation Function
function goToSlide(index) {
    if (isAnimating || index === currentSlide || index < 0 || index >= totalSlides) return;
    
    isAnimating = true;
    
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    // Add active class to new slide
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    
    // Trigger special animations for each slide
    triggerSlideAnimations(currentSlide);
    
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

// Navigation with Dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        goToSlide(index);
    });
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToSlide(currentSlide + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSlide(currentSlide - 1);
    }
});

// Mouse Wheel Navigation
let scrollTimeout;
document.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(currentSlide - 1);
        }
    }, 50);
}, { passive: false });

// Touch Navigation
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].clientY;
    handleSwipe();
});

function handleSwipe() {
    const swipeDistance = touchStartY - touchEndY;
    
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            goToSlide(currentSlide + 1);
        } else {
            goToSlide(currentSlide - 1);
        }
    }
}

// Restart Button
const restartBtn = document.getElementById('restartBtn');
restartBtn.addEventListener('click', () => {
    goToSlide(0);
});

// Special Animations for Each Slide
function triggerSlideAnimations(slideIndex) {
    switch(slideIndex) {
        case 0:
            createFloatingParticles();
            break;
        case 1:
            animateProfileCard();
            break;
        case 2:
            animateCakeCandles();
            createSparkles();
            break;
        case 3:
            animatePrayerItems();
            break;
        case 4:
            animateCreatorCard();
            break;
        case 5:
            createFloatingHearts();
            break;
    }
}

// Slide 1: Floating Particles
function createFloatingParticles() {
    const particlesContainer = document.querySelector('#slide1 .particles');
    particlesContainer.innerHTML = '';
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = '#d4af37';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Slide 2: Profile Card Animation
function animateProfileCard() {
    const bioItems = document.querySelectorAll('.bio-item');
    bioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 150);
    });
}

// Slide 3: Cake Candles Animation
function animateCakeCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach((candle, index) => {
        candle.style.opacity = '0';
        candle.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            candle.style.transition = 'all 0.5s ease';
            candle.style.opacity = '1';
            candle.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    const layers = document.querySelectorAll('.cake-layer');
    layers.forEach((layer, index) => {
        layer.style.opacity = '0';
        layer.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            layer.style.transition = 'all 0.6s ease';
            layer.style.opacity = '1';
            layer.style.transform = 'scale(1)';
        }, (index + 3) * 200);
    });
}

// Slide 3: Sparkles Effect
function createSparkles() {
    const sparklesContainer = document.querySelector('#slide3 .sparkles');
    sparklesContainer.innerHTML = '';
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
        sparkle.style.opacity = '0';
        sparkle.style.animation = `sparkleAnimation ${Math.random() * 2 + 2}s infinite`;
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparklesContainer.appendChild(sparkle);
    }
    
    // Add CSS animation for sparkles
    if (!document.getElementById('sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.innerHTML = `
            @keyframes sparkleAnimation {
                0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
                50% { opacity: 1; transform: scale(1) rotate(180deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Slide 4: Prayer Items Animation
function animatePrayerItems() {
    const prayerItems = document.querySelectorAll('.prayer-item');
    prayerItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.7s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Slide 5: Creator Card Animation
function animateCreatorCard() {
    const avatar = document.querySelector('.creator-avatar');
    const name = document.querySelector('.creator-name');
    const role = document.querySelector('.creator-role');
    const socialLinks = document.querySelectorAll('.social-link');
    
    avatar.style.opacity = '0';
    avatar.style.transform = 'scale(0)';
    
    setTimeout(() => {
        avatar.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        avatar.style.opacity = '1';
        avatar.style.transform = 'scale(1)';
    }, 200);
    
    setTimeout(() => {
        name.style.opacity = '0';
        name.style.transform = 'translateY(20px)';
        name.style.transition = 'all 0.6s ease';
        name.style.opacity = '1';
        name.style.transform = 'translateY(0)';
    }, 600);
    
    setTimeout(() => {
        role.style.opacity = '0';
        role.style.transform = 'translateY(20px)';
        role.style.transition = 'all 0.6s ease';
        role.style.opacity = '1';
        role.style.transform = 'translateY(0)';
    }, 800);
    
    socialLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            link.style.transition = 'all 0.6s ease';
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        }, 1000 + (index * 150));
    });
}

// Slide 6: Floating Hearts
function createFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    heartsContainer.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `floatUp ${Math.random() * 5 + 5}s linear infinite`;
        heart.style.animationDelay = Math.random() * 3 + 's';
        heartsContainer.appendChild(heart);
    }
    
    // Add CSS animation for floating hearts
    if (!document.getElementById('heart-style')) {
        const style = document.createElement('style');
        style.id = 'heart-style';
        style.innerHTML = `
            @keyframes floatUp {
                0% {
                    transform: translateY(0) rotate(0deg);
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-120vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add scroll indicator click
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        goToSlide(1);
    });
}

// Add interactive hover effect for cake layers
const cakeLayers = document.querySelectorAll('.cake-layer');
cakeLayers.forEach(layer => {
    layer.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'all 0.3s ease';
    });
    
    layer.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Initialize first slide animations
window.addEventListener('load', () => {
    // Auto-play music
    music.play().then(() => {
        isPlaying = true;
        musicToggle.classList.add('playing');
        console.log('🎵 Musik berhasil diputar otomatis!');
    }).catch(e => {
        console.log('Autoplay diblokir, klik untuk memutar musik');
        // Jika autoplay gagal, coba saat user klik pertama kali
        document.addEventListener('click', () => {
            if (!isPlaying) {
                music.play().then(() => {
                    isPlaying = true;
                    musicToggle.classList.add('playing');
                });
            }
        }, { once: true });
    });
    
    // Initialize animations
    triggerSlideAnimations(0);
});

// Prevent default scroll behavior
document.addEventListener('scroll', (e) => {
    window.scrollTo(0, 0);
});

// Add parallax effect on mouse move for slide 1
document.addEventListener('mousemove', (e) => {
    if (currentSlide === 0) {
        const particles = document.querySelector('#slide1 .particles');
        if (particles) {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 50;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 50;
            particles.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
        }
    }
});

// Prevent default scroll behavior
document.addEventListener('scroll', (e) => {
    window.scrollTo(0, 0);
});
const prayerBox = document.querySelector('.prayer-box');
if (prayerBox) {
    prayerBox.addEventListener('mousemove', (e) => {
        const rect = prayerBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const glitter = document.createElement('div');
        glitter.style.position = 'absolute';
        glitter.style.left = x + 'px';
        glitter.style.top = y + 'px';
        glitter.style.width = '4px';
        glitter.style.height = '4px';
        glitter.style.background = '#d4af37';
        glitter.style.borderRadius = '50%';
        glitter.style.pointerEvents = 'none';
        glitter.style.animation = 'glitterFade 1s ease-out forwards';
        
        prayerBox.appendChild(glitter);
        
        setTimeout(() => {
            glitter.remove();
        }, 1000);
    });
    
    // Add glitter animation
    if (!document.getElementById('glitter-style')) {
        const style = document.createElement('style');
        style.id = 'glitter-style';
        style.innerHTML = `
            @keyframes glitterFade {
                0% {
                    opacity: 1;
                    transform: scale(1);
                }
                100% {
                    opacity: 0;
                    transform: scale(2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

console.log('🎉 Website Ulang Tahun Elegan telah dimuat!');
console.log('💫 Gunakan scroll, keyboard arrows, atau dots untuk navigasi');
console.log('🎵 Klik tombol musik untuk memutar/menjeda lagu');