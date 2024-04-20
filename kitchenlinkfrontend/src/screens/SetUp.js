import React from "react";
import "./SetUp.css";

export default function SetUp() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i>KitchenLink</i>
          </a>
        </div>
      </nav>
      <div className="heading">
        <h2>Set up your Restaurant</h2>
      </div>
      <h5>Restaurant details</h5>
      <form action="form-group">
        <div className="mb-4 ">
          <div className="col-6">
            <label htmlFor="res-name" className="form-label">
              Restaurant name
            </label>
            <input type="text" id="res-name" className="form-control" />
          </div>
          <div className="col-6">
            <label htmlFor="own-name" className="form-label">
              Owner's name
            </label>
            <input type="text" id="own-name" className="form-control" />
          </div>
        </div>
      </form>
    </div>
  );
}
