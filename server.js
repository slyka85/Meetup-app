//Genevieve has been given admin credentials:
//her login is "Genevieve", her password is "tuttyfrutty"
var fs = require('fs');
var net = require('net');
var colors = require('colors');
var server = net.createServer();
var json = fs.readFileSync("./data.json", "utf8");
var masterArray = JSON.parse(json);

server.on('connection', function(client)
{
  console.log('Client connected');
  client.setEncoding('utf8');
  client.on('data', function(stringFromClient)
  {
    var input = stringFromClient.trim();
    var splitInput = input.split(" - ");
    var command1 = splitInput[0];
    var command2 = splitInput[1];
    var command3 = splitInput[2];
    var command4 = splitInput[3];
    
    if (command1 === "Genevieve" && command2 === "tuttyfrutty" && splitInput.length === 4)
    {
      var adminName = command1;
      var password = command2;
      var adminAction1 = command3;
      var adminAction2 = command4;
      var adminMeetupInfo = {
          "user": adminName,
          "password": password,
          "date": adminAction1,
          "topic": adminAction2,
        }
        
      masterArray.push(adminMeetupInfo);
      var backToJson = JSON.stringify(masterArray);
      fs.writeFileSync("./data.json", backToJson);
      client.write("\nSUCCESS!\n".green + "Your meetup information has been added!" + "\n\n")
      client.end();
    }
    else if (command1 === "help")
    {
      client.write("\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n" + "*" +
        "             Welcome to  HIPSTER CODE MEETUP APP!              ".bgGreen.black + "*" +
        "\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*" +
        "\n                           " +
        "INSTRUCTIONS:".underline + "                        *\n" +
        "\nIf you are a meetup" + " ORGANIZER".red + ", you can do the following:        *" +
        "\n---------------------------------------------------------" +
        "\n - create a Meetup announcement, by following this format:      * " +
        "\nAdminUsername - AdminPassword - Date of a meetup - Topic" +
        "\n                                                                *" +
        "\n - view the names of all attendees who RSVP'd for the event: " +
        "\nAdminUsername - AdminPassword - RSVP_list                       *\n" +
        "\n - clear the Meetup board from all RSVPs.                       *" +
        "\nAdminUsername - AdminPassword - clear" +
        "\n                                                                *" +
        "\nIf you are a meetup" + " ATTENDEE".red + ", you can do the following:" +
        "\n---------------------------------------------------------       *" +
        "\n - view meetup information with Date and Topic, by typing: " +
        "\nmeetup                                                          *\n" +
        "\n - RSVP for an event by providing name and email address:       *" +
        "\nRSVP - John Smith - john@hipstercode.com" +
        "\n                                                                *" +
        "\n - view how many people have RSVP'd for the event:" +
        "\nattendees                                                       *" +
        "\n                                                                *" +
        "\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n"
      );
      client.end();
    }
    else if (command1 === "meetup")
    {
      var meetupDate = masterArray[0].date;
      var meetupTopic = masterArray[0].topic;
      client.write("\nYour next meetup is on: ".magenta + meetupDate.toUpperCase() + "\n" + "The topic is: ".blue + meetupTopic.toUpperCase() + "\n\n");
      client.end();
    }
    else if (command1 === "attendees")
    {
      var attendees = (masterArray.length - 1).toString();
      client.write("The meetup is organized by " + "1".red + " plus " + attendees.red + " other attendees. Please RSVP if you haven't done it yet." + "\n\n");
      client.end();
    }
    else if (command1 === "RSVP" && splitInput.length === 3)
    {
      var rsvpCommand = command1;
      var userName = command2;
      var userEmail = command3;
      var userRSVPinfo = {
        "rsvp": rsvpCommand,
        "user": userName,
        "email": userEmail,
      }
      masterArray.push(userRSVPinfo);
      var backToJsonAgain = JSON.stringify(masterArray);
      fs.writeFileSync("./data.json", backToJsonAgain);
      client.write("\nTHANK YOU!\n".blue + "You have RSVP'd for an upcoming meetup!\n\n");
      client.end();
    }
    else if (command1 === "Genevieve" && command2 === "tuttyfrutty" && command3 === "RSVP_list")
    {
      for (var i = 0; i < masterArray.length; i++)
      {
        client.write("\n Attending: " + masterArray[i].user.blue + "\n\n");
      }
      client.end();
    }
    else if (command1 !== "Genevieve" || command2 !== "tuttyfrutty")
    {
      client.write("\nACCESS DENIED!!!\n".red + "Make sure your input is correct and try again! \nType 'help' for instructions.\n\n")
      client.end();
    }
    else if (command1 === "Genevieve" && command2 === "tuttyfrutty" && command3 === "clear")
    {
      masterArray = [];
      var backToJson = JSON.stringify(masterArray);
      fs.writeFileSync("./data.json", backToJson);
      client.write("\nSUCCESS!\n".green + "The RSVP list has been cleared. You're ready to create a new Meetup.\n\n")
      client.end();
    }
  });
});
server.listen(8124, function()
{
  console.log('Server is ON');
});
