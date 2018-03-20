$(document).ready(function() {

  /*
  * A LA VALIDATION DU FORMULAIRE, ON ENREGISTRE L'EMAIL EN BDD
  */

  $('form').on('submit' ,function(e) {
      e.preventDefault();
      var email = $(this).find('input[type=email]').val();

      data = {
          "email": email
      };

      $.ajax({
          type : 'POST',
          url : 'landings/add',
          data : data,
          success: function(response) {
              console.log(response);

              if(response == 'ok') {
                  $('form').empty();
                  var content = 
                    '<p class="green">Félicitations ! Vous faites désormais partie de la grande famille <strong>Noddi</strong><br /><br />' +
                      '<a target="_blank" href="https://vine.co/v/euJZIBFEmbX">https://vine.co/v/euJZIBFEmbX</a>' +
                    '</p>'
                  ;
                  $('form').append(content);
              } else {
                  $('form').prepend('<div class="red">Cet e-mail a déjà été saisi !</div>');
              }
          },
          error: function(){
              console.log('error');
          }
      });
  });

  /*
  * POUR FERMER LA POPUP
  */

  var popup_shown = false;

  $(document).on('click', '.popup_snapchat .close', function() {
    $(this).parent().hide();
    popup_shown = false;
  });

  $('body').not($('.popup_snapchat')).on('click', function() {
    if(popup_shown == true) {
      $('.popup_snapchat').hide();
      popup_shown = false;
    }
  });

  /*
  * AU CLIC SUR LES RESEAUX SOCIAUX, ON ENREGISTRE LE CLIC EN BDD
  */

  $('.socials li a').on('click' ,function(e) {
      var social = $(this).attr('class');

      if(social == 'snapchat') {
        e.preventDefault();
        if(popup_shown === false) {
          $('.popup_snapchat').show();
          setTimeout(function(){popup_shown = true;}, 100);
        }
        
      }

      data = {
          "name": social
      };

      $.ajax({
          type : 'POST',
          url : 'clics/add',
          data : data,
          success: function(response) {
              console.log(response);
          },
          error: function(){
              console.log('error');
          }
      });
  });

  function rand(min, max) {
    var the_random = Math.random() * (max - min + 1) + min;
    return the_random;
  }

  function rand_floor(min, max) {
    var the_random = Math.floor(Math.random() * (max - min + 1) + min);
    return the_random;
  }

  /*
  * SI ON EST SUR ORDINATEUR (pour le hover) ON PERMET L'ANIMATION SUR LE LOGO
  */

  if(($(window).width() > 800)) {

    $('svg').hover(

      function() {
        $('.animation polygon, .animation path, .animation polyline').each(function() {
          $(this).css('-webkit-transform', 'rotate('+rand_floor(-20, 20)+'deg) translate3d('+rand(-3, 3)+'em, 0em, 0)');
          $(this).css('-o-transform', 'rotate('+rand_floor(-20, 20)+'deg) translate3d('+rand(-3, 3)+'em, 0em, 0)');
          $(this).css('-moz-transform', 'rotate('+rand_floor(-20, 20)+'deg) translate3d('+rand(-3, 3)+'em, 0em, 0)');
          $(this).css('-ms-transform', 'rotate('+rand_floor(-20, 20)+'deg) translate3d('+rand(-3, 3)+'em, 0em, 0)');
          $(this).css('transform', 'rotate('+rand_floor(-20, 20)+'deg) translate3d('+rand(-3, 3)+'em, 0em, 0)');
        });

      }, function() {
        $('.animation polygon, .animation path, .animation polyline').css('-webkit-transform', 'rotate(0deg) translate3d(0em, 0em, 0)');
        $('.animation polygon, .animation path, .animation polyline').css('transform', 'rotate(0deg) translate3d(0em, 0em, 0)');
        $('.animation polygon, .animation path, .animation polyline').css('-moz-transform', 'rotate(0deg) translate3d(0em, 0em, 0)');
        $('.animation polygon, .animation path, .animation polyline').css('-o-transform', 'rotate(0deg) translate3d(0em, 0em, 0)');
        $('.animation polygon, .animation path, .animation polyline').css('-ms-transform', 'rotate(0deg) translate3d(0em, 0em, 0)');
      }

    );
  }

});
