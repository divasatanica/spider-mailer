const express = require('express')
const router = express.Router()
const _Sub = require('../modules/db/index').subs

router.put('/', (req, res) => {
	let data = req.body

	let _sub = _Sub('doubantop10subs')
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

router.get('/', (req, res) => {
	let _sub = _Sub('doubantop10subs')
	let sub = new _sub()

	let pageIndex = req.query.pageIndex || 0
	let pageSize = req.query.pageSize

	let opt = {
		pageIndex,
		pageSize,
		col: 'doubantop10subs'
	}

	sub.findAll(opt).then(response => {
		if (!response) {
			return res.send({
				success: 1,
				data: []
			})
		}
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