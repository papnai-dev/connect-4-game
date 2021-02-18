const DOMresult=document.querySelector('#result')
const squares=document.querySelectorAll('.sq')
const DOMcurrentPlayer=document.querySelector('#current-player')
const DOMdot=document.querySelector('#dot')
const DOMgrid=document.querySelector('.grid')

let takenar=[], currentPlayer=1
let color={
    1:'red',
    2:'blue'
}
let alreadyWon=false
DOMresult.style.display="none"
DOMcurrentPlayer.textContent=currentPlayer
DOMdot.style.backgroundColor=color[currentPlayer]


const init=()=>{
//array to store the indexes of colored dots
alreadyWon=false
takenar=[]
currentPlayer=1
DOMcurrentPlayer.textContent=currentPlayer
DOMdot.style.backgroundColor=color[currentPlayer]
DOMresult.style.display="none"
DOMgrid.style.boxShadow=`none`
for(let i=0;i<squares.length;i++){
    squares[i].style.backgroundColor="white"
}
}
const showGrid=()=>{
    for(let i=0;i<squares.length;i++){
        squares[i].style.boxShadow=`0px 0px 0px 1px black inset`
    }
}
const hideGrid=()=>{
    for(let i=0;i<squares.length;i++){
        squares[i].style.boxShadow=`none`
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
    DOMdot.style.backgroundColor=color[currentPlayer]
    DOMcurrentPlayer.textContent=currentPlayer
}


//--------------------check if WIN Combination is formed- HORIZONTAL, VERTICAL OR DIAGONAL ---------------
const checkCombo=(i,player,skip,horizontal=false,leftDiagonal=false,rightDiagonal=false)=>{
    let c=1
    let k=i-skip
    try{
        while(squares[k].style.backgroundColor==color[player]){
            if(horizontal===true||rightDiagonal===true){
                if(k%7==6){
                    break
                }        
            }
            if(leftDiagonal===true){
                if(k%7==0){
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
            if(horizontal===true||rightDiagonal===true){
                if(k%7==0){
                    break
                }    
            }
            if(leftDiagonal===true){
                if(k%7==6){
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
    c1=checkCombo(i,player,1,true)
    c2=checkCombo(i,player,7)
    c3=checkCombo(i,player,6,false,true)
    c4=checkCombo(i,player,8,false,false,true)
    if(c1==4||c2==4||c3==4||c4==4){
        DOMresult.textContent=`Player ${player} wins!`
        DOMresult.style.color=`${color[player]}`
        DOMresult.style.display="block"
        alreadyWon=true
        DOMgrid.style.boxShadow=`6px 6px 10px 12px #ccc`
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
                if(alreadyWon==false){
                changePlayer()
                }
            }
        }

        })
}
