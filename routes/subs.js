const express = require('express')
const router = express.Router()
const _Sub = require('../modules/db/index').subs
const map = require('../config/stuff-code')


router.put('/:stuff', (req, res) => {
	let stuff = req.params.stuff
	let data = req.body

	let _sub = _Sub(map[stuff])
	let sub = new _sub()

	sub.addSub(data).then(response => {
		res.send(response)
	}).catch(e => {
		res.send({
			success: 0,
			msg: e.message
		})
	})
})

router.get('/:stuff', (req, res) => {
	let stuff = req.params.stuff
	let _sub = _Sub(map[stuff])
	let sub = new _sub()

	let pageIndex = req.query.pageIndex || 0
	let pageSize = req.query.pageSize

	let opt = {
		pageIndex,
		pageSize,
		col: 'doubantop10subs'
	}

	sub.findAll(opt).then(response => {
		return res.send({
			success: 1,
			data: response
		})
	}).catch(e => {
		res.send({
			success: 0,
			msg: e.message
		})
	})
})

module.exports = router