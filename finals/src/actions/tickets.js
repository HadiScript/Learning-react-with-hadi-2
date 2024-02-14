"use client";

import axios from "axios";
import { API } from "./api";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Errs } from "@/helpers/Errs";
import toast from "react-hot-toast";

export const useBucket = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchOpenTickets = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/ticket`, { withCredentials: true });
      // console.log(res);
      setList(res?.data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenTickets();
  }, []);

  // pick any tikcet
  const pickAnTicket = async (ticketId) => {
    setLoading(true);
    try {
      const res = await axios.put(`${API}/ticket/pick`, { ticketId }, { withCredentials: true });
      router.push(`/agent/tickets/${ticketId}`);
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

export const useSingleTicket = (id) => {
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchingSingleTicket = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/ticket/detail/${id}`, { withCredentials: true });
        console.log(res);
        setTicket(res.data.detail);
      } catch (error) {
        Errs(error);
        // console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchingSingleTicket();
  }, [id]);

  const EscTicket = async (ticketId, why) => {
    if (!why) {
      return toast.error("Please write something..");
    }
    setLoading(true);
    try {
      await axios.put(`${API}/ticket/escalate`, { ticketId, why }, { withCredentials: true });
      router.push("/agent/tickets/picked");
    } catch (error) {
      Errs(error);
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
      const res = await axios.put(`ticket/update-to-resolved/${id}`, { withCredentials: true });
      toast.success(res.data.msg);
      router("/agent/tickets/resolved");
    } catch (error) {
      Errs(error);
      console.log(error);
      // toast.error("Failed, try again.");
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/user/available-for-handover`, { withCredentials: true });

      setList(res.data.users);
    } catch (error) {
      Errs(error);
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
      const res = await axios.put(`${API}/ticket/handover-ticket`, { ticketId, newAgentId, reason }, { withCredentials: true });
      router.push("/agent/tickets/picked");
      toast.success(`Handover to ${newAgentId}`);
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

export const usePickTickets = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyPickTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/ticket/my-picks`, { withCredentials: true });
      // console.log(res);
      setList(res?.data.tickets);
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPickTickets();
  }, [fetchMyPickTickets]);

  return {
    loading,
    list,
  };
};

export const ResolveTickets = async (x) => {
  try {
    await axios.put(`${API}/ticket/update-to-resolved/${x}`, {}, { withCredentials: true });
    toast.success("ticket has been resolved");
  } catch (error) {
    Errs(error);
    console.log(error);
  }
};

export const useResolvedTickets = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchingResolvedTickets = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/ticket/resolved-tickets`, { withCredentials: true });
      setList(res?.data.tickets);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchingResolvedTickets();
  }, [fetchingResolvedTickets]);

  return {
    list,
    loading,
  };
};
