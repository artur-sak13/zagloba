$(document).ready(function() {
    $('#test-form').bootstrapValidator({
        //submitButtons: '#postForm',
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },        
        fields: {
            email: {
                validators: {
                    notEmpty: {
                        message: 'Please enter an email to submit'
                    },
                    emailAddress: {
                        message: 'Your email address is not a valid'
                    }
                }
            },
        }
    })
    .on('success.form.bv', function(e) {
        // Prevent form submission
        e.preventDefault();

        // Get the form instance
        var $form = $(e.target);

        // Get the BootstrapValidator instance
        var bv = $form.data('bootstrapValidator');

        // Use Ajax to submit form data
        var url = 'https://script.google.com/macros/s/AKfycbxIYRmUpbKLvy7WRb7BLnE5xQjfdiH8Md67cYIqzmVNtBL9bhHQ/exec';
        // show the loading 
        $('#postForm').prepend($('<span id="processing"></span>').addClass('glyphicon glyphicon-refresh glyphicon-refresh-animate'));
        var jqxhr = $.post(url, $form.serialize(), function(data) {
            var hasError = document.getElementById("submit-error");
            if(hasError) hasError.remove();
            $("#test-form").replaceWith("<div class='alert alert-success' style='width:300px; margin: 0 auto; text-align:center; border: solid 1px #3c763d; '>Thanks for subscribing!</div>");
        }).fail(function(data) {
            $("#sub-wrap").append("<br><div class='alert alert-danger' id='submit-error' style='width:350px; margin: 0 auto; text-align:center; border: solid 1px #a94442; '>Oops! Your email was not added. Try again.</div>");
            // HACK - check if browser is Safari - and redirect even if fail b/c we know the form submits.
            if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
                alert("Browser is Safari -- we get an error, but the form still submits -- continue.");              
            }
        });
    });
});