const formatNumber = (number:number, separater: string = ',') => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separater);
}

export default formatNumber