<script>
import Button from './Button.vue'

export default {
    components: {
        Button,    
    },
    props: {
        index: String,
        title: String,
        description: String,
        img: String
    },
    computed: {
        serviceId(){
            return `0${this.index}.`;
        }
    }
}

</script>

<template>
    <div class="service">
        <div class="service__border"></div>
        <div class="service__content-wrapper">
            <div class="service__left-wrapper">
                <span class="service__id callout-text">{{ serviceId }}</span>
                <div class="service__title-wrapper">
                    <h5 class="text-visually-hidden">{{ title }}</h5>
                    <div class="service__title title-h5">{{ title }}</div>
                </div>
            </div>
            <div class="service__right-wrapper">
                <p>{{ description }}</p>
                <Button text="Voir Plus" class="button--tertiary button--white"></Button>
            </div>
        </div>
        <div class="service__img-container">
            <div class="service__img-wrapper" data-cursor-text="Voir" data-cursor="-neutral">
                <img :src="img" :alt="title" class="service__img" loading="lazy">
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .service {
        --service-img-height: 70vh;
        $root:&;
        overflow: hidden;

        &:not(.service--active):hover {
            #{$root}__img-wrapper  {
                transform: translateY(-4%);
            }
        }
        &--active {
            #{$root}__img-container  {
                height: var(--service-img-height);
            }
        }
        &__border {
            width: 100%;
            height: 1px;
            background-color: var(--color-neutral-70);
            margin-bottom: var(--r-space-md);
        }
        &__content-wrapper {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            column-gap: var(--r-space-sm);
        }
        &__left-wrapper {
            grid-column: span 7;
            display: flex;
        }
        &__id {
            color: var(--color-neutral-50);
            padding-top: calc(0.2 * var(--r-base-unit));
        }
        &__title-wrapper {
            margin-left: var(--r-space-sm);
        }
        &__right-wrapper {
            grid-column: span 5;
        }
        & button {
            margin-top: var(--r-space-md);
        }
        & p {
            color: var(--color-neutral-10);
        }
        &__img-container {
            width: 100%;
            height: 0vh;
            margin-top: var(--r-space-md);
            transition: height 1s var(--alias-default-ease);
        }
        &__img-wrapper {
            width: 100%;
            height: var(--service-img-height);
            overflow: hidden;
            border-radius: 1rem;
            padding-bottom: var(--r-space-md);
            transition: transform .6s var(--alias-default-ease);
        }
        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
</style>
