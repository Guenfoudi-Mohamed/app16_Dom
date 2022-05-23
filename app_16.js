// app_16
const items = document.querySelectorAll('body #section .container .item');
const playerTurn = document.querySelector('body #section .playerTurn');
const popUp = document.querySelector('body #popUp');
const arrXO = ['X','O'];
let turnXO = arrXO[Math.floor(Math.random() * 2)];
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
        popUp.style.setProperty('display','flex');
        const btnRestart = document.querySelector('body #popUp .btnRestart');
        btnRestart.addEventListener('click',function(){
            for(let i = 0;i<stock.length;i++){
                items[Number(stock[i])].removeAttribute('style');
            }
            popUp.style.setProperty('display','none');
            playerTurn.textContent = `TURN Player ${turnXO}`;
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
        playerTurn.textContent = `Player ${XO} Win !`;
        popUp.children[0].textContent = `Player ${XO} Win !`;
        for(let i = 0;i<stock.length;i++){
            items[Number(stock[i])].style.cssText = `background-color:#00d500;`;
        }
        setTimeout(displayPopUp,250);
    }
    else{
        if(numberOfClicks === 9){
            popUp.children[0].textContent = `Draw !`;
            displayPopUp();
        }
        if(XO == 'X'){XO = 'O';playerTurn.textContent = `TURN Player ${XO}`;}
        else if(XO == 'O'){XO = 'X';playerTurn.textContent = `TURN Player ${XO}`;}
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
            turnXO = 'O';
        }
        else if(turnXO == 'O'){
            checkResult(turnXO,Number(this.attributes[1].value));
            turnXO = 'X';
        }
    }
}
// playerTurn initial value 
playerTurn.textContent = `TURN Player ${turnXO}`;

//add events 
for(let i = 0;i<items.length;i++){
    arr0.push(mouseOver);
    items[i].addEventListener('mouseover',mouseOver);
    arr1.push(mouseOut);
    items[i].addEventListener('mouseout',mouseOut);
    items[i].addEventListener('click',mouseClick);
};
