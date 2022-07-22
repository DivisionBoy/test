<template>
    <div class="container">
        <div class="label">

            <slot></slot>

            <div v-if="required.validation" class="dot"></div>
        </div>

        <SimpleInput v-if="type === 'input'" ref="input" :required="required" :messageErr='messageErr' @change="change" :placeholder="placeholder"/>
        <SimpleTextArea v-else ref="textarea" :placeholder="placeholder" />

    </div>
</template>

<script>
export default {
    props:['type', 'placeholder', 'required'],
    data(){
        return{
            messageErr:''
        }
    },
    methods:{
        change(){
            this.$emit('change');
        },
        getValue(){
            return this.type === 'input' ? this.$refs.input.getValue() : this.$refs.textarea.getValue();
        },
        showError(err){
            this.messageErr = '';
            
            if(err == 'empty'){
                this.messageErr = 'Поле является обязательным';
            }else if(err == 'url'){
                this.messageErr = 'Не корректная ссылка';
            }

            this.$refs.input.showError();
            
        },
        hideError(){
            this.$refs.input.hideError();
        }
    }
    
}
</script>

<style lang="scss" scoped>

    .container {
        display: flex;
        flex-direction: column;
        row-gap: 5px;
        width: 100%;

        .label {
            font-family: 'Sans Pro Regular';
            font-size: 10px;
            line-height: 13px;
            letter-spacing: -0.02em;

            color: #49485E;
            /*
            &:after {
                content: '';
                position: absolute;
                width: 4px;
                height: 4px;
                margin-left: 2px;
                border-radius: 50%;
                background-color: #FF8484;
            }
            */

            .dot {
                display: inline-block;
                width: 4px;
                height: 4px;
                margin-left: 2px;
                margin-bottom: 6px;
                border-radius: 50%;
                background-color: #FF8484;
            }
        }
        
    }

</style>
