function checkFields(formName) {
  /* EMAIL SYNTAX */
  var emailPattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);

  /* PASSWORD SYNTAX */
  var passwordPattern = new RegExp(/^[a-zA-Z0-9._-]{6,20}$/);

  /* ZIP code pattern */
  var zipCodePattern = new RegExp(/^[0-9]{5}$/);

  /* DEFAULTS */
  var valid = true;
  var email = false;
  var password = false;
  var username = false;
  var message = "";
  var div_name = "hi";

  if (formName) {
    formName = "#" + formName;
  }
  if ((formName == '#reserve1') && (($("#create").attr("checked") == "checked") || ($("#different_user").attr("value") == "off")  )) {
    return true;
  };

  $(".control-group").removeClass("error");
  $(".controls .required").css("border", "1px solid #cccccc");
  $(".controls i, .error_msg, .error_msg2").css("display", "none");

  $('form' + formName + ' .required').each(function() {
    div_name = $(this).attr("name");

    if ($(this).val() == '') {
      valid = false;

      if ((div_name == "cc_month") || (div_name == "cc_year")) {
        div_name = "expiration";
      }
      $("#" + div_name).addClass("error");
      $("#" + div_name + " .controls .required").css("border", "1px solid red");
      $("#" + div_name + " .error_msg").css("display", "block");
      $("#" + div_name + " .controls i").css("display", "block");

    }
    if ((div_name == "email") && ((formName == '#signin') || (formName == '#signup') || (formName == "#payment_form"))) {
      email = true;
    }
  });

  if ((email === true) && ($('form' + formName + ' input[name=email]').val() != "")) {
    if (emailPattern.test($('form' + formName + ' input[name=email]').val()) === false) {
      $("#email").addClass("error");
      $('form' + formName + ' input[name=email]').css("border", "1px solid red");
      $("#email .error_msg2, #email .controls i").css("display", "block");
      valid = false;
    }
  }

  if ($('form' + formName + ' input[name=password]').val() || $('form' + formName + ' input[name=password2]').val()) {
    if (passwordPattern.test($('form' + formName + ' input[name=password]').val()) === false) {
      $("#password").addClass("error");
      $('form' + formName + ' input[name=password]').css("border", "1px solid red");
      if (formName == "#edit_account") {
        $("#success").remove();
        $(".error_msg").css("display", "block");
        $("#password i, #password2 i").css("display", "inline-block");
      } else {
        $("#password").addClass("error");
        $("#password i").css("display", "inline-block");
        $("#password .error_msg2, #password .controls i").css("display", "block");
      }
      valid = false;
    }
    if ($('form' + formName + ' input[name=password]').attr("value") != $('form' + formName + ' input[name=password2]').attr("value")) {
      $("#password2").addClass("error");
      $('form' + formName + ' input[name=password2]').css("border", "1px solid red");
      if (formName == "#edit_account") {
        $("#success").remove();
        $(".error_msg2").css("display", "block");
        $("#password i, #password2 i").css("display", "inline-block");
      } else {
        $("#password2 .error_msg2, #password2 .controls i").css("display", "block");
      }
      valid = false;
    }
  }

  if ($('form' + formName + ' input[name=zip]').val() && zipCodePattern.test($('form' + formName + ' input[name=zip]').val()) === false) {

    $("#zip").addClass("error");
    $('form' + formName + ' input[name=zip]').css("border", "1px solid red");
    $("#zip .error_msg2, #zip .controls i").css("display", "block");
    valid = false;
  }

  if (valid === false) {

    $("#form_error").html("Please correct the fields highlighted in RED");
    $("#form_error").css("display", "block");
  }

  return valid;
}

function checkIndexFields() {
  /* PASSWORD SYNTAX */
  var datePattern = new RegExp(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/);
  var valid = true;
  var today = new Date();
  today.setHours(0, 0, 0, 0);

  var checkInDate = $(".check-in-date").val();
  var checkOutDate = $(".check-out-date").val();
  var fullCheckInDate = $(".check-in-date").val() + ' ' + $(".drop-off-time").val();
  var fullCheckOutDate = $(".check-out-date").val() + ' ' + $(".pick-up-time").val();

  $(".dates-error").hide();
  $(".check-in-date,.check-out-date").removeClass("index-error");

  if (datePattern.test(checkInDate) === false) {
    valid = false;
    $(".check-in-date").addClass("index-error");
  } else {
    checkInDate = Date.parse(checkInDate);
  }
  if (datePattern.test(checkOutDate) === false) {
    valid = false;
    $(".check-out-date").addClass("index-error");
  } else {
    checkOutDate = Date.parse(checkOutDate);
  }

  if (valid === false) {
    $(".dates-error").show().html('<i class="icon-exclamation-sign"></i> Please check your dates.');
  }

  if (valid === true) {
    if (checkInDate < today) {
      valid = false;
      $(".check-in-date").addClass("index-error");
    }
    if (checkOutDate < today) {
      valid = false;
      $(".check-out-date").addClass("index-error");
    }
    if (valid === false) {
      $(".dates-error").show().html('<i class="icon-exclamation-sign"></i> Your dates are in the past. Please check your dates.');
    }
  }

  if (valid === true) {
    if (checkOutDate < checkInDate) {
      valid = false;
      $(".check-in-date,.check-out-date").addClass("index-error");
      $(".dates-error").show().html('<i class="icon-exclamation-sign"></i> Check Out is before Check In. Please check your dates.');
    }
    if (fullCheckOutDate == fullCheckInDate) {
      valid = false;
      $(".check-in-date,.check-out-date,.timefield input").addClass("index-error");
      $(".dates-error").show().html('<i class="icon-exclamation-sign"></i> Check Out is the same as Check In. Please check your dates/times.');
    }
  }

  if ($(".airport-error").is(":visible")) {
    valid = false;
  }

  return valid;
}

function checkFrequentFlyer() {
  if ($('select[name=ff_airline]').val() == '') {
    alert("Please Select an Airline if you enter Frequent Flyer Number");
  }
}

function checkEditBilling() {
  var valid = true;
  var ccPattern = new RegExp(/^[0-9]{15,16}$/);
  var cc = $("#cc_number").val();

  if ((cc != "") && (ccPattern.test(cc) === false)) {
    $("#alert-success").hide();
    $("#alert-danger").show().html("The credit card you entered is invalid.");
    $("#card_title").addClass("error-text");
    $("#cc_number").addClass("error-border");
    valid = false;
  }

  return valid;
}
