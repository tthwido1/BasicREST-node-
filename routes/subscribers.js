
// import packages
const express = require('express')

// import Subscriber model
const Subscriber = require('../models/subscriber')

// create a router 
const router = express.Router()

// routes - crud
router.get('/', async (req, res) => {
	console.log(`### GET ###`)
	
	try {
		const subscribers = await Subscriber.find()
		
		return res.status(200).json({
			isSuccess: true,
			subscribers: subscribers
		})

	} catch (err) {
		console.log(err)
		return res.status(500).json({
			isSuccess: false,
			msg: err.message
		})

	}

})

router.get('/:id', getSubscriberFromDB, async (req, res) => {
	console.log(`### GET ${req.params.id} ###`)

	return res.status(200).json({
		isSuccess: true,
		subscriber: res.subscriber
	})
	
})

router.post('/', async (req, res) => {
	console.log('### POST ###')
	
	const subscriber = new Subscriber({
		name: req.body.name,
		channel: req.body.channel
	})

	try {
		const savedSubscriber = await subscriber.save()

		return res.status(201).json({
			isSuccess: true,
			subscriber: savedSubscriber
		})

	} catch (err) {
		console.log(err)
		return res.status(400).json({
			isSuccess: false,
			msg: err.message
		})

	}

})

router.put('/:id', getSubscriberFromDB, async (req, res) => {
	console.log(`### PUT ${req.params.id} ###`)

	let savedSubscriber = res.subscriber
	
	if(req.body.name != null) {
		savedSubscriber.name = req.body.name
	}
	if (req.body.channel != null) {
		savedSubscriber.channel = req.body.channel
	}

	try {
		savedSubscriber = await savedSubscriber.save();
		
		return res.status(200).json({
			isSuccess: true,
			subscriber: savedSubscriber
		})

	} catch (err) {
		console.log(err)
		return res.status(400).json({
			isSuccess: false,
			msg: err.message
		})

	}
})

router.delete('/:id', getSubscriberFromDB, async (req, res) => {
	console.log(`### DEL ${req.params.id} ###`)

	const savedSubscriber = res.subscriber

	try {
		const deletedSubscriber = await savedSubscriber.remove()
		
		return res.status(200).json({
			isSuccess: true,
			subscriber: deletedSubscriber
		})

	} catch (err) {
		console.log(err)
		return res.status(500).json({
			isSuccess: false,
			msg: err.message
		})

	}
})

async function getSubscriberFromDB(req, res, next) {
	const subscriberId = req.params.id
	console.log(`### getSubscriber ${subscriberId} ###`)

	let savedSubscriber
	try{
		savedSubscriber = await Subscriber.findById(subscriberId)

		if (savedSubscriber == null) {
			return res.status(404).json({ 
				isSuccess: false,
				msg: 'subscriber does not exist'
			})
		} else {
			res.subscriber = savedSubscriber
			next()
		}

	} catch (err) {
		console.log(err)
		return res.status(500).json({
			isSuccess: false,
			msg: err.message 
		})
	}
}

// export router
module.exports = router