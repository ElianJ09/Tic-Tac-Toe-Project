const UserCollections = database.collection('user-info');
const UserActual = database.collection('user-info-actual');
const guestData = database.collection('guest-info');

var AddNewUserOption = 0; 
//Este da la opcion de que si hay un usuario con el nombre que puso en el
//txt, entonces ya no agregara un nuevo usuario.

var ContinuePage = 1; 
//Este funciona para saber si, si agrego un nombre nuevo o se logeo
//Si no fue asi no se va a pasar a la siguiente pagina  

function OpenPageGame(){
    UserActual.get().then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
            // Guardara el valor del boton que pico
            database.collection('user-info-actual')
                    .doc(doc.id)
                    .update({
                        name: "",
                        valueButton: 1
                    }); //Si es 1 es por que entro como invitado
        })
        console.log("Valor de boton guardado!: 1")
    }).catch(function(error){
        console.log(error);
    });

    guestData.get().then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
            var data = doc.data();
            database.collection('guest-info')
                .doc(doc.id)
                .update({
                    victories: 0,
                    defeats: 0,
                    ties: 0,
                    numGames: 0
                })
        })
    }).catch(function(error){
        console.log(error);
    });  

    setTimeout( function() { 
        window.location.href = "index.html"; 
    }, 1000 );
}

function SaveNameUser(){
    const TextBoxUserName = document.getElementById('name-user-txt')
    const Name_User = TextBoxUserName.value

    if(UserCollections && Name_User != ""){
        UserActual.get().then(function(QuerySnapshot){
            QuerySnapshot.forEach(function(doc){
                database.collection('user-info-actual')
                        .doc(doc.id)
                        .update({name: Name_User}); //Guarda el nombre de usuario si puso uno en el Txt o el que haya iniciado sesion
            })
            console.log("Nombre Guardado con Exito!")
        }).catch(function(error){
            console.log(error);
        });
    }
}

function AddNewUser(){
    const TextBoxUserName = document.getElementById('name-user-txt')
    const Name_User = TextBoxUserName.value

    if(AddNewUserOption == 0){
        const newUser = {
            name: Name_User,
            victories: 0,
            defeats: 0,
            ties: 0,
            numGames: 0
        };

        database.collection('user-info')
            .add(newUser)
            .then(function(newDoc){
                console.log('Nuevo usuario registrado! ', newDoc)
            }).catch(function(error){
                console.log('Error al agregar usuario! ',error)
            })
        SaveNameUser()
        console.log("Guardando nombre de Usuario!")
        TextBoxUserName.value = ""
    }
}

function VerifyIfWeHaveAUser(){
    const TextBoxUserName = document.getElementById('name-user-txt')
    const Name_User = TextBoxUserName.value
    
    console.log(Name_User)
    if(Name_User == ""){
        ContinuePage = 0;
        AddNewUserOption = 1;
        alert("Pon el nombre de usuario para ingresar! ");
        return 0;
    }
    if(UserCollections){
        UserCollections.get().then(function(QuerySnapshot){
            QuerySnapshot.forEach(function(doc){
                var data = doc.data()
                if(Name_User === data.name){
                    AddNewUserOption = 1;
                    console.log("El añadir un nuevo usuario queda deshabilitado: " +AddNewUserOption);
                    SaveNameUser()
                    console.log("Guardando nombre de Usuario!")
                    TextBoxUserName.value = ""
                }
            })
        }).catch(function(error){
            console.log(error);
        });
    }
}

function OpenPageLogin(){
    AddNewUserOption = 0;
    ContinuePage = 1;
    VerifyIfWeHaveAUser()

    setTimeout( function() { 
        if(AddNewUserOption === 0){
            AddNewUser()
        }
    }, 1000 );

    UserActual.get().then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
            // Guardara el valor del boton que pico
            database.collection('user-info-actual')
                    .doc(doc.id)
                    .update({valueButton: 0}); //Si es 0 es por que entro con un usuario nuevo o ya registrado
        })
        console.log("Valor de boton guardado: 0")
    }).catch(function(error){
        console.log(error);
    });

    if(ContinuePage === 1){ 
        setTimeout( function() { 
            window.location.href = "index.html"; 
        }, 1200 );
    }
}