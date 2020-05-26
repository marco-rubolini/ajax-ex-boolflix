$(document).ready(function(){

    var source   = $("#template-film").html();
    var template = Handlebars.compile(source);


// Intercetto il click sul pulsante di ricerca
$('#search-button').click(function(){
    ricercaFilm();
})

// intercetto il tasto invio nella stringa di ricerca
$('#text-search').keyup(function(event){
    if (event.which == 13) {
        ricercaFilm();
    }
});


 function ricercaFilm (){
     // Recupero la query di ricerca inserita dall'utente
     var searchUser = $('#text-search').val().trim();
     if (searchUser.length > 1) {
         resetRisultati();
         // all'evento associato far partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
         $.ajax({
             'url': 'https://api.themoviedb.org/3/search/movie',
             'method': 'GET',
             'data': {
                 'api_key': '293167d93b32235a7163c8c41e8172d5',
                 'query': searchUser,
                 'language': 'it-IT'
             },
             'success': function(risposta){

                 var elencoFilm = risposta.results;

                 // Ciclare i risultati
                 for (var i = 0; i < elencoFilm.length; i++) {
                     var film = elencoFilm[i];
                     console.log(film);
                     disegna_card(film);
                 }
             },
             'error': function(){
                 console.log('errore');
             }

         })

         $.ajax({
             'url': 'https://api.themoviedb.org/3/search/tv',
             'method': 'GET',
             'data': {
                 'api_key': '293167d93b32235a7163c8c41e8172d5',
                 'query': searchUser,
                 'language': 'it-IT'
             },
             'success': function(risposta){

                 var elencoSerie = risposta.results;

                 // Ciclare i risultati
                 for (var i = 0; i < elencoSerie.length; i++) {
                     var serie = elencoSerie[i];
                     console.log(serie);
                     disegna_card(serie);
                 }
             },
             'error': function(){
                 console.log('errore');
             }

         })


     } else {
         // l'utente ha digitato meno di 2 caratteri
         alert('devi digitare almeno 2 caratteri');
     }

 }

 function resetRisultati (){
     // ripulisco la ricerca precedente
     $('.elencofilm .cardfilm').empty();
     // Ripulisco la ricerca inserita dall'utente nell'input
     $('#text-search').val('');
 }

function disegna_card(dati){

    // var vote = (dati.vote_average)/2;
    var lingua = dati.original_language;
    var titoloFilm = dati.title;
    var titoloFilmOriginal = dati.original_title;
    var titoloSerie = dati.name;
    var titoloSerieOriginal = dati.original_name;

    var context = {
        titolo_film: dati.title,
        titolo_originale_film: titolo(titoloFilm, titoloFilmOriginal),
        titolo_serie: dati.name,
        titolo_originale_serie: titolo(titoloSerie, titoloSerieOriginal),
        lingua: bandiere(lingua),
        recensioni: stelline(normalizzaVoto(dati.vote_average)),
        immagine: immagine(dati.poster_path)
    };

    var html = template(context);

    $('.elencofilm').append(html);

}

function immagine(linkImmagine){

    if (linkImmagine === null) {
        link = 'img/anteprima-vuota.jpg'
    } else {
        link = 'https://image.tmdb.org/t/p/w185' + linkImmagine;
    }
    return link
}

function titolo (title, original_title){
    var titoloOriginale = '';
    if (title !== original_title) {
        titoloOriginale= original_title;
    } else {
        titoloOriginale='';
    }
};


function normalizzaVoto (num){
    var voto5 = num / 2;
    return Math.ceil(voto5);
}

function stelline (numerostelline){
    var stella = '';
    for (var i = 1; i <= 5; i++) {
        if (i <= numerostelline) {
            stella += '<i class="fas fa-star"></i>'
        } else {
            stella += '<i class="far fa-star"></i>'
        }
    }
    return stella
}


function bandiere (lingua){
    var lingue = ['ar','be','br','ca','cz','de','dk','es','fr','gb','hu','it','ja','nl','pl','pt','en'];
    if (lingue.includes(lingua)) {
        if (lingua == 'en') {
            lingua = 'gb'
        }
        return '<img src="img/flags/' + lingua + '.png" alt="' + lingua + '">'
    }
        return lingua

}



})
