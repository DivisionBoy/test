<template>
    <div>
        <div class="button" :style="{background:disabled ? '#EEEEEE' : '#7BAE73', color:disabled ? '#B4B4B4' : '#FFFFFF'}">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props:['disabled']
}
</script>

<style lang="scss" scoped>
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 36px;
        background: #EEEEEE;
        border-radius: 10px;
        //
        font-family: 'Sans Pro SemiBold';
        font-size: 12px;
        line-height: 15px;

        text-align: center;
        letter-spacing: -0.02em;
        cursor: pointer;

        color: #B4B4B4;
    }
</style>