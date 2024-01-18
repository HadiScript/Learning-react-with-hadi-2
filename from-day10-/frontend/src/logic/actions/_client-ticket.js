// export const useTicketCreation = () => {};

import { useEffect, useState } from "react";
import { _useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export const __useOpenTickets = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const fetchingList = async () => {
    setLoading(true);
    try {
      const res = await axios.get("ticket/my-opens");
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

export const __useResolvedTickets = () => {};

export const __useSingleTicket = (id) => {
  // console.log(id, "from hook custom");
  const [auth] = _useAuth();
  const authToken = auth && auth?.token;

  const [comment, setComment] = useState("");

  const [singleItem, setSingleItem] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchSingleTicket = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/ticket/single/${id}`);
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

  return { loading, singleItem, comment, setComment, doComment, deleteComment };
};
