const cardsBox = document.getElementById('cards-box')
let cardList = []
// 生成卡片
for (let index = 0; index < 8; index++) {
    const color = randomHexColor()
    cardList.push({
        color:color,
        order:Math.random()
    })
    cardList.push({
        color:color,
        order:Math.random()
    })
}

function randomHexColor() { //随机生成十六进制颜色
    var hex = Math.floor(Math.random() * 16777216).toString(16); //生成ffffff以内16进制数
    while (hex.length < 6) { //while循环判断hex位数，少于6位前面加0凑够6位
     hex = '0' + hex;
    }
    return '#' + hex; //返回‘#'开头16进制颜色
}
// 打乱卡片
var compare = function (obj1, obj2) {
    var val1 = obj1.order;
    var val2 = obj2.order;
    if (val1 < val2) {
        return -1;
    } else{
        return 1;
    }           
}
cardList.sort(compare)
// 记录上次翻到的卡牌
let lastFlip = {
    color:'',
    row:'',
    col:''
}
// 当前是否有奇数张卡牌被翻开
let flipOdd = false
// let flipStates = [
//     [false,false,false,false,],
//     [false,false,false,false,],
//     [false,false,false,false,],
//     [false,false,false,false,]
// ]
let flipCount = 0
cardList.forEach((item,index)=>{
    const row = Math.floor(index/4)
    const col = index%4
    let cardsRow
    if(col === 0){
        cardsRow = document.createElement('div')
        cardsRow.className = 'cards-row'
        cardsRow.id = `row-${row}`
        cardsBox.appendChild(cardsRow)
    }else{
        cardsRow = document.getElementById(`row-${row}`)
    }
    const card = document.createElement('div')
    card.className = 'card unflipped'
    card.id = `${row}-${col}`
    card.style = `background-color:${item.color} ;`
    card.color = `${item.color}`
    card.addEventListener('click',(e)=>cardClick(e))
    cardsRow.appendChild(card)
})
// 酒馆灯光
const outerContainer = document.getElementById('outer-container')
const title = document.getElementById('title')
setInterval(()=>{
    const color1 = randomHexColor()
    const color2 = randomHexColor()
    outerContainer.style = `background-image: repeating-linear-gradient(45deg, ${color1}, yellow 10%);`
    title.style = `background-image: repeating-linear-gradient(45deg, ${color1}, yellow 10%);`
},500)

// 点击事件
function cardClick(e){
    console.log(e.target.id)
    console.log(e.target.className)
    const row = e.target.id.split('-')[0]
    const col = e.target.id.split('-')[1]
    if(e.target.className === 'card unflipped'){
        if(flipOdd){
            flipOdd = false
            if(e.target.color === lastFlip.color){
                // 卡牌匹配成功
                console.log('匹配成功')
                // flipStates[row][col] = true
                flipCount += 1
                lastFlip = {
                    color:'',
                    row:'',
                    col:''
                }
                e.target.className = 'card'
            }else{
                // 卡牌匹配失败
                console.log('匹配失败')
                const lastCardId = `${lastFlip.row}-${lastFlip.col}`
                lastCard = document.getElementById(lastCardId)
                console.log(lastCardId)
                lastCard.className = 'card unflipped'
                flipCount -= 1
                lastFlip = {
                    color:'',
                    row:'',
                    col:''
                }
                // 展示卡牌颜色
                e.target.className = 'card'
                setTimeout(()=>{
                    e.target.className = 'card unflipped'
                },500)
            }
        }else{
            lastFlip = {
                color:e.target.color,
                row:row,
                col:col
            }
            e.target.className = 'card'
            flipCount += 1
            flipOdd = true
        }
    }
    if(flipCount === 16){
        console.log('游戏成功')
        const title = document.getElementById('title')
        title.innerText = '你真棒！'
    }
}