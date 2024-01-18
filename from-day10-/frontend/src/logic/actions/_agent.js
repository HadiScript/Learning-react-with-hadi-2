import axios from "axios";
import { useEffect, useState } from "react";
import { _useAuth } from "../context/AuthContext";

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

  const fetchMyPickTickets = async () => {
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
  };

  useEffect(() => {
    if (authToken) {
      fetchMyPickTickets();
    }
  }, [authToken]);

  return {
    loading,
    list,
  };
};
