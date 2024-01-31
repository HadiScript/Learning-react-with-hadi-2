import { Grid } from "antd";

const { useBreakpoint } = Grid;

const TcDetailHead = ({ singleItem }) => {
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            {useBreakpoint().md && <th scope="col">Description</th>}
            <th scope="col">Priority</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{singleItem?.title}</td>
            {useBreakpoint().md && <td style={{ maxWidth: "400px" }}>{singleItem?.description}</td>}
            <td>{singleItem?.priority}</td>
            <td>{singleItem?.category?.name}</td>
            <td>{singleItem?.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TcDetailHead;
