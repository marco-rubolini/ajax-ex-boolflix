$(document).ready(function(){

    var source   = $("#template-film").html();
    var template = Handlebars.compile(source);


// Intercetto il click sul pulsante di ricerca
$('#search-button').click(function(){
    ricercaFilm();
})

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

    var vote = parseInt(dati.vote_average)/2

    var context = {
        titolo_film: dati.title,
        titolo_originale: dati.original_title,
        lingua: dati.original_language,
        recensioni : disegnaStelle(vote)
    };

    var html = template(context);

    $('.elencofilm').append(html);
}

function disegnaStelle (num){
    var stars = '';
    for (var i = 0; i < num; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    return stars
}


})
