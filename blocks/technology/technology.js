function technology() {
	$(function() {
		console.log($(window).width());

		if ( $(window).width() > 1365 ) {
			parallax();
		}

		function parallax() {
			//make parallax container
			var $technology = $(".technology")
			$technology.prepend("<div class='technology__parallax'></div>");
			var $parallax = $(".technology__parallax");
			var $photoOne = $("#photoFirst");//first image
			var $photoTwo = $("#photoSecond");//second image
			$photoOne.detach();//remove from current container
			$photoTwo.detach();//remove from current container
			$photoOne.css({ "position":"static" });
			$photoTwo.css({ "position":"static" });
			$parallax.append($photoOne).append($photoTwo);//append to parallax container

			$(".technology__info--iconed").css({"margin-bottom": "31.5rem"});//move down to match the mochup after animatiom ending
			console.log("parallax container done!");

			//add scrollmagic animation
			var controller = new ScrollMagic.Controller();
			var duration = 400;
			var translate = 100;

			//ScrollMagic Scene
			var scene = (
				new ScrollMagic.Scene({
					triggerElement: ".technology",
					duration: duration,
					triggerHook: 0,
					reverse: !0
				})
				.setPin(".technology__parallax")
				//.addIndicators({name: "move"})//uncomment if you want indicators 
				.addTo(controller),

				new ScrollMagic.Scene({
					triggerElement: ".technology",
					duration: duration,
					triggerHook: 0,
					reverse: !0
				}).on("progress", function(e) {
					Math.abs(parseFloat( $(".technology__parallax").css("margin-top")) );
					console.log(e.progress);
					$(".technology__parallax").css({
							"-webkit-transform": "translateY(-" + translate * e.progress + "px)",
							"-moz-transform": "translateY(-" + translate * e.progress + "px)",
							"-ms-transform": "translateY(-" + translate * e.progress + "px)",
							"-o-transform": "translateY(-" + translate * e.progress + "px)",
							transform: "translateY(-" + translate * e.progress + "px)"
						})
					})
				.addTo(controller)
			);//end ScrollMagic scene

		}//end parallax
	 
	/*function unParallax() {
			var $technology = $(".technology")
			var $parallax = $(".technology__parallax");
			var $photoOne = $("#photoFirst");
			var $photoTwo = $("#photoSecond");
			$photoOne.detach();
			$photoTwo.detach();
			$photoOne.css({ "position":"absolute", "transform": "translateY(0)" });
			$photoTwo.css({ "position":"absolute", "transform": "translateY(0)" });
			$technology.append($photoOne).append($photoTwo);
			console.log("parallax container undone!");

			scene.on("remove", function (event) {
    		console.log('Scene was removed from its controller.');
			});
		}*/
	});//end ready
	
}//end technology