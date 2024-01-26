# INFO 441 Project Grop 12

## Project Proposal

### Project Description

**Who is our target audience?**

The primary user group of our application would be college students, who are looking to spend part of their free time exploring new destinations. They may be interested in weekend getaways, spring breaks, or longer trips during academic breaks. Within the college student demographic, we would like to focus on those who have a strong passion for travel and adventure. These are the students who actively seek out new places to visit, enjoy experiencing different cultures, and are open to trying new activities and foods.

Given that many college students operate within strict financial constraints, our application is designed to serve this demographic by offering insights into budget-friendly travel itineraries shared by their peers. This feature addresses the quintessential concern of affordability, making our tool an invaluable asset for cost-conscious students.

Furthermore, recognizing the social and collaborative essence of our user base, we aim to engage college students who are socially active and inclined to share their travel itineraries with friends and other students. Our application not only facilitates their travel planning but also enhances their social interaction, tapping into the networked world of social media where experiences and adventures are exchanged.

**Why does our audience want to use our application?**

The target audience, primarily college students, is drawn to our Itinerary Sharer application for a multitude of compelling reasons.

First, many college students long for opportunities to explore new places, experience different cultures, and create lasting memories. Our application serves as a gateway to these experiences, offering a user-friendly platform for easily crafting detailed itineraries.

Second, budget constraints are a concern for college students. They often seek economical travel options, and our application caters to this need. Itineraries created by their peers may give budget-friendly accommodation of affordable dining/hotel options. This element of practicality and cost-efficiency resonates strongly with our audience.

Furthermore, Our application provides a platform for them to not only plan their trips but also to share their adventures with friends and peers. This sharing aspect fulfills a strong social need, enabling them to inspire and be inspired by fellow travelers. The opportunity to create, like, star, and comment on itineraries enhances the sense of community and fosters a sense of belonging.

**Why do we as developers want to build this application?**

As developers, our motivation to build the Itinerary Sharer application stems from a combination of personal passion and a keen understanding of the unique needs and aspirations of our target audience, which includes college students like ourselves. We see this project as a bridge between our technical skills and our shared love for travel and exploration.

Being college students ourselves, we've experienced firsthand the thrill of planning trips, exploring new destinations, and sharing these experiences with friends. We understand the importance of having a structured and organized way to plan trips, especially with limited budgets and busy academic schedules. We recognize that there are existing solutions like TripAdvisor for trip itinerary planning. However, these solutions do not exclusively cater to college students, who seek to meet budget constraints and make new friends. This insight into the college student lifestyle gives us a deep sense of empathy and connection with our potential users.

Moreover, we recognize the power of technology and digital tools in making travel planning more efficient and enjoyable. Our skills and knowledge in software development and the use of TripAdvisor APIs enable us to craft an application that not only satisfies our own desire for a well-organized travel planning tool but also meets the needs of our fellow college students.

### Technical Description

#### Architectural Diagram Mapping

![Architectural Diagram Mapping](./assets/architectural-diagram.png)

#### Data Flow

![Data Flow](./assets/data-flow.png)

#### A summary Table of User Stories

| Priority | User      | Description                                                                                                     | Technical Implementation                                                                                                                                   |
| -------- | --------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | As a user | I want to create/upload new places                                                                              | When adding new places to the itinerary, create a form for users to type in the place information.                                                         |
| P0       | As a user | Save places to the database                                                                                     | When the itinerary is ready to be posted, the client will send a **POST** request to add the itinerary to our database (**MongoDB**).                      |
| P0       | As a user | I want to search by places and see all relevant itineraries.                                                    | Server will read in the string from the search bar, and use it as a filter and send a **GET** request to display all itineraries containing that place.    |
| P0       | As a user | I want to add places to my itinerary                                                                            | For each place, there will be a button for users to click to add that place to their plan. It will update their profile page and also save to the database |
| P0       | As a user | I’m able to login/logout/create an account                                                                      | Using session and auth for authentication and if users want to create new accounts, add them to the users database.                                        |
| P1       | As a user | I want to see additional information for my searched places (description, comments, the cost to go there, etc.) | Using the information given in this form, the server will utilize **Google’s Places API or Trip Advisor API** to get information about the place.          |
| P1       | As a user | I want to see my profile page                                                                                   | Access the database and get all users information (username, itinerary, etc.)                                                                              |
| P2       | As a user | I want to see all the itineraries within a specific budget.                                                     | Server will read in the budget range, and use it as a filter and send a **GET** request to display all itineraries within the budget.                      |
| P3       | As a user | I want to see all the itineraries that I’ve stared.                                                             | Whever the user hits the star button for an itinerary, this itinerary’s ID will be associated with the user’s stared list.                                 |
| P4       | As a user | I want to see the itineraries displayed with a ranking from the most liked to the least liked.                  | Server gets all the itineraries from the database, and sort them by number of likes in a descending order.                                                 |

### List of Endpoints

**To Be Decided**

POST /api/users/register: allows users to register for an account.

POST /api/users/login: allows users to log in to their accounts.

GET /api/users/:id : get the user information by ID.

GET/api/places/:destination: looks for itineraries using the word provided

POST /api/itineraries/create: Allows users to create a new itinerary.

GET /api/itineraries/:id :Retrieves an itinerary by ID.

### Appendix

**Itinerary Sharer ERD**
![Itinerary Sharer ERD](./assets/itinerary_sharer_erd.png)
