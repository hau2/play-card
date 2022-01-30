const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var playerCard = $('#my-cards');
var botCard = $('#bot-cards');
var btnPlay = $('.btn-play');
var actionElement = $('#action');
var btnRut = null;
var btnDan = null;
var botMessage = $('#bot-message > span');
var playerMessage =  $('#player-message > span');
var botArea = $('.bot-area');
var playerArea = $('.player-area');
var gameResultText = $('.game-result');
class Player {
    constructor(type = 'player'){
        this.type = type;
    }

    type = 'player';
    point = 0;
    numOfCards = 0;
    numOfAces = 0;
    imgUrls = [];
    finish = false;

    reset(){
        this.point = 0;
        this.numOfCards = 0;
        this.numOfAces = 0;
        this.imgUrls = [];
        this.finish = false;
    }

    addBehindCard(){
        // bài úp
        let htmls = `<div>
            <img class="card ${this.type}" src="./img/behind-card.png" alt=""></div> `
        if(this.type != 'bot'){
            playerCard.innerHTML += htmls;
        } else {
            botCard.innerHTML += htmls;
        }
        this.showCard();
    }

    addCard() {
        game.addCard(this);
    }

    innitCard(){
        this.point = 0;
        for(let i=0; i<2; i++){
            this.addCard();
        }
    }

    showAllCard(){
        $$(`.card.${this.type}`).forEach((element, index) => {
            // nếu mở rồi thì thôi
            if(!element.classList.contains('open')){
                element.src = this.imgUrls[index];
                element.classList.add('open');
            }
        });
    }

    showCard(){
        if(this.type == 'bot') return;
        $$(`.card.${this.type}`).forEach((element, index) => {
            // nếu mở rồi thì thôi
            if(!element.classList.contains('open')){
                element.addEventListener('click', () => {
                    element.src = this.imgUrls[index];
                    element.classList.add('open');
                })
            }
        })
    }

    finishAddCard(){
        this.finish = true;
        game.botCheck();
    }

    getResult(){
        if(this.numOfCards == 2 && this.point == 11 && this.numOfAces>0) return 44; // xì dách
        else if(this.numOfCards ==5 && this.point<=21) return 55; // ngủ linh
        else if(this.numOfAces == 2 && this.numOfCards == 2){
            return 66; // xì bàng
        } else if(this.numOfAces>0 && this.numOfCards == 2) {
            return this.point + 10;
        } else if(this.numOfAces>0 && this.numOfCards >= 3){
            let value1 =  this.point + this.numOfAces*9;
            let value2 = this.point + this.numOfAces*10;
            let value3 = this.point;
            let arrayValue = [];
            arrayValue.push(value1,value2,value3);

            // điểm nào > 21 sẽ cho bằng 0
            for(let i=0; i<3; i++){
                if(arrayValue[i] > 21) arrayValue[i] = 0;
            }

            // tìm điểm lớn nhất
            let max = arrayValue[0];
            for(let i=0; i<3; i++){
                if(arrayValue[i]>max) max = arrayValue[i];
            }
            // return (value2 > value1 && value2<=21) ? value2 : value1;

            // nếu cả 3 value đều quá 21 điểm thì sẽ lấy điểm của ban đầu
            return max == 0 ? this.point : max;
        } if(this.point > 21){
            return 77;
        } else return this.point;
    }

    getResultText(){
        switch(this.getResult()){
            case 44: return `Xì dách`;
            case 55: return `Ngũ linh`;
            case 66: return `Xì bàng`;
            case 77: return `Quắt :((`;
            default: return `${this.getResult()} điểm`;
        }
    }

}
let bot = new Player('bot');
let player = new Player('player');
var listCardsClone = [];
var listNumberRandom = [0,1,2,3,4,5,6,7,8,9];
var listCards = [
    {
        value: 7,
        imgUrl: [
            "./img/PNG-cards-1.3/7_of_clubs.png",
            "./img/PNG-cards-1.3/7_of_diamonds.png",
            "./img/PNG-cards-1.3/7_of_hearts.png",
            "./img/PNG-cards-1.3/7_of_spades.png",
        ]
    },
    {
        value: 8,
        imgUrl: [
            "./img/PNG-cards-1.3/8_of_clubs.png",
            "./img/PNG-cards-1.3/8_of_diamonds.png",
            "./img/PNG-cards-1.3/8_of_hearts.png",
            "./img/PNG-cards-1.3/8_of_spades.png",
        ]
    },
    {
        value: 9,
        imgUrl: [
            "./img/PNG-cards-1.3/9_of_clubs.png",
            "./img/PNG-cards-1.3/9_of_diamonds.png",
            "./img/PNG-cards-1.3/9_of_hearts.png",
            "./img/PNG-cards-1.3/9_of_spades.png",
        ]
    },
    {
        value: 10,
        imgUrl: [
            "./img/PNG-cards-1.3/10_of_clubs.png",
            "./img/PNG-cards-1.3/10_of_diamonds.png",
            "./img/PNG-cards-1.3/10_of_hearts.png",
            "./img/PNG-cards-1.3/10_of_spades.png",
            "./img/PNG-cards-1.3/jack_of_clubs2.png",
            "./img/PNG-cards-1.3/jack_of_diamonds2.png",
            "./img/PNG-cards-1.3/jack_of_hearts2.png",
            "./img/PNG-cards-1.3/jack_of_spades2.png",
            "./img/PNG-cards-1.3/king_of_clubs2.png",
            "./img/PNG-cards-1.3/king_of_diamonds2.png",
            "./img/PNG-cards-1.3/king_of_hearts2.png",
            "./img/PNG-cards-1.3/king_of_spades2.png",
            "./img/PNG-cards-1.3/queen_of_clubs2.png",
            "./img/PNG-cards-1.3/queen_of_diamonds2.png",
            "./img/PNG-cards-1.3/queen_of_hearts2.png",
            "./img/PNG-cards-1.3/queen_of_spades2.png",
        ]
    },
    {
        value: 1,
        imgUrl: [
            "./img/PNG-cards-1.3/ace_of_clubs.png",
            "./img/PNG-cards-1.3/ace_of_diamonds.png",
            "./img/PNG-cards-1.3/ace_of_hearts.png",
            "./img/PNG-cards-1.3/ace_of_spades.png",
        ]
    },
    {
        value: 2,
        imgUrl: [
            "./img/PNG-cards-1.3/2_of_clubs.png",
            "./img/PNG-cards-1.3/2_of_diamonds.png",
            "./img/PNG-cards-1.3/2_of_hearts.png",
            "./img/PNG-cards-1.3/2_of_spades.png",
        ]
    },
    {
        value: 3,
        imgUrl: [
            "./img/PNG-cards-1.3/3_of_clubs.png",
            "./img/PNG-cards-1.3/3_of_diamonds.png",
            "./img/PNG-cards-1.3/3_of_hearts.png",
            "./img/PNG-cards-1.3/3_of_spades.png",
        ]
    },
    {
        value: 4,
        imgUrl: [
            "./img/PNG-cards-1.3/4_of_clubs.png",
            "./img/PNG-cards-1.3/4_of_diamonds.png",
            "./img/PNG-cards-1.3/4_of_hearts.png",
            "./img/PNG-cards-1.3/4_of_spades.png",
        ]
    },
    {
        value: 5,
        imgUrl: [
            "./img/PNG-cards-1.3/5_of_clubs.png",
            "./img/PNG-cards-1.3/5_of_diamonds.png",
            "./img/PNG-cards-1.3/5_of_hearts.png",
            "./img/PNG-cards-1.3/5_of_spades.png",
        ]
    },
    {
        value: 6,
        imgUrl: [
            "./img/PNG-cards-1.3/6_of_clubs.png",
            "./img/PNG-cards-1.3/6_of_diamonds.png",
            "./img/PNG-cards-1.3/6_of_hearts.png",
            "./img/PNG-cards-1.3/6_of_spades.png",
        ]
    }
];
const game = {

    // có nên rút tiếp không
    isAddCard: function () {
        console.log('Đang phân vân');
      return (Math.floor(Math.random() * 2) + 0) === 0;
    },

    reset: function () {
        //xoá hết thuộc tính của player và bot
        player.reset();
        bot.reset();

        // ẩn thông báo điểm
        botMessage.hidden = true;
        playerMessage.hidden = true;

        // xoá hết bài
        playerCard.innerHTML = ``;
        botCard.innerHTML = ``;

        //clone cards để khỏi bị tham chiếu
        listCardsClone = JSON.parse(JSON.stringify(listCards));

        // random số
        listNumberRandom = [0,1,2,3,4,5,6,7,8,9];

        //xoá thông báo thắng
        gameResultText.innerHTML = ``;
    },

    addCard: function (player) {
        if(player.numOfCards >=5) {
            alert('Rút 5 lá đủ rồi bạn ei');
            return;
        }
        let randomNumber = game.random();
        let card = listCardsClone[randomNumber];
        let numOfImage = card.imgUrl.length;
        let indexUrl = game.randomLinkImg(numOfImage);
        player.imgUrls.push(card.imgUrl[indexUrl]);

        // xoá lá bài đã được chọn khỏi list
        listCardsClone[randomNumber].imgUrl.splice(indexUrl,1);
        if(card.imgUrl.length == 0){
            listCardsClone.splice(randomNumber,1);
            // xoá luôn số random khỏi listRandomNumber
            let index = listNumberRandom.indexOf(randomNumber);
            listNumberRandom.splice(index ,1);
        }
        // console.log('OK');
        // console.log(listCardsClone);
        if(card.value == 1) {
            player.numOfAces++; 
            console.log('Có xì');
        }
        player.point += card.value;
        player.addBehindCard();
        player.numOfCards++;
        console.log(card.value);
    },
    
    changePlayer: async function () {
        let numOfCards = bot.numOfCards;
        let point = bot.point;
        console.log(numOfCards);
        console.log(point);

        // tính điểm và có nên bốc tiếp không
        while(bot.getResult()< 19){
            if(bot.getResult() >= 16){
                choose = this.isAddCard();
                console.log(choose);
                if(choose){
                    bot.addCard();
                    point = bot.point;
                    console.log("Add " + point);
                    numOfCards++;
                    if(bot.getResult()>=21) break;
                } else break;
            }else {
                bot.addCard();
                point = bot.point;
                numOfCards++;
                if(point>=21) break;
            }

            // if(point<16){
            //     console.log("nho hon 16");
            //     point += await game.botAutoAddCard();
            //     numOfCards++;
            // } else if(point <= 18 && point >= 16){
            //     console.log("16 - 18");
            //     if(this.isAddCard()){
            //         point += await game.botAutoAddCard();
            //         numOfCards++;
            //     } else break;          
            // }
            // else {
            //     console.log("Tren 18");
            //     break;
            // }
        }
    },

    // async botAutoAddCard(){
    //     return setTimeout(()=>{
    //         bot.addCard();
    //         return bot.point;
    //         }, 1000)
    // },

    botCheck(){
        console.log();
        btnRut.hidden = true;
        btnDan.hidden = true;
        this.changePlayer();
        this.finishGame(2000);
    },

    finishGame: function (ms) {
        setTimeout(()=>{
            console.log('Kết thúc','bot:', bot.point, 'player', player.point);
            bot.showAllCard();
            player.showAllCard();
            let winner = this.getWiner();
            console.log(winner);
            let resultMess = '';
            let bgMess = '';
            let boderColor = '';
            if(winner.type == 'bot'){
                // nếu player dưới 15 và bot không có xì dách, xì bàng
                if(player.getResult() < 15 && bot.getResult() != 44 && bot.getResult() != 66)
                resultMess = 'Bạn thua vì < 15';
                else resultMess = 'Bạn thua';
                bgMess = '#8a160e';
                boderColor = 'red';
            } else if (winner.type == 'player') {
                resultMess = 'Bạn thắng';
                bgMess = '#1728bd';
                boderColor = 'blue';
            } else {
                resultMess = 'Hoà';
                bgMess = '#997a07';
                boderColor = '#c7de15';
            }

            // hiển thị và fomart thông báo thắng
            let htmls = `<span>${resultMess}</span>`;
            gameResultText.innerHTML = htmls;
            gameResultText.childNodes[0].style.backgroundColor = bgMess;
            gameResultText.childNodes[0].style.borderColor = boderColor;
            botMessage.hidden = false;
            playerMessage.hidden = false;
            botMessage.innerText = bot.getResultText();
            playerMessage.innerText = player.getResultText();
            btnPlay.hidden = false;
        },ms);
    },


    random: function(){
        return Math.floor(Math.random() * listNumberRandom.length) + 0;
    },

    randomLinkImg: function(number){
        return Math.floor(Math.random() * number) + 0;
    },


    openCard: function(card){
        this.style.src = "";
    },


    start: function(){
        this.reset();
        player.innitCard();
        bot.innitCard();

        //ẩn nút play
        btnPlay.hidden = true;
        btnPlay.innerText = 'Chơi lại';

        // hiển thị thêm nút action
        actionElement.innerHTML = `<button class="btn-action btn-dan" onclick = player.finishAddCard()>Dằn</button>
        <button class="btn-action btn-rut" onclick = player.addCard();>Rút</button>`;

        // lấy ra btn để thao tác
        btnRut = $('.btn-rut');
        btnDan = $('.btn-dan');

        // xì dách rồi thì thắng luôn
        if(this.hasWiner()){
            console.log('Da co nguoi thang');
            game.finishGame(0);
            btnRut.hidden = true;
            btnDan.hidden = true;
        }
    
    
    },

    hasWiner: function () {
        // check xem có người thắng trước không
        return player.getResult() == 44 || player.getResult() == 66 ||
        bot.getResult() == 44 || bot.getResult() == 66;
    },

    getWiner: function () { //tìm ra người thắng
        let botResult = bot.getResult();
        let playerResult = player.getResult();

        if(playerResult <= 15) return bot;

        if(botResult == 44 || botResult == 66){
            return bot;
        } else if(botResult == 55 && playerResult == 55){
            return bot.point > player.point ? bot : player;
        } else if(botResult < 77 && playerResult < 77) {
            if(botResult>playerResult) return bot;
            else if(botResult < playerResult) return player; 
            else return 'Hoà';
        } else {
            if(botResult==77 && playerResult== 77 || botResult == playerResult) return 'Hoà';
            else if(botResult < 77 && playerResult== 77) return bot;
            else if(botResult==77 && playerResult < 77) return player;
            else return botResult > playerResult ? bot : player;
        }
    }

}