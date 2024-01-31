import { Tag } from "antd";

const SmallItems = ({ title, content }) => {
  return (
    <div className="d-flex justify-content-start align-items-center gap-3 mb-3 ">
      <Tag color="blue">{title} :</Tag><span>{content}</span>
    </div>
  );
};

export default SmallItems;
