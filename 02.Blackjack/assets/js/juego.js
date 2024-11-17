let deck = []
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');

const divCartasComputadora=document.querySelector('#computadora-cartas')
const divCartasJugador = document.querySelector('#jugador-cartas')
const smalls = document.querySelectorAll('Small');


//crear baraja
const crearDeck = () => {
    for(let i = 2; i<=10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo)

        }

    }
    deck = _.shuffle(deck);
    return deck;
}


crearDeck();

//pedir carta 
const pedirCarta= () =>{

    if(deck.length === 0){
        throw 'There no more deck cards';
    }

    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);
    /*if(isNaN(valor)){
        //console.log("It´s not a numeber");
        puntos = ( valor ==='A')? 11 : 10; 
    }else{
        console.log('Number');
        puntos = valor * 1;
    }
    console.log(puntos);
    */
    return ( isNaN(valor))?
            ( valor==='A')?11:10
            : valor * 1 ;   
}

const turnoComputadora = (puntosMinimos)=>{
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerText=puntosComputadora;
    
        //imagenes 
        const imgCarta = document.createElement('img');
        imgCarta.src= `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);
        if(puntosMinimos>21){
            break;
        }
    } while ((puntosComputadora<puntosMinimos)&&(puntosMinimos<=21)); 
    setTimeout(()=>{
        if(puntosComputadora === puntosMinimos){
            alert('nadie gana')
        }else if(puntosMinimos>21){
            alert('Computadora gana')
        }else if(puntosComputadora>21){
            alert('Jugador gana')
        }else{
            alert('Computadora gana');
        }
    }, 10);   
}

//Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    smalls[0].innerText=puntosJugador;
    
    //imagenes 
    const imgCarta = document.createElement('img');
    imgCarta.src= `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);
    if(puntosJugador>21){
        console.log('Sorry, you lost):');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        alert('Congrats, you won!!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }

});

btnDetener.addEventListener('click', ()=>{
    btnDetener.disabled = true;
    btnPedir.disabled = true;

    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click',()=>{
    alert('NEW GAME??');
    console.clear;
    deck=[]
    btnDetener.disabled=false;
    btnPedir.disabled=false;
    deck=crearDeck();
    puntosJugador=0;
    puntosComputadora=0;
    smalls[0]=0;
    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';
});

