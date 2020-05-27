$(document).ready(function(){

    // variabili per le chiamate ajax
    var api_key = 'c4a5d0f9204fe8ed8998978f4fb5f4c2';
    var api_url_base = 'https://api.themoviedb.org/3/';

    // preparo le variabili per handlebars (template card)
    var source   = $("#template-film").html();
    var template = Handlebars.compile(source);


// Intercetto il click sul pulsante di ricerca
$('#search-button').click(function(){
    ricercaFilm();

})

// intercetto i tasti nella stringa di ricerca
$('#text-search').keyup(function(event){
    if (event.which == 13) {
        // l'utente ha premuto il tasto INVIO
        ricercaFilm();

    }
});

$.ajax({
    'url': api_url_base + 'trending/movie/week',
    'method': 'GET',
    'data': {
        'api_key': api_key,
        // 'query': searchUser,
        'language': 'it-IT'
    },
    'success': function(risposta){
        // inserisco il testo della ricerca nel titolo e lo visualizzo
        // contestualizza_risultati(searchUser);
        gestisci_risposta_api(risposta, 'movie-trend')



        $('.trend-film').slick({
         dots: false,
         arrows: false,
         infinite: true,
         speed: 1000,
         slidesToShow: 6,
         slidesToScroll: 1,
         autoplay: true,
         autoplaySpeed: 1000,
         responsive: [
           {
             breakpoint: 1024,
             settings: {
               slidesToShow: 3,
               slidesToScroll: 1,
               infinite: true,
               dots: false
             }
           },
           {
             breakpoint: 600,
             settings: {
               slidesToShow: 2,
               slidesToScroll: 1
             }
           },
           {
             breakpoint: 480,
             settings: {
               slidesToShow: 1,
               slidesToScroll: 1
             }
           }
           // You can unslick at a given breakpoint now by adding:
           // settings: "unslick"
           // instead of a settings object
         ]
       });
        // var elencoFilm = risposta.results;
        //
        // // Ciclare i risultati
        // for (var i = 0; i < elencoFilm.length; i++) {
        //     var film = elencoFilm[i];
        //     console.log(film);
        //     disegna_card(film);
        // }
    },
    'error': function(){
        console.log('errore');
    }

});

// funzione per effettuare una ricerca a tmdb
 function ricercaFilm (){

     // Recupero la query di ricerca inserita dall'utente
     var searchUser = $('#text-search').val().trim();
     // controllo che l'utente abbia digitato qualcosa ( più di un carattere )
     if (searchUser.length > 1) {
         // rimuovo i risultati della ricerca precedente
         resetRisultati();
         // Faccio partire una chiamata ajax a tmdb per recuperare i film che corrispondo alla query di ricerca inserita dall'utente.
         $.ajax({
             'url': api_url_base + 'search/movie',
             'method': 'GET',
             'data': {
                 'api_key': api_key,
                 'query': searchUser,
                 'language': 'it-IT'
             },
             'success': function(risposta){
                 // inserisco il testo della ricerca nel titolo e lo visualizzo
                 contestualizza_risultati(searchUser);
                 gestisci_risposta_api(risposta, 'film')



                 $('.elencofilm').slick({
                  dots: false,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 6,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                  ]
                });
                 // var elencoFilm = risposta.results;
                 //
                 // // Ciclare i risultati
                 // for (var i = 0; i < elencoFilm.length; i++) {
                 //     var film = elencoFilm[i];
                 //     console.log(film);
                 //     disegna_card(film);
                 // }
             },
             'error': function(){
                 console.log('errore');
             }

         });
         // $('.elencofilm').slick('unslick');
         $.ajax({
             'url': api_url_base + 'search/tv',
             'method': 'GET',
             'data': {
                 'api_key': api_key,
                 'query': searchUser,
                 'language': 'it-IT'
             },
             'success': function(risposta){
                 // inserisco il testo della ricerca nel titolo e lo visualizzo
                 contestualizza_risultati(searchUser);
                 gestisci_risposta_api(risposta, 'serie')
                 $('.elencoserie').slick({
                  dots: false,
                  infinite: true,
                  speed: 300,
                  slidesToShow: 6,
                  slidesToScroll: 1,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                      }
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    },
                    {
                      breakpoint: 480,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                      }
                    }
                    // You can unslick at a given breakpoint now by adding:
                    // settings: "unslick"
                    // instead of a settings object
                  ]
                });

                 // var elencoFilm = risposta.results;
                 //
                 // // Ciclare i risultati
                 // for (var i = 0; i < elencoFilm.length; i++) {
                 //     var film = elencoFilm[i];
                 //     console.log(film);
                 //     disegna_card(film);
                 // }
             },
             'error': function(){
                 console.log('errore');
             }

         });
         // $('.elencoserie').slick('unslick');
         // $.ajax({
         //     'url': api_url_base + 'search/tv',
         //     'method': 'GET',
         //     'data': {
         //         'api_key': api_key,
         //         'query': searchUser,
         //         'language': 'it-IT'
         //     },
         //     'success': function(risposta){
         //         // inserisco il testo della ricerca nel titolo e lo visualizzo
         //         contestualizza_risultati(searchUser);
         //         gestisci_risposta_api(risposta, 'serie')
         //
         //         // var elencoFilm = risposta.results;
         //         //
         //         // // Ciclare i risultati
         //         // for (var i = 0; i < elencoFilm.length; i++) {
         //         //     var film = elencoFilm[i];
         //         //     console.log(film);
         //         //     disegna_card(film);
         //         // }
         //     },
         //     'error': function(){
         //         console.log('errore');
         //     }
         //
         // });
         // $.ajax({
         //     'url': api_url_base + 'search/tv',
         //     'method': 'GET',
         //     'data': {
         //         'api_key': api_key,
         //         'query': searchUser,
         //         'language': 'it-IT'
         //     },
         //     'success': function(risposta){
         //         // inserisco il testo della ricerca nel titolo e lo visualizzo
         //         contestualizza_risultati(searchUser);
         //         gestisci_risposta_api(risposta, 'serie')
         //         // var elencoFilm = risposta.results;
         //         //
         //         // // Ciclare i risultati
         //         // for (var i = 0; i < elencoFilm.length; i++) {
         //         //     var film = elencoFilm[i];
         //         //     console.log(film);
         //         //     disegna_card(film);
         //         // }
         //     },
         //     'error': function(){
         //         console.log('errore');
         //     }
         //
         // });

         // $.ajax({
         //     'url': 'https://api.themoviedb.org/3/search/tv',
         //     'method': 'GET',
         //     'data': {
         //         'api_key': '293167d93b32235a7163c8c41e8172d5',
         //         'query': searchUser,
         //         'language': 'it-IT'
         //     },
         //     'success': function(risposta){
         //
         //         var elencoSerie = risposta.results;
         //         // console.log(elencoserie);
         //
         //         // Ciclare i risultati
         //         for (var i = 0; i < elencoSerie.length; i++) {
         //             var serie = elencoSerie[i];
         //             console.log(serie);
         //             disegna_card(serie);
         //         }
         //
         //     },
         //     'error': function(){
         //         console.log('errore');
         //     }
         //
         // });


     } else {
         // l'utente ha digitato meno di 2 caratteri
         alert('devi digitare almeno 2 caratteri');
     }


 }

// SLICK
//  $(document).ajaxSuccess(function(){
//      $('.elencofilm').slick({
//    infinite: true,
//    slidesToShow: 4,
//    slidesToScroll: 1,
// });
// });


// funzione per inserire e visualizzare il titolo con il testo cercato dall'utente
function contestualizza_risultati(testo_risultati) {
    // inserisco il testo cercato dall'utente nel titolo della pagina
    $('#ricerca-utente').text(testo_risultati);
    // visualizzo il titolo della pagina
    $('.titolo-ricerca, .categoria-ricerca').addClass('visible');
    $('.risultati-ricerca').addClass('visible');
}

// funzione che recupera i dati e li cicla per poi disegnare la card
// è comune sia alle chiamate ajax per i film che per le serie
function gestisci_risposta_api(risposta_api, tipo) {
    // recupero l'array con i risultati della ricerca
    var risultati = risposta_api.results;
    // ciclo su tutti i risultati
    for (var i = 0; i < risultati.length; i++) {
        // recupero il risultato corrente
        var risultato_corrente = risultati[i];
        disegna_card(risultato_corrente, tipo);
    }
    // $('.elencofilm').slick({
    //     dots: false,
    //     infinite: false,
    //     speed: 300,
    //     slidesToShow: 8,
    //     slidesToScroll: 1,
    //     responsive: [
    //         {
    //         breakpoint: 1024,
    //         settings: {
    //         slidesToShow: 6,
    //         slidesToScroll: 1,
    //         infinite: true,
    //         dots: true
    //         }
    //         },
    //         {
    //         breakpoint: 600,
    //         settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 1
    //         }
    //         },
    //         {
    //         breakpoint: 480,
    //         settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //         }
    //         }
    //         // You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //     ]
    // });

    // $('.elencoserie').slick({
    //     dots: false,
    //     infinite: false,
    //     speed: 300,
    //     slidesToShow: 8,
    //     slidesToScroll: 1,
    //     responsive: [
    //         {
    //         breakpoint: 1024,
    //         settings: {
    //         slidesToShow: 6,
    //         slidesToScroll: 1,
    //         infinite: true,
    //         dots: true
    //         }
    //         },
    //         {
    //         breakpoint: 600,
    //         settings: {
    //         slidesToShow: 4,
    //         slidesToScroll: 1
    //         }
    //         },
    //         {
    //         breakpoint: 480,
    //         settings: {
    //         slidesToShow: 1,
    //         slidesToScroll: 1
    //         }
    //         }
    //         // You can unslick at a given breakpoint now by adding:
    //         // settings: "unslick"
    //         // instead of a settings object
    //     ]
    // });

}

function resetRisultati (){
     // ripulisco la ricerca precedente
     // $('.elencofilm, .elencoserie').slick('unslick');
     $('.elencofilm, .elencoserie, .top-rated, .serie-top-rated, .intro').empty();
     $('.elencofilm, .elencoserie, .top-rated, .serie-top-rated').removeClass('slick-initialized');
     // Ripulisco la ricerca inserita dall'utente nell'input
     $('#text-search').val('');
 }

// funzione per appendere una card ai risultati
function disegna_card(dati, tipologia) {
     // controllo se si tratta di un film o di una serie
     // in modo da leggere i dati con le chiavi corrette
     if ((tipologia == 'film') || (tipologia == 'movie-trend')){
         // si tratta di un film => leggo title e original_title
         var titolo = dati.title;
         var titolo_originale = dati.original_title;

     } else {
         // si tratta di una serie => leggo name e original_name
         var titolo = dati.name;
         var titolo_originale = dati.original_name;

     }

     // preparo i dati per il template
     var context = {
         titolo: '<strong>Titolo:</strong>' + titolo,
         titolo_originale: titolounico(titolo, titolo_originale),
         lingua: '<strong>Lingua originale: </strong>' + bandiere(dati.original_language),
         voto: '<strong>Voto: </strong>' + stelline(normalizzaVoto(dati.vote_average)),
         tipo: tipologia,
         immagine: immagine(dati.poster_path),
         trama: truncate(dati.overview)
     };
     var html = template(context);

     if (tipologia == 'film') {
         $('.elencofilm').append(html);
     } else if (tipologia == 'serie'){
         $('.elencoserie').append(html);
     } else {
         $('.trend-film').append(html)
     }
 };

 function truncate(text){
    var truncate = '';
     if (text !== truncate){
         truncate = '<strong>Overview: </strong>' + text.substring(0, 100);
         truncate += '...'
     }
    return truncate
 };

// function disegna_card(dati){
//
//     // var vote = (dati.vote_average)/2;
//     var lingua = dati.original_language;
//     var titoloFilm = dati.title;
//     var titoloFilmOriginal = dati.original_title;
//     var titoloSerie = dati.name;
//     var titoloSerieOriginal = dati.original_name;
//
//     var context = {
//         titolo_film: dati.title,
//         titolo_originale_film: titolo(titoloFilm, titoloFilmOriginal),
//         titolo_serie: dati.name,
//         titolo_originale_serie: titolo(titoloSerie, titoloSerieOriginal),
//         lingua: bandiere(lingua),
//         recensioni: stelline(normalizzaVoto(dati.vote_average)),
//         immagine: immagine(dati.poster_path)
//     };
//
//     var html = template(context);
//
//     $('.elencofilm').append(html);
//
// }

function immagine(linkImmagine){

    if (linkImmagine === null) {
        link = 'img/anteprima-vuota.jpg'
    } else {
        link = 'https://image.tmdb.org/t/p/w185' + linkImmagine;
    }
    return link
}

function titolounico (title, original_title){
    var titoloOriginale = '';
    if (title !== original_title) {
        titoloOriginale= '<strong>Titolo originale: </strong>' + original_title;
    } else {
        titoloOriginale='';
    }
    return titoloOriginale
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
        return '<img class="flag-language" src="img/flags/' + lingua + '.png" alt="' + lingua + '">'
    }
        return lingua

}



})
