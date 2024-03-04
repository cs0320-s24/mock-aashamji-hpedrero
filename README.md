> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

this is a command line program lets a user log in and then enter commands to parse csv files.
https://github.com/cs0320-s24/mock-aashamji-hpedrero.git

# Design Choices

we set the default mode to be verbose, which can then be changed by user input.

# Errors/Bugs

We had an initial error whereby the user would have been able to assert the setting of the mode to random strings, however we implemented defensive programming in ensuring this could not happen.
Functionality is limited to preexisting csv filetext.

# Tests

we used mocking to save our program from making theoretically extensive, potentially time consuming and data intensive API calls. we tested various fuzz cases, different csv files and different functionality of csv file commands.
We used playwright testing to test the activity of enacting different tasks.

# How to

1. click the login buttonn
2. enter a choice of "mode + verbose/brief"
3. enter a command: loadcsv + filepath
4. view your csv: viewcsv
   or
5. search your csv: searchcsv "search parameter"

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
