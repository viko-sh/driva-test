
# Driva Engineer Tech Challenge 

## The Assignment
Create a user multi-step input form, this should behave as a single page application (SPA) using ReactJS and NodeJS.

The screenshots can be found on the project root folder
![Step 01](/step1.png?raw=true "Step One")
![Step 02](/step1.png?raw=true "Step Two")

### Step One
As you can see in the screenshot, the form contains the following pieces of information:
* First name
* Last name
* Mobile number
* Email

Clicking Next button should validate the form and, if valid, take the user to the next step.

### Step Two
The second step will represent more information about the user:
* Relationship status (e.g. married, single, de facto)
* After-tax income, and frequency of this income

NOTE: The other fields are not a priority to implement.

Clicking Next button should validate the form and, if valid, the form should submit all the information to the server.

Clicking Back button should take the user to the previous step (irrespective of whether the form is valid or not) and display the current values.

### Navigation
Please separate the two steps into two different routes, and provide a way to navigate back and forth.

### Server
Server should validate the submitted payload and only be Accepted if valid, or else rejected as a Bad Request.

Save the submitted information in the `quotes` table.

From the table structure, you can see that not all the fields from step 1 and step2 are represented directly as columns. 

You are welcome to modify the schema to suit your design preferences, or persist the submission as JSON in the `quote_data` field.

### Implementation Notes
The focus of this exercise is to demonstrate a solid shippable implementation.

Typescript and automated tests are highly recommended as part of the solution.

You are free to choose libraries which you deem suitable and helpful towards the end product. Some ideas/options:

* Library:
  * React + React Router DOM
  * Next.js
* CSS:
  * Plain CSS modules
  * Styled components
  * SASS
* Forms:
  * React Hook Form
  * React Final Form
  * Formik
* Validation:
  * Zod
  * Yup
* Tests:
  * Jest
  * Cypress
 

## Getting Started
We have provided a bit of boilerplate code that you can use to get started.  You are **not** required to use this boilerplate, so feel free to throw it all away and start fresh if you prefer.

The boilerplate code assumes you have Docker running on your machine.  If you do not, they offer easy to install binaries ([Mac](https://docs.docker.com/docker-for-mac/install/)) ([Windows](https://docs.docker.com/docker-for-windows/install/)).

From the root of the project, run `docker-compose up -d`
* run docker ps, you should get three containers running.
* You should now have the UI running at http://localhost:3000 and the server running at http://localhost:8080
* You should now have a MySQL database running at localhost:3306
    * The username is `root`
    * The password is `driva`
If at any point you want to refresh the database, you can stop the Docker containers (`docker-compose down`) and start them again

If you want to connect the DB with UI tool

You can use the following connection details:
- Host: 127.0.0.1
- User: root
- Password: driva  
- Database: driva

If you encounter any problems with the docker connection,
you can do the following
- run docker stop driva-test_server_1 
- run docker stop driva-test_ui_1
- we now running only the database container
- from the root of your application, `cd server`
  - `npm install`
  - `npm start` -  it will start your node server on port 8080, http://localhost:8080
- from the root of your application, open second terminal, run `cd ui` and `yarn start`
  - `cd ui`
  - `yarn`
  - `yarn start` - you now should have the front-end running on http://localhost:3000


## Submission
Please document your solution in the SOLUTION.md file.  This should explain why you've made the design choices that you have and clarify anything you feel isn't obvious.  Feel free to also include what else you would have done given more time.
