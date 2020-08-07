function errorCatcher(err, req, res, next) {

    res.status(err.statusCode || 500);
    if (err.code === 11000) {
        return res.json({
            message: "'"+Object.keys(err.keyValue)+"' için girilen '"+Object.keys(err.keyValue) + "' enique olmalıdır.",
            statusCode:err.statusCode || 400
        });
    }
    if (err.code === 66) {
        return res.json({
            message: "Değşitirelemez alanı güncellemeye çalıştınız",
            statusCode: err.statusCode || 400
        });
    }
    res.json({
        message: err.message,
        errorCode: err.statusCode || 500
    });

}

module.exports = errorCatcher;