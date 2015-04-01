# Hipster Code Meetup app

The purpose of the app is to create a Meetup board.
A meetup organizer can add an event with a particular topic and a date of the meetup.
Users then can view that information, RSVP for the event, and see the count of attendees.
The organizer has admin rights, so he/she can add events, delete RSVPs and view names of attendees.

###APP FEATURES:
* * *
 FEATURE1. ***Accessible via a public IP address so that developers can telnet to it from their own machines by typing the following command in the terminal***

```bash
telnet 104.236.67.203 2000
```

* * *

 FEATURE2. ***If ADMIN is logged in, he/she should be able to provide admin username and admin password:***

```bash
 adminUserName - adminPassword - [next commands]
```
 to have access to the following features:***

  - get list of current attendees (who RSVPd);

```bash
adminUserName - adminPassword - RSVP_list
```
  - set the DATE and TOPIC for next meetup;

```bash
adminUserName - adminPassword - 4/1/2015 QA_Meetup
```
  - clear out RSVP list once the date of the meetup has passed so the app is ready for next meetup information.

```bash
adminUserName - adminPassword - clear
```
* * *

 FEATURE3. ***If a regular user is logged in (i.e. if a user didn't identify himself as an admin and didn't provide the password), he should be able to do to following:***
  - see the DATE and the TOPIC for an upcoming meetup by typing:

```bash
meetup
```
  - be able to RSVP for a meetup by providing their NAME and EMAIL:

```bash
RSVP - John - john@hipstercode.com
```

  - to see the COUNT of developers attending the meetup:

```bash
attendees
```

* * *

 FEATURE4. ***Error validation***
  - If a user did not provide admin credentials, or tries to access with a wrong password - a warning should be given to a user that he/she does not have access;
  - If a user did not provide their name and email address, the RSVP should not be successful and the user needs to input information all over again.
  - A user should not have access to admin information, therefore should be given a prompt and be logged out of the app if tries to access: The list of developers attending, or change the date or topic of the meetup or clear the RSVP list.

* * *

FEATURE5. ***HELP***

If a user needs help or list of available commands, he/she can type

```bash
help
```
and get complete instructions on how to use the application.

![Imgur](http://i.imgur.com/nP7ObKn.png)
