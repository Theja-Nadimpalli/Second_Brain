export function random(len :number){

    let options = "qwertyuioplkjhgfdsa12345zxcvbnm"
    let size = options.length
    let ans =""
    for(let i=0;i<len;i++){
       ans += options[Math.floor(Math.random() * size)]
    }

    return ans
}