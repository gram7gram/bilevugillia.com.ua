$(function () {
    var form = $('#contact-me');
    var name = $('#contact-me-name');
    var email = $('#contact-me-email');
    var message = $('#contact-me-message');
    var submit = $('#contact-me-submit');
    var success = $('#contact-me-success');
    var error = $('#contact-me-error');

    var getModel = function () {
        return {
            name: name.val(),
            email: email.val(),
            message: message.val()
        }
    };

    var getValidator = function (model) {
        var validator = {
            total: 0,
            messages: {}
        };

        if (!model.name) {
            ++validator.total;
            validator.messages.name = 'required'
        }

        if (!model.email) {
            ++validator.total;
            validator.messages.email = 'required'
        }

        if (!model.message) {
            ++validator.total;
            validator.messages.message = 'required'
        }

        return validator
    };

    var validate = function () {
        var data = getModel();
        var validator = getValidator(data);
        var isValid = validator.total === 0;

        submit.prop('disabled', !isValid)
    };

    message.on('change focus keyup', validate);
    email.on('change focus keyup', validate);
    name.on('change focus keyup', validate);

    form.on('submit', function (e) {
        e.preventDefault();

        var data = getModel();
        var validator = getValidator(data);
        var isValid = validator.total === 0;

        submit.prop('disabled', isValid);
        $.ajax({
            method: 'POST',
            url: '/php/mail.php',
            contentType: 'application/json',
            data: JSON.stringify(data),
            beforeSend: function () {
                submit.prop('disabled', true);

                success.addClass('d-none');
                error.addClass('d-none')
            },
            success: function (body) {
                if (body.status === 'success') {
                    success.removeClass('d-none')
                } else {
                    error.removeClass('d-none')
                }
            },
            error: function () {
                error.removeClass('d-none')
            },
            complete: function () {
                submit.prop('disabled', false)
            }
        })
    })

});