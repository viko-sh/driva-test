# Driva Engineer Tech Challenge 

## Constraints
In order to demonstrate ability to work within an existing system I didn't make any changes to the existing dependencies and only added the new dependencies as required.  I wanted to use a couple of components but had to discard due to them requiring the latest (v17) or react.

## Solution Summary
A SPA application and NodeJS server based on the boilerplate supplied.  
A FSM based 2 page wizard with success/failure modes and simple ExpressJS api to POST the quote enquiry and store in the MySQL database.  Using Joi for both client and server validation.

![Step 1](/tim-step1.png?raw=true)

![Step 2](/tim-step2.png?raw=true)

![Step Success](/tim-success.png?raw=true)

![Step Failure](/tim-failure.png?raw=true)

## Solution Design Points
As my first React solution possibly a XState based FSM might have been a bit ambitious, but I wanted a FSM to handle the wizard as overtime these can get very complicated and I like how the logic of the wizard can be easily described and improved upon.

I Also wanted the share the client-side and server-side validation logic, I have lots of experience of Joi and so wanted to use that.  In practice I have a file that is the same in both UI and server projects but isn't actually shared, but this could easily be achieved with a small npm package.  The file `validation.ts` exists in both projects.

For basic styling I just threw in a CDN loaded SemanticUI which I have experience with and added some very basic styling to make the SPA look reasonable.

**MISSING ROUTING** 
I am still working on adding the routing as defined in the spec (will look this evening), currently the wizard navigation works as described, just not using routes.  

## Possible areas to improve
The solution, as it is, saves the quote enquiry as the last step.  Refreshing the screen resets you back to the beginning loosing all data entered.  It would be fairly simple to be able to refresh the screen and continue where you left off.  This would require saving to the server after (or even during) each page of the wizard.  You could use routing or even the FSM to automatically place you on the wizard page where you were.

Joi email validation was misbehaving in the browser, need to spend some more time to resolve.  Currently commented out.

Error handling, the server just sends back a JSON document for success and failure, currently with just a numeric `code`.  Would improve this with probably a text code success as `OK` and something more descriptive in the failure scenario to allow the UI to react better, ie 

```javascript
{ code: 'VALIDATION', reason: 'You must enter a firstname' }
```

## Other notes
It was a reasonably steep learning curve for react but managed to get my head around it after a while.  Probably are some better patterns, certainly around handling 2-way binding to the controls in the UI.  Also basically re-invented the validation (based on some other libraries) to allow me to use Joi, again there might be a better library or existing patterns to help.
My typescript was letting me down on some of the more complicated situations, but a few hours of experience would easily bring me upto speed.

Not used typescript on the node server previosly, so took a while to get used to that. 