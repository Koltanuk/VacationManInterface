Vacation Manager is a web application designed to manage vacation requests. 
It features two user interfaces: one for employees (requesters) to submit vacation requests, and another for managers (validators) to review, approve, or reject those requests.## Features

- Requester Interface:
  - Submit vacation requests with a required Start Date, End Date, and an optional Reason.
  - View a list of submitted requests along with their statuses (Pending, Approved, or Rejected).

- Validator Interface:
  - A dashboard displaying all submitted vacation requests.
  - Filter requests by status (Pending, Approved, Rejected, or All).
  - Approve or reject requests with an optional comment for feedback on rejections.

- Authentication & Role-Based Access:
  - Users log in using HTTP Basic authentication.
  - Role-based access restricts functionalities to either requesters or validators.
  - The backend automatically associates requests with the authenticated user.


Technical Choices:
- **Backend:**
  - **Spring Boot** for rapid development of RESTful APIs.
  - **Spring Security** for authentication and role-based access control.
  - **Hibernate/JPA** for ORM and database interactions.
  - **PostgreSQL (Neon)** for production; H2 in-memory for testing.
  - **Lombok** to reduce boilerplate code in model and service classes.

- **Frontend:**
  - **React** for building a modern, component-based user interface.
  - **React Router** for client-side routing between interfaces.
  - **Axios** for HTTP API calls to the backend.
  - Basic inline CSS for styling (which can be later enhanced with a CSS framework).

Setup:

Edit src/main/resources/application.properties with your DB properties (or use mine) and choose a port.
At frontend\package.json at  "proxy": "http://localhost:8086" choose port that was used in application properies in backend 

**Running the Application**:
*Login*:
Open your browser and navigate to http://localhost:3000.
Click the "Login" button and use the credentials seeded by the backend (for example, requester1/password for a requester and validator1/password for a validator).
*Requester Actions*:
After logging in as a requester, you can navigate to the "Request Vacation" page to submit new vacation requests and view your submitted requests.
*Validator Actions*:
After logging in as a validator, you can navigate to the "Validate Requests" dashboard to view all requests, filter them by status, and approve or reject pending requests.
*Logout*:
A Logout button is provided on the home page. Clicking it will clear the session and return you to the welcome page.


**Known Limitations**
The application uses HTTP Basic authentication with seeded credentials, in production should be more robust methods (like JWT, OAUTH).
There is no complete user registration or management system. Users are seeded via the DataInitializer.
There should be better error handling.
In styling I use only basic CSS, it can be improved also
