import { Errs } from "@/helpers/Errs";
import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "./api";
import toast from "react-hot-toast";

export const useComments = (ticketId) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");

  const gettingComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/ticket/comments/${ticketId}`, { withCredentials: true });
      // console.log(data.comments[0].comments)
      // there is an bug to fix
      setList(data.comments[0].comments);
    } catch (error) {
      Errs(error);
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ticketId) gettingComments();
  }, [ticketId]);

  const agentComments = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(`${API}/ticket/add-comments`, { ticketId, content: comment }, { withCredentials: true });

      toast.success("Added");
      setComment("");
      setList([...list, data.comments]);
    } catch (error) {
      console.log(error);
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const clientComments = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.put(`${API}/ticket/add-comment`, { ticketId, content: comment }, { withCredentials: true });
      setList([...list, res.data.comments]);
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (commentId) => {
    setLoading(true);
    try {
      setList(list.filter((x) => x._id !== commentId));

      // const res = await axios.get(`${API}`, { withCredentials: true });
    } catch (error) {
      Errs(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    list,
    loading,
    agentComments,
    clientComments,
    deleteComment,
    comment,
    setComment,
  };
};
