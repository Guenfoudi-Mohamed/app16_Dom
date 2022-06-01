// app_16

const items = document.querySelectorAll('body #section .container .item');
const playerTurn = document.querySelector('body #section .playerTurn');
const popUpRestart = document.querySelector('body #popUpRestart');
const arrXO = ['X','O'];
let playerIndex = Math.floor(Math.random() * 2);
let turnXO = arrXO[playerIndex];
let arr0 = [];
let arr1 = [];
let numberOfClicks = 0;



// function checkResult 
function checkResult(XO,index){
    const arr = ['012','345','678','036','147','258','048','246'];
    let list = [];
    let bool = false;
    let stock = '';
    let conteur = 0;
    numberOfClicks++;
    // start function displayPopUp 
    function displayPopUp(){
        popUpRestart.style.setProperty('display','flex');
        const btnRestart = document.querySelector('body #popUpRestart .btnRestart');
        btnRestart.addEventListener('click',function(){
            for(let i = 0;i<stock.length;i++){
                items[Number(stock[i])].removeAttribute('style');
            }
            popUpRestart.style.setProperty('display','none');
            if(turnXO=='X'){playerIndex=0; playerTurn.textContent = `TURN  ${arrNamesPlayer[playerIndex]}`;}
            else if(turnXO=='O'){playerIndex=1;playerTurn.textContent = `TURN  ${arrNamesPlayer[playerIndex]}`;}

            // playerTurn.textContent = `TURN Player ${turnXO}`;
            list = [];
            stock = '';
            for(let i = 0;i<items.length;i++){
                items[i].children[0].removeAttribute('class');
                items[i].children[0].textContent = '';
                items[i].removeEventListener('mouseover',arr0[i]);
                items[i].removeEventListener('mouseout',arr1[i]);
            };
            for(let i = 0;i<items.length;i++){
                items[i].addEventListener('mouseover',arr0[i]);
                items[i].addEventListener('mouseout',arr1[i]);
            };
        });
        numberOfClicks = 0;
    }
    for(let i = 0;i<arr.length;i++){
        for(let x = 0;x<arr[i].length;x++){
            if(arr[i][x] == index){
                list.push(arr[i]);
                break;
            }
        }
    }
    for(let i = 0;i<list.length;i++){
        for(let x = 0;x<list[i].length;x++){
            if(items[Number(list[i][x])].children[0].textContent == `${XO}`){
                conteur++;
            }
            if(conteur == 3){
                stock = list[i];
                list = [];
                break;
            }
        }
        if(conteur!=3){conteur=0;}
        else if(stock.length > 0){
            conteur = 0;
            bool = true;
            break;
        }
    };
    if(bool == true){
        bool=false;
        if(XO == 'X'){
            playerIndex=0;
            playerTurn.textContent = ` ${arrNamesPlayer[0]} Win !`;
            popUpRestart.children[0].textContent = ` ${arrNamesPlayer[0]} Win !`;
        }
        else if(XO == 'O'){
            playerIndex=1;
            playerTurn.textContent = ` ${arrNamesPlayer[1]} Win !`;
            popUpRestart.children[0].textContent = ` ${arrNamesPlayer[1]} Win !`;
        }
        
        for(let i = 0;i<stock.length;i++){
            items[Number(stock[i])].style.cssText = `background-color:#00d500;`;
        }
        setTimeout(displayPopUp,250);
    }
    else{
        if(numberOfClicks === 9){
            popUpRestart.children[0].textContent = `Draw !`;
            displayPopUp();
        }
        if(XO == 'X'){XO = 'O';playerIndex=1;playerTurn.textContent = `TURN  ${playerIndex == 0?arrNamesPlayer[0]:arrNamesPlayer[1]}`;}
        else if(XO == 'O'){XO = 'X';playerIndex=0; playerTurn.textContent = `TURN  ${playerIndex == 0?arrNamesPlayer[0]:arrNamesPlayer[1]}`;}
    };
}
// function mouseOver
function mouseOver(){
    if(this.children[0].textContent == ''){
        this.children[0].textContent = `${turnXO}`;
    }
}
// function mouseOut
function mouseOut(){
    if(this.children[0].textContent.length != 0){
        this.children[0].textContent = '';
    }
}
// function mouseClick
function mouseClick(){
    if((this.children[0].classList.contains('active')) == false){
        this.removeEventListener('mouseover',arr0[Number(this.attributes[1].value)]);
        this.removeEventListener('mouseout',arr1[Number(this.attributes[1].value)]);
        this.children[0].classList.add('active');
        this.children[0].textContent = `${turnXO}`;
        if(turnXO == 'X'){
            checkResult(turnXO,Number(this.attributes[1].value));
            playerIndex=1;
            turnXO = 'O';
        }
        else if(turnXO == 'O'){
            checkResult(turnXO,Number(this.attributes[1].value));
            turnXO = 'X';
            playerIndex=0;
        }
    }
}


//add events 
for(let i = 0;i<items.length;i++){
    arr0.push(mouseOver);
    items[i].addEventListener('mouseover',mouseOver);
    arr1.push(mouseOut);
    items[i].addEventListener('mouseout',mouseOut);
    items[i].addEventListener('click',mouseClick);
};


// event for pop Up Players 
const popUpPlayers = document.querySelector('body #popUpPlayers');
const inpPlayer = document.querySelectorAll('body #popUpPlayers .container .player > input');
const btnAddNamesPlayer = document.querySelector('body #popUpPlayers .container > .btn input');
const arrNamesPlayer = []
btnAddNamesPlayer.addEventListener('click',function(){
    let conteur = -1;
    for(let i = 0;i<inpPlayer.length;i++){
        if(inpPlayer[i].value == ''){
            conteur = i;
            inpPlayer[conteur].focus();
            break;
        }
    }
    if(conteur == -1){
        for(let i = 0;i<inpPlayer.length;i++){
            arrNamesPlayer[i] = inpPlayer[i].value;
        }
        popUpPlayers.style.setProperty('display','none');
        console.log(arrNamesPlayer);
        // playerTurn initial value 
        playerTurn.textContent = `TURN  ${playerIndex == 0?arrNamesPlayer[0]:arrNamesPlayer[1]}`;
        console.log(playerIndex);
    }
});
