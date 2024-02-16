"use client";

import { Errs } from "@/helpers/Errs";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API } from "./api";

export const getTicketByCategoryCount = () => {
  const [list, setlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/ticket/tickets-count-category`);
      setlist(data.count);
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return { list, loading };
};

export const getTicketSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  // allInProgressTicketCount
  // allOpenTicketCount
  // allResolvedTicketCount
  // allTicketCount
  // mostReopenTicketCount

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/ticket/tickets-summary`);
      setData(data.summary);
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};

export const getAgentSummary = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/ticket/user-tickets`);
      setData(data.agentsWithTicketCounts);
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};

export const getAllEscTickets = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [agents, setAgents] = useState([]);

  const fetchingList = async () => {
    try {
      const { data } = await axios.get(`${API}/tickets/all-escalated-tickets`);
      setList(data.tickets);
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingList();
  }, []);

  const getAllAvailableAgents = async (tcId) => {
    try {
      const { data } = await axios.get(`${API}/users/all-agents-for-assign-tc/${tcId}`);
      setAgents(data.users);
    } catch (error) {
      Errs(error);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { list, loading, agent, getAllAvailableAgents };
};
