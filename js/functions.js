/*
*	FONCTIONS GENERIQUES
*/

var _this = this;

if(!isIE()) {
	_this.which_loader = $('.loader');
} else {
	_this.which_loader = $('.loaderIE');
}

function makeAjax(type, url, data, callback) {

	$.ajax({
		type : type,
		url : url,
		data : data,
		success: function(response_get) {
			// La variable globale de reponse est remplacée à chaque requête AJAX
			_this.response = response_get;
			callback();
		},
		error: function(){
			console.log('error', url);
    }
	});
}

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    window.browser_response;

    if (msie > 0) { // If Internet Explorer, return version number
      if(parseInt(ua.substring(msie + 5, ua.indexOf(".", msie))) < 10) {
        //window.browser_response = 'isIE';
        return true;
      } else {
        //window.browser_response = 'isNotIE';
        return false;
      }
      
    } else {
      //window.browser_response = 'isNotIE';
      return false;
    }
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function validateWebsite(website) {
    var re = /^http(s)?:\/\/(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    return re.test(website);
}

function calculateAge(date) { // birthday is a timestamp
    var ageDifMs = Date.now() - date;
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}


/*
*	FONCTION POUR AFFICHER LE LOADER
*/

function showLoading() {
	$('.loader').show();
}

/*
*	FONCTION POUR CACHER LE LOADER
*/

function hideLoading() {
	$('.loader').hide();
}

function shortName(name) {
  return name.substr(0, 1)+'.';
}

function popError(description) {

  if(description != undefined) {
    swal({
      type: 'error',
      title: "Erreur",
      text: description
    });
  } else {
    swal({
      type: 'error',
      title: "Erreur"
    });
  }
}

function popSuccess(description) {

  if(description != undefined) {
    swal({
      type: 'success',
      title: "Succès !",
      text: description
    });
  } else {
    swal({
      type: 'success',
      title: "Succès !"
    });
  }
}
