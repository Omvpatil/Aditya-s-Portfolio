
function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
    lerp: 0.08,

    // for tablet smooth
    tablet: { smooth: true },

    // for mobile
    smartphone: { smooth: true }
  });
  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
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
        height: window.innerHeight
      };
    }
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  ScrollTrigger.refresh();
}

locomotiveAnimation();



function displayTime() {
  var currentTime = document.getElementById("currentTime");

  setInterval(() => {
    var d = new Date();
    currentTime.innerHTML = d.toLocaleTimeString();
  }, 1000);
}

function mouseFollower() {

  var circle = document.querySelector(".circle");
  var body = document.body;
  body.addEventListener("mousemove", function (dets) {
    gsap.to(circle, {
      left: dets.clientX,
      top: dets.clientY,
      ease: Power1,
      duration: 0.5

    })

  })

  // for frame
  var frames = document.querySelectorAll(".frame");
  frames.forEach(function (frame) {


    frame.addEventListener("mousemove", function (dets) {
      gsap.to(circle, {
        scale: 12,
        duration: 0.5,
        delay: -1,
        ease: Power1,
        mixBlendMode: "difference",
      });

    })

    frame.addEventListener("mouseleave", function () {

      gsap.to(circle, {
        scale: 1,
      })
    })

  })
}

function page1Animation() {

  var tl = gsap.timeline();
  tl.from("nav", {
    // duration:0.2,
    opacity: 0,
    ease: Expo.easeInOut,
  }, "a")
  tl.to(".boundElem", {
    y: 0,
    duration: 1.5,
    delay: -1.8,
    ease: Expo.easeInOut,
    stagger: 0.2
  }, "a")
  tl.from(".p1bottom ,.arrows", {
    y: -20,
    opacity: 0,
    delay: -1,
    ease: Expo,
    stagger: 0.2
  })
  tl.from(".links h4", {
    x: -50,
    opacity: 0,
    delay: -1,
    ease: Expo,
    stagger: 0.2
  })


  // &&&&&&&&&&&&&&&&&&&
  var circle = document.querySelector(".circle");
  var frames = document.querySelectorAll(".frame");

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  frames.forEach(function (frame) {


    frame.addEventListener("mousemove", function (dets) {
      var dimes = frame.getBoundingClientRect();
      // console.log(dimes);
      var xStart = dimes.x;
      var xEnd = dimes.x + dimes.width

      var zeroOne = gsap.utils.mapRange(xStart, xEnd, 0, 1, dets.clientX);

      gsap.to(frame.children, {
        y: "-10vw",
        color: "white",

      })
      gsap.to(frame.children, {
        duration: 0.4,
        x: lerp(-50, 50, zeroOne),

      })
    })
    frame.addEventListener("mouseleave", function () {
      gsap.to((".frame .boundElem"), {
        y: "0",

      })
      gsap.to(frame.children, {
        duration: 0.4,
        x: 0,

      })
    })

  })

}

function page2Animation() {

  document.querySelectorAll(".element").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });

      gsap.to(elem.querySelector("h1"), {
        opacity: 1,
        ease: Power3,
        x: 0,
        scale: 1
      });
      gsap.to(elem.querySelector("h5"), {
        opacity: 1,
      });


    });

    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;

      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
      gsap.to(elem.querySelector("h1"), {
        opacity: 0.3,
        ease: Power3,
        x: 45,
      });
      gsap.to(elem.querySelector("h5"), {
        opacity: 0.3,
      });




    });
  });



}



function menuAnimation() {
  var open = document.querySelector(".open");
  open.addEventListener("click", () => {
    var tl = gsap.timeline();

    tl.to(".blackscreen", {
      duration: 0.9,
      ease: Power3.easeInOut,
      x: "-100%",
    })
    tl.to(".menu", {
      delay: -0.8,
      duration: 0.5,
      ease: Power3.easeInOut,
      x: 0,
    })
    tl.from(".left-menu , right-menu", {
      x: "-100%",
      delay: -0.4,
      stagger: {
        amount: 0.2,
      }
    })
    tl.from(".left-menu h1", {
      x: "-100%",
      delay: -0.4,
      stagger: {
        amount: 0.2,
      }
    })
    tl.from(".right-menu h1", {
      y: "100%",
      opacity: 0,
      delay: -0.4,
      stagger: {
        amount: 0.2,
      }
    })


  })

  var close = document.querySelector(".close");
  close.addEventListener("click", () => {
    gsap.to(".menu", {
      x: "100%",
      ease: Power3.easeInOut,
    })
    gsap.to(".blackscreen", {
      x: "100%",
      delay: 0.2,
      ease: Power3.easeInOut,
    })
  })


}


function page4Animation() {

  var tl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: ".page4",
        scroller: "main",
        // markers:true,
        start: "40% 50%",
        end: "100% 50%",
        scrub: 2,
        pin: true
      }
    }
  );

  tl.to(".textContainer", {
    top: "5%"
  }, 'a')
  tl.to("#page1", {
    top: "40%",
    width: "90%",
    height: "85vh",
    borderRadius: "50px"
  }, 'a')
  tl.to("#page2", {
    top: "110%"
  }, 'a')


  tl.to("#page1", {
    width: "76%",
    height: "85vh",
    opacity: 0.8,
  }, 'b')
  tl.to("#page2", {
    top: "45%",
    borderRadius: "50px",
    width: "90%",
  }, 'b')
  tl.to("#page3", {
    top: "130%"
  }, 'b')

  tl.to("#page2", {
    width: "84%",
    height: "86vh",
  }, 'c')
  tl.to("#page3", {
    top: "50%",
    borderRadius: "50px",
    width: "90%",
  }, 'c')



}

function page3Animation() {

  var allH4 = document.querySelectorAll(".aboutText h4");
  allH4.forEach(function (elem) {
    var h4text = elem.textContent;
    var cluter = "";
    var splitedText = h4text.split("");
    splitedText.forEach(function (e) {
      cluter += `<span>${e}</span>`;
    })
    elem.innerHTML = cluter;
  })



  gsap.to(".aboutText h4 span", {
    opacity: 1,
    color: "white",
    stagger: 0.2,
    scrollTrigger: {
      start: "top 75%",
      end: "top 25%",
      // markers:true,
      scrub: 2,
      scroller: "main",
      trigger: ".aboutText h4",
    }
  })
  // gsap.to(".about a",{
  //   scale:1.06,
  //   duration:1,
  //   repeat:-1,

  // })

}

function page5Animation() {


  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".page5",
      scroller: "main",
      start: "50% 50%",
      end: "200% 50%",
      // markers: true,
      scrub: 3,
      pin: true
    }
  });
  tl.to(".top ,.bottum", {
    backgroundColor: "white",
    duration: 1.5,
    scrub: false,
  });
  tl.to(".top", {
    duration: 1.3,
    top: "-50%",
  }, "a");
  tl.to(".bottum", {
    duration: 1.3,
    bottom: "-50%",
  }, "a");
  tl.to("#top-h1", {
    top: "120%",
  }, "a");
  tl.to("#bottum-h1", {
    top: "-20%",
  }, "a");
  // tl.to(".skill-container", {
  //   marginTop: "0",
  // }, "a");
  tl.to(".bottum", {
    opacity: 0,
    display: "none",
    scrub: false
  });
  tl.from(".skill1", {
    opacity: 0,
    y: 200,
    delay: 0.6,
    scrub: 2

  }, "a");
  tl.to(".skill1", {
   
    y: -200,
    scrub: 2,
    

  });
  tl.to(".skill1", {
    opacity: 0,
    scale:.8,
   

  });
  tl.from(".skill2", {
    opacity: 0,
    y: 200,
    scrub: 2,
    delay:-0.6,

  });
  tl.to(".skill2", {
    
    y: "-30%",
    scrub: 2,
  });
  tl.to(".skill2", {
    
    y: -200,
    scrub: 2,
    

  });
  tl.to(".skill2", {
    opacity: 0,
    scale:.8,
   

  });
}




mouseFollower();
displayTime();

page1Animation();
menuAnimation();
page2Animation();
page3Animation();
page5Animation();
page4Animation();