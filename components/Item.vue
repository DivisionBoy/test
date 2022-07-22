<template>
    <div>
        <div class="item__container" @click="click">
            {{name}}
        </div>
    </div>
</template>

<script>
export default {
    props:['id', 'name'],
    methods:{
        click(){
            this.$emit('click', this.id);
        }
    }
}
</script>

<style lang="scss" scoped>
    .item__container{
        display: flex;
        width: 100%;
        height: 100%;
        padding-left: 5px;
        align-items: center;
        background: #fff;
        font-family: 'Sans Pro Regular';
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: #2e2e2e;
        border-radius: 4px;

        &:hover {
            background: rgb(233, 233, 233);
        }
    }
</style>