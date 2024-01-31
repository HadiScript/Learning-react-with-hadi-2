import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { _useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useBucket = () => {
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOpenTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/ticket");
      // console.log(res);
      setList(res?.data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchOpenTickets();
    }
  }, [authToken]);

  // pick any tikcet
  const pickAnTicket = async (ticketId) => {
    setLoading(true);
    try {
      const res = await axios.put("/ticket/pick", { ticketId });
      fetchOpenTickets();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    list,
    fetchOpenTickets,
    pickAnTicket,
  };
};

export const usePickTickets = () => {
  // ticket/my-picks

  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyPickTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/ticket/my-picks");
      // console.log(res);
      setList(res?.data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchMyPickTickets();
  }, [fetchMyPickTickets]);

  return {
    loading,
    list,
  };
};

export const useSingleTicket = (id) => {
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useNavigate();

  useEffect(() => {
    const fetchingSingleTicket = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/ticket/single/${id}`);
        setTicket(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id && authToken) fetchingSingleTicket();
  }, [id, authToken]);

  const EscTicket = async (ticketId, why) => {
    if (!why) {
      return toast.error("Please write something..");
    }
    setLoading(true);
    try {
      await axios.put("ticket/escalate", { ticketId, why });
      router("/agent/picked-tickets");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // doComment
  // deleteComent

  const closeTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`ticket/update-to-resolved/${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        router("/agent/resolved-requests"); // agent resolved
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    ticket,
    EscTicket,
    closeTicket,
  };
};

export const useAvailableAgents = (isOpen) => {
  const router = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("user/available-for-handover");
      if (res.status === 200) {
        setList(res.data.users);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  let reason = "no reason at all.";

  const handoverTc = async (ticketId, newAgentId) => {
    setLoading(true);
    try {
      const res = await axios.put("ticket/handover-ticket", { ticketId, newAgentId, reason });
      toast.success(`Moved to ${newAgentId}`);
      router("/agent/picked-tickets");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    list,
    handoverTc,
  };
};


