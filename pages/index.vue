<template>
    <div class="wrapper">
        <main class="main">
            <div ref="holder" id="holder" :style="{top:holderPos.y+holderPos.height+5+'px', width:holderPos.width+'px'}"></div>

            <header class="main__header">
                <div class="header__container header">
                    <div class="header__title">
                        Добавление товара
                    </div>
                    <div class="header__combobox combobox">
                        <ComboBox ref="combobox" @click-item="clickItemSort" class="combobox__button-sort"/>
                    </div>
                </div>
            </header>

            <section class="products">
                
                <client-only>
                    <div class="products__container">
                        <ProductsControl class="products__control"/>
                        <ProductsView :products="products" class="products__view"/>
                    </div>
                </client-only>

            </section>
        </main>
    </div>
</template>

<script>
export default {
    name: 'index',
    
    data(){
        return {
            products:[],
            holderPos:{x:0, y:0}
        }
    },

    created(){
        if(process.browser){
            const productsData = sessionStorage.getItem('products');
            if(productsData){
                this.products = [];
                this.products = JSON.parse(productsData);
            }
        }
    },

    mounted(){
        const bound = this.$refs.combobox.$el.getBoundingClientRect();
        this.holderPos = {x:bound.x, y:bound.y, width:bound.width, height:bound.height}
    },

    async asyncData(){

        const response = await fetch(`${process.env.fakeapiUrl}/products?offset=0&limit=10`);
        if (!response.ok) {
            const message = `An error has occurred into 'asyncData': ${response.status}`;
            throw new Error(message);
        }
        const products = await response.json();

        return { products }
    },

    methods:{

        clickItemSort(id){
            switch(id) {
                case 0:
                    this.products.sort((a,b) => {return a.price - b.price});
                    break;
                case 1:
                    this.products.sort((a,b) => {return b.price - a.price});
                    break;
                case 2:
                    this.products.sort((a, b) => a.title.localeCompare(b.title))
                    break;
            }
        }
    }
}
</script>

<style lang="scss">
    @import '~assets/scss/main';
</style>


 
 