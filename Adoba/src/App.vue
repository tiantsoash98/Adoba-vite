<script>
import data from './data.json';
import Button from './components/Button.vue'
import HomeService from './components/HomeService.vue'
import { ref } from 'vue';

export default {
    components: {
        Button,
        HomeService
    },
    setup() {
        const isServiceActive = false, 
        isActiveIndex = ref(-1);

        return {
            isServiceActive,
            isActiveIndex
        }
    },
    methods: {
        // https://stackoverflow.com/questions/72018481/vue-js-add-a-class-when-an-item-is-clicked-and-remove-it-when-a-sibling-item-is
        toogleServiceActive(index){
            if(index == this.isActiveIndex){
                this.isActiveIndex = -1;
            }
            else {
                this.isActiveIndex = index;
            }
        },
    },
    computed: {
        services() {
            return data.services;
        }
    }
}
</script>

<template>
  <main data-cursor="-exclusion">
    <section class="section section--no-padding-top section--no-padding-bottom home-hero">
        <div class="home-hero__wrapper">
            <div class="home-hero__img-wrapper">
                <div class="home-hero__overlay"></div>
                <img class="home-hero__img" src="/header.webp" alt="Adoba Hero img">
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
                <span>Scroll</span>
            </div>
        </div>
    </section>
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
            opacity: 0.5;
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
        &__scroll-wrapper {
            position: absolute;
            left: var(--r-grid-x-margin);
            bottom: var(--r-space-sm);
            color: var(--brand-primary);
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
}
</style>
