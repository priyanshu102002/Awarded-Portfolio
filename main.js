const main = document.querySelector("#main");
const pointer = document.querySelector(".pointer");

// for scroll trigger and locomotive js work together
function scrolltriggerandgsap() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },

        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}

scrolltriggerandgsap();


let timeout = 0;

// for circle mouse follower
function circleMouseFollower(xScale, yScale) {
    main.addEventListener("mousemove", (e) => {
        pointer.style.transform = `translate(${e.clientX}px,${e.clientY}px) scale(${xScale},${yScale})`;
    });
}

circleMouseFollower();

// for oval mouse follower

function ovalCircleMouseFollower() {
    let xScale = 1;
    let yScale = 1;

    let xPrev = 0;
    let yPrev = 0;

    main.addEventListener("mousemove",(e) => {
        
        let xDiff = e.clientX - xPrev;
        let yDiff = e.clientY - yPrev;

        xPrev = e.clientX;
        yPrev = e.clientY;

        // mapping
        xScale = gsap.utils.clamp(.8,1.2,xDiff)
        yScale = gsap.utils.clamp(.8,1.2,yDiff)
        
        circleMouseFollower(xScale,yScale);

        timeout = setTimeout(function(){
            pointer.style.transform = `translate(${e.clientX}px,${e.clientY}px) scale(1,1)`;
        },100)
        clearTimeout(timeout);
    })
}

ovalCircleMouseFollower();

//  for first page animation
function firstPageAnim(){
    const tl = gsap.timeline();

    tl.from("nav",{
        y: -10,
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut
    })

    tl.to(".boundingelem",{
        y: 0,
        duration: 2,
        ease: Expo.easeInOut,
        stagger: 0.2,
        delay: -1
    })

    tl.from(".hero-footer",{
        y: -20,
        opacity: 0,
        duration: 2,
        ease: Expo.easeInOut,
        delay: -1.5
    })
}

firstPageAnim();



document.querySelectorAll(".elem").forEach(function(elem){

    let diff = 0;
    let rotate = 0;

    elem.addEventListener("mousemove",function(event){
        
        let difference = event.clientY - elem.getBoundingClientRect().top;

        diff = event.clientX - rotate;
        rotate = event.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: difference,
            left: event.clientX,
            rotate: gsap.utils.clamp(-20,20,diff*.5)
        })
    })
    elem.addEventListener("mouseleave",function(event){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            duration: .5,
            ease: Power3,
        })
    })
})