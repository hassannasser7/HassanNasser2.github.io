document.addEventListener('DOMContentLoaded', function() {
    // Project data with image paths for each project
    const projectData = {
        "Bike Store Sales Dashboard": [
            "assets/images/BikeStore_Home_page.png",
            "assets/images/BikeStore_Product.png",
            "assets/images/BikeStore_Customer.png",
            "assets/images/BikeStore_sales.png"
        ],
        "Hospital Management System Dashboard": [
            "assets/images/hospital_Home_Page.png",
            "assets/images/hospital_staff.png",
            "assets/images/hospital_Rooms.png",
            "assets/images/hospital_Patient.png"
        ],
        "Marketing Campaign Performance": [
            "assets/images/Marketing_Home_Page.png",
            "assets/images/Marketing_Report.png",
            "assets/images/Marketing_Customer_Overview.png"
        ],
        "Pizza Sales Analysis Dashboard": [
            "assets/images/Pizza_Dashboard.png",
            "assets/images/Pizza_Pivot Tables.png"
        ]
    };

    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('toggle-theme');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .project-card, .timeline-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.service-card, .project-card, .timeline-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Project modal functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.querySelector('.modal-title');
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryCounter = document.querySelector('.gallery-counter');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    
    let currentImageIndex = 0;
    let currentImages = [];
    
    function showImage(index) {
        const images = galleryContainer.querySelectorAll('img');
        images.forEach(img => img.classList.remove('active'));
        images[index].classList.add('active');
        galleryCounter.textContent = `${index + 1}/${currentImages.length}`;
        currentImageIndex = index;
    }
    
    function openGallery(projectName) {
        // Set modal title
        modalTitle.textContent = projectName;
        
        // Clear previous images
        galleryContainer.innerHTML = '';
        currentImages = projectData[projectName] || [];
        
        // Add images to gallery
        currentImages.forEach((imgSrc, index) => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `${projectName} - Image ${index + 1}`;
            galleryContainer.appendChild(img);
        });
        
        // Show first image
        if (currentImages.length > 0) {
            showImage(0);
        }
        
        // Show modal
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    // Navigation controls
    prevBtn.addEventListener('click', function() {
        if (currentImages.length > 0) {
            const newIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
            showImage(newIndex);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentImages.length > 0) {
            const newIndex = (currentImageIndex + 1) % currentImages.length;
            showImage(newIndex);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            }
        }
    });
    
    // Open modal when clicking View Details buttons
    document.querySelectorAll('.btn-outline').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard = this.closest('.project-card');
            const projectName = projectCard.querySelector('h3').textContent;
            openGallery(projectName);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});