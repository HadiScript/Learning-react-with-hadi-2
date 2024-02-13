'use client'

import { useComments } from "@/actions/comments"
import FormButton from "./FormButton"
import CircleLoader from "./CircleLoader"
import { _useAuth } from "@/context/Auth"


const ItsBtn = ({ isLoading, onClick }) => <button onClick={onClick} type="submit" className="myBtnSecondary mt-3">
  {isLoading ? <CircleLoader /> : "Submit"}
</button>


const CommentSection = ({ list, doComment, deleteComment, comment, setComment, loading }) => {
  const [auth] = _useAuth();

  console.log(list, "comments")

  return (
    <div className="mt-5">
      <h3>Comments</h3>
      <form onSubmit={doComment}>
        <div className="form-group mb-2">
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} type="text" className="form-control myInput" />
        </div>
        <div className="text-start"> <ItsBtn isLoading={loading} onClick={doComment} /> </div>
      </form>

      <div className="container mt-5 mt-5">
        {list?.map(x => <div key={x._id} className="d-flex flex-column gap-1 mb-2 border-bottom">
          <div className="d-flex justify-content-between algin-items-center">
            <b> {x.createdBy === auth?._id ? "Me" : "His"} </b>
            <div> {x.createdBy === auth?._id && <span className="text-danger">delete</span>} </div>

          </div>
          <p style={{ maxWidth: '300px' }}>{x.content}</p>
        </div>)}

      </div>
    </div>
  )
}

export default CommentSection