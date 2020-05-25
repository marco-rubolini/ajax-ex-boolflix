$(document).ready(function(){

    var source   = $("#template-film").html();
    var template = Handlebars.compile(source);

// Intercetto il click sul pulsante di ricerca
$('#search-button').click(function(){
    ricercaFilm();
})

$('#text-search').keypress(function(event){
    if (event.which == 13) {
        ricercaFilm();
    }
});


 function ricercaFilm (){
     // Recupero la query di ricerca inserita dall'utente
     var searchUser = $('#text-search').val();
     // ripulisco la ricerca precedente
     $('ul').remove();
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
             console.log(risposta.results);
             var elencoFilm = risposta.results;
             console.log(elencoFilm);

             // Ciclare i risultati
             for (var i = 0; i < elencoFilm.length; i++) {
                 var film = elencoFilm[i];
                 console.log(elencoFilm[i]);
                 console.log(elencoFilm[i].title);
                 console.log(film.title);
                 console.log(elencoFilm[i].original_title);
                 console.log(elencoFilm[i].original_language);
                 console.log(elencoFilm[i].vote_average);

                 // per ogni film restituito, stamparne in pagina:
                 // titolo
                 var titolo = elencoFilm[i].title;
                 // titolo originale
                 var titoloOriginale = elencoFilm[i].original_title;
                 // lingua
                 var lingua = elencoFilm[i].original_language;
                 // voto
                 var voto = elencoFilm[i].vote_average;

                 var context = {
                     titolo_film: titolo,
                     titolo_originale: titoloOriginale,
                     lingua: lingua,
                     recensioni: voto
                 };

                 var html = template(context);

                 $('.elencofilm').append(html);
                 // // per ogni film restituito, stamparne in pagina:
                 // // titolo
                 // var titolo = 'Titolo ' + elencoFilm[i].title;
                 // // titolo originale
                 // var titoloOriginale = 'Titolo originale ' + elencoFilm[i].original_title;
                 // // lingua
                 // var lingua = 'Lingua originale ' + elencoFilm[i].original_language;
                 // // voto
                 // var voto = 'Voto ' + elencoFilm[i].vote_average;
                 // stampo in pagina
                 // var stamparisultato = $('.container').append('<ul><li>' + titolo + '</li><li>' + titoloOriginale + '</li><li>' + lingua + '</li><li>' + voto + '</li>');
             }
         },
         'error': function(){
             console.log('errore');
         }

     })
 }

})
