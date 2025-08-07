// Apple-themed interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initializeAppleAnimation();
    initializeClickEffects();
    initializeColorThemeToggle();
    initializeAccessibilityFeatures();
});

// Apple logo animation and effects
function initializeAppleAnimation() {
    const appleIcon = document.querySelector('.apple-icon');
    
    if (!appleIcon) return;
    
    // Floating animation
    let floatDirection = 1;
    let currentOffset = 0;
    
    function floatAnimation() {
        currentOffset += floatDirection * 0.5;
        
        if (currentOffset >= 10 || currentOffset <= -10) {
            floatDirection *= -1;
        }
        
        appleIcon.style.transform = `translateY(${currentOffset}px)`;
        requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
    
    // Click animation
    appleIcon.addEventListener('click', function() {
        this.style.animation = 'none';
        this.offsetHeight; // Trigger reflow
        this.style.animation = 'appleBounce 0.6s ease-out';
        
        // Create sparkle effect
        createSparkleEffect(this);
    });
    
    // Hover effects
    appleIcon.addEventListener('mouseenter', function() {
        this.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5))';
    });
    
    appleIcon.addEventListener('mouseleave', function() {
        this.style.filter = 'brightness(1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
    });
}

// Create sparkle effect on apple click
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #fff, #ffd700);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const angle = (i * 360) / sparkleCount;
        const distance = 50 + Math.random() * 30;
        const duration = 800 + Math.random() * 400;
        
        sparkle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: duration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => sparkle.remove();
    }
}

// Interactive click effects for buttons and interactive elements
function initializeClickEffects() {
    // Add ripple effect to clickable elements
    const clickableElements = document.querySelectorAll('button, .clickable, .apple-icon');
    
    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

// Create ripple effect
function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        z-index: 1;
    `;
    
    // Ensure element has relative positioning
    const originalPosition = getComputedStyle(element).position;
    if (originalPosition === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(ripple);
    
    ripple.animate([
        { transform: 'scale(0)', opacity: 0.6 },
        { transform: 'scale(2)', opacity: 0 }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    };
}

// Color theme toggle functionality
function initializeColorThemeToggle() {
    let currentTheme = 0;
    const themes = [
        { primary: '#007AFF', secondary: '#5AC8FA', accent: '#FF9500' }, // Classic Apple Blue
        { primary: '#FF3B30', secondary: '#FF9500', accent: '#FFCC02' }, // Warm
        { primary: '#30D158', secondary: '#32D74B', accent: '#64D2FF' }, // Fresh Green
        { primary: '#BF5AF2', secondary: '#FF2D92', accent: '#FF9500' }  // Purple Pink
    ];
    
    // Create theme toggle button
    const themeButton = document.createElement('button');
    themeButton.innerHTML = '🎨';
    themeButton.className = 'theme-toggle';
    themeButton.setAttribute('aria-label', 'Change color theme');
    themeButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(themeButton);
    
    themeButton.addEventListener('click', function() {
        currentTheme = (currentTheme + 1) % themes.length;
        applyTheme(themes[currentTheme]);
        
        // Button animation
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 150);
    });
    
    // Hover effects for theme button
    themeButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.3)';
    });
    
    themeButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
}

// Apply color theme
function applyTheme(theme) {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', theme.primary);
    root.style.setProperty('--secondary-color', theme.secondary);
    root.style.setProperty('--accent-color', theme.accent);
    
    // Animate theme change
    document.body.style.transition = 'all 0.5s ease';
    
    // Update gradient backgrounds
    const container = document.querySelector('.container');
    if (container) {
        container.style.background = `linear-gradient(135deg, ${theme.primary}20, ${theme.secondary}20)`;
    }
}

// Accessibility features
function initializeAccessibilityFeatures() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement && focusedElement.classList.contains('apple-icon')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
        
        // Theme toggle with 'T' key
        if (e.key === 't' || e.key === 'T') {
            const themeButton = document.querySelector('.theme-toggle');
            if (themeButton) {
                themeButton.click();
            }
        }
    });
    
    // Focus indicators
    const focusableElements = document.querySelectorAll('button, .apple-icon, .theme-toggle');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid #007AFF';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
    
    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        
        // Disable floating animation for apple icon
        const appleIcon = document.querySelector('.apple-icon');
        if (appleIcon) {
            appleIcon.style.animation = 'none';
        }
    }
}

// Performance optimization - Intersection Observer for animations
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe main elements
    const elementsToObserve = document.querySelectorAll('.container, .apple-icon, h1');
    elementsToObserve.forEach(el => observer.observe(el));
}

// Initialize intersection observer when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeIntersectionObserver);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Cleanup function for memory management
window.addEventListener('beforeunload', function() {
    // Remove any remaining sparkles or ripples
    const effects = document.querySelectorAll('.sparkle, span[style*="radial-gradient"]');
    effects.forEach(effect => effect.remove());
});