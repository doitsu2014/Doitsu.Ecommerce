$(document).ready(function(){
	
	$('.o-icon').click (function(event){
		event.preventDefault();
		if( $ (this).hasClass('inOut')  ){
			$('.trendbiz-option').stop().animate({right:'0px'},500 );
		} else{
			$('.trendbiz-option').stop().animate({right:'-200px'},500 );
		} 
		$(this).toggleClass('inOut');
		return false;

	}  );

	$('.select-layout .boxed').on( "click", function(){
		$('#layout').addClass('boxed-layout');
	});	

	$('.select-layout .full-width').on( "click", function(){
		$('#layout').removeClass('boxed-layout');
	});	

	$('.select-layout .boxed').on( "click", function(){
		$('body').addClass('box-bg');
	});	
	
	$(".bg-one" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-1.png')" );
		return false;
	});
		
	$(".bg-two" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-2.png')" );
		return false;
	});
		
	$(".bg-three" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-3.png')" );
		return false;
	});
		
	$(".bg-four" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-4.png')" );
		return false;
	});
	
	$(".bg-five" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-5.png')" );
		return false;
	});
	$(".bg-six" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-6.png')" );
		return false;
	});
	$(".bg-seven" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-7.png')" );
		return false;
	});
	$(".bg-eight" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-8.png')" );
		return false;
	});
	$(".bg-nine" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-9.png')" );
		return false;
	});
	$(".bg-ten" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-10.png')" );
		return false;
	});
	$(".bg-eleven" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-11.png')" );
		return false;
	});
	$(".bg-twelve" ).click(function(){
		$("#bg" ).attr("style", "background-image:url('images/pattern/bg-12.png')" );
		return false;
	});
		
	
	$(".color1" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin1.css" );
		return false;
	});
	$(".color2" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin2.css" );
		return false;
	});
	$(".color3" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin3.css" );
		return false;
	});
	$(".color4" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin4.css" );
		return false;
	});
	$(".color5" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin5.css" );
		return false;
	});
	$(".color6" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin6.css" );
		return false;
	});
	$(".color7" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin7.css" );
		return false;
	});
	$(".color8" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin8.css" );
		return false;
	});	
	$(".color9" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin9.css" );
		return false;
	});	
	$(".color10" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin10.css" );
		return false;
	});	
	$(".color11" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin11.css" );
		return false;
	});	
	$(".color12" ).click(function(){
		$("#trenbiz" ).attr("href", "css/skin/skin12.css" );
		return false;
	});	
		
	
} );
