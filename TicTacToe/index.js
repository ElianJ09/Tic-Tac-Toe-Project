const UserCollections = database.collection('user-info');
const UserActual = database.collection('user-info-actual');
const guestData = database.collection('guest-info');
var nameUser = "";
var finishGameType = 0;
var verificator = false;

var valueButtonOption; //Saber si entro como usuario o como invitado
var game = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
]

function turnsGame(){
    num = Math.floor(Math.random() * 2) + 1;
    if(num != 1){
        MachineGameO()
    }
}
function getNameUserAndTypeButton(){
    UserActual.get().then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
            var data = doc.data();
            nameUser = data.name;
            //Verificar que tipo de usuario entro
            if(data.valueButton == 0){
                valueButtonOption = 0;
            }else{
                valueButtonOption = 1;
            }
            console.log("Tipo de usuario: " + valueButtonOption)
            console.log("Nombre: "+nameUser)
        })
    }).catch(function(error){
        console.log(error);
    });
}

window.addEventListener('load', function(event){
    getNameUserAndTypeButton()
    setTimeout( function() { 
        const LbScoreP1 = document.getElementById('score-p1');
        const LbScoreP2 = document.getElementById('score-p2');
        const LbScoreTies = document.getElementById('score-ties');
        const LbTotalGames = document.getElementById('games');
        const LbNameUser = document.getElementById('user-name-txt');

        if(valueButtonOption == 0){
            UserCollections.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    var data = doc.data();
                    if(nameUser == data.name){
                        //Remplaza los textos con lo del usuario actual
                        LbScoreP1.textContent = data.victories;
                        LbScoreP2.textContent = data.defeats;
                        LbScoreTies.textContent = data.ties; 
                        LbTotalGames.textContent = data.numGames;
                        LbNameUser.textContent = data.name;
                    }
                })
            }).catch(function(error){
                console.log(error);
            });  
        }else{
            guestData.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    var data = doc.data();
                    LbScoreP1.textContent = data.victories;
                    LbScoreP2.textContent = data.defeats;
                    LbScoreTies.textContent = data.ties; 
                    LbTotalGames.textContent = data.numGames;
                })
            }).catch(function(error){
                console.log(error);
            });  
        }
    }, 800 );
    turnsGame()
})

function addNewFigure(event){
    const VerifyFigureinsquare = event.target
    
    const NewCircleUser = document.createElement("div");
    NewCircleUser.setAttribute("class", "x");
    
    VerifyFigureinsquare.appendChild(NewCircleUser);
    VerifyFigureinsquare.setAttribute('onclick', "")

    const CellType = VerifyFigureinsquare.className;

    addFigureInMatrizX(CellType);
    //setTimeout( function() { 
        MachineGameO()
    //}, 200 );
    
}

function addFigureInMatrizX(cellType){
    switch(cellType){
        case "square-top-left":
            game[0][0] = "x";
            break;

        case "square-top":
            game[0][1] = "x";
            break;

        case "square-top-right":
            game[0][2] = "x";
            break;

        case "square-left":
            game[1][0] = "x";
            break;

        case "square-center":
            game[1][1] = "x";
            break;

        case "square-right":
            game[1][2] = "x";
            break;

        case "square-bottom-left":
            game[2][0] = "x";
            break;

        case "square-bottom":
            game[2][1] = "x";
            break;

        case "square-bottom-right":
            game[2][2] = "x";
            break;
    }
    verifyStatusGame()
}

function verifyStatusGame(){
    for(let i=0; i < game.length; i++){
        for(let j=0; j < game.length; j++)
        {
            if(game[i][j] == 0){
                victoryMachine()
                victoryPlayer()
                return 0;
            }
        }
    }
    finishGameType = 0;
    victoryMachine()
    victoryPlayer()
    finishGame()
}

function deleteAllFigures(){
    const FiguresX = document.querySelectorAll(".x");
    const FiguresO = document.querySelectorAll(".o");

    FiguresX.forEach(function(element) {
        father = element.parentNode;
        father.setAttribute("onclick", "addNewFigure(event)")
		father.removeChild(element);
    });

    FiguresO.forEach(function(element) {
        father = element.parentNode;
        father.setAttribute("onclick", "addNewFigure(event)")
		father.removeChild(element);
    });
    
    game = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    finishGameType = 0;
    verificator = false;
    turnsGame()
}

function MachineGameO(){
    var option = 0;
    var NumX = 0, NumY = 0, Num = 0;
    if(verificator == false){
        do{
            NumX = Math.floor(Math.random() * game.length)
            NumY = Math.floor(Math.random() * game.length)
            Num = game[NumX][NumY];
    
            if(Num != "x" && Num != "o"){
                game[NumX][NumY] = "o";
                console.log(game)
                option = 1;
                
                var NumString = NumX.toString() + NumY.toString()
                addNewFigureMachine(NumString)
            } 
        }while(option == 0);
    }
}

function addNewFigureMachine(NumString){
    var CellToAddO;
    
    switch(NumString){
        case "00":
            CellToAddO = document.getElementsByClassName("square-top-left");
            break
        case "01":
            CellToAddO = document.getElementsByClassName("square-top");
            break
        case "02":
            CellToAddO = document.getElementsByClassName("square-top-right");
            break;
        case "10":
            CellToAddO = document.getElementsByClassName("square-left");
            break;
        case "11":
            CellToAddO = document.getElementsByClassName("square-center");
            break;
        case "12":
            CellToAddO = document.getElementsByClassName("square-right");
            break;
        case "20":
            CellToAddO = document.getElementsByClassName("square-bottom-left");
            break;
        case "21":
            CellToAddO = document.getElementsByClassName("square-bottom");
            break;
        case "22":
            CellToAddO = document.getElementsByClassName("square-bottom-right");
            break;
    }

    const ElementCell = CellToAddO[0];
    const NewCircleUser = document.createElement("div");
    NewCircleUser.setAttribute("class", "o");
            
    ElementCell.appendChild(NewCircleUser);
    ElementCell.setAttribute('onclick', "")

    verifyStatusGame()
}

function finishGame(){
    const body = document.body;
    console.log(body);

    const NewMsgBox = document.createElement("div");
    NewMsgBox.setAttribute("class", "winner-player");
    const NewMsgBoxText = document.createElement("p");
    NewMsgBoxText.setAttribute("class", "text-winner");
    if(finishGameType == 0){
        NewMsgBoxText.textContent = "No hubo ganador!";
        verificator = true;

        NewMsgBox.appendChild(NewMsgBoxText);
        body.appendChild(NewMsgBox);
        updateTies()

        setTimeout( function() { 
            body.removeChild(NewMsgBox);
            setTimeout( function() { 
                deleteAllFigures()
            }, 1000 );
        }, 3000 );
    }else if(finishGameType == 1){
        NewMsgBoxText.textContent = "Gano el jugador 1!";

        NewMsgBox.appendChild(NewMsgBoxText);
        body.appendChild(NewMsgBox);
        updateVictories()

        setTimeout( function() { 
            body.removeChild(NewMsgBox);
            setTimeout( function() { 
                deleteAllFigures()
            }, 1000 );
        }, 3000 );
    }
    else{
        NewMsgBoxText.textContent = "Gano el jugador 2!";

        NewMsgBox.appendChild(NewMsgBoxText);
        body.appendChild(NewMsgBox);
        updateDefeats()

        setTimeout( function() { 
            body.removeChild(NewMsgBox);
            setTimeout( function() { 
                deleteAllFigures()
            }, 1000 );
        }, 3000 );
        
    }
    
}

function victoryPlayer(){
    if(game[0][0] == "x" && game[1][1] == "x" && game[2][2] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[0][2] == "x" && game[1][1] == "x" && game[2][0] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[0][0] == "x" && game[1][0] == "x" && game[2][0] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[0][1] == "x" && game[1][1] == "x" && game[2][1] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[0][2] == "x" && game[1][2] == "x" && game[2][2] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[0][0] == "x" && game[0][1] == "x" && game[0][2] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[1][0] == "x" && game[1][1] == "x" && game[1][2] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(game[2][0] == "x" && game[2][1] == "x" && game[2][2] == "x"){
        finishGameType = 1;
        finishGame()
    }
    if(finishGameType== 1){
        verificator = true;
    }
}

function victoryMachine(){
    if(game[0][0] == "o" && game[1][1] == "o" && game[2][2] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[0][2] == "o" && game[1][1] == "o" && game[2][0] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[0][0] == "o" && game[1][0] == "o" && game[2][0] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[0][1] == "o" && game[1][1] == "o" && game[2][1] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[0][2] == "o" && game[1][2] == "o" && game[2][2] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[0][0] == "o" && game[0][1] == "o" && game[0][2] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[1][0] == "o" && game[1][1] == "o" && game[1][2] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(game[2][0] == "o" && game[2][1] == "o" && game[2][2] == "o"){
        finishGameType = 2;
        finishGame()
    }
    if(finishGameType== 2){
        verificator = true;
    }
}

function updateTies(){
    const LbScoreTies = document.getElementById('score-ties');
    const LbTotalGames = document.getElementById('games');

    const totalGames = Number(LbTotalGames.textContent) + 1;
    console.log("Jugadas totales: " + totalGames)


    if(finishGameType == 0){
        const tiesGame = Number(LbScoreTies.textContent) + 1;
        console.log("Intentos: " + tiesGame)
        if(valueButtonOption == 1){
            guestData.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    database.collection('guest-info')
                        .doc(doc.id)
                        .update({
                            ties: tiesGame,
                            numGames: totalGames
                        })
                    console.log("Actualizando empates de invitado!")
                    LbScoreTies.textContent = tiesGame; 
                    LbTotalGames.textContent = totalGames;
                })
            }).catch(function(error){
                console.log(error);
            }); 
        }
        else if(valueButtonOption == 0){
            UserCollections.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    var data = doc.data();
                    if(data.name == nameUser){
                        console.log("Nombre pagina: "+nameUser)
                        console.log("Nombre base: "+data.name)
                        database.collection('user-info')
                            .doc(doc.id)
                            .update({
                                ties: tiesGame,
                                numGames: totalGames
                            })
                        console.log("Actualizando empates de usuario!")
                        LbScoreTies.textContent = tiesGame; 
                        LbTotalGames.textContent = totalGames;
                    }
                })
            })
        }
    }
}
function updateVictories(){
    const LbScoreP1 = document.getElementById('score-p1');
    const LbTotalGames = document.getElementById('games');

    const totalGames = Number(LbTotalGames.textContent) + 1;
    console.log("Jugadas totales: " + totalGames)

    if(finishGameType == 1){
        const victories = Number(LbScoreP1.textContent) + 1;
        console.log("Ganadas: "+ victories)
        if(valueButtonOption == 1){
            guestData.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    database.collection('guest-info')
                        .doc(doc.id)
                        .update({
                            victories: victories,
                            numGames: totalGames
                        })
                        console.log("Actualizando victorias de invitado!")
                    LbScoreP1.textContent = victories; 
                    LbTotalGames.textContent = totalGames;
                })
            }).catch(function(error){
                console.log(error);
            }); 
        }
        else if(valueButtonOption == 0){
            UserCollections.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    var data = doc.data();
                    if(data.name == nameUser){
                        database.collection('user-info')
                            .doc(doc.id)
                            .update({
                                victories: victories,
                                numGames: totalGames
                            })
                            console.log("Actualizando victorias de usuario!")
                        LbScoreP1.textContent = victories; 
                        LbTotalGames.textContent = totalGames;
                    }
                })
            })
        }
    }      
}

function updateDefeats(){
    const LbScoreP2 = document.getElementById('score-p2');
    const LbTotalGames = document.getElementById('games');

    const totalGames = Number(LbTotalGames.textContent) + 1;
    console.log("Jugadas totales: " + totalGames)

    if(finishGameType == 2){
        const defeats = Number(LbScoreP2.textContent) + 1;
        console.log("Perdidas: "+defeats)
        if(valueButtonOption == 1){
            guestData.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    var data = doc.data();
                    database.collection('guest-info')
                        .doc(doc.id)
                        .update({
                            defeats: defeats,
                            numGames: totalGames
                        })
                        console.log("Actualizando derrotas de invitado!")
                    LbScoreP2.textContent = defeats; 
                    LbTotalGames.textContent = totalGames;
                })
            }).catch(function(error){
                console.log(error);
            }); 
        }
        else if(valueButtonOption == 0){
            UserCollections.get().then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                    var data = doc.data();
                    if(data.name == nameUser){
                        database.collection('user-info')
                            .doc(doc.id)
                            .update({
                                defeats: defeats,
                                numGames: totalGames
                            })
                            console.log("Actualizando derrotas de usuario!")
                        LbScoreP2.textContent = defeats; 
                        LbTotalGames.textContent = totalGames;
                    }
                })
            })
        }
    }
}
