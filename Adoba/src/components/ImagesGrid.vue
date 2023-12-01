<script>
import Image from './Image.vue'

export default {
    components: {
        Image
    },
    props: {
        list: {
            type: Array
        },
    },
    methods: {
        getImgGridClass(col, row){
            return `image--col-${col} image--col-${row}`
        }
    }
}
</script>

<template>
    <div class="image-grid__list-wrapper" data-cursor="-neutral">
        <Image v-for="(image, index) in list" 
            :key="index"
            :image="image"
            :class="getImgGridClass(image.column, image.row)"
        ></Image>
    </div>
</template>

<style scoped lang="scss">
    .image-grid {
        &__list-wrapper {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: var(--r-space-sm);
            row-gap: var(--r-space-sm);
        }
    }
</style>