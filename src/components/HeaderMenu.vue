<script>
import { ref, inject } from 'vue';

export default {
    setup() {
        const services = inject('services')

        return {
            services
        }
    },
    methods: {

    }
}
</script>
    
<template>
    <aside class="menu" aria-expanded="false">
        <div class="menu__backdrop"></div>
        <div class="menu__main-wrapper">
            <div class="menu__frame"></div>
            <div class="container menu__content-wrapper">
                <ul class="menu__links-wrapper">
                    <li v-for="service in services" :key="service.title">
                        <a href="#">
                            <div class="menu__link title-h6">{{ service.title }}</div>
                        </a>
                    </li>
                </ul>
                <div class="menu__img-content">
                    <div class="menu__img-wrapper">
                        <img v-for="service in services" 
                            :key="service.title" 
                            :src="service.img" 
                            class="menu__img" 
                            loading="lazy">
                    </div>
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

    &--open {
        --header-blend-mode: normal;
        --header-color: var(--brand-secondary);
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
        opacity: 0.5;
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

        & li {
            margin-top: var(--r-space-sm);
        }
    }
    &__img-content {
        grid-column: 9/-1;
    }
    &__img-wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    &__img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        display: block;
    }
}

</style>