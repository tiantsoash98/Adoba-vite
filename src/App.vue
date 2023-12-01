<script>
import data from './data.json';
import PageLoader from './components/PageLoader.vue'
import Button from './components/Button.vue'
import HomeService from './components/HomeService.vue'
import ImagesGrid from './components/ImagesGrid.vue'
import Advantage from './components/Advantage.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
import { provide } from 'vue'
import { ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

export default {
    components: {
        PageLoader,
        Header,
        Footer,
        Button,
        HomeService,
        ImagesGrid,
        Advantage
    },
    setup() {
        const isLoaded = ref(false),
        isServiceActive = false, 
        isActiveIndex = ref(-1);
        provide('services', data.services)
        gsap.registerPlugin(ScrollTrigger)
    
        return {
            isLoaded,
            isServiceActive,
            isActiveIndex
        }
    },
    mounted() {
        document.onreadystatechange = () => {
            if(document.readyState == "complete"){
                this.isLoaded = true;
                this.animateHero()
            } 
        }
    },  
    methods: {
        animateHero(){
            SplitType.create('.home-hero__title', {types: 'words', wordClass: "home-hero__title--word"});

            gsap.timeline({
                defaults: { duration: 1, ease: "power2.out" },
            })
            .from('.home-hero__title--word', {
                opacity: 0,
                yPercent: 100,
                stagger: 0.05,
                delay: 1
            })
        },
        // https://stackoverflow.com/questions/72018481/vue-js-add-a-class-when-an-item-is-clicked-and-remove-it-when-a-sibling-item-is
        toogleServiceActive(index){
            if(index == this.isActiveIndex){
                this.isActiveIndex = -1;
            }
            else {
                this.isActiveIndex = index;
            }
        },
        presentationScroll(el){
            let triggerEl = el;
            let targetEl = '.home-hero__img';

            gsap.timeline({
                defaults: { duration: 1 },
                scrollTrigger: {
                    trigger: triggerEl,
                    //trigger element - viewport
                    start: "top bottom",
                    end: "top top",
                    scrub: true
                }
            })
            .to(targetEl, {
                yPercent: 25,
                ease: "none"
            })
        }
    },
    computed: {
        services() {
            return data.services;
        },
        featuredWorks() {
            return data.works.filter(work => work.featured == true);
        },
        advantages() {
            return data.advantages
        }
    }
}
</script>

<template>
<PageLoader :loaded="isLoaded"/>
  <main data-cursor="-exclusion">
    <Header/>
    <section class="section section--no-padding-top section--no-padding-bottom home-hero">
        <div class="home-hero__wrapper">
            <div class="home-hero__img-wrapper">
                <div class="home-hero__overlay"></div>
                <img
                    class="home-hero__img"
                    sizes="(max-width: 2860px) 100vw, 2860px"
                    srcset="
                        /header_e29ts9_c_scale_w_280.webp 280w,
                        /header_e29ts9_c_scale_w_978.webp 978w,
                        /header_e29ts9_c_scale_w_1380.webp 1380w,
                        /header_e29ts9_c_scale_w_1667.webp 1667w,
                        /header_e29ts9_c_scale_w_1967.webp 1967w,
                        /header_e29ts9_c_scale_w_2252.webp 2252w,
                        /header_e29ts9_c_scale_w_2569.webp 2569w,
                        /header_e29ts9_c_scale_w_2860.webp 2860w"
                    src="/header_e29ts9_c_scale_w_2860.webp"
                    alt="Adoba Hero img">
            </div>
            <div class="container home-hero__content-wrapper">
                <div class="home-hero__title-wrapper">
                    <h1 class="text-visually-hidden">Avec la 3D dessinons ensemble l'architecture de demain</h1>
                    <div class="home-hero__title home-hero__title--1 title-h1">Avec la 3D</div>
                    <div class="home-hero__title home-hero__title--2 title-h1">dessinons ensemble</div>
                    <div class="home-hero__title home-hero__title--3 title-h1">l'architecture de demain</div>
                </div>
                <div class="home-hero__button-wrapper">
                    <Button text="Contactez-nous" class="button--primary"></Button>
                </div>
            </div>
            <div class="home-hero__scroll-wrapper">
                <div class="home-hero__label-wrapper">Scroll</div>
                <div class="home-hero__icon-wrapper">
                    <svg class="home-hero__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13.4 17.2">
                        <polygon points="6.7 17.2 0 10.5 .7 9.8 6.2 15.3 6.2 0 7.2 0 7.2 15.3 12.7 9.8 13.4 10.5 6.7 17.2"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>
    <transition appear @enter="presentationScroll">
        <section class="section home-presentation">
            <div class="container">
                <div class="home-presentation__content-wrapper">
                    <div class="home-presentation__title-wrapper">
                        <h2 class="text-visually-hidden">Adoba a pour ambition de proposer des solutions immersives visuelles, digitales innovantes dans l’univers de l’architecture, l’immobilier et la construction.</h2>
                        <div class="home-presentation__title title-h3">Adoba a pour ambition de proposer des solutions immersives visuelles, digitales innovantes dans l’univers de l’architecture, l’immobilier et la construction.</div>
                    </div>
                    <div class="home-presentation__button-wrapper">
                        <Button text="Contactez-nous"></Button>
                    </div>
                </div>
            </div>
        </section>
    </transition>
    
    <section class="section home-services">
        <div class="container">
            <div class="home-services__label-wrapper">
                <h6>Nos Services</h6>
            </div>
            <div class="home-services__list-wrapper">
                <ul>
                    <li v-for="(service, index) in services" :key="service.index">
                        <HomeService
                            :index="service.index"
                            :title="service.title"
                            :description="service.description"
                            :img="service.img"
                            :class="{'service--active': index === isActiveIndex}"
                            @click="toogleServiceActive(index)"
                        ></HomeService>
                    </li>
                </ul>
            </div>
        </div>
    </section>
    <section class="section home-works">
        <div class="container">
            <div class="home-works__content-wrapper">
                <div class="home-works__title-wrapper">
                    <h2 class="text-visually-hidden">Nos réalisations</h2>
                    <div class="home-works__title title-h2">Nos réalisations</div>
                </div>
                <div class="home-works__text-wrapper">
                    <p>Une séléction de nos réalisations pour vous faire découvrir le savoir-faire et la créativité de notre équipe qui execute chaque projet avec passion et minutie et vous familiariser avec les types de travaux que nous pourrons exécuter pour vous.</p>
                </div>
            </div>
            <ImagesGrid :list="featuredWorks" class="home-works__grid"></ImagesGrid>
            <div class="home-works__button-wrapper">
                <Button text="Voir toutes nos réalisations"></Button>
            </div>
        </div>
    </section>
    <section class="section home-advantages">
        <div class="container">
            <div class="home-advantages__title-wrapper">
                <h2 class="text-visually-hidden">Ce qui nous rend différent</h2>
                <div class="home-advantages__title title-h1">Ce qui nous</div>
                <div class="home-advantages__title title-h1">rend différent</div>
            </div>
            <ul class="home-advantages__list-wrapper">
                <li v-for="(advantage, index) in advantages" :key="advantage.title + index">
                    <Advantage
                        :title="advantage.title"
                        :description="advantage.description"
                        :icon="advantage.icon"
                    ></Advantage>
                </li>
            </ul>
        </div>
    </section>
    <Footer/>
  </main>
</template>

<style scoped lang="scss">
.home {
    &-hero {
        &__wrapper {
            position: relative;
            width: 100%;
            height: 100vh;
        }
        &__overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            background-color: var(--color-neutral-100);
            opacity: 0.6;
            z-index: 1;
        }
        &__img-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
        }
        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
        }
        &__content-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
            color: var(--brand-primary);
            padding-top: var(--r-space-lg);
            padding-bottom: var(--r-space-lg);
        }
        &__title {
            overflow: hidden;
        }
        &__scroll-wrapper {
            position: absolute;
            left: var(--r-grid-x-margin);
            bottom: var(--r-space-sm);
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            color: var(--brand-primary);
        }
        &__icon-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            max-width: var(--r-space-xs);
            margin-left: var(--r-space-xs);
            transition: transform 1s var(--alias-default-ease) .1s; 
        }
        &__icon{
            width: 100%;
            fill: currentColor;
            animation: bounce 2s linear infinite 2s;
        }

        @keyframes bounce {
        0% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(0.3vw);
        }
    }
    }
    &-presentation {
        &__content-wrapper {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            column-gap: var(--r-space-sm);
        }
        &__title-wrapper {
            grid-column: span 8;
        }
        &__button-wrapper {
            grid-column: 10/-1;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
        }
    }
    &-services {
        background-color: var(--brand-secondary);
        color: var(--brand-primary);

        &__label-wrapper {
            color: var(--color-neutral-40);
            margin-bottom: var(--r-space-md);
        }
    }
    &-works {
        &__content-wrapper {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            column-gap: var(--r-space-sm);
        }
        &__title-wrapper {
            grid-column: span 7;
        }
        &__text-wrapper {
            grid-column: span 5;
        }
        &__grid {
            margin-top: var(--r-space-lg);
        }
        &__button-wrapper {
            margin-top: var(--r-space-md);
            display: flex;
            justify-content: center;
        }
    }
    &-advantages {
        background-color: var(--color-neutral-80);
        color: var(--color-neutral-0);

        &__list-wrapper {
            margin-top: var(--r-space-md);
            padding-bottom: var(--r-space-md);
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: var(--r-space-md);
            row-gap: var(--r-space-md);
        }
    }
}
</style>
