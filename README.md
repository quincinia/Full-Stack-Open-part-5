# Full-Stack-Open-part-5
Submissions for FSO part 

All exercises will be on the same branch so I can get my contribution squares

## Exercise 5.1
Followed the story closely. User cannot log out unless the app is restarted.

## Exercise 5.2
Simple login/logout, just added localStorage calls.

## Exercise 5.3
New blogs have the default value of 0 likes. Otherwise, just followed the story.

## Exercise 5.4
Added Notification component from previous parts. Added CSS file for coloring.

## Exercise 5.5
Followed the story closely, but had a few small issues (syntax errors, Togglable not liking the array).

## Exercise 5.6
BlogForm was extracted into its own component during 5.5.

## Exercise 5.7
Blogs can now be expanded. Placed a like button, but it isn't working yet. Didn't wrap the blog title and author in a `<div>` like in the example.

## Exercise 5.8
Blogs can now be liked (multiple times). Not sure if I used the right method for updating an item in the `blogs` array, but it works.

## Exercise 5.9
Blogs are now sorted by likes. Maybe a loop could be used instead of the `sort` method when liking only a single post, but using `sort` looks cleaner.  
Apparently Mongoose can also return a sorted query. (not used in this exercise)

## Exercise 5.10
Note that blogs are only deleted on the frontend. Using `filter` to delete items rather than `splice`.

## Exercise 5.11
Not sure how to format proptypes for objects.

## Exercise 5.12
Not much to fix with eslint, mainly line ending errors.

## Exercise 5.13
Test files will be in their own directory, not with their components. The test here is relatively straightforward.

## Exercise 5.14
Testing both that the details are shown AND has the correct text content because the text content will exist even when it is hidden. Straightforward tests here as well.

## Exercise 5.15
You don't need to click the `show` button in order to be able to click the `like` button.

## Exercise 5.16
Added test for the BlogForm component. Didn't need to modify the BlogForm component since we had already added `name` attributes before. Again, these tests were pretty straightforward.

## Exercise 5.17
Updated the part 4 npm scripts to run in test mode. Not sure why the story has a `json-server` script, won't be using that for this part. Added a script to run the backend from this directory. 

Also added an API for clearing the DB on the backend. Test for confirming the login page passes.

## Exercise 5.18
Added a script to call Cypress from the command line. Completely forgot that you can bypass the UI for logging in. Won't change the previous tests for consistency, but will try to avoid the UI from now on.

Otherwise, followed the tests as shown in the story. I also checked for the red color on the error message.

## Exercise 5.19
Made a command for logging in and for adding a blog. Basically copied that from the story.  
Blogs added through manual POST requests will not show a success message. Although a command has been implemented for adding a blog, this test will be making the blogs through the form in order to test that the form works.
Forgot that there were two elements with the word 'create' in them, so I couldn't use `contains('create')` to select the button.

Logging in through a POST request DOES NOT grab the token from the user object. This functionality has been added.

## Exercise 5.20
Test was relatively straightforward. Used the `newBlog` command to create a new blog.

## Exercise 5.21
Confirmed users cannot delete others' blog posts. Straightforward tests.

## Exercise 5.22
Had to update the `newBlog` command to take likes as a parameter. Not sure if my test is correct, but it works and makes sense.