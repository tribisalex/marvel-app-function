import ErrorMessage from "../components/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";
import React from "react";

const Page404 = () => {
  return (
    <>
      <ErrorMessage/>
      <div style={{textAlign: 'center', fontSize: '24px', fontWeight: 'bold'}}>
        <div>Page not found</div>
        <Link to={'/'} style={{color: 'red', marginTop: '20px'}}>Back to main page</Link>
      </div>
    </>
  )
}

export default Page404;
