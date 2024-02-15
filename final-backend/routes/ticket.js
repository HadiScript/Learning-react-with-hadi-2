const express = require("express");
const { verifyToken, isClient, isAgent, AdminAndManager } = require("../middleware/verifying");
const {
  createTicket,
  pickTicket,
  ticketBucket,
  pickedTicketListOfAgent,
  addComments,
  addCommentByClient,
  updateTicketToResolved,
  ClientsOpenTickets,
  ClientsInProgressTickets,
  resolvedTickets,
  reopenTicket,
  handoverTicket,
  allTickerts,
  handoverToMe,
  escalateTickets,
  allEscalatedTickets,
  assignTicket,
  assignToMe,
  allReponedTicketsOf_a_Agent,
  ticketDetail,
  gettingComments,
  getMostReopenedTickets,
  getOpenTickets,
  getInProgressTickets,
  getResolvedTickets,
  getTicketCountByCategory,
  getTicketSummary,
  getUserResolvedAndPickedTickets,
} = require("../controllers/tickets");

const router = express.Router();

// all reopen ticket to pick with same category
router.get("/", verifyToken, ticketBucket);

// ------------

// done
router.get("/my-picks", verifyToken, isAgent, pickedTicketListOfAgent);
router.get("/all-opens", verifyToken, isAgent, allReponedTicketsOf_a_Agent);
router.put("/pick", verifyToken, isAgent, pickTicket);
router.put("/add-comments", verifyToken, isAgent, addComments);
router.put("/handover-ticket", verifyToken, isAgent, handoverTicket);
// all tickets that handover to me
router.get("/handover-to-me", verifyToken, isAgent, handoverToMe);
router.get("/assign-to-me", verifyToken, isAgent, assignToMe);
router.put("/escalate", verifyToken, isAgent, escalateTickets);

// ------------ client routers

router.post("/create", verifyToken, isClient, createTicket);
router.put("/add-comment", verifyToken, isClient, addCommentByClient);
router.get("/my-opens", verifyToken, isClient, ClientsOpenTickets);
router.get("/my-in-progress", verifyToken, isClient, ClientsInProgressTickets);
router.put("/reopen-ticket/:ticketId", verifyToken, isClient, reopenTicket);

// -------------------- for both
router.put("/update-to-resolved/:ticketId", verifyToken, updateTicketToResolved);

// -------------------- for any one
router.get("/resolved-tickets", verifyToken, resolvedTickets);
router.get("/detail/:ticketId", verifyToken, ticketDetail);
router.get("/comments/:ticketId", verifyToken, gettingComments);

// -------------------- admins
router.get("/all-tickets", verifyToken, allTickerts);
router.get("/all-escalated-tickets", verifyToken, AdminAndManager, allEscalatedTickets);
router.put("/assign-ticket", verifyToken, AdminAndManager, assignTicket);
// available for assigning ticket, category by ticket remaining****

router.get("/most-reopen", verifyToken, AdminAndManager, getMostReopenedTickets);
router.get("/open-tickets", verifyToken, AdminAndManager, getOpenTickets);
router.get("/inprogress-tickets", verifyToken, AdminAndManager, getInProgressTickets);
router.get("/resolved-tickets", verifyToken, AdminAndManager, getResolvedTickets);
router.get("/tickets-count-category", verifyToken, AdminAndManager, getTicketCountByCategory);
router.get("/tickets-summary", verifyToken, AdminAndManager, getTicketSummary);
router.get("/user-tickets", verifyToken, AdminAndManager, getUserResolvedAndPickedTickets);

module.exports = router;
