let URLSafeBase64 = require('urlsafe-base64'),
  moment = require('moment'),
  KEY = {}

function getKEY(req, res) {
  if (URLSafeBase64.validate(req.params.kv)) {
    if (KEY[req.params.kv]) {
      res.json({
        "VALUE": KEY[req.params.kv],
        "TS": moment.utc().format()
      })
    } else {
      res.json(404, {
        "message": "KEY not definition"
      })
    }
  } else {
    res.json(400, {
      "message": "KEY not safe"
    })
  }
}

function deleteKEY(req, res) {
  if (URLSafeBase64.validate(req.params.kv))
    if (KEY[req.params.kv]) {
      let ans = KEY[req.params.kv]
      delete KEY[req.params.kv]
      res.json(200, {
        "OLD_VALUE": ans,
        "TS": moment.utc().format()
      })
    } else {
      delete KEY[req.params.kv]
      res.json(200, {
        "TS": moment.utc().format()
      })
    }
  else {
    res.json(400, {
      "message": "KEY not safe"
    })
  }
}

function postKEY(req, res) {
  if (URLSafeBase64.validate(req.params.kv)) {
    KEY[req.params.kv] = req.body.VALUE
    res.json({
      "TS": moment.utc().format()
    })
  }
  else {
    res.json(400, {
      "message": "KEY not safe"
    })
  }
}

module.exports = {
  getKEY,
  deleteKEY,
  postKEY,
}
