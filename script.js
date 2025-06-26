// Menu Toggle
let menu = document.querySelector('#menu');
let header = document.querySelector('header');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    header.classList.toggle('active');
};

// Close Menu on Scroll
window.onscroll = () => {
    menu.classList.remove('fa-times');
    header.classList.remove('active');
};

// Typing Animation
let typed = new Typed('.typing-text', {
    strings: ['Harish', 'a Developer', 'a Programmer', 'a Designer'],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// Theme Toggle
let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () => {
    themeToggler.classList.toggle('fa-sun');
    if (themeToggler.classList.contains('fa-sun')) {
        document.body.classList.add('active');
    } else {
        document.body.classList.remove('active');
    }
};

// Scroll Reveal Animation
ScrollReveal().reveal('.content, .heading, .box, .project-card, form', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    reset: true
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Top Button
let scrollTop = document.querySelector('.top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTop.style.display = 'block';
    } else {
        scrollTop.style.display = 'none';
    }
});

// EmailJS Integration
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your EmailJS user ID
})();

document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(function() {
            // Success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
            
            // Reset form
            document.getElementById("contact-form").reset();
            
            // Show success notification
            const notification = document.createElement('div');
            notification.className = 'notification success';
            notification.innerHTML = 'Message sent successfully!';
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
        }, function(error) {
            // Error message
            submitBtn.innerHTML = '<i class="fas fa-times"></i> Error';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
            
            // Show error notification
            const notification = document.createElement('div');
            notification.className = 'notification error';
            notification.innerHTML = 'Failed to send message. Please try again.';
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }, 3000);
            
            console.error('EmailJS Error:', error);
        });
});

// Skill Animation on Scroll
const skillBoxes = document.querySelectorAll('.about .box');

function animateSkills() {
    skillBoxes.forEach(box => {
        const progress = box.querySelector('.progress');
        const percentage = box.querySelector('h3').textContent;
        progress.style.width = percentage;
    });
}

// Run animation when skills section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.about'));

// Project Filter (if you add more projects later)
const filterButtons = document.querySelectorAll('.project-filter button');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Add animation to education boxes on scroll
const educationBoxes = document.querySelectorAll('.education .box');

educationBoxes.forEach(box => {
    box.style.opacity = '0';
    box.style.transform = 'translateY(50px)';
    box.style.transition = 'all 0.5s ease';
});

function animateEducation() {
    educationBoxes.forEach((box, index) => {
        setTimeout(() => {
            const boxTop = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (boxTop < windowHeight - 100) {
                box.style.opacity = '1';
                box.style.transform = 'translateY(0)';
            }
        }, index * 200);
    });
}

window.addEventListener('scroll', animateEducation);
animateEducation(); // Run once on page load