var emoji_arr = new Array("😀","😃","😄","😁","😆","🤣","🙃","😉","😊","🥰","😍","🤩","😘","😗","☺","😚","😋","🤑","🤭","🥳","😎","🙊");
var send_contnet_arr = new Array("球~王【yu555.vip】","存❤送【yu999.vip】");
function getSendCotnet(arr){
    let index = Math.floor((Math.random()*arr.length));
    return arr[index];
}


send_c = getSendCotnet(emoji_arr) + getSendCotnet(send_contnet_arr)

console.log(send_c)

