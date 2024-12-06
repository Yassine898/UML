
const lstFilms= document.getElementById('filmSelect');
const lstSalles = document.getElementById('salleSelect');
const DInput = document.getElementById('dateInput');
const Btn = document.querySelector('button');


var date = null;
var salle= null;
var film = null;


/* 1- Afficher la page */

function afficherPage(){
    /* Charger la liste des films */
    films.forEach(film => {
        addFilm(film)
    })
    lstSalles.setAttribute('disabled',true);
    DInput.setAttribute('disabled',true);
    Btn.setAttribute('disabled',true);
    Btn.style="background-color:#28a74624";
}

function addFilm(film){
    lstFilms.append(newOption(film.id,film.titre));
}

function newOption(value,text){
    const opt= document.createElement('option');
    opt.value=value;
    opt.textContent=text;
    return opt;
}

document.addEventListener('DOMContentLoaded',function (){
    afficherPage();
})

/* 2- Selectionner film */

function rechercherFilm(idFilm){
    let tFilm =  films.filter(film => film.id==idFilm)
    return (tFilm.length>0)?tFilm[0]:null;
}

document.getElementById('filmSelect').addEventListener('change', function selectionnerFilm() {
    
    let idFilm = parseInt(this.value);

    film = rechercherFilm(idFilm);
    DInput.disabled=false;
});

/* 3- Selectionner date */

document.getElementById('dateInput').addEventListener('change', function selectionnerDate(){
    date = this.value;

    // Réinitialiser la liste
    lstSalles.innerHTML = '<option value="">Sélectionnez une salle</option>'; 
    
    // Ajouter les salles libres à la liste
    salles.forEach( salle => {
        if (salle.estLibre(date))
            lstSalles.appendChild(newOption(salle.num, salle.description))
    })

    lstSalles.disabled=false;
    
});

/* 4- Selectionner salle */

function rechercherSalle(numSalle){
    let tSalle =  salles.filter(salle => salle.num==numSalle)
    return (tSalle.length>0)?tSalle[0]:null;
}

document.getElementById('salleSelect').addEventListener('change', function selectionnerSalle() {
    
    let numSalle = parseInt(this.value);

    salle = rechercherSalle(numSalle);

    if (salle && film && date){
        Btn.disabled=false;
        Btn.style="background-color:#28a745";
    }

});

/* 4- Valider planification */

document.getElementById('planificationForm').addEventListener('submit', function planifier(e) {
    e.preventDefault();

    if (film && date && salle) {

        /* Créer une nouvelle projection*/
        let projection = new Projection(film,salle,date);

        /* Sauvegarder la projection*/
        sauvegarderProjection(projection)

        document.getElementById('message').textContent = `Projection de "${film.titre}" planifiée dans ${salle.description} le ${date}.`;
        setInterval(() => {
            location.reload();
        },3000);
    } else {
        document.getElementById('message').textContent = "Veuillez remplir tous les champs.";
    }
});

function sauvegarderProjection(projection){
    projections.push(projection);
    salle.addProjection(projection);
    film.addProjection(projection);
}
