<template>
    <div>
        <div class="view__container">
            <Card ref="cards" class="view__card" v-for="(product, i) in products" :key="product.id"
                :id='i'
                :product='product'
                @delete='deleteCard'
            />
        </div>

    </div>
</template>

<script>
import gsap from 'gsap';

export default {
    props:['products'],
    mounted(){

        for(let [i, card] of this.$refs.cards.entries()){
            gsap.set(card.$el, {opacity:0, top:500});
            gsap.to(card.$el, {duration:1, delay:0.1*i, opacity:1, top:0, ease:'back'});
        }
    
    },

    methods:{
        addCard(card){
            this.products.unshift(card);

            this.$nextTick(()=>{
                gsap.to(this.$refs.cards[this.$refs.cards.length-1].$el, {duration:1, opacity:1, top:0, ease:'back'});
            });
            
            this.updateSession();

        },
        deleteCard(id){
            this.products.splice(id, 1);

            this.updateSession();
        },
        updateSession(){
            const prod = JSON.stringify(this.products);
            sessionStorage.setItem('products', prod);
        }
    },

    watch: {
        dataCard (newState, oldState) {
            this.addCard(newState);
        }
    },
    computed: {
        dataCard () {
            return this.$store.getters['data/dataCard'];
        }
    }
}
</script>

<style lang="scss" scoped>
    .view__container{
        display: grid;
        position: relative;
        width: 100%;
        height: 100%;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-template-rows: repeat( auto-fit, 423px);
        grid-column-gap: 16px;
        grid-row-gap: 16px;

        justify-items: center;

        @media (max-width: 420px) {
           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .view__card {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width:100%; 
            height:423px;

            opacity: 0;
            top:500px;
        }
    }
</style>