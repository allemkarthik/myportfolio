$(document).ready(function () {

    // ===== Navbar toggle =====
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // ===== Scroll & scroll spy =====
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll top button
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // ===== Smooth scrolling =====
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // ===== EmailJS initialization =====
    emailjs.init("service_8n06zls");

    $("#contact-form").submit(function (event) {
        event.preventDefault();
        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                $("#contact-form")[0].reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Please try again later.");
            });
    });

});

// ===== Visibility change for tab =====
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | sai karthik";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        $("#favicon").attr("href", "assets/images/favhand.png");
    }
});

// ===== Typed.js Hero effect =====
if (typeof Typed !== 'undefined') {
    new Typed(".typing-text", {
        strings: ["Front End Developer","Python Developer", "Full Stack Web Developer"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });
}

// ===== About section animations & Tilt =====
document.addEventListener('DOMContentLoaded', function () {
    // VanillaTilt for About image
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('.tilt'), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.25
        });
    }

    // Ensure #particles-js has proper height
    const particlesEl = document.getElementById('particles-js');
    if (particlesEl) {
        particlesEl.style.position = 'absolute';
        particlesEl.style.top = '0';
        particlesEl.style.left = '0';
        particlesEl.style.width = '100%';
        particlesEl.style.height = '100%';
        particlesEl.style.zIndex = '0';
    }
});

// ===== Fetch skills & projects =====
async function fetchData(type = "skills") {
    let response;
    type === "skills" ?
        response = await fetch("skills.json") :
        response = await fetch("./projects/projects.json");
    return await response.json();
}
document.addEventListener('DOMContentLoaded', function() {
    // VanillaTilt
    VanillaTilt.init(document.querySelectorAll('.tilt'), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.25
    });

    // ScrollReveal for About
    ScrollReveal().reveal('.about .content h3', { delay: 200, origin: 'left', distance: '50px' });
    ScrollReveal().reveal('.about .content .tag', { delay: 300, origin: 'left', distance: '50px' });
    ScrollReveal().reveal('.about .content p', { delay: 400, origin: 'left', distance: '50px' });
    ScrollReveal().reveal('.about .content .box-container', { delay: 500, origin: 'bottom', distance: '50px' });
    ScrollReveal().reveal('.about .content .resumebtn', { delay: 600, origin: 'bottom', distance: '50px' });
});

// ===== Show skills =====
function showSkills(skills) {
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = skills.map(skill => `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>
    `).join('');
}

// ===== Show projects =====
function showProjects(projects) {
    const projectsContainer = document.querySelector("#work .box-container");
    projectsContainer.innerHTML = projects
        .slice(0, 10)
        .filter(project => project.category !== "android")
        .map(project => `
        <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
                <div class="tag"><h3>${project.name}</h3></div>
                <div class="desc">
                    <p>${project.desc}</p>
                    <div class="btns">
                        <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                        <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Re-init Tilt
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }

    // ScrollReveal for projects
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('.work .box', { interval: 200 });
    }
}

// ===== Fetch & show =====
fetchData().then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));

// ===== ScrollReveal animations =====
if (typeof ScrollReveal !== 'undefined') {
    const srtop = ScrollReveal({ origin: 'top', distance: '80px', duration: 1000, reset: true });

    // Hero
    srtop.reveal('.home .content h3', { delay: 200 });
    srtop.reveal('.home .content p', { delay: 200 });
    srtop.reveal('.home .content .btn', { delay: 200 });
    srtop.reveal('.home .image', { delay: 400 });
    srtop.reveal('.home .linkedin', { interval: 600 });
    srtop.reveal('.home .github', { interval: 800 });
    srtop.reveal('.home .twitter', { interval: 1000 });
    srtop.reveal('.home .telegram', { interval: 600 });
    srtop.reveal('.home .instagram', { interval: 600 });
    srtop.reveal('.home .dev', { interval: 600 });

    // About section (fully updated)
    srtop.reveal('.about h2', { delay: 100 });
    srtop.reveal('.about .image', { delay: 300 });
    srtop.reveal('.about .content h3', { delay: 400 });
    srtop.reveal('.about .content .tag', { delay: 500 });
    srtop.reveal('.about .content p', { delay: 600 });
    srtop.reveal('.about .content .box-container', { delay: 700 });
    srtop.reveal('.about .content .resumebtn', { interval: 200 });

    // Skills
    srtop.reveal('.skills .container', { interval: 200 });
    srtop.reveal('.skills .container .bar', { delay: 400 });

    // Education
    srtop.reveal('.education .box', { interval: 200 });

    // Projects handled in showProjects()

    // Experience
    srtop.reveal('.experience .timeline', { delay: 400 });
    srtop.reveal('.experience .timeline .container', { interval: 400 });

    // Contact
    srtop.reveal('.contact .container', { delay: 400 });
    srtop.reveal('.contact .container .form-group', { delay: 400 });
}

// ===== Disable developer tools =====
document.onkeydown = function (e) {
    if (e.keyCode === 123) return false;
    if (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(String.fromCharCode(e.keyCode))) return false;
    if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) return false;
}

// ===== Tawk.to Live Chat =====
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
