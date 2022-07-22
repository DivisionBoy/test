<template>
    <div @mouseenter="onOver" @mouseleave="onOut" :style="{pointerEvents: isDisable ? 'none' : ''}">
        <div v-if="isOver" ref="delete" @click="onClickDelete" class="card__delete"><Delete/></div>
        <div ref="card" class="card__container card">
            <div ref="transitionDelete" class="card__transitionDelete"></div>
            <div ref="cardBody" class="card__body body">
                
                <div class="body__image image">
                    <div class="image__container">
                        
                        <img :src="product.images[0]" alt="">
                    </div>
                </div>
                <div class="body__info info">
                    <div class="info__title">{{title}}</div>
                    <div class="info__description">{{description}}</div>
                    <div class="info__price"><span>{{price+' руб.'}}</span></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';
import Delete from '/icons/Delete';

export default {
    components:{Delete},
    props:['id', 'product'],
    data(){
        return {
            isDisable: false,
            isOver: false
        }
    },
    computed: {
        title(){
            let title = this.crop(this.product.title, 50);
            return title;
        },
        description(){
            let description = this.crop(this.product.description, 115);
            return description;
        },
        price(){
            let price = this.product.price.toString().split('.').join("").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return price;
        }
    },

    methods:{
        crop(str, limit){
            return str.length > limit ? str.substring(0, limit) + " ..." : str;
        },
        onOver(){
            this.isOver = true;
            this.$nextTick(()=>{
                gsap.killTweensOf(this.$refs.delete);
                gsap.set(this.$refs.delete, {scale:0});
                gsap.to(this.$refs.delete, {duration:0.5, scale:1, ease:'back'});
            });
            
            gsap.to(this.$el, {duration:0.5, scale:1.05, ease:'back'});

        },
        onOut(){
            gsap.to(this.$refs.delete, {duration:0.3, scale:0, onComplete:()=>{this.isOver = false}});
            gsap.to(this.$el, {duration:0.5, scale:1, ease:'back'});
        },
        onClickDelete(){
            this.isDisable = true;

            this.initTransitionDelete();
            
        },
        initTransitionDelete(){
            gsap.to(this.$refs.transitionDelete, {duration:0.3, height:'100%', onComplete:()=>{this.$refs.cardBody.style.visibility='hidden'}});
            gsap.to(this.$refs.transitionDelete, {duration:0.3, top:'-100%', delay:0.3, onComplete:()=>{this.$emit('delete', this.id);}, ease:'power4'});

        }
    }
}
</script>


<style lang="scss" scoped>
.card__delete {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -10px;
    right: 0px;
    width: 32px;
    height: 32px;
    z-index: 10;
    background: #FF8484;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    cursor: pointer;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-width: 300px;
    max-width: 340px;
    
    border-radius: 4px;
    overflow: hidden;

    @media (max-width: 420px) {
        min-width: 200px;
    }

    &__transitionDelete {
        position: absolute;
        display: flex;
        bottom: 0;
        left: 0;
        width: inherit;
        height: 0%;
        background: #FF8484;
    }
    .body {
        display: flex;
        flex-direction: column;
        width: inherit;
        height: inherit;
        background: #FFFEFB;
        box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04), 0px 6px 10px rgba(0, 0, 0, 0.02);
        
        .image {
            display: flex;
            width: 100%;
            height: 200px;
            justify-content: center;
            align-items: center;

            &__container {
                border-radius: 4px 4px 0 0;
                overflow: hidden;
                display: flex;
                width: inherit;
                height: inherit;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                
            }
        }
        .info {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            row-gap: 16px;
            padding: 16px;

            &__title {
                display: flex;
                font-family: 'Sans Pro SemiBold';
                font-size: 20px;
                line-height: 25px;

                color: #3F3F3F;
            }
            &__description {
                display: flex;
                font-family: 'Sans Pro Regular';
                font-size: 16px;
                line-height: 20px;

                color: #3F3F3F;
            }
            &__price {
                display: flex;
                height: 100%;
                align-items: flex-end;
                font-family: 'Sans Pro SemiBold';
                font-size: 24px;
                line-height: 30px;

                color: #3F3F3F;
            }
        }
    
    }
}

</style>
