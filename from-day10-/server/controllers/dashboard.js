// const Ticket = require("../models/ticket_schema");
// const User = require("../models/user_schema");

const User = require("../models/Users");
const Ticket = require("../models/tickets");

const getAgentDashboardData = async (req, res) => {
  try {
    const agentId = req.user._id;

    //  tickets -> picked and reolved ->checked and ok
    const resolvedTicketsCount = await Ticket.countDocuments({
      resolvedBy: agentId,
      status: "Resolved",
      pickedBy: agentId,
    });

    // picked but not resolved
    const pickedNotResolvedCount = await Ticket.countDocuments({
      pickedBy: agentId,
      status: { $nin: ["Resolved", "Reopened"] },
    });

    // not picked but resolved ->  checked and ok
    const notPickedButResolved = await Ticket.countDocuments({
      resolvedBy: agentId,
      status: "Resolved",
      pickedBy: { $nin: agentId },
    });

    // handover to me and resolved
    const handoverTicketsCount = await Ticket.countDocuments({
      "movements.status": "handover",
      "movements.movedTo": { $ne: agentId },
      resolvedBy: agentId,
    });

    // assign to me and resolved
    const assignTicketsCount = await Ticket.countDocuments({
      "movements.status": "handover",
      "movements.movedTo": { $ne: agentId },
      resolvedBy: agentId,
    });

    // console.log(resolvedTicketsCount, pickedNotResolvedCount, handoverTicketsCount, assignTicketsCount, notPickedButResolved, "here are the things");
    res.status(200).json({
      ok: true,
      resolvedTicketsCount,
      pickedNotResolvedCount,
      handoverTicketsCount,
      assignTicketsCount,
      notPickedButResolved,
    });
  } catch (error) {
    console.error("Error fetching agent dashboard data:", error);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};

const getAgentTicketHistory = async (req, res) => {
  try {
    const agentId = req.user._id;

    // Tickets picked by the agent
    const pickedTickets = await Ticket.find({ pickedBy: agentId }).populate("category");

    // Tickets handed over to the agent (where agent is the target of a movement)
    const assignToAgent = await Ticket.find({
      movements: { $elemMatch: { movedTo: agentId, status: "assign" } },
    }).populate("category");

    // Tickets handed over by the agent to someone else
    const handedOverToOtherAgent = await Ticket.find({
      movements: { $elemMatch: { status: "handover", "movements.movedTo": { $ne: agentId } } },
      pickedBy: agentId,
    }).populate("category");

    const handedOverToMe = await Ticket.find({
      movements: { $elemMatch: { status: "handover", "movements.movedTo": agentId } },
    }).populate("category");

    // Combine the tickets into one response
    const response = {
      ok: true,
      pickedTickets,
      assignToAgent,
      handedOverToOtherAgent,
      handedOverToMe,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching agent's ticket history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getTicketByCatgories = async (req, res) => {
  try {
    const agentId = req.user._id;

    const _user = await User.findById({ _id: agentId });

    if (!_user || !_user.category) {
      return res.status(404).json({ error: "Agent or Category not found" });
    }

    // Aggregate tickets based on the creation date
    const _tickets = await Ticket.aggregate([
      {
        $match: {
          category: _user.category, // Matching tickets of the agent's category
          createdAt: { $exists: true },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ]);

    return res.status(200).json({ ok: true, _tickets });
  } catch (error) {
    console.error("Error fetching agent's ticket history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getSecondSlaBreachedTickets = async (req, res) => {
  try {
    const agentId = req.user._id; // Assuming you have middleware that sets the user in the request object

    // Assuming that a second SLA breach is identified by the property secondSLABreach being true
    const breachedTickets = await Ticket.find({
      pickedBy: agentId,
      secondSLABreach: true,
    });

    const breachCount = breachedTickets.length;

    return res.status(200).json({ breachCount, breachedTickets, ok: true });
  } catch (error) {
    console.error("Error fetching tickets that breached 2nd SLA:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAgentDashboardData,
  getAgentTicketHistory,
  getTicketByCatgories,
  getSecondSlaBreachedTickets,
};
