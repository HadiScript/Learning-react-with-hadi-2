import { Circles } from "react-loader-spinner"

const FormButton = ({ type, isLoading }) => {
  return <button type="submit" className="myBtnSecondary mt-3">
    {isLoading ? <Circles
      height="20"
      width="20"
      color="rgb(136, 136, 255)"
      ariaLabel="circles-loading"
      visible={true}
    /> : "Submit"}
  </button>
}

export default FormButton