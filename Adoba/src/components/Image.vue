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
            return `/${this.image.src}`
        }
    }
}
</script>

<template>
    <div class="image">
        <div class="image__img-wrapper">
            <img :src="imgSrc" :alt="image.alt" class="image__img" loading="lazy">
        </div>
    </div>
</template>

<style scoped lang="scss">
    .image {
        grid-column: span 1;
        grid-row: span 1;

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
        }
        &--col-2 {
            grid-column: span 2;
        }
        &--row-2 {
            grid-row: span 2;
        }
    }
</style>