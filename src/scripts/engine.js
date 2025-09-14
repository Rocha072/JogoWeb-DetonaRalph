const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time"),
        points: document.querySelector("#points"),
        lifes: document.querySelector("#lifes")
    },
    values:{
        timerId:null,
        intervaloVelocidadeJogo: 250,
        posicao: 0,
        result: 0,
        tempo: 60,
        vidas: 3
    },
    actions:{
        cooldown: setInterval(contaTempo, 1000)
    }
}

function moverInimigo(){
    state.values.timerId = setInterval(quadradoAleatorio, state.values.intervaloVelocidadeJogo);
}

function quadradoAleatorio(){
    let idatual 
    let randomNumber
    state.view.squares.forEach((square)=>{
        if(square.classList.contains("enemy")){
            square.classList.remove("enemy");
            idatual = parseInt(square.id);
          
        }
    });

    do{
    randomNumber = Math.floor(Math.random() * 9);
    }while(randomNumber == idatual)
   
    state.view.squares.forEach((square)=>{
        if(parseInt(square.id) == randomNumber){
            square.classList.add("enemy");
        }
    })
   
    state.values.posicao = randomNumber;
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        
        square.addEventListener("mousedown", ()=>{
            
            if(parseInt(square.id) == state.values.posicao){
                playSound("hit");
                state.values.result++;
                state.view.points.textContent = state.values.result;
                state.values.posicao = null;
            }
            else{
                state.values.vidas--;
                state.view.lifes.textContent = "x" + state.values.vidas;
                if(state.values.vidas == 0)
                    gameOver();
            }
        })
    })
}

function contaTempo(){
    state.values.tempo--;
    state.view.time.textContent = state.values.tempo;
    if(state.values.tempo == 0){
        gameOver();
    }
}

function playSound(nomeSom){
    let audio = new Audio(`./src/audio/${nomeSom}.m4a`);
    audio.volume = 0.1;
    audio.play();
}


function gameOver(){
    alert("Game Over! O seu resultado foi: " + state.values.result);
    state.values.tempo = 60;
    state.values.vidas = 3;
    state.values.result = 0;
    state.view.lifes.textContent = "x"+ state.values.vidas;
    state.view.points.textContent = state.values.result;
}

function main(){
    state.view.lifes.textContent = "x"+ state.values.vidas;
    moverInimigo();
    addListenerHitBox();
}

main();
