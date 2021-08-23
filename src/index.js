import gsap from 'gsap';
import chroma from 'chroma-js';
import './index.css';

// hsla from the parent / child css bg color
const colors = chroma.scale(['hsla(300, 70%, 80%, 0.5)', 'hsla(120, 70%, 65%, 0.5)']).mode('lch').colors(6);

const pickRandomColor = () => colors[Math.floor(colors.length * Math.random())];

const allChilds = () => document.querySelectorAll('.child');

// runs after the first timeline is complete
const drip = () => {
  const newChild = document.querySelector('.child').cloneNode(true);
  newChild.id = `child-${allChilds().length}`;
  const parent = document.querySelector('.parent');
  parent.appendChild(newChild);
  const tl = gsap
    .timeline({
      onComplete: drip,
      defaults: { ease: 'elastic.out(1, 0.3)', duration: 1.1 },
    })
    .set(newChild, {
      scale: 1,
      x: 0,
      y: 0,
      rotateZ: 0,
      backgroundColor: pickRandomColor(),
      zIndex: -1 * allChilds().length,
    })
    .to(newChild, {
      xPercent: 20,
      yPercent: 100,
    })
    .to(newChild, {
      yPercent: 170,
      scale: 0.7,
      xPercent: -500,
      ease: 'expo.in',
      duration: 2,
    })
    .to(
      newChild,
      {
        yPercent: gsap.utils.random(-500, -1200),
        rotateZ: -120,
        yoyo: true,
        xPercent: gsap.utils.random(0, -2000),
        scale: 9 + gsap.utils.random(-3, 2),
        ease: 'bounce.out',
        duration: 2,
      },
      '-=.1'
    )
    .fromTo(
      '.parent',
      {
        yPercent: -100,
        xPercent: -100,
        scale: 4,
      },
      {
        yPercent: -50,
        xPercent: 100,
        scale: 0.8,
        ease: 'expo.out',
        duration: 2.5,
      },
      '-=2.8'
    )
    .to(
      '.parent',
      {
        yPercent: -98,
        xPercent: 18,
        scale: 0.5,
        ease: 'bounce.out',
        duration: 1.7,
      },
      '-=1.8'
    );
  allChilds().forEach((child) =>
    tl.to(
      child,
      {
        translateY: gsap.utils.random(-100, 100),
        x: gsap.utils.random(-5, 5),
        y: gsap.utils.random(-5, 5),
        // rotateZ: gsap.utils.random(-50, 50),
        ease: 'bounce.out',
        duration: 2,
        yoyo: true,
      },
      3.6
    )
  );
};
let parentPath = { scale: 4, xPercent: -30, yPercent: 30, ease: 'none' };
const tl = gsap
  .timeline({
    onComplete: drip,
    defaults: { ease: 'elastic.out(1, 0.3)', duration: 1.1 },
  })
  .to('.parent', {
    scale: 4,
    xPercent: -30,
    yPercent: 30,
    ease: 'elastic.out(1, 0.3)',
  })
  .to('.child', {
    xPercent: -30,
    yPercent: -30,
  })
  .to('.parent', parentPath)
  .to('.child', {
    xPercent: -50,
    yPercent: -120,
  })
  .to('.parent', {
    scale: 4,
    xPercent: -100,
    yPercent: 220,
  })
  .to('.child', {
    xPercent: 170,
    yPercent: -10,
  })
  .to('.parent', {
    scale: 4,
    xPercent: -100,
    yPercent: 220,
  })
  .to('.child', {
    xPercent: -200,
    yPercent: -20,
  })
  .to('.parent', {
    scale: 4,
    xPercent: -100,
    yPercent: 220,
  })
  .to('.child', {
    xPercent: 20,
    yPercent: 100,
  })
  .to('.parent', {
    scale: 4,
    xPercent: -100,
    yPercent: 220,
  });
tl.add('drip')
  .to('.child', {
    yPercent: 170,
    scale: 0.7,
    xPercent: -500,
    ease: 'expo.in',
    duration: 2,
  })
  .to(
    '.child',
    {
      yPercent: 720,
      rotateZ: -120,
      yoyo: true,
      xPercent: -750,
      scale: 9,
      ease: 'bounce.out',
      duration: 3,
    },
    '-=.1'
  )
  .to(
    '.parent',
    {
      yPercent: -100,
      xPercent: 20,
      scale: 0.5,
      ease: 'bounce.out',
      duration: 3,
    },
    '-=2.8'
  );
// tl.progress(0.99);
tl.play();
// tl.kill()
