const app = {
    name: null,
    editor: null,
    init: function() {
        // On appelle la méthode s'occupant d'ajouter les EventListener sur les éléments déjà dans le DOM
        app.addAllEventListeners();

        // On appelle la méthode s'occupant de charger tous les jeux vidéo
        app.loadVideoGames();
        app.name = document.getElementById('inputName');
        app.editor = document.getElementById('inputEditor');
    },
    addAllEventListeners: function() {
        // On récupère l'élément <select> des jeux vidéo
        const selectVideoGame = document.getElementById('videogameId');
        // On ajoute l'écouteur pour l'event "change", et on l'attache à la méthode app.handleVideogameSelected
        selectVideoGame.addEventListener('change', app.handleVideogameSelected);
        // On récupère le bouton pour ajouter un jeu vidéo
        const addVideogameButtonElement = document.getElementById('btnAddVideogame');
        // On ajoute l'écouteur pour l'event "click"
        addVideogameButtonElement.addEventListener('click', app.handleClickToAddVideogame);
        // On recupère le bouton pour valider l'ajout d'un jeu vidéo
        const submitVideogame = document.querySelector("#addVideogameForm > div.modal-footer > button.btn.btn-primary");
        // On ajoute l'écouteur click pour soumettre le nouveau jeu
        submitVideogame.addEventListener('click', app.submitVideogame)
        
        // TODO
    },
    handleVideogameSelected: function(evt) {
        // Récupérer la valeur du <select> (id du videogame)
        const select = document.getElementById('videogameId');
        const gameId = select.value;
        // Vider le contenu de div#review
        const divReview = document.querySelector('#review');
        divReview.textContent = "";

        // charger les données pour ce videogame
        fetch(`http://127.0.0.1:8000/api/videogames/${gameId}/reviews`)
            .then( response => {
                return response.json();
            })
            .then ( reviews => {
                for (const review of reviews) {
                        app.insertReviewInPage(review);
                }
            })
            // Dupliquer la template #reviewTemplate et personnaliser son contenu avec les données

            // Ajouter dans le DOM
    },
    handleClickToAddVideogame: function(evt) {
        // https://getbootstrap.com/docs/4.4/components/modal/#modalshow
        // jQuery obligatoire ici
        $('#addVideogameModal').modal('show');
        app.name.value = "";
        app.editor.value = "";
    },
    loadVideoGames: function() {
        // Charger toutes les données des videogames
        fetch('http://127.0.0.1:8000/api/videogames')
            .then( response => {
                return response.json();
            })
            .then ( videogames => {
                // Ajouter une balise <option> par videogame
                for (const videogame of videogames) {
                    const select = document.getElementById('videogameId');
                    const option = document.createElement('option');
                    option.value = videogame.id;
                    option.textContent = videogame.name;
                    select.append(option);
                }
            })
    },
    submitVideogame: function(event) {
        event.preventDefault();
        console.log('coucou');
        const name = app.name.value;
        console.log(name);
        const editor = app.editor.value;
        console.log(editor);
        $('#addVideogameModal').modal('hide');

        fetch("http://127.0.0.1:8000/api/videogames", {
            method: "POST",
            headers: {          
                'Content-Type': 'application/json',       
            },
            body: JSON.stringify({      
                name: name,
                editor: editor,
            })
        })
        .then( response => {
            console.log(response.status);
            if (response.status == 201) {
                app.showMessage(true);
            } else {
                app.showMessage(false);
            }
            return response.json();
        })
    },
    // affiche le message pendant 2 sec
    showMessage: function (success) {
        const class_name = success ? '.message.success' : '.message.danger'
        const elt = document.querySelector(class_name)
        elt.removeAttribute('hidden')
        setTimeout(() => {
            elt.setAttribute('hidden', '')
        }, 2000);
    },
    insertReviewInPage: function(review) {
        // Récupérer la liste des reviews dans la page
        const reviewList = document.querySelector('#review');

        // Récupérer le template qui contient le modèle de DOM pour générer les reviews
        const reviewTemplate = document.querySelector('#reviewTemplate');

        // Copier le modèle de DOM pour créer le DOM de la review
        const reviewElement = reviewTemplate.content.cloneNode(true);

        // Récupérer l'élément du titre de la review...
        const reviewTitleElement = reviewElement.querySelector('.reviewTitle');
        // ...et y mettre le titre
        reviewTitleElement.textContent = review.title;

        // Récupérer l'élément de l'auteur de la review...
        const reviewAuthorElement = reviewElement.querySelector('.reviewAuthor');
        // ...et y mettre l'auteur
        reviewAuthorElement.textContent = review.author;

        // Récupérer l'élément de la date de publication de la review...
        const reviewPublicationDateElement = reviewElement.querySelector('.reviewPublication');
        // ...et y mettre la date de publication
        reviewPublicationDateElement.textContent = review.publication_date;

        // Récupérer l'élément du contenu de la review...
        const reviewTextElement = reviewElement.querySelector('.reviewText');
        // ...et y mettre le texte de la review
        reviewTextElement.textContent = review.text;        

        // Récupérer l'élément pour la note des graphismes...
        const reviewDisplayElement = reviewElement.querySelector('.reviewDisplay');
        // ...et y mettre la note des graphismes
        reviewDisplayElement.textContent = review.display_note;

        // Récupérer l'élément pour la note du gameplay...
        const reviewGameplayElement = reviewElement.querySelector('.reviewGameplay');
        // ...et y mettre la note du gameplay
        reviewGameplayElement.textContent = review.gameplay_note;

        // Récupérer l'élément pour la note du scénario...
        const reviewScenarioElement = reviewElement.querySelector('.reviewScenario');
        // ...et y mettre la note du scénario
        reviewScenarioElement.textContent = review.scenario_note;

        // Récupérer l'élément pour la note de la durée de vie du jeu...
        const reviewLifetimeElement = reviewElement.querySelector('.reviewLifetime');
        // ...et y mettre la note de la durée de vie du jeu
        reviewLifetimeElement.textContent = review.lifetime_note;

        // Ajouter la review dans la liste des reviews
        reviewList.append(reviewElement);
    }
};

document.addEventListener('DOMContentLoaded', app.init);