export const formatPrice = price => {
    if((price / 1000000) >= 1){
      return Math.floor(price / 1000000) + 'M '
    }else if(price / 1000 >= 1){
      return Math.floor(price / 1000) + 'K '
    }else{
      return price;
    }
}


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


export const formatDate = (date) => {
    const month = months[date.getMonth()];
    const day = date.getDate();

    let ext = 'th'

    if(day === 1){
      ext = 'st'
    }else if(day === 2){
      ext = 'nd'
    }else if(day === 3){
      ext = 'rd'
    }

    return `${day+ext} ${month} ${date.getFullYear()}`;
}