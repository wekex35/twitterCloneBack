'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')

Route.group(() => {
    Route.get('/me', 'UserController.me')
    Route.put('/update_profile', 'UserController.updateProfile')
})
    .prefix('account')
    .middleware(['auth:jwt'])

Route.put('/change_password', 'UserController.changePassword');

Route.get(':username', 'UserController.showProfile')

Route.group(() => {
    Route.get('/users_to_follow', 'UserController.usersToFollow');
})
    .prefix('users')
    .middleware(['auth:jwt'])

Route.post('/follow/:id', 'UserController.follow')
Route.delete('/unfollow/:id', 'UserController.unFollow')
Route.get('/timeline', 'UserController.timeline')
Route.post('/tweet', 'TweetController.tweet').middleware(['auth:jwt'])
Route.get('/tweets/:id', 'TweetController.show')
Route.post('/tweets/reply/:id', 'TweetController.reply').middleware(['auth:jwt']);


Route.group(() => {
    Route.post('/create', 'FavoriteController.favorite')
})
    .prefix('favorites')
    .middleware(['auth:jwt'])

Route.delete('/destroy/:id', 'FavoriteController.unFavorite');
Route.delete('/tweets/destroy/:id', 'TweetController.destroy').middleware(['auth:jwt'])

// Route
//   .get('sample', 'SampleController.profile')
//   .middleware(['auth:jwt'])
// Because we are authenticating with JWT, we also have to indicate that in the auth middleware auth:jwt.
