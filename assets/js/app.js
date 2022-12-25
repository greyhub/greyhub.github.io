(function($) { "use strict";

  /* ===== Preloader =====*/
  jQuery(window).on('load',function(){
    //jQuery(".preloader").fadeOut(1000);
    $(".preloader").delay(300).fadeOut("slow");
  });
  /* ===== Preloader end =====*/

  /*=== sticky navabr js ===*/
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }
  });
  /*=== sticky navabr js ===*/

  /*=== Responsive Toggle menu js ===*/
  $(document).ready(function(){	
      
      // mobile menu
      $('.hamburger').click(function (event) {
        $(this).toggleClass('h-active');
        $('.main-nav').toggleClass('slidenav');
      });

      $('.main-nav > ul > li > a.nav-link').click(function (event) {
        $('.hamburger').removeClass('h-active');
        $('.main-nav').removeClass('slidenav');
      });

    $(".main-nav .fl").on('click', function(event) {
      var $fl = $(this);
      $(this).parent().siblings().find('.sub-menu').slideUp();
      $(this).parent().siblings().find('.fl').addClass('flaticon-plus').text("+");       
      if($fl.hasClass('flaticon-plus')){
        $fl.removeClass('flaticon-plus').addClass('flaticon-minus').text("-");
      }else{
        $fl.removeClass('flaticon-minus').addClass('flaticon-plus').text("+");
      }
      $fl.next(".sub-menu").slideToggle();
    });

  });	
/*=== Responsive Toggle menu js end ===*/

  /*===== Search bar js ======*/
  var submitIcon = $('.search-btn i');
  var inputBox = $('.searchbox-input');
  var searchBox = $('.searchbox');
  var isOpen = false;
  submitIcon.click(function(){
    if(isOpen == false){
        searchBox.addClass('searchbox-open');
        submitIcon.attr('class', 'bx bx-x');
        inputBox.focus();
        isOpen = true;
    } else {
      searchBox.removeClass('searchbox-open');
      submitIcon.attr('class', 'bx bx-search');
      inputBox.focusout();
      isOpen = false;
    }
  });

  submitIcon.mouseup(function(){
      return false;
  });

  searchBox.mouseup(function(){
      return false;
  });

  $(document).mouseup(function(){
    if(isOpen == true){
      $('.searchbox-icon').css('display','block');
      submitIcon.click();
    }
  });
  /*===== Search bar js end ======*/
  
  /*=== Text Animation ===*/
  var words = personal_titles,
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 15,
  speed = 70;
  var wordflick = function () {
  setInterval(function () {
  if (forwards) {
  if (offset >= words[i].length) {
      ++skip_count;
      if (skip_count == skip_delay) {
      forwards = false;
      skip_count = 0;
      }
  }
  }
  else {
  if (offset == 0) {
      forwards = true;
      i++;
      offset = 0;
      if (i >= len) {
      i = 0;
      }
  }
  }
  part = words[i].substr(0, offset);
  if (skip_count == 0) {
  if (forwards) {
      offset++;
  }
  else {
      offset--;
  }
  }
  $('.slider-area .slider-content .animated-title .word').text(part);
  },speed);
  };

  $(document).ready(function () {
  wordflick();
  });
  /*=== Text Animation  End ===*/

  /*=== Screen Color Mood js ===*/
  const toggle = document.getElementById("toggle")
  const body = document.querySelector("body")

  toggle.onclick = function() {
    toggle.classList.toggle("active");
    body.classList.toggle("active");
  };
  /*=== Screen Color Mood js end ===*/
 
  /* ============= external js: isotope.pkgd.js ==========*/

  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: 5
    }
  });
  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this).find('.number').text();
      return parseInt( number, 10 ) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this).find('.name').text();
      return name.match( /ium$/ );
    }
  };
  // bind filter button click
  $('.filters-button-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });
  /*======== external js: isotope.pkgd.js End =======*/

  /*=== Pikacho Button js  ===*/
  const submit = document.querySelector(".btn-submit");
  const Pikachu = document.querySelector(".pikachu");

  submit.addEventListener("click", appear)

  function appear() {
    toggleAppear()
    setTimeout(function(){
      toggleAppear()
    }, 1000)
  };

  function toggleAppear(){
    Pikachu.classList.toggle("active")
  };
  /*=== Pikacho Button js end ===*/

 
  //wow
  new WOW().init();
  window.wow = new WOW(
    {
    boxClass:     'wow',      // default
    animateClass: 'animated', // default
    offset:       0,          // default
    mobile:       true,       // default
    live:         true,        // default
    offset: 100
  }
  )
  window.wow.init();


}(jQuery));