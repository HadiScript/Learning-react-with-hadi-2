// typescript no
// esLint yes
// alias yes
// App Router -- page.jsx -> index.jsx
// use Src yes -> App -> Src (all code will be here)
// use Src yes -> App -> other folder for share components.

// page -> folder -> index
// App -> folder -> page.jsx

// src -> admin -> page.jsx // localhost:3000/admin
// src -> admin -> [id] -> page.jsx // localhost:3000/admin/123

// src -> agent -> (...component) -> page.jsx // localhost:3000/agent
// src -> agent -> ticket ->(...component) -> page.jsx // localhost:3000/agent/ticket

// layout.js -> parent file for all the cildren compon
// -> hi

// React -> index.js

## APIS

Authenications :
General
Login: localhost:5000/auth/signin - POST
Register: localhost:5000/auth/signup - POST
currentUser: localhost:5000/auth/current-user - GET
logout: localhost:5000/auth/logout - POST

For Admin
Register AnyUser: localhost:5000/auth/create-user - POST

For Client
flow: Create Tc -> See All -> InProress or Open tickets -> Ticket Detail -> Do Comments -> Delete -> Comments
flow2: Resolved Ticket
flow3: All Resolved Tickets -> Reopen claim. ("ticket will be reopen")

Agent:
flow: All open ticket -> pick a ticket -> picked ticket detail -> do comment, delete comment -> resolved ticket
flow2: all reopen ticket -> ticket detail -> resolved ticket finally
flow3: handover to me (from other agent) tickets -> detail -> comments func -> resolved. (can not be handover further.)
flow4: assgin to me (from other admin) tickets -> detail -> comments func -> resolved.

APIS:
Base Url: localhost:5000/ticket

Flow API:
All open ticket: GET /
pick a ticket: PUT /pick
picked ticket detail: GET /detail/:ticketId
do comment: PUT /add-comments
delete: remain....
resolved ticket finally: PUT /update-to-resolved/:ticketId (valid for all)

Flow2 API:
flow2:
all reopen ticket: GET /all-opens
ticket detail: GET /detail/:ticketId
do comment: PUT /add-comments
resolved ticket finally: PUT /update-to-resolved/:ticketId (valid for all)

flow3 APIS:
handover to me (from other agent) tickets: GET /handover-to-me
detail: GET /detail/:ticketId
comments func: same as above
resolved. (can not be handover further.): same as above

flow4:
assgin to me (from other admin) tickets: GET /assign-to-me
detail: GET /detail/:ticketId
comments func: same as i wrote above
resolved:same as i wrote above

Escalate Ticket: PUT /escalate
My Pick Ticket: Get /my-picks
