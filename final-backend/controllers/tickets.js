const errorHandler = require("../middleware/errorHandler");
const Category = require("../models/Category");
const User = require("../models/Users");
const Ticket = require("../models/tickets");
const Comment = require("../models/Comments");

// all open tickets
const ticketBucket = async (req, res, next) => {
  try {
    const _user = await User.findOne({ _id: req.user.id });

    if (_user.role === "agent") {
      const _tickets = await Ticket.find({ status: "Open", pickedBy: null, category: _user.category });
      res.status(200).json({ tickets: _tickets });
    } else {
      const _tickets = await Ticket.find({ status: "Open", pickedBy: null });
      res.status(200).json({ tickets: _tickets });
    }
  } catch (error) {
    next(error);
  }
};

// for the first SLA
const pickTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) {
      return next(errorHandler(400, "Invalid Ticket ID"));
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return next(errorHandler(400, "Invalid Ticket ID"));
    }

    if (ticket.pickedBy) {
      return next(errorHandler(400, "Ticket has already been picked"));
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "agent") {
      return next(errorHandler(400, "Invalid user"));
    }

    // Check if the user's category matches the ticket's category
    if (user.category.toString() !== ticket.category.toString()) {
      return next(errorHandler(400, "Categoires are not matched"));
    }

    // SLA Check
    const currentTime = new Date();
    const timeDifference = (currentTime - new Date(ticket.createdAt)) / 60000; // Difference in minutes

    if (timeDifference > 10) {
      ticket.firstSLABreach = true;
    }

    ticket.pickedBy = req.user.id;
    ticket.currentAgent = req.user.id;
    ticket.pickedAt = currentTime;
    ticket.status = "In Progress";
    await ticket.save();

    return res.status(200).json({
      msg: "Ticket picked successfully",
      // ticket: ticket,
    });
  } catch (error) {
    next(error);
  }
};

const pickedTicketListOfAgent = async (req, res, next) => {
  try {
    const _tickets = await Ticket.find({
      status: "In Progress",
      pickedBy: req.user.id,
      currentAgent: req.user.id,
      movements: { $size: 0 },
    });

    res.status(200).json({ tickets: _tickets });
  } catch (error) {
    next(error);
  }
};

const addComments = async (req, res, next) => {
  try {
    const { ticketId, content } = req.body;
    if (!ticketId || !content) {
      return next(errorHandler(400, "Invalid inputs"));
    }

    const ticket = await Ticket.findById(ticketId).populate("comments");
    if (!ticket) {
      return next(errorHandler(400, "Invalid Ticket ID"));
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "agent") {
      return next(errorHandler(400, "Not allowed"));
    }

    // Check for the second SLA breach
    if (!ticket.firstRespondedAt) {
      ticket.firstRespondedAt = new Date();
      const timeDifference = (ticket.firstRespondedAt - new Date(ticket.createdAt)) / 60000; // Difference in minutes

      if (timeDifference > 1) {
        ticket.secondSLABreach = true;
      }
    }

    // Create a new comment
    const newComment = new Comment({
      content,
      createdBy: req.user.id,
      createdAt: new Date(),
    });
    const _comment = await newComment.save();

    // Add  the comment to the ticket
    ticket.comments.push(newComment._id);

    await ticket.save();

    return res.status(200).json({
      ok: true,
      comments: _comment,
    });
  } catch (error) {
    next(error);
  }
};

const handoverTicket = async (req, res, next) => {
  const { ticketId, newAgentId, reason } = req.body;

  try {
    if (!ticketId || !newAgentId || !reason) {
      return next(errorHandler(400, "Fields are required"));
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return next(errorHandler(404, "Not found"));
    }

    const _user = await User.findById(newAgentId);
    if (!_user) {
      return next(errorHandler(404, "Not found"));
    }

    if (_user._id.toString() === req.user.id.toString()) {
      return next(errorHandler(400, "Invalid user"));
    }

    console.log(ticket.status, "here are the status");

    if (ticket.status === "Open" || ticket.status === "Resolved") {
      return next(errorHandler(400, "Cannot handover at this stage"));
    }

    ticket.movements.push({
      status: "handover",
      why: reason,
      movedBy: req.user.ud,
      movedTo: newAgentId,
      movementAt: new Date(),
    });

    ticket.currentAgent = newAgentId;
    ticket.status = "In Progress";

    await ticket.save();

    res.status(200).json({ msg: "Ticket successfully handed over", ok: true });
  } catch (error) {
    next(error);
  }
};

const handoverToMe = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({
      currentAgent: req.user.id,
      "movements.movedTo": req.user.id,
      "movements.status": "handover",
      status: "In Progress",
      // movements: {
      //   $not: {
      //     $elemMatch: {
      //       status: { $in: ["escalated"] },
      //     },
      //   },
      // },
    });

    return res.status(200).json({ tickets });
  } catch (error) {
    next(error);
  }
};

const escalateTickets = async (req, res, next) => {
  try {
    const { ticketId, why } = req.body;

    // Validate inputs
    if (!ticketId || !why) {
      return next(errorHandler(400, "All fields are requried"));
    }

    // Find the ticket by its ID
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return next(errorHandler(404, "Not found"));
    }

    if (ticket.status === "Resolved" && ticket.status === "Open") {
      return next(errorHandler(400, "Invalid ticket"));
    }

    if (ticket.currentAgent.toString() !== req.user.id.toString()) {
      return next(errorHandler(400, "Invalid agent"));
    }

    // Update the escalated field in the ticket
    ticket.movements.push({
      status: "escalate",
      why,
      movedBy: req.user.ud,
      movementAt: new Date(), // Might want to rename this field to something more generic like "movedAt"
    });

    ticket.currentAgent = null;
    ticket.escalated = true;
    // Save the changes
    await ticket.save();

    return res.status(200).json({ msg: "Ticket escalated successfully to manager", ticket });
  } catch (error) {
    next(error);
  }
};

const assignToMe = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({
      currentAgent: req.user.id,
      "movements.movedTo": req.user.id,
      "movements.status": "assign",
      status: "In Progress",
      // movements: {
      //   $not: {
      //     $elemMatch: {
      //       status: { $in: ["escalated"] },
      //     },
      //   },
      // },
    });

    return res.status(200).json({ tickets });
  } catch (error) {
    next(error);
  }
};

const allReponedTicketsOf_a_Agent = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({
      currentAgent: req.user.id,
      status: "Reopened",
    });

    return res.status(200).json({ tickets });
  } catch (error) {
    next(error);
  }
};

// -------------------- for client func

const addCommentByClient = async (req, res, next) => {
  try {
    const { ticketId, content } = req.body;
    if (!ticketId || !content) {
      return next(errorHandler(400, "Invalid inputs"));
    }

    const ticket = await Ticket.findById(ticketId).populate("comments");
    if (!ticket) {
      return next(errorHandler(400, "Invalid Ticket ID"));
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "client") {
      return next(errorHandler(400, "Not allowed"));
    }

    // Create a new comment
    const newComment = new Comment({
      content,
      createdBy: req.user.id,
      createdAt: new Date(),
    });
    const _comment = await newComment.save();

    // Add  the comment to the ticket
    ticket.comments.push(newComment._id);

    await ticket.save();

    return res.status(200).json({
      ok: true,
      comments: _comment,
    });
  } catch (error) {
    next(error);
  }
};

const createTicket = async (req, res, next) => {
  try {
    const { title, description, category, priority, images } = req.body;

    if (!title || !description || !category || !priority) {
      return next(errorHandler(400, "All fields are required"));
    }

    const user = await User.findById(req.user.id);
    if (!user || user.role !== "client") {
      return next(errorHandler(400, "Invalid user"));
    }

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return next(errorHandler(400, "Invalid category"));
    }

    // Create new ticket
    const newTicket = new Ticket({
      title,
      description,
      category,
      priority,
      images: images || [],
      createdBy: req.user.id,
      status: "Open",
      createdAt: new Date(),
    });

    // Save the ticket
    await newTicket.save();

    // Send success response
    return res.status(201).json({
      ok: true,
      msg: "Ticket created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const ClientsOpenTickets = async (req, res, next) => {
  try {
    const _tickets = await Ticket.find({ status: { $in: ["Open", "In Progress", "Reopened"] }, createdBy: req.user.id });
    res.status(200).json({ tickets: _tickets });
  } catch (error) {
    next(error);
  }
};

const ClientsInProgressTickets = async (req, res, next) => {
  try {
    const _tickets = await Ticket.find({ status: "In Progress", createdBy: req.user.id });
    res.status(200).json({ tickets: _tickets });
  } catch (error) {
    next(error);
  }
};

const reopenTicket = async (req, res, next) => {
  try {
    const { ticketId } = req.params; // Assuming the ticketId is passed as a parameter

    // Find the ticket by ID
    const ticket = await Ticket.findOne({ _id: ticketId, createdBy: req.user.id });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if the ticket is in a state that allows reopening
    if (ticket.status !== "Resolved") {
      return res.status(400).json({ message: "Ticket cannot be reopened at this stage" });
    }

    // Update ticket details to reopen
    ticket.status = "Reopened";
    ticket.resolvedAt = null; // Reset resolvedAt timestamp
    ticket.resolvedBy = null; // Reset resolvedBy user
    ticket.reopenCount += 1; // Increment reopen count

    // Save the updated ticket
    await ticket.save();

    res.status(200).json({ message: "Ticket reopened successfully", ticket });
  } catch (error) {
    next(error);
  }
};

// -------------------- for both

const updateTicketToResolved = async (req, res, next) => {
  try {
    // Get ticket ID and user ID from request
    const { ticketId } = req.params;

    // Find the ticket by ID
    const _user = await User.findById(req.user.id);
    const ticket = await Ticket.findById(ticketId).populate("movements.movedTo");

    if (!ticket) {
      return next(errorHandler(404, "Not found"));
    }

    if (_user.role === "agent" && ticket.currentAgent.toString() !== req.user.id) {
      return next(errorHandler(400, "Invalid agent"));
    }

    if (_user.role === "agent" && ticket.currentAgent.toString() === req.user.id) {
      ticket.status = "Resolved";
      ticket.resolvedBy = req.user.id;
      ticket.resolvedAt = new Date(); // Adding resolved timestamp

      // Save the ticket
      await ticket.save();

      return res.status(200).json({ ok: true, msg: "Ticket resolved successfully", ticket });
    } else if (_user.role === "client") {
      ticket.status = "Resolved";
      ticket.resolvedBy = req.user.id;
      ticket.resolvedAt = new Date(); // Adding resolved timestamp

      // Save the ticket
      await ticket.save();

      return res.status(200).json({ ok: true, msg: "Ticket resolved successfully", ticket });
    }
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};

const resolvedTickets = async (req, res, next) => {
  try {
    const _user = await User.findById(req.user.id);

    if (_user.role === "admin" || _user.role === "manager") {
      const _tickets = await Ticket.find({ status: "Resolved" });
      res.status(200).json({ tickets: _tickets });
    } else if (_user.role === "agent") {
      const _tickets = await Ticket.find({ resolvedBy: _user._id, status: "Resolved" });
      res.status(200).json({ tickets: _tickets });
    } else if (_user.role === "client") {
      const _tickets = await Ticket.find({ createdBy: _user._id, status: "Resolved" });
      res.status(200).json({ tickets: _tickets });
    }
  } catch (error) {
    next(error);
  }
};

const ticketDetail = async (req, res, next) => {
  const { ticketId } = req.params;
  try {
    const user = await User.findById({ _id: req.user.id });
    const detail = await Ticket.findById({ _id: ticketId });

    if (user.role === "agent") {
      return res.json({ detail });
    } else if (user.role === "client") {
      detail.resolvedBy = undefined;
      detail.pickedBy = undefined;
      detail.currentAgent = undefined;
      detail.escalated = undefined;
      detail.pickedAt = undefined;
      detail.firstSLABreach = undefined;
      detail.secondSLABreach = undefined;
      detail.firstRespondedAt = undefined;
      detail.movements = undefined;

      return res.json({ detail });
    }
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};

const gettingComments = async (req, res, next) => {
  try {
    const data = await Ticket.find({ _id: req.params.ticketId }).select("comments").populate("comments");

    res.json({ comments: data });
  } catch (error) {
    console.error("Error updating ticket status:", error);
    return res.status(500).json({ ok: false, error: "Internal Server Error" });
  }
};

// for admins
const allTickerts = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({});
    res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

const allEscalatedTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ escalated: true, currentAgent: null });
    res.json({ tickets });
  } catch (error) {
    next(error);
  }
};

const assignTicket = async (req, res, next) => {
  const { ticketId, newAgentId, reason } = req.body;

  try {
    if (!ticketId || !newAgentId || !reason) {
      return next(errorHandler(400, "Fields are required"));
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return next(errorHandler(404, "Not found"));
    }

    const _user = await User.findById(newAgentId);
    if (!_user || _user.role !== "agent") {
      return next(errorHandler(404, "Not found"));
    }

    ticket.movements.push({
      status: "assign",
      why: reason,
      movedBy: req.user.ud,
      movedTo: newAgentId,
      movementAt: new Date(),
    });

    ticket.currentAgent = newAgentId;
    ticket.status = "In Progress";
    ticket.escalated = false;

    await ticket.save();

    res.status(200).json({ msg: "Ticket successfully assign", ok: true });
  } catch (error) {
    next(error);
  }
};

const getMostReopenedTickets = async (req, res, next) => {
  try {
    const maxReopenCount = await Ticket.find()
      .sort({ reopenCount: -1 })
      .limit(1)
      .then((tickets) => tickets[0].reopenCount);
    const mostReopenedTickets = await Ticket.find({ reopenCount: maxReopenCount });

    res.status(200).json({ tickets: mostReopenedTickets });
  } catch (error) {
    next(error);
  }
};

const getOpenTickets = async (req, res, next) => {
  try {
    const openTickets = await Ticket.find({ status: "Open" });
    res.json(openTickets);
  } catch (error) {
    next(error);
  }
};

const getInProgressTickets = async (req, res, next) => {
  try {
    const inProgressTickets = await Ticket.find({ status: "In Progress" });
    res.json(inProgressTickets);
  } catch (error) {
    next(error);
  }
};

const getResolvedTickets = async (req, res, next) => {
  try {
    const resolvedTickets = await Ticket.find({ status: "Resolved" });
    res.json(resolvedTickets);
  } catch (error) {
    next(error);
  }
};

const getTicketCountByCategory = async (req, res, next) => {
  try {
    const data = await Ticket.aggregate([
      {
        $group: {
          _id: "$category",
          ticketCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "categories", // This should match the name of your categories collection
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails",
        },
      },
      {
        $unwind: "$categoryDetails",
      },
      {
        $project: {
          _id: 0,
          category: "$categoryDetails.name",
          ticketCount: 1,
        },
      },
    ]);

    res.json({ count: data });
  } catch (error) {
    next(error);
  }
};

const getTicketSummary = async (req, res, next) => {
  try {
    // Aggregate to calculate counts based on status
    const statusCounts = await Ticket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Calculate the maximum number of reopens
    const mostReopenedCount = await Ticket.aggregate([
      {
        $group: {
          _id: null,
          maxReopenCount: { $max: "$reopenCount" },
        },
      },
    ]);

    // Prepare the response object
    let response = {
      allTicketCount: 0,
      allResolvedTicketCount: 0,
      allOpenTicketCount: 0,
      allInProgressTicketCount: 0,
      mostReopenTicketCount: mostReopenedCount.length > 0 ? mostReopenedCount[0].maxReopenCount : 0,
    };

    // Sum up total tickets and assign counts based on status
    statusCounts.forEach((statusCount) => {
      response.allTicketCount += statusCount.count;

      switch (statusCount._id) {
        case "Resolved":
          response.allResolvedTicketCount = statusCount.count;
          break;
        case "Open":
          response.allOpenTicketCount = statusCount.count;
          break;
        case "In Progress":
          response.allInProgressTicketCount = statusCount.count;
          break;
      }
    });

    res.json({ summary: response });
  } catch (error) {
    next(error);
  }
};

const getUserResolvedAndPickedTickets = async (req, res, next) => {
  try {
    // Aggregate resolved tickets
    const resolvedTicketsAggregation = await Ticket.aggregate([
      { $match: { status: "Resolved" } }, // Filter for resolved tickets
      { $group: { _id: "$resolvedBy", resolvedCount: { $sum: 1 } } }, // Group by resolvedBy and count
    ]);

    // Aggregate picked tickets
    const pickedTicketsAggregation = await Ticket.aggregate([
      { $match: { status: { $ne: "Resolved" } } }, // Filter for non-resolved (picked) tickets
      { $group: { _id: "$pickedBy", pickedCount: { $sum: 1 } } }, // Group by pickedBy and count
    ]);

    // Map of resolved and picked ticket counts by user ID
    let resolvedMap = {};
    resolvedTicketsAggregation.forEach((item) => {
      if (item._id) resolvedMap[item._id.toString()] = item.resolvedCount;
    });

    let pickedMap = {};
    pickedTicketsAggregation.forEach((item) => {
      if (item._id) pickedMap[item._id.toString()] = item.pickedCount;
    });

    // Find all agents
    const agents = await User.find({ role: "agent" });

    // Map agents to their resolved and picked ticket counts
    const agentsWithTicketCounts = agents.map((agent) => ({
      userInfo: agent,
      resolvedTickets: resolvedMap[agent._id.toString()] || 0,
      pickedTickets: pickedMap[agent._id.toString()] || 0,
    }));

    res.json({ agentsWithTicketCounts });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTicket,
  pickTicket,
  ticketBucket,
  pickedTicketListOfAgent,
  addComments,
  addCommentByClient,
  updateTicketToResolved,
  ClientsOpenTickets,
  ClientsInProgressTickets,
  reopenTicket,
  resolvedTickets,
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
};
