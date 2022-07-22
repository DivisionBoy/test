<template>
    <div>
        <div class="button" @click="onClickButton" @mouseenter="onOver" @mouseleave="onOut">
            <div class="button__container">
                <div class="button__label" :style="{color:labelColor}">
                    По умолчанию
                </div>
                <div class="button__ico">
                    <Arrow />
                </div>
            </div>
        </div>
        <List v-show="isShowList" v-click-outside="hideList" @click-item="clickItem" ref="list" class="list" :items='items'/>

    </div>
</template>

<script>
import Arrow from '/icons/Arrow';

export default {
    components:{Arrow},
    data(){
        return{
            items:['Сначала недорогие', 'Сначала дорогие', 'По наименованию'],
            isShowList: false,
            labelColor: '#B4B4B4'
        }
    },
    methods:{
        onClickButton(){
            this.isShowList = true;
            this.labelColor = '#3d3d3d';
            this.$root.$el.querySelector('#holder').append(this.$refs.list.$el);
        },
        hideList(){
            this.labelColor = '#B4B4B4';
            this.isShowList = false;
        },
        onOver(){
            this.labelColor = '#3d3d3d';
        },
        onOut(){
            if(!this.isShowList){
                this.labelColor = '#B4B4B4';
            }
        },
        clickItem(id){
            this.$emit('click-item', id);
        }
    }
}
</script>

<style lang="scss" scoped>

    .list {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100px;
        background: #FFFEFB;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 4px;
    }
    
  .button {
    display: flex;
    justify-content: center;
    width: 120px;
    height: 36px;
    background: #FFFEFB;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    cursor: pointer;
    color: #B4B4B4;

    &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 5px;

      .button__label {
        display: flex;
        font-family: 'Sans Pro Regular';
        font-weight: 400;
        font-size: 12px;
        line-height: 15px;
        color: inherit;
      }
      .button__ico {
        display: flex;
      }
    }
  }

</style>