$(document).ready(function() {
	/* MAPS */
   loadMainMap();

   /* ACCORDION AND BREADCRUMB */
	var w = $(window).width();
	if (w <= 767) {
		$("#summary_accordion, #map_accordion, #cancellation_accordion").removeClass("in").css("height","0px");
		$("#summary_accordion").addClass("in").css("height","auto");

		$(".accordion-toggle .icon-play").removeClass("icon-open");
		$(".accordion-toggle .icon-play").first().addClass("icon-open");
	} else {
		$("#summary_accordion, #map_accordion, #cancellation_accordion").removeClass("in").addClass("in").css("height","auto");
	}

   $(window).resize(function() {
      var w = $(this).width();

      if (w <= 767) {
			$("#summary_accordion, #map_accordion, #cancellation_accordion").removeClass("in").css("height","0px");
			$("#summary_accordion").addClass("in").css("height","auto");

			$(".accordion-toggle .icon-play").removeClass("icon-open");
			$(".accordion-toggle .icon-play").first().addClass("icon-open");
		} else {
			$("#summary_accordion, #map_accordion, #cancellation_accordion").removeClass("in").addClass("in").css("height","auto");
		}
	});	

   $(".accordion-heading").click(function() {
      var close = false;
      if ($("i",this).hasClass("icon-open")) {
         close = true;
      }
      $(".icon-play").removeClass("icon-open");
      if (close == false) {
         $(".icon-play",this).addClass("icon-open");
      }
   });
});
