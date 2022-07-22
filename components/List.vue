<template>
    <div>
        <Item class="item" v-for="(item, i) in items" :key="item+i"
            :id='i'
            :name='item'
            @click="clickItem"
        />
    </div>
</template>

<script>
export default {
    props:['items'],
    methods:{
        clickItem(id){
            this.$emit('click-item', id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .item {
        display: flex;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

</style>