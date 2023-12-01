import { createApp } from 'vue'
import './styles/style.scss'
import App from './App.vue'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import MouseFollower from "mouse-follower";

createApp(App).mount('#app')
initScroll()
initCursor()

function initScroll(){
  
    // Lenis scroll
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })
  
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
  
    requestAnimationFrame(raf)
}
  
function initCursor(){
    MouseFollower.registerGSAP(gsap);
    
    const cursor = new MouseFollower({
        container: document.body,
        speed: 1,
        ease: 'expo.out',
        skewingText: 0,
    });


    document.querySelectorAll('[data-cursor="-neutral"]').forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.removeState('-exclusion');
        });
        item.addEventListener('mouseleave', () => {
            cursor.addState('-exclusion');
        });
      })


    let matchMedia = gsap.matchMedia();

    matchMedia.add("(hover: none)", () => {
        console.log('Touchscreen detected')
        cursor.destroy()
    });
    
}