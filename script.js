let counter = 0;
let firstSelection = "";
let secondSelection = "";
const card = document.querySelectorAll(".card");
const score1 = document.querySelector(".score1 span");
const score2 = document.querySelector(".score2 span");
const Reset = document.getElementById("reset");
const cards = document.querySelectorAll(".cards .card");
let Player = "player1";


shuffleImage()

function shuffleImage(){

    card.forEach(c=>{

        const num = [...Array(card.length).keys()]
        const random = Math.floor(Math.random()*card.length)
                                                                  //randomized kaarten
        c.style.order = num[random]
    })
}


cards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.add("clicked");                                 //voegt de class "clicked" toe and de kaart die je klikt
        if (counter === 0) {
          firstSelection = card.getAttribute("meme");
          counter++;
          
        } else {
          secondSelection = card.getAttribute("meme");
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
             }                            //update the score met +1 als eerste selectie hetzelfde is als 2e selectie, de maximale score is 8.
            correctCards[0].classList.add("checked");
            correctCards[0].classList.remove("clicked");
            correctCards[1].classList.add("checked");                        //haalt de class "clicked" weg want je bent er klaar me.
            correctCards[1].classList.remove("clicked");
              
    
            
          } else {
              const incorrectCards = document.querySelectorAll(".card.clicked");
      
              incorrectCards[0].classList.add("red");
              incorrectCards[1].classList.add("red");            //verandert de class naar "red" voor css, zodat ik het het rood kan maken in css
        
              setTimeout(() => {
                incorrectCards[0].classList.remove("red");          //haalt de class "clicked" en "red" weg met een 1 seconde delay
                incorrectCards[0].classList.remove("clicked");
                incorrectCards[1].classList.remove("red");
                incorrectCards[1].classList.remove("clicked");
              }, 600);
          }  if (Player == "player1") {
               Player = "player2";
                console.log("i am now player 2");
          }  else {
               Player = "player1"
                console.log("i am now player 1");
          }  
        }
      });
});



