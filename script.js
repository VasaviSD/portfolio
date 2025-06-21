// Add your interactive JavaScript code here 

document.addEventListener('DOMContentLoaded', () => {
    tsParticles.load("particles-js", {
        fpsLimit: 60,
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    area: 800
                }
            },
            color: {
                value: "#ffffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: { min: 0.1, max: 0.6 },
                animation: {
                    enable: true,
                    speed: 0.8,
                    sync: false
                }
            },
            size: {
                value: { min: 1, max: 3 }
            },
            move: {
                enable: true,
                speed: 0.4,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "out"
                }
            }
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: false,
                    mode: "bubble"
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 200,
                    size: 6,
                    duration: 2,
                    opacity: 0.8,
                    color: "#ffffff"
                }
            }
        },
        detectRetina: true,
        background: {
            color: "#000000"
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in effect on scroll
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Active nav link highlighting on scroll
    const navLinks = document.querySelectorAll('header nav a');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: "-50% 0px -50% 0px" });

    sections.forEach(section => {
        navObserver.observe(section);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Typing animation for job title
    const jobTitleEl = document.querySelector('.job-title');
    const jobTitleText = "A Software Engineer";
    jobTitleEl.innerHTML = '&nbsp;'; // a space to prevent collapsing

    function typeWriter(element, text, callback, speed = 100) {
        let i = 0;
        element.innerHTML = ''; // Clear existing text
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        element.appendChild(cursor);

        function type() {
            if (i < text.length) {
                cursor.insertAdjacentText('beforebegin', text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else {
                cursor.remove();
                if (callback) {
                    callback();
                }
            }
        }
        type();
    }
    
    setTimeout(() => {
        typeWriter(jobTitleEl, jobTitleText, null);
    }, 500);

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const form = e.target;
            const data = new FormData(form);
            const statusEl = document.createElement('p');
            statusEl.classList.add('form-status');
            form.appendChild(statusEl);

            fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    statusEl.textContent = "Thanks for your message! I'll get back to you soon.";
                    statusEl.style.color = '#03dac6';
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            statusEl.textContent = data["errors"].map(error => error["message"]).join(", ")
                        } else {
                            statusEl.textContent = "Oops! There was a problem submitting your form."
                        }
                        statusEl.style.color = '#cf6679';
                    })
                }
            }).catch(error => {
                statusEl.textContent = "Oops! There was a problem submitting your form."
                statusEl.style.color = '#cf6679';
            });

             setTimeout(() => {
                statusEl.remove();
            }, 6000);
        });
    }
}); 