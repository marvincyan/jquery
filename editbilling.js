$(document).ready(function() {
	var ccPattern = new RegExp(/^[0-9]{15,16}$/);

	$("input#cc_number").blur(function() {
		var cc = $(this).val();
		$("#alert-danger").hide().html("");
		$("#card_title").removeClass("error-text");
      $(this).removeClass("error-border");

      if ( (cc != "") && (ccPattern.test(cc) === false) ) {
			$("#alert-success").hide();
			$("#alert-danger").show().html("The credit card you entered is invalid.");
			$("#card_title").addClass("error-text");
			$(this).addClass("error-border");
      }
   });
});
