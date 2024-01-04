import React, { memo, useEffect } from "react";

let MyCount = 1;

const CompoA = memo(function CompoA(props) {

  useEffect(()=>{
    MyCount++
  })

  return <>Render Count : {MyCount}</>;
});
export default CompoA;
