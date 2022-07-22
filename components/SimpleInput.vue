<template>
    <div class="input__container">
        <input ref="input" :type="required.type" name="input" @input="change" :placeholder="placeholder">
        <div v-if="isErr" class="err">{{messageErr}}</div>
    </div>
</template>

<script>
export default {
    props:['placeholder', 'required', 'messageErr'],
    data(){
        return{
            isErr:false
        }
    },
    methods:{
        change(){
            this.$emit('change');
        },
        getValue(){
            return this.$refs.input.value;
        },
        showError(){
            this.isErr = true;
        },
        hideError(){
            this.isErr = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .input__container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 32px;
        background: #FFFEFB;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
        border-radius: 4px;

        input {
            display: flex;
            font-family: 'Sans Pro Regular';
            font-size: 12px;
            width: inherit;     
            height: inherit;
            border-radius: inherit;
            padding: 8px 14px;
            
            color: #3F3F3F;
        }

        ::placeholder {
            color: #B4B4B4;
            font-size: 12px;
        }

        .err {
            display: flex;
            font-family: 'Sans Pro Regular';
            font-size: 10px;
            margin-top: 5px;
            
            color: red;
        }

    }
</style>