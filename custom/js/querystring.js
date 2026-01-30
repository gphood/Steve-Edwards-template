// Get query string parameter as string
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Get URL parameters as array
function getUrlParameters() {
  var query   = window.location.search.slice(1);
  var querys  = query.split('&');
  var array   = {};

  if (query.length > 0) {
    for (var i = 0; i < querys.length; i++) {
      var split = querys[i].split('=');
      array[split[0]] = decodeURIComponent(split[1].replace(/\+/g, ''));
    }
  }

  return array;
};

// Add canonical link
function addErycCanonicalLink(url) {
  const head = document.head || document.getElementsByTagName('head')[0];
  let canonicalLink = document.querySelector('link[rel="canonical"]');

  if (canonicalLink) {
    // If a canonical link already exists, replace the href attribute
    canonicalLink.href = url;
  } else {
    // Create a new canonical link element
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    head.appendChild(canonicalLink);
  }
}
