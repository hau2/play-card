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

class Player {
    constructor(type = 'player'){
        this.type = type;
    }

    type = 'player';
    point = 0;
    numOfCards = 0;
    hasAce = false;
    imgUrls = [];
    finish = false;

    reset(){
        this.point = 0;
        this.numOfCards = 0;
        this.hasAce = false;
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
        game.finishGame();
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
        player.reset();
        bot.reset();
        botMessage.innerHTML = ``;
        playerMessage.innerHTML = ``;
        playerCard.innerHTML = ``;
        botCard.innerHTML = ``;
        listCardsClone = JSON.parse(JSON.stringify(listCards));
        listNumberRandom = [0,1,2,3,4,5,6,7,8,9];
    },

    addCard: function (player) {
        if(this.numOfCards >=5) {
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
        while(numOfCards <=4 && point<19){
            if(point >= 16){
                choose = this.isAddCard();
                console.log(choose);
                if(choose){
                    bot.addCard();
                    point = bot.point;
                    console.log("Add " + point);
                    numOfCards++;
                    if(point>=21) break;
                }
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

    finishGame(){
        console.log();
        btnRut.hidden = true;
        btnDan.hidden = true;
        this.changePlayer();
        setTimeout(()=>{
            console.log('Kết thúc','bot:', bot.point, 'player', player.point);
            bot.showAllCard();
            player.showAllCard();
            botMessage.innerText = `${bot.point} điểm`;
            playerMessage.innerText = `${player.point} điểm`;
            btnPlay.hidden = false;
        },2000);
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
    btnPlay.hidden = true;
    btnPlay.innerText = 'Chơi lại';
    actionElement.innerHTML = `<button class="btn-action btn-dan" onclick = player.finishAddCard()>Dằn</button>
    <button class="btn-action btn-rut" onclick = player.addCard();>Rút</button>`;
    btnRut = $('.btn-rut');
    btnDan = $('.btn-dan');
    },

}