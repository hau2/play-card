const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


var myCard = $('#my-cards');
var botCard = $('#bot-cards');
var btnPlay = $('.btn-play');
var actionElement = $('#action');
var btnRut = $('.btn-rut');
var btnDan = $('.btn-dan');

class Player {
    constructor(){
    }

    point = 0;
    numOfCards = 0;

}
let bot = new Player();
let player = new Player();

const game = {

    cards: [
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
        },
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
    ],

    userShowCard: function(){
        $$('.card.user').forEach(element => {
            element.addEventListener('click',()=>{
                if(!element.classList.contains('open')){
                    let randomNumber = this.random();
                    let card = this.cards[randomNumber];
                    let numOfImage = card.imgUrl.length;
                    let indexUrl = this.randomLinkImg(numOfImage);
                    player.point += randomNumber + 1;
                    console.log(player.point);
                    // nếu mở rồi thì thôi
                
                    element.src = card.imgUrl[indexUrl] +'';
                    element.classList.add('open');
                }
            })
        });
    },


    random: function(){
        return Math.floor(Math.random() * 10) + 0;
    },

    randomLinkImg: function(number){
        return Math.floor(Math.random() * number) + 0;
    },


    openCard: function(card){
        this.style.src = "";
    },


    start: function(){
        userHtmls = `<div>
        <img class="card user" src="./img/behind-card.png" alt="">
    </div><div>
    <img class="card user" src="./img/behind-card.png" alt="">
    </div> `
        botHtmmls = `<div>
        <img class="card" src="./img/behind-card.png" alt="">
    </div><div>
    <img class="card" src="./img/behind-card.png" alt="">
    </div> `
    myCard.innerHTML = userHtmls;
    botCard.innerHTML = botHtmmls;
    btnPlay.hidden = true;
    actionElement.innerHTML = `<button class="btn-action btn-dan">Dằn</button>
    <button class="btn-action btn-rut" onclick = game.addCardUser();>Rút</button>`;
    this.userShowCard();
    },

    getCard: function(){
        str = `<div>
        <img class="card" src="./img/behind-card.png" alt="">
    </div>`
        myCard.innerHTML += str;
    },

    addCardUser: function(){
        htmls = `<div>
        <img class="card user" src="./img/behind-card.png" alt="">
    </div> `
    myCard.innerHTML += htmls;
    this.userShowCard();
    }

}