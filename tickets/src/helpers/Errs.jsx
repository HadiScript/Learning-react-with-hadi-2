import { Alert } from "react-bootstrap";
import toast from "react-hot-toast";

export const Errs = (error) => {
  if (error.response.data.message) {
    toast.custom(<Alert variant="danger">{error.response.data.message}</Alert>);
  }
};
