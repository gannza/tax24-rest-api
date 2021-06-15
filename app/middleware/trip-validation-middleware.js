const Validator = require('../../app/helpers/validate');

const request = async (req, res, next) => {
    const validationRule = {
        "driverId": "required|integer",
        "riderId": "required|integer",
        "from": "required|string",
        "to":"required|string",
        "status": "required|string"
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