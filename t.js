var emoji_arr = new Array("ð","ð","ð","ð","ð","ð¤£","ð","ð","ð","ð¥°","ð","ð¤©","ð","ð","âº","ð","ð","ð¤","ð¤­","ð¥³","ð","ð");
var send_contnet_arr = new Array("ç~çãyu555.vipã","å­â¤éãyu999.vipã");
function getSendCotnet(arr){
    let index = Math.floor((Math.random()*arr.length));
    return arr[index];
}


send_c = getSendCotnet(emoji_arr) + getSendCotnet(send_contnet_arr)

console.log(send_c)

