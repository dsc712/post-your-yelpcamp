#  Post-Your-Yelpcamp
A place where you can post new camping sites , and even comment on other's post.
[My Project](https://post-your-yelpcamps.herokuapp.com/)

## My Project Development Process

## Initial Setup
* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

> Each Campground has:
   * Name
   * Image

## Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

## Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

## Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

## Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

## Add Mongoose
* Install and configure Mongoose
* Setup campground model
* Use campground model inside of our routes

## Show Page
* Add description to our campground model
* Add a show route/template

## Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

## Add Seeds File(used at the time of development - no role in real project)
* Add a seeds.js file
* Run the seeds file every time the server starts

## Add the Comment model!
* Make our errors go away!
* Display comments on campground show page

## Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

## Style Show Page
* Add sidebar to show page
* Display comments nicely

## Finish Styling Show Page
* Add public directory
* Add custom stylesheet

## Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

## Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

## Auth Pt. 3 - Login
* Add login routes
* Add login template

## Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

## Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

## Refactor The Routes
* Use Express router to reoragnize all routes

## Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

# Deleting Comments
* Add Destroy route
* Add Delete button

# Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash!
* Install and configure connect-flash
* Add bootstrap alerts to header
* make meaningful messages in flash message

## RESTFUL ROUTES USED IN MY APP

| name  |     url  |    verb |   desc. |
|-------|----------|---------|---------|
|INDEX  | /campgrounds    |  GET    |Display a list of all campgrounds     |
|NEW    | /campgrounds/new | GET    |Displays form to make a new campground |
|CREATE | /campgrounds     | POST   | Add new campground to DB              |
|SHOW   | /campgrounds/:id | GET    | Shows info about one campground |
|EDIT   | /campgrounds/:id/edit | GET | show edit form for one campground |
|UPDATE | /campgrounds/:id | PUT | update a particular campground then redirect somewhere|
|DELETE | /campgrounds/:id | DELETE | delete a particular dog then redirect somewhere |

##### adding comments routes to existing routes(without loosing restfullness of app)
> /campgrounds/:id/edit

> /campgrounds/:id/comments/:comment_id/edit

## Styling landing Page
* added new landing.css file in public directory
## Styling login and signup forms
* added the styles of edit campground form.

> adding font awesome icons to my project.
> adding github repository link to my project.
* adding meta tag for theme-color.
* meta name="theme-color" content = "#222" - it is observed in chrome 39 for android mobile only
* add other necessary meta tags author,description and keywords .