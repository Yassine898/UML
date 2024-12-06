class Film {
    constructor(id, titre) {
        this.id = id;
        this.titre = titre;
        this.projections = new Set();
    }

    // Liste des méthodes déjà précisées

    addProjection(projection){
        this.projections.add(projection);
    }
}

class Salle {
    constructor(num, description) {
        this.num = num;
        this.description = description;
        this.projections = new Set();
    }

    // Liste des méthodes déjà précisées

    addProjection(projection){
        this.projections.add(projection);
    }

    estLibre(date) {
        let libre=true;
        this.projections.forEach((projection) => {
            if (projection.dateProjection==date) libre=false;
        })
        return libre;
    }
}

class Projection {
    constructor(film,salle,datep) {
        this.prix = null;
        this.dateProjection = datep;
        this.film = film;
        this.salle=salle;
    }

    // Liste des méthodes déjà précisées

    setFilm(film) {
        this.film = film;
    }

    setSalle(salle) {
        this.salle = salle;
    }
}

/* Exemple de données pour le test */

const salles = [
    new Salle(1, 'Salle 1'), 
    new Salle(2, 'Salle 2'),
    new Salle(3, 'Salle 3')
];

const films = [
    new Film(1, 'Film 1'),
    new Film(2, 'Film 2'),
    new Film(3, 'Film 3')
];

const projections = [
    new Projection(films[0], salles[0], '2024-10-01'),
    new Projection(films[0], salles[1], '2024-10-01'),
    new Projection(films[1], salles[2], '2024-10-02'),
    new Projection(films[2], salles[0], '2024-10-03'),
    new Projection(films[2], salles[2], '2024-10-03')
];

salles[0].addProjection(projections[0]);
salles[0].addProjection(projections[3]);
salles[1].addProjection(projections[1]);
salles[2].addProjection(projections[2]);
salles[2].addProjection(projections[4]);

films[0].addProjection(projections[0]);
films[0].addProjection(projections[1]);
films[1].addProjection(projections[2]);
films[2].addProjection(projections[3]);
films[2].addProjection(projections[4]);
