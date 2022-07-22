export const state = () => ({
    dataCard: {},
})

export const mutations = {
    updateDataCard(state, data){
        state.dataCard = data;
    }
}

export const actions = {
    setDataCard(ctx, data){
        ctx.commit('updateDataCard', data);
    }
};

export const getters = {
    dataCard(state){
        return state.dataCard;
    }
};