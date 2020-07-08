import React, { Fragment } from 'react';

export default () => (
  <Fragment>
    <div className="d-flex justify-content-center">
      <div class="spinner-border text-primary" style={{ width: "5rem", height: "5rem" }} role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </Fragment>
);