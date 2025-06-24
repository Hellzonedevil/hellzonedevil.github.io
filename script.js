// This function runs once the HTML document is fully loaded.
document.addEventListener('DOMContentLoaded', () => {

    // --- Hamburger Menu Logic ---
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuLinks = document.querySelector('.menu-links');
    const navLinks = menuLinks.querySelectorAll('a');

    // Toggles the 'open' class on the menu and icon
    function toggleMenu() {
        menuLinks.classList.toggle('open');
        hamburgerIcon.classList.toggle('open');
    }

    // When the hamburger icon is clicked, toggle the menu
    hamburgerIcon.addEventListener('click', toggleMenu);

    // When any link inside the hamburger menu is clicked, close the menu
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // --- Button and Icon Click Logic ---

    // Download CV Button
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', () => {
            // Make sure your resume file is named this way in the 'assets' folder
            window.open('./assets/Sarvesh-Sai-Rajesh-Resume.pdf', '_blank');
        });
    }

    // Contact Me Button
    const contactMeBtn = document.getElementById('contact-me-btn');
    if (contactMeBtn) {
        contactMeBtn.addEventListener('click', () => {
            location.href = './#contact';
        });
    }

    // Social Media Icons
    const linkedinIcon = document.getElementById('linkedin-icon');
    if (linkedinIcon) {
        linkedinIcon.addEventListener('click', () => {
            location.href = 'https://www.linkedin.com/in/ssr55/';
        });
    }

    const githubIcon = document.getElementById('github-icon');
    if (githubIcon) {
        githubIcon.addEventListener('click', () => {
            location.href = 'https://github.com/Hellzonedevil';
        });
    }

    /* TODO: Add event listeners for your project buttons here. 
    You would first need to add unique IDs to them in your index.html file.
    Example:
    
    const projectOneGithubBtn = document.getElementById('project-one-github');
    if(projectOneGithubBtn) {
        projectOneGithubBtn.addEventListener('click', () => {
            location.href = 'YOUR_PROJECT_ONE_GITHUB_LINK';
        });
    }
    */
});