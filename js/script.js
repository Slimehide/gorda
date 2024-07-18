$(document).ready(function(e){
	$('.menu__btn>a').on('click', function(e){
		e.preventDefault();
		if ($(this).hasClass('opened')) {
			$(this).removeClass("opened");
			$('body,html').css("overflow-y", "initial");
			$('.menu').css("top" ,"-100%");
		} else {
			$(this).addClass("opened");
			$('.menu').css("top" ,"0px");
			$('body,html').css("overflow-y", "hidden");
		}
	});

	$('.contact__btn').on('click' ,function(e){
		e.preventDefault();
		$('body,html').css('overflow-y' ,"hidden");
		$('.popup__wrapper').fadeIn(300);
	});
	$('.popup__wrapper .box>a').on("click" ,function(e){
		e.preventDefault();
		$(this).closest('.popup__wrapper').fadeOut(300);
		$('body,html').css('overflow-y' , "initial");
	});

	$('.scrollable__link').on("click" ,function(e){
		e.preventDefault();
		let  dis  = $(this).attr("data-scroll");
		$('html').animate({ 
    	    scrollTop: $(dis).offset().top - $("header").outerHeight()
        }, 800 
        );
        if ($(window).width() < 991) {
        	$('.menu__btn>a').removeClass('opened');
        	$('.menu').css('top', "-100%");
        	$('body,html').css("overflow-y" ,"initial");
        }
	});
	 function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}	
	$('body').on(".error input" ,"input" ,function(){
		$(this).closest(".error").removeClass('error');		
	});

	$('.popup__wrapper form').on("submit" ,function(e){
		e.preventDefault();
		let errors = 0;
		$('.popup__wrapper .validate').each(function(index,elem){
			if ($(elem).hasClass("regular")) {
				if ($(elem).find("input").val().length == 0) {
					$(elem).addClass('error');
					errors++;
				}
			}
			if ($(elem).hasClass("email")) {
				if ($(elem).find("input").val().length == 0 || !validateEmail($(elem).find("input").val())) {
					$(elem).addClass('error');
					errors++;
				}
			}
		});
		if (errors == 0) {
			var formData = {
                name: $('.fname').val(),
                surname: $('.sname').val(),
                email: $('.email__field').val()
            };
			$.ajax({
			    url: 'https://formspree.io/f/mqazanoj',
                data: formData,
                type: 'POST',
                 dataType: 'json',
			    success: function(data) {
			    	$('.popup__wrapper form').css('display' ,"none");
			    	$('.success').fadeIn(300);
			    },
			    error: function( jqXHR, textStatus, errorThrown ) {},
			    complete: function(  jqXHR, textStatus ) {}
			});
		}
	});
});