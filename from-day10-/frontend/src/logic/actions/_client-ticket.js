// export const useTicketCreation = () => {};

import { useEffect, useState } from "react";
import { _useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useReq } from "../hook/useReq";

export const __useOpenTickets = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const fetchingList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`ticket/my-opens`);
      // console.log(res )
      if (res.status === 200) {
        setList(res.data.tickets);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchingList();
    }
  }, [authToken]);

  return { loading, list };
};

export const __useResolvedTickets = () => {
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchingList = async () => {
    setLoading(true);
    try {
      const res = await axios.get("ticket/resolved-tickets");
      // console.log(res )
      if (res.status === 200) {
        setList(res.data.tickets);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchingList();
    }
  }, [authToken]);

  return { loading, list };
};

export const __useSingleTicket = (id) => {
  // console.log(id, "from hook custom");
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const router = useNavigate();

  const [comment, setComment] = useState("");

  const [singleItem, setSingleItem] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchSingleTicket = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/ticket/client-single/${id}`);
      if (res.status === 200) {
        setSingleItem(res.data.singleTicket);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken && id) {
      fetchSingleTicket();
    }
  }, [authToken, id]);

  const doComment = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/ticket/add-comment`, { ticketId: id, content: comment });
      if (res.status === 200) {
        // setSingleItem(res.data.singleTicket);
        toast.success("Comment Added");
        setSingleItem((prev) => ({ ...prev, comments: [...prev.comments, res.data.comments] }));
        setComment("");
        // fetchSingleTicket();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      setLoading(true);
      // const data = await axios.delete(`/delete/comment/${commentId}`);
      // if (data.ok) {
      toast.success("deleted");
      setSingleItem((prev) => ({ ...prev, comments: singleItem.comments.filter((x) => x._id !== commentId) }));
      // }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  // update-to-resolved
  const closeTicket = async () => {
    try {
      setLoading(true);
      const res = await axios.put(`ticket/update-to-resolved/${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        router("/_/resolved-requests");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, singleItem, comment, setComment, doComment, deleteComment, closeTicket };
};

export const __useGetList = (url) => {
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const fetchingList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      // console.log(res )
      if (res.status === 200) {
        setList(res.data.tickets);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchingList();
    }
  }, [authToken]);

  return { loading, list };
};

// ticket/reopen-ticket/6554c34105b9fc5589d0424c

export const __useReopenTc = () => {
  const { loading, makeReq } = useReq();

  const toReopenTc = async (id) => {
    let res = await makeReq("put", `ticket/reopen-ticket/${id}`);
    if (res.status === 200) {
      toast.success("Ticket reopened successfully");
    }

    console.log(res, "here is the res from make req");
  };

  return { loading, toReopenTc };
};
