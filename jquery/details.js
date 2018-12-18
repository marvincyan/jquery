$(document).ready(function() {

	/* ACCORDION AND BREADCRUMB */
   var w = $(window).width();
   if (w <= 767) {
      $("#breakdowns, #descriptions, #photos, #faqs, #reviews").removeClass("in").css("height","0px");
      $("#breakdowns").addClass("in").css("height","auto");

      $(".accordion-toggle .icon-play").removeClass("icon-open");
      $(".accordion-toggle .icon-play").first().addClass("icon-open");

		/* BREADCRUMB */
      $("ul.breadcrumb li#home i").removeClass("icon-home").addClass("icon-backward");
      $("ul.breadcrumb li#lot_name").css("display","none");
   } else {
      $("#breakdowns, #descriptions, #photos, #faqs, #reviews").removeClass("in").addClass("in").css("height","auto");

      /* BREADCRUMB */
      $("ul.breadcrumb li#home i").removeClass("icon-backward").addClass("icon-home");
      $("ul.breadcrumb li#lot_name").css("display","inline");
   }

   $(window).resize(function() {
      var w = $(this).width();

      if (w <= 767) {
         $("#breakdowns, #descriptions, #photos, #faqs, #reviews").removeClass("in").css("height","0px");
         $("#breakdowns").addClass("in").css("height","auto");

         $(".accordion-toggle .icon-play").removeClass("icon-open");
         $(".accordion-toggle .icon-play").first().addClass("icon-open");

			/* BREADCRUMB */
         $("#home i").removeClass("icon-home").addClass("icon-backward");
         $("ul.breadcrumb li#lot_name").css("display","none");
      } else {
         $("#breakdowns, #descriptions, #photos, #faqs, #reviews").removeClass("in").addClass("in").css("height","auto");

         /* BREADCRUMB */
         $("#home i").removeClass("icon-backward").addClass("icon-home");
         $("ul.breadcrumb li#lot_name").css("display","inline");
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
	
	/* MAPS */
	loadSidebarMap();

	/* DAILY RATE AND TOTAL PRICE TOGGLE */
	var elid = $(".rate-toggle.active").attr("id");
	$("."+elid+"_price").css("display","block");

	$(".rate-toggle").click(function() {
		if ($(this).attr("id") == "daily") {
			$(".daily_price").css("display","block");
			$(".total_price").css("display","none");
		} else {
			$(".daily_price").css("display","none");
         $(".total_price").css("display","block");
		}
	});

	/* READ MORE REVIEWS */
	$("#read_more").hover(function() {
		$(this).css("cursor","pointer");
	});
	$("#read_more").click(function() {
		$(".each_review.disabled").each(function(i) {
			if (i == 9) { return false; }
			i = i+1;
			$(this).slideDown().removeClass("disabled");
		});
	});
	
	//SET Originate Select AirportCode
	document.updatefrm.url.value = $("#airport").val();
});

function updateSearch() {
	 var url = $("#airport").val();
	 var selected_airport = document.updatefrm.url.value
	 if( selected_airport != url){
   	document.updatefrm.url.value = url;
   }else{
   	document.updatefrm.url.value = '';
   }
   
   document.updatefrm.submit();
}
function sortList(selectedSort) {
	document.sortfrm.sort_by.value = selectedSort;
	document.sortfrm.submit();
}
function filterList(selectedFilter) {
   document.filterfrm.parking_type.value = selectedFilter;
   document.filterfrm.submit();
}
