<script>
export default {
    props: {
        image: {
            title: String,
            src: String,
            alt: String,
        }
    },
    computed: {
        imgSrc() {
            return `${this.image.src}`
        }
    }
}
</script>

<template>
    <div class="image" data-cursor-text="Voir">
        <div class="image__img-wrapper">
            <img :src="imgSrc" :alt="image.alt" class="image__img" loading="lazy">
        </div>
    </div>
</template>

<style scoped lang="scss">
    .image {
        $root:&;
        grid-column: span 1;
        grid-row: span 1;

        &:hover {
            #{$root}__img {
                transform: scale(1);
            }
        }

        &--large {
            grid-column: 1/-1;
        }
        &__img-wrapper {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        &__img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            display: block;
            transition: transform 1s var(--alias-default-ease); 
            transform: scale(1.1);
            transform-origin: center;
        }
        &--col-2 {
            grid-column: span 2;
        }
        &--row-2 {
            grid-row: span 2;
        }
    }
</style>