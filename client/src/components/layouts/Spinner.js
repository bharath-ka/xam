import React, { Fragment } from 'react';

export default () => (
  <Fragment>
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </Fragment>
);