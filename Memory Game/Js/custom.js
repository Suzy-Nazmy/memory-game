// cards array
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// deck the cards in game
const deck = document.getElementById("card-deck");

let started;
// state moves
let moves = 0;
let counter = document.querySelector(".moves");

// star icons
const stars = document.querySelectorAll(".fa-star");

// matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 //shutdown an icon
 let closeicon = document.querySelector(".shutdown");

 // start modal
 let modal = document.getElementById("congrats")

 // array for opened cards
var openedCards = [];


// description shuffles cards
// param {array}
// returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// start shuffles cards when page is refreshed
document.body.onload = startGame();


//start new play 
function startGame(){
    started = false;
    cards = shuffle(cards);
     openedCards = [];
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("appear", "open", "match", "disabled");
    }
    // reset moves & rating & timer
    moves = 0;
    counter.innerHTML = moves;
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// start toggles open & appear class to display cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("appear");
    this.classList.toggle("disabled");
};


//  start OpenedCards list and check if cards are match or not
function cardOpen() {
  if (!started) { // if started is false
    second = 0; // reset the timer
    minute = 0;
    hour = 0;
    startTimer(); // start the timer
    started = true; // started becomes true hence the timer isn't started at every click
  }
  openedCards.push(this);
  var len = openedCards.length;
  if(len === 2){
      moveCounter();
      if(openedCards[0].type === openedCards[1].type){
        matched();
      } else {
          unmatched();
      }
  }
};


// cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("appear", "open", "no-event");
    openedCards[1].classList.remove("appear", "open", "no-event");
    openedCards = [];
}


// cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("appear", "open", "no-event","unmatched");
        openedCards[1].classList.remove("appear", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// start disable cards
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// enable cards & disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// start count moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    // start rates
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// start game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


//  start congratulations & show modal & moves & time & rating
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("appear");

        var starsRating = document.querySelector(".stars").innerHTML;

        document.getElementById("end-move").innerHTML = moves;
        document.getElementById("stars-rating").innerHTML = starsRating;
        document.getElementById("all-time").innerHTML = finalTime;

        closeModal();
    };
}


// start close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("appear");
        startGame();
    });
}


//  start repeat game
function repeatGame(){
    modal.classList.remove("appear");
    startGame();
}


// add event listeners to cards
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
