const express = require("express");

const { getAgentDashboardData, getAgentTicketHistory, getTicketByCatgories, getSecondSlaBreachedTickets } = require("../controllers/UserDashboard_cntrl");
const { verifyToken, isAgent } = require("../middleware/verifying");

const router = express.Router();

router.get("/agent-numbers", verifyToken, isAgent, getAgentDashboardData);
router.get("/ticket-logs", verifyToken, isAgent, getAgentTicketHistory);
router.get("/ticket-category", verifyToken, isAgent, getTicketByCatgories);
router.get("/second-sla-breached", verifyToken, isAgent, getSecondSlaBreachedTickets);

module.exports = router;
