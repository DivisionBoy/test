<template>
    <div class="textarea__container">
        <textarea ref="textarea" :placeholder="placeholder"></textarea>
    </div>
</template>

<script>
export default {
    props:['placeholder'],
    methods:{
        getValue(){
            return this.$refs.textarea.value;
        },
    }
}
</script>

<style lang="scss" scoped>
    .textarea__container {
        display: flex;
        width: 100%;
        height: 108px;
        background: #FFFEFB;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 4px;

        textarea {
            font-family: 'Sans Pro Regular';
            font-size: 12px;
            width: inherit;     
            height: inherit;
            border-radius: inherit;
            padding: 8px 14px;
            resize: none;

            color: #3F3F3F;
            
        }
        ::placeholder {
            color: #B4B4B4;
            font-size: 12px;
        }
        

    }
</style>