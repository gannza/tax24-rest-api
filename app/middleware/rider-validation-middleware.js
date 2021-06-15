const Validator = require('../../app/helpers/validate');

const request = async (req, res, next) => {
    const validationRule = {
        "email": "required|string|email",
        "name": "required|string",
        "number": "required|string",
        "status":"required|string",
        'latitude': "required|string",
        "longitude": "required|string",
        "country": "required|string",
        "city": "required|string",
        "state": "required|string",
        "streetName": "required|string",
        "streetNumber":"required|string"
    }

    await Validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    request
};