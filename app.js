const DOMresult=document.querySelector('#result')
const squares=document.querySelectorAll('.sq')
const DOMcurrentPlayer=document.querySelector('#current-player')
let takenar=[], currentPlayer=1
let color={
    1:'red',
    2:'blue'
}
let alreadyWon=false
DOMresult.style.display="none"

const init=()=>{
//array to store the indexes of colored dots
alreadyWon=false
takenar=[]
currentPlayer=1
DOMcurrentPlayer.textContent=currentPlayer
DOMresult.style.display="none"
for(let i=0;i<squares.length;i++){
    squares[i].style.backgroundColor="white"
}
}


//decides if the player can place the coloured dot
const canGoThere=(i)=>{
    if(!takenar.includes(i)){
        if(i>=35 && i<=41){
            return true
        }
        if(takenar.includes(i+7)){
            return true
        }
    }
    return false
}

//changes current player
const changePlayer=()=>{
    if(currentPlayer==1){
        currentPlayer=2
    }
    else if(currentPlayer==2){
        currentPlayer=1
    }
    DOMcurrentPlayer.textContent=currentPlayer
}


//--------------------check if WIN Combination is formed- HORIZONTAL, VERTICAL OR DIAGONAL ---------------
const checkCombo=(i,c,player,skip,horizontal=false)=>{
    let k=i-skip
    try{
        while(squares[k].style.backgroundColor==color[player]){
            if(horizontal===true){
                if(k%7==6){
                    break
                }        
            }
            c+=1
            k-=skip
        }
    }
    catch(err){
    }
        k=i+skip
     try{
        while(squares[k].style.backgroundColor==color[player]){
            if(horizontal===true){
                if(k%7==0){
                    break
                }    
            }
            c+=1
            k+=skip
        }
     }
    catch(err){
    }
return c
}


//checks if any player Won
const checkWin=(i,player)=>{
    let c1,c2,c3,c4
    c1=checkCombo(i,1,player,1,true)
    c2=checkCombo(i,1,player,7)
    c3=checkCombo(i,1,player,6)
    c4=checkCombo(i,1,player,8)
    if(c1==4||c2==4||c3==4){
        DOMresult.textContent=`Player ${player} wins!`
        DOMresult.style.display="block"
        alreadyWon=true

    }
}


for(let i=0;i<squares.length;i++){
    //listen click event
    squares[i].addEventListener('click',()=>{
        if(alreadyWon===false){

            if(canGoThere(i)){
                squares[i].style.backgroundColor=color[currentPlayer]
                takenar.push(i)
                checkWin(i,currentPlayer)
                if(takenar.length==squares.length){
                    DOMresult.textContent=`Its a DRAW !!!!!!`
                    DOMresult.style.display="block"
                }
                changePlayer()
            }
        }
        })
}
