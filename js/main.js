// Programmed By: John Thomas Carlos
// Copyright © 2020
function delay(n) {
    n = n || 2000;
    return new Promise((done) => {
        setTimeout(() => {
            done();
        }, (n));
    });
}
 
function onLoadAnimation() {
    var tl = gsap.timeline();
    tl.from(".navigation-animation", {duration: 1, y: 30, opacity: 0, stagger: 0.4, delay: 5});
    tl.from(".footer-animation", {duration: 1, opacity: 0}, "-=.5");
    tl.from(".upper-fade-animation", {duration: 1, y: 30, opacity: 0, stagger: .15}, "-=1");
}

function contentAnimation() {
    var tl = gsap.timeline();
    tl.from(".upper-fade-animation", {duration: 1, y: 30, opacity: 0, stagger: .15});
}

function contentAnimationOnLeave() {
    var tl = gsap.timeline();
    tl.to(".text-animation", {duration: 1, y: 30, opacity: 0});
    tl.to(".upper-fade-animation", {duration: 1, y: 30, opacity: 0}, "-=1");
}

function pageTransition() {
    var tl = gsap.timeline();
    tl.to(".loading-screen", {
        duration: 1,
        width: "100%",
        left: "0%",
        ease: "Expo.easeInOut"
    });

    tl.to(".loading-screen", {
        duration: .5,
        width: "100%",
        left: "100%",
        ease: "Expo.easeInOut",
        delay: .3
    });

    tl.set(".loading-screen", {left: "-100%"});
}

function changeExperience() {
    switch($(this).attr("id")) {
        case "sistema":
            $('#sistema').addClass('active-experience');
            $('#knowledge').removeClass('active-experience');

            $(".sistema-ammiris").css("display", "block");
            $(".knowledge-channel").css("display", "none");
            break;
        case "knowledge":
            $('#sistema').removeClass('active-experience');
            $('#knowledge').addClass('active-experience');

            $(".sistema-ammiris").css("display", "none");
            $(".knowledge-channel").css("display", "block");
            break;
    }
}

$(document).ready(function() {
    $('.nav-mobile-icon').click(function() {
        $(this).toggleClass('open');
        $('.nav-links').toggleClass('nav-list-container-open');
    });

    $(".nav-link").click(function() {
        if ($(location).attr('pathname') == '/' &&  $(this).attr("href") == '/') {
            return false
        }
        if ($(location).attr('pathname') == "/" + $(this).attr("href")) {
            return false
        } else {
            if($('.nav-mobile-icon').hasClass("open")) {
                $('.nav-mobile-icon').toggleClass('open');
                $('.nav-links').toggleClass('nav-list-container-open');
            }
            return true;
        }
    });

    $(".disabled-link").click(function(e) {
        e.preventDefault();
    })

    $(".experience-button").click(changeExperience);

    setTimeout(function() {
        $("#logo").addClass("transformed-logo");
        $(".static-logo").removeClass("static-hidden-logo");
    }, 6000);   

    var texts = [
        'Python', 'HTML', 'JavaScript',
        'CSS', 'Adobe Illustrator', 'PHP', 'jQuery',
        'Laravel', 'C++', 'C#',
        'Java', 'MySQL', 'Adobe Photoshop',
        'PostgreSQL', 'Raspberry Pi', 'Arduino',
        'MongoDB', 'Flutter', 'Adobe XD',
        'WinForms', 'WPF', 'SQLite'
    ];

    var tagcloud = TagCloud('.tagskills', texts, {
        radius: 250,
        maxSpeed: 'fast',
        keep: false,
    });

    barba.init({
        sync: true,
        transitions: [{
            async leave(data) {
                const done = this.async();
                contentAnimationOnLeave();
                pageTransition();
                await delay(1000);
                done();
            },
            async enter(data) {
                contentAnimation();
                if ($(location).attr('pathname') == "/experience.html") {
                    $(".experience-button").click(changeExperience);
                }
                if ($(location).attr('pathname') == "/skills.html") {
                    var tagcloud = TagCloud('.tagskills', texts, {
                        radius: 250,
                        maxSpeed: 'fast',
                        keep: false,
                    });
                }
            },

            async once(data) {
                onLoadAnimation();
            }
        }]
    })
});