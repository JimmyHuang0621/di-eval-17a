var request = require('request')

module.exports = function (req, res) {
    let plaintext = req.body.plaintext,
        text
    if (req.headers["content-type"] === "application/json" && plaintext && !plaintext.match(/[^0-9,a-f]/)) {
        let opt = {
            uri: 'https://nkiua09s52.execute-api.ap-northeast-1.amazonaws.com/dev/encrypt',
            method: 'POST',
            json: {
                'plaintext': req.body.plaintext
            }
        }
        if (plaintext.length <= 16) {
            request(opt, function (err, rep, body) {
                text = body.ciphertext
                res.json({
                    'ciphertext': text
                })
            })
        }else{
            res.json(413)
        }

    } else {
        res.json(400)
    }
}