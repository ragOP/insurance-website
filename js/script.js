(function() {
  function isStrictMode() {
    return !this;
  }

  function isStrictMode() {
    "use strict";
    return !this;
  }

	var newTitle = document.getElementById("title").textContent;
	document.head.querySelector('title').innerText = newTitle;
	document.head.innerHTML += '<meta name="title" content="' + newTitle + '">';
	
	
  $(document).ready(function() {
    var s = 1;
    $('form fieldset').each(function() {
      $(this).attr('data-q', s++);
    });

    function goNext(el) {
      var step = el.parents('fieldset').last();
      step.fadeOut(function() {
        step.next().fadeIn(function(){
			var q = $('form fieldset:visible').data('q');
			if (q >= 2) {$('.frm-title,.act-btn').hide()}  
		});
      });
      if (step.next().hasClass('checkpoint') ) {
        $.steps();
      }
	 var element = step;
	 $('html, body').animate({
		scrollTop: '+=' + (element.offset().top - $(window).scrollTop()  - 50),
	  },800);
		


		var insured = $('#insured').find('.clicked').data('ans');
		var miles = $('#drive').find('.clicked').data('ans');
		
		
		  if (typeof insured !== 'undefined') {
			var urlParams = new URLSearchParams(window.location.search);
			urlParams.set('insured', insured);
			var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
			window.history.pushState(null, null, newUrl);
		  }

		  if (typeof miles !== 'undefined') {
			var urlParams = new URLSearchParams(window.location.search);
			urlParams.set('miles', miles);
			var newUrl = window.location.origin + window.location.pathname + '?' + urlParams.toString();
			window.history.pushState(null, null, newUrl);
		  }

		
		
		

    }

    $(document).on('click', ".btn-nxt", function() {
      $(this).addClass("clicked");
      goNext($(this));
    });
	  



		var slidesToShowValue = $('.testimonial-slider').data('slides-to-show') || 1;

		var sliderOptions = {
		  slidesToShow: slidesToShowValue,
		  slidesToScroll: 1,
		  autoplay: true,
		  autoplaySpeed: 2000,
		  infinite: true,
		  dots: false,
		  arrows: false,
		  responsive: [
			{
			  breakpoint: 768, // Adjust this value according to your desired breakpoint
			  settings: {
				slidesToShow: 1
			  }
			}
		  ]
		};

		$('.testimonial-slider').slick(sliderOptions);


	  
	  

	$('.btn-scroll').click(function() {
		$('html, body').animate({
		scrollTop: $($(this).attr('href')).offset().top - 50
		}, 1000);
	});


	  $.days();
	  $.cta();
	  

  });
	
	
	
	
	
  var ans1,ans2;

  $.steps = function() {
    var totalSteps = 3;
    var progressPercent = 0;
    var stepDuration = 3000;
    var currentStep = 1;
    var textElement = $('.steps-text');

    var steps_black = ["Reviewing Your Answers", "Matching You With the Best Options", "Confirmation of Eligibility"];
    var steps_red = ["Answers Reviewed.", "Successfully Matched.", "Confirmed."];

	  

	showProgress(currentStep);

    var timeVar = setInterval(function() {
      currentStep++;
      showProgress(currentStep);
    }, stepDuration);

    function updateProgressBar(currentStep, totalSteps) {
      var progressBar = $('.progress-bar');
	  setTimeout(function() {
		  progressPercent = ((currentStep + 1)  / totalSteps) * 100;
		  progressBar.css({
			'width': progressPercent + '%',
			'transition': 'width ' + stepDuration + 'ms ease-in'
		  });
	 }, 1000);	
		
    }
	  
	  

	function showProgress(step) {
	  var stepsCirc = $('.steps-circ');
	  if (stepsCirc.children('span').length !== totalSteps) {
		stepsCirc.empty();
		for (var i = 1; i <= totalSteps; i++) {
		  stepsCirc.append('<span></span>');
		}
	  }

	  if (step <= totalSteps) {
			var currentDescription = steps_black[step - 1];
			var currentText = '';
			var currentIndex = 0;

			var typingInterval = setInterval(function() {
			  currentText += '.';
			  textElement.text(currentDescription + currentText);
			  currentIndex++;

			  if (currentIndex >= 3) {
				clearInterval(typingInterval);
				setTimeout(function() {
				  var currentDescriptionRed = '<span>' + steps_red[step - 1] + '</span>';
				  textElement.html(currentDescriptionRed);
				  stepsCirc.find('span').eq(step - 1).addClass('active');
				}, 1000);
				  
				updateProgressBar(step, totalSteps);
			  }
		}, 400);
		  

		  
		  
	  } else {
		clearInterval(timeVar);
			$('html, body').animate({
				scrollTop: '+=' + ($('#form').offset().top - $(window).scrollTop()  - 50),
			},800);
		  
		   $('.step-animation').hide();

			ans1 = $('fieldset#insured').find('.clicked').data('ans');
			ans2 = $('fieldset#drive').find('.clicked').data('ans');

			if (ans1 == "yes" && ans2 == "no") {
				$('.result.call').fadeIn(function(){
					$('#form').addClass('done');
					setTimeout(function() {
					  $('#form').removeClass('done');
					}, 12000);
					interval = setInterval(startTimer, 1000);
				});
			}else{
				//$('.result.sorry').fadeIn()
				$('.result.call').fadeIn(function(){
					
					$('.bform').hide();
					$('.review-box').show();
					$('#form').addClass('done');
					setTimeout(function() {
					  $('#form').removeClass('done');
					}, 12000);
					interval = setInterval(startTimer, 1000);
				});
			}

		  
	  }
	}
	  
	  

	  
  };
	

	var interval = 0;
	var $timer = $('.time span');
	var timer = 180;

	function startTimer() {
		{
			if (timer < 2) clearInterval(interval);
			var seconds = timer % 60;
			if (seconds < 10) seconds = '0' + seconds;
			$timer.text( Math.floor(timer / 60) + ':' + seconds );
			timer--;

			if (timer == 0) $timer.html("Done");
		};
	}

	$.days = function(){
		var displayedDays = [];

		$('.trust-date').each(function() {
			var $this = $(this);
			var randomDays = Math.floor(Math.random() * 20) + 1;
			while (displayedDays.includes(randomDays) || randomDays > 30) {
			  randomDays = Math.floor(Math.random() * 30) + 1;
			}
			displayedDays.push(randomDays);
			$this.text(randomDays + ' days');
		});
	}


	
	
	
	
	
	




	

	
	

	$(window).resize(function() {
		checkWidth();
	});

	function checkWidth() {
	  if ($('.hero').length > 0) {
		if ($(window).width() < 576) {
		  $('body').append($('.act-btn'));
		} else {
		  $('.hero').append($('.act-btn'));
		}
	  }
	}

	checkWidth();

	
	
	
		
	$.cta = function() {
		var lastScrollTop = 0;
		var itemVisible = false;
		var ctacont = $('.act-btn');
		
		if($(window).width() < 576){
			$(window).scroll(function() {
			  var st = $(this).scrollTop();
			  var fm = $('#form');	
			  if (st > lastScrollTop){  
				if(!itemVisible && (st > fm.offset().top + fm.height())){
				  itemVisible = true;
				  ctacont.addClass('sh');
				}
			  } else { 
				if(itemVisible && (st < fm.offset().top)){
				  itemVisible = false;
				  ctacont.removeClass('sh');
				}
			  }
			  lastScrollTop = st;
			});
		}
	}
	

	
	
	
	
})();