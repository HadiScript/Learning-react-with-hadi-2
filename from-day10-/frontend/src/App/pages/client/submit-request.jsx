import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { DiffOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select } from "antd";
import { _useCategories } from "../../../logic/actions/_categories";
import { useNavigate } from "react-router-dom";
import PanelHeading from "../../components/common/PanelHeading";

const { Option } = Select;

const SubmitRequest = () => {
  const { loading: catsLoading, categories } = _useCategories();
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`ticket/create`, values);
      if (res.status === 201) {
        toast.success("Request generated");
        router("/_/open-requests");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <PanelHeading icon={<DiffOutlined className="its-icon" />} title={"Submit Request"} />

        <Form layout="vertical" name="submit-request" onFinish={onFinish}>
          <div className="row px-3">
            <div className="col-md-6 col-xs-12">
              <Form.Item name={"title"} label="Title" rules={[{ required: true, message: "Please enter the title" }]}>
                <Input placeholder="e.g: Problem is occuring at hosting" />
              </Form.Item>
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Item name={"description"} label="Description" rules={[{ required: true, message: "Please enter the description" }]}>
                <Input.TextArea placeholder="Description here.." />
              </Form.Item>
            </div>
          </div>

          <div className="row px-3">
            <div className="col-md-6 col-xs-12">
              <Form.Item name={"category"} label={`Category ${catsLoading && "...."}`} rules={[{ required: true, message: "Please select an category" }]}>
                <Select placeholder="Select a category">
                  {categories.map((x) => (
                    <Option key={x._id} value={x._id}>
                      {x.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6 col-xs-12">
              <Form.Item name={"priority"} label="Priority" rules={[{ required: true, message: "Please select an priority" }]}>
                <Select placeholder="Select a category">
                  {/* ["Low", "Medium", "High", "Critical"] */}
                  <Option value={"Low"}>Low</Option>
                  <Option value={"Medium"}>Medium</Option>
                  <Option value={"High"}>High</Option>
                  <Option value={"Critical"}>Critical</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <div className="d-flex px-3 ">
            <Button loading={loading} className="myBtn" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default SubmitRequest;
