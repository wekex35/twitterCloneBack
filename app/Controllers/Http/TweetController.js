'use strict'

class TweetController {
	const Tweet = use('App/Models/Tweet')
	const Reply = use('App/Models/Reply')


	async tweet ({ request, auth, response }) {
	    // get currently authenticated user
	    const user = auth.current.user

	    // Save tweet to database
	    const tweet = await Tweet.create({
	        user_id: user.id,
	        tweet: request.input('tweet')
	    })

	    // fetch tweet's relations
	    await tweet.loadMany(['user', 'favorites', 'replies'])

	    return response.json({
	        status: 'success',
	        message: 'Tweet posted!',
	        data: tweet
	    })
	}


	async show ({ params, response }) {
	    try {
	        const tweet = await Tweet.query()
	            .where('id', params.id)
	            .with('user')
	            .with('replies')
	            .with('replies.user')
	            .with('favorites')
	            .firstOrFail()

	        return response.json({
	            status: 'success',
	            data: tweet
	        })
	    } catch (error) {
	        return response.status(404).json({
	            status: 'error',
	            message: 'Tweet not found'
	        })
	    }
	}


	async destroy ({ request, auth, params, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // get tweet with the specified ID
    const tweet = await Tweet.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()

    await tweet.delete()

    return response.json({
        status: 'success',
        message: 'Tweet deleted!',
        data: null
    })
}



}

module.exports = TweetController
