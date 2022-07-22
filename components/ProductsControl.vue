<template>
    <div>
        <div class="control">
            <div class="control__container">
                <div class="control__input">
                    
                    <ControlInput ref="controlName" type="input" :required="{validation:true, check:'', type:'text'}" 
                    placeholder="Введите наименование товара" @change="checkValidation">Наименование товара</ControlInput>

                    <ControlInput ref="controlDescription" type="textarea" :required="{validation:false, check:'', type:'text'}" 
                    placeholder="Введите описание товара">Описание товара</ControlInput>

                    <ControlInput ref="controlUrl" type="input" :required="{validation:true, check:'url', type:'text'}" 
                    placeholder="Ссылка на изображение товара" @change="checkValidation">Введите ссылку</ControlInput>

                    <ControlInput ref="controlPrice" type="input" :required="{validation:true, check:'', type:'number'}" 
                    placeholder="Цена товара" @change="checkValidation">Введите цену</ControlInput>

                </div>
                <div class="control__button button">
                    <SingleButton :disabled="!isActivateButton" :style="{pointerEvents: isActivateButton ? '' : 'none'}" @click.native="clickAddCard" class="button__add">Добавить товар</SingleButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Util } from '/utils/Util';

export default {
    data(){
        return {
            isActivateButton: false
        }
    },
    methods:{
        clickAddCard(){

            let dataCard = {
                id:Util.uid,
                title:this.$refs.controlName.getValue(), 
                description:this.$refs.controlDescription.getValue(), 
                images:[this.$refs.controlUrl.getValue()], 
                price:this.$refs.controlPrice.getValue()
            }
            
            /*this.$emit('add-card', dataCard);*/

            this.$store.dispatch('data/setDataCard', dataCard);
        },
        checkValidation(){
            let arrErr = [];

            for (let [key, comp] of Object.entries(this.$refs)) {
                if (/^control/.test(key)) {      
                    if(comp){
                        let value = comp.getValue();
                        let required = comp.required;

                        if(required.validation && required.check === 'url'){
                            if(value){
                                if(Util.isValidURL(value)){
                                    comp.hideError();
                                }else{
                                    arrErr.push({comp:comp, err:'url'})
                                }
                            }else{
                                arrErr.push({comp:comp, err:'empty'})
                            }
                            
                        }else if(required.validation){
                            if(value){
                                comp.hideError();
                            }else{
                                arrErr.push({comp:comp, err:'empty'});
                            }
                        }
                    }
                }
            }
            
            if(arrErr.length > 0){
                this.isActivateButton = false;
                for(let i = 0; i < arrErr.length; i++){
                    arrErr[i].comp.showError(arrErr[i].err);
                }
            }else{
                this.isActivateButton = true;
            }

        }
    }
    
}
</script>

<style lang="scss" scoped>
    
.control {
    display: flex;
    width: 100%;

    &__container {
        display: flex;
        flex-direction: column;

        width: 100%;

        .control__input {
            display: flex;
            flex-direction: column;
            row-gap: 16px;
            width: 100%;
            margin-bottom: 30px;

        }
        .button {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            width: 100%;
            height: 100%;

            &__add {
                display: flex;
                width: 100%;
            }
        }
    }
}
</style>
