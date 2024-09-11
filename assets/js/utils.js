const utils = {
    deleteInState(value, id){
        return value.filter(item => item.id !== id);
    },
}

export { utils }