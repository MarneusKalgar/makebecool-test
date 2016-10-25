function menuBtn() {

	window.addEventListener("DOMContentLoaded", function() {

		var btn = document.querySelectorAll(".menu-btn");
		var item;

		[].forEach.call(btn, function(item) {
			toggleHandler(item); 
		});

		function toggleHandler(toggle) {
			toggle.addEventListener("click", function(e) {
				e.preventDefault();
				if ( this.classList.contains("menu-btn--active")) {
					this.classList.remove("menu-btn--active");
				} else {
					this.classList.add("menu-btn--active")
				}
			});
		}
	});

}