let counter = 0;
let i = 0;
let firstSelection = "";
let secondSelection = "";
let time = 0;
let seconds = 0;
let Player = "player1";
let correctCardCounter = 0;
let name1 = prompt("What is player 1's name.");
let name2 = prompt("What is player 2's name.");
let Timer = document.getElementById("timer");
const LastWinnerText = document.getElementById("LastWinner");
const body = document.querySelector('body');
const card = document.querySelectorAll(".card");
const score1 = document.querySelector(".score1 span");
const score2 = document.querySelector(".score2 span");
const Reset = document.getElementById("ButtonResetGame");
const cards = document.querySelectorAll(".cards .card");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const BgButton = document.getElementById("BgButton");
var Score1StorageArray = JSON.parse(localStorage.getItem(name1 + " score:")) || [];
var Score2StorageArray = JSON.parse(localStorage.getItem(name2 + " score:")) || [];
var WinnerPlayerArray = JSON.parse(localStorage.getItem("Winner:")) || [];
var BackgroundImage = ["https://th.bing.com/th/id/R.d3daeb31f13c2a2ac940888d5115a217?rik=A%2fMFUm%2fjR0jj2Q&pid=ImgRaw&r=0","https://c4.wallpaperflare.com/wallpaper/942/592/869/pixel-art-8-bit-wallpaper-preview.jpg","https://i.pinimg.com/originals/7d/98/84/7d98840fdff1b2e7cd508cc7f3a17403.jpg"];

shuffleImage()



player1.innerHTML = name1;
player2.innerHTML = name2;


function shuffleImage(){

    card.forEach(c=>{

        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random()*card.length)
                                                                  //randomized kaarten
        c.style.order = num[random]
    })
}

function startTime () {
  time = setInterval ( function (){
    seconds++;
    Timer.innerHTML = 'Timer:'+ seconds + 's';                //Timer functie, na 1 seconde verandert de tekst met +1 erbij
  }, 1000); 
  startTime = function() {};                  //zorgt dat het niet herhaad, zodat het niet steeds +2 wordt dan +3 
}

function stopTime () {
  clearInterval (time);                  //functie zodat de tijd stopt 
}

function winMenu() {
 body.innerHTML += '<div id="winScreen"></div>';
if (score1.innerHTML > score2.innerHTML) {
  document.querySelector('#winScreen').innerHTML = "<p>" + player1.innerHTML + " won </p>";
 } else {
  document.querySelector('#winScreen').innerHTML = "<p>" + player2.innerHTML + " won </p>";
 }
 setTimeout(() => {
	 document.querySelector('#winScreen').style.background = 'rgba(0, 0, 0, .7)';
 }, 100);
			
 setTimeout(() => {
	 body.removeChild(document.querySelector('#winScreen'));
 }, 2000);
} 



BgButton.addEventListener("click", ChangeBackground);

function ChangeBackground() { 
  i++
  if (i == BackgroundImage.length) {
    i = 0;
  }
  selectBG = BackgroundImage[i];
  document.body.style.backgroundImage = 'url(' + selectBG + ')';
}

  
















var Score1StorageArray = JSON.parse(localStorage.getItem(name1 + " score:")) || [];
var Score2StorageArray = JSON.parse(localStorage.getItem(name2 + " score:")) || [];
var WinnerPlayerArray = JSON.parse(localStorage.getItem("Winner:")) || [];


localStorage.setItem(name1 + " score:", JSON.stringify(Score1StorageArray));
localStorage.setItem(name2 + " score:", JSON.stringify(Score2StorageArray));
localStorage.setItem("Winner:", JSON.stringify(WinnerPlayerArray));


LastWinnerElement = WinnerPlayerArray[WinnerPlayerArray.length - 1];
if (LastWinnerElement == name1) {
  LastWinnerText.innerHTML = name1 + " won last time";
} else if (LastWinnerElement == name2) {
  LastWinnerText.innerHTML = name2 + " won last time";
} else {
  LastWinnerText.innerHTML = "";
}
    










//Main game//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("clicked");                                //voegt de class "clicked" toe and de kaart die je klikt
        if (counter === 0) {
           firstSelection = card.getAttribute("meme");
           counter++;
           if (counter === 1) {
            startTime();
           }
        } else {
          secondSelection =  card.getAttribute("meme");
                    
          counter = 0;
           if (firstSelection === secondSelection) {
            const correctCards = document.querySelectorAll(".card[meme='" + firstSelection + "']");
             if (Player == "player1") {
               score1.innerHTML = parseInt(score1.innerHTML) + 1
                if (score1.innerHTML >= 8)
                  score1.innerHTML = 8;
             } else {
               score2.innerHTML = parseInt(score2.innerHTML) + 1
                if (score2.innerHTML >= 8)
                  score2.innerHTML = 8;
             }                            
            
            //update the score met +1 als eerste selectie hetzelfde is als 2e selectie, de maximale score is 8.
            correctCards[0].classList.add("checked");
            correctCards[0].classList.remove("clicked");
            correctCards[1].classList.add("checked");                        //haalt de class "clicked" weg want je bent er klaar me.
            correctCards[1].classList.remove("clicked");
            correctCardCounter++;

////////////////////LAATST CARD CLICKED/////////////////////////////////               
            if (correctCardCounter == 8) {
              stopTime();                                  //de tijd stopt als er 8 correcte paren zijn
            }
            if (correctCardCounter == 8 && score1.innerHTML > score2.innerHTML) {
              winMenu();
              Score1StorageArray.push(score1.innerHTML);
              Score2StorageArray.push(score2.innerHTML);
              WinnerPlayerArray.push(name1);
              localStorage.setItem(name1 + " score:", JSON.stringify(Score1StorageArray));
              localStorage.setItem("Winner:", JSON.stringify(WinnerPlayerArray));
              localStorage.setItem(name2 + " score:", JSON.stringify(Score2StorageArray));  


              return;
            }
            if (correctCardCounter == 8 && score1.innerHTML < score2.innerHTML) {
              winMenu();
              Score2StorageArray.push(score2.innerHTML);
              Score1StorageArray.push(score1.innerHTML);
              WinnerPlayerArray.push(name2);
              localStorage.setItem(name1 + " score:", JSON.stringify(Score1StorageArray)); 
  	          localStorage.setItem("Winner:", JSON.stringify(WinnerPlayerArray));
              localStorage.setItem(name2 + " score:", JSON.stringify(Score2StorageArray)); 

              
              return;
            } 
////////////////////LAATST CARD CLICKED////////////////////////////////////////            
             
          } else {
              const incorrectCards = document.querySelectorAll(".card.clicked");
      
              incorrectCards[0].classList.add("red");
              incorrectCards[1].classList.add("red");//verandert de class naar "red" voor css, zodat ik het het rood kan maken in css
            

              setTimeout(() => {
                incorrectCards[0].classList.remove("red");          //haalt de class "clicked" en "red" weg met een 1 seconde delay
                incorrectCards[0].classList.remove("clicked");
                incorrectCards[1].classList.remove("red");
                incorrectCards[1].classList.remove("clicked");
              }, 600);
            }  
              if (Player == "player1" && firstSelection === secondSelection) {
                Player="player1"
                console.log("I will stay as player 1");
              } else if (Player == "player2" && firstSelection === secondSelection){
                Player="player2"
                console.log("I will stay as player 2")
              } else {                                                                      //zorgt ervoor dat Players niet veranderen als je een kaart gevonden hebt
                 if (Player == "player1") {
                   Player = "player2";
                   console.log("I am now player 2");
                   return
                 } if (Player == "player2") {
                   Player = "player1";
                   console.log("I am now player 1");
                 }
              } 
        }
      });
});



