jQuery( document ).ready(function() {

  const closeButtonClass = typeof erycModalParams !== 'undefined' && erycModalParams.closeClass != undefined ? erycModalParams.closeClass : 'er-btn-white';

  const elementsOutsideModal = [];
  const closeButton = "<a href=\"\" class=\"" + closeButtonClass + " modal-close\"><i class=\"fas fa-times\"><\/i><\/a>";
  const $mobileMenu = jQuery('.g-offcanvas-right .g-offcanvas-toggle');

  jQuery('body').prepend(
    '<div id=\"er-modal\" class=\"er-modal-background\">' +
    '<div class=\"er-modal-content\">' +
    '<div class=\"er-modal-heading\">' +
    '<\/div>' +
    '<div class=\"er-modal-body\">' +
    '<\/div>' +
    '<\/div>' +
    '<\/div>'
  );

  const modal = document.getElementById('er-modal');

  jQuery(document.body).on('click', '.modal-open', function(e) {
    e.preventDefault();
    e.stopPropagation();
    preventTabOutside(modal);

    const $clickedElement = jQuery(this);
    const $modalContent = $clickedElement.next('.modal-injected-content').length > 0 ? $clickedElement.next('.modal-injected-content') : $clickedElement.parent().next('.modal-injected-content');
    const customClass = ($modalContent.data('class') && $modalContent.data('class') !== '') ? $modalContent.data('class') : '';
    const $html = jQuery('html');

    $mobileMenu.addClass('hidden');
    jQuery('.er-modal-content').addClass(customClass);
    jQuery('.er-modal-heading').html(closeButton + $modalContent.data('title'));
    jQuery('.er-modal-body').html($modalContent.data('body') != undefined ? $modalContent.data('body') : $modalContent.html());
    jQuery('.er-modal-background').css({"display": "flex"});
    jQuery('body').css({"overflow": "hidden"});

    const $modalClose = jQuery('.modal-close');

    $modalClose.click(function(e) {
      e.preventDefault();
      modalClose($clickedElement, customClass);
    });

    $modalClose.keydown(function(e) {
      if (parseInt(e.keyCode) === 13) {
        e.preventDefault();
        modalClose($clickedElement, customClass);
      }
    });

    $html.click(function(e) {
      if (!jQuery(e.target).closest('.er-modal-content').length) {
        e.preventDefault();
        modalClose($clickedElement, customClass);
      }
    });

    $html.keydown(function(e) {
      if (parseInt(e.keyCode) === 27) {
        e.preventDefault();
        modalClose($clickedElement, customClass);
      }
    });
  });

  function modalClose($clickedElement, customClass) {
    jQuery('.er-modal-content').removeClass(customClass);
    jQuery('.er-modal-background').hide();
    jQuery('body').css({"overflow": "scroll"});
    $mobileMenu.removeClass('hidden');
    enableTabOutside();
    $clickedElement.focus();
    $clickedElement.blur();
    jQuery('.modal-close').unbind();
    jQuery('html').unbind();
    return -1;
  }

  function preventTabOutside(modal) {
    const tabbableElements = document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    for (let i=0; i < tabbableElements.length; i++) {
      if (!modal.contains(tabbableElements[i])) {
        tabbableElements[i].setAttribute("tabindex","-1");
        elementsOutsideModal.push(tabbableElements[i]);
      }
    }
  }

  function enableTabOutside() {
    elementsOutsideModal.forEach(function(elem) {
      elem.setAttribute("tabindex", "0");
    });

    elementsOutsideModal.length = 0;
  }
});