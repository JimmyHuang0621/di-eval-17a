var request = require('request')

module.exports = function (req, res) {
    let plaintext = req.body.plaintext
    if (req.headers["content-type"] === "application/json" && plaintext && !plaintext.match(/[^0-9,a-f]/)) {
        if (plaintext.length <= 16) {
            let opt = {
                uri: 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
                method: 'POST',
                json: {
                    'plaintext': req.body.plaintext
                }
            }
            request(opt, function (err, rep, body) {
                res.json({
                    'ciphertext': body.ciphertext
                })
            })
        } else {
            res.json(413, {
                "message": "字元過多"
            })
        }

    } else {
        res.json(400, {
            "message": "輸入錯誤"
        })
    }
}