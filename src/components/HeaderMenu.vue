<script>
import gsap from 'gsap';
import { inject } from 'vue';

export default {
    setup() {
        const services = inject('services')

        return {
            services
        }
    },
    props: {
        isOpen: Boolean
    },
    watch: {
        isOpen: function(newState){
            if(newState == true){
                this.openServices();
            }
            else {
                this.closeServices();
            }
        }
    },
    methods: {
        async openServices(){
            return new Promise((resolve) => {
                gsap.timeline({
                    onComplete: resolve(),
                    defaults: {
                        duration: 1,
                        ease: "power2.inOut"
                    },
                })
                .set('.menu', { display: 'block'})
                .set('.menu__links-wrapper', { display: 'block' })
                .set('.menu__backdrop', { display: 'block' })
                .set('.menu__img-content', { display: 'block', opacity: 0})
                .set('.menu__label', { yPercent: 100, opacity: 0 }, 0)
                .to('.menu__backdrop', { opacity: 0.5, pointerEvents: 'all' })
                .to('.menu__frame', { scaleY: 1 }, '<')
                .to('.header', { '--header-color': 'var(--brand-secondary)' }, '<')
                .to('.menu__links-wrapper', { opacity: 1 }, '<+0.3s')
                .to('.menu__label', { yPercent: 0, opacity: 1, stagger: 0.15 }, 0)
                .to('.menu__img-content', { opacity: 1 })

            })
        },
        async closeServices(){
            return new Promise((resolve) => {
                gsap.timeline({
                    onComplete: resolve(),
                    defaults: {
                        duration: 1,
                        ease: "power2.inOut"
                    },
                })
                .to('.menu__label', { yPercent: 100, opacity: 0, stagger: 0.15 })
                .to('.menu__img-content', { opacity: 0}, '<')
                .to('.menu__frame', { scaleY: 0 }, '<')
                .to('.header', { '--header-color': 'var(--brand-primary)' }, '<')
                .to('.menu__backdrop', { opacity: 0, pointerEvents: 'none' }, '<')
                .set('.menu__links-wrapper', { opacity: 0, display: 'none' })
                .set('.menu__backdrop', { display: 'none' })
                .set('.menu', { display: 'none'})     
            })
        },
    }
}
</script>
    
<template>
    <aside :class="{'menu': true, 'menu--open': isOpen }" aria-expanded="false">
        <div class="menu__backdrop"></div>
        <div class="menu__main-wrapper">
            <div class="menu__frame"></div>
            <div class="container menu__content-wrapper">
                <ul class="menu__links-wrapper">
                    <li v-for="service in services" :key="service.title">
                        <a href="#">
                            <div class="menu__link title-h6">
                                <div class="menu__label">{{ service.title }}</div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="menu__img-content">
                    <!-- <div class="menu__img-wrapper">
                        <img v-for="service in services" 
                            :key="service.title" 
                            :src="service.img" 
                            class="menu__img" 
                            loading="lazy"/>
                    </div> -->
                </div>
            </div>
        </div>
    </aside>
</template>

<style scoped lang="scss">
.menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: calc(var( --z-index-nav) - 1);
    display: none;

    &--open {
        display: block;
    }
    &__backdrop {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        height: 100dvh;
        width: 100%;
        background-color: var(--color-neutral-100);
        display: none;
        opacity: 0;
        pointer-events: none;
    }
    &__main-wrapper {
        height: 100%;
    }
    &__frame {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background-color: var(--brand-primary);
        transform: scaleY(0);
        transform-origin: top;
    }
    &__content-wrapper {
        padding-top: var(--r-space-lg);
        padding-bottom: var(--r-space-md);
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        column-gap: var(--r-space-sm);
    }
    &__links-wrapper {
        grid-column: 5/span 4;
        display: none;
        opacity: 0;

        & li {
            margin-top: var(--r-space-sm);
            transition: opacity .5s var(--alias-default-ease); 
        }
        &:hover li{
            opacity: 0.2;
        }
        & li:hover {
            opacity: 1;
        }
    }
    &__link {
        overflow: hidden;
    }
    &__img-content {
        grid-column: 9/-1;
        display: none;
    }
    &__img-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border-radius: 0.5rem;
    }
    &__img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        opacity: 0;
    }
}

</style>