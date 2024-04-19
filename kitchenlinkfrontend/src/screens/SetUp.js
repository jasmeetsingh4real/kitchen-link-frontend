import React from "react";
import "./SetUp.css";

export default function SetUp() {
  return (
    <div className="">
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
      <div className="container">
        <h5>Restaurant details</h5>
        <form action="form-group">
          <div className="row text-start">
            {/* input field*/}
            <div className="col-6">
              <div className="p-2 ">
                <label htmlFor="res-name " className="form-label small mb-0">
                  Restaurant name
                </label>
                <input type="text" id="res-name" className="form-control" />
              </div>
            </div>
            {/* input field*/}
            <div className="col-6">
              <div className="p-2">
                <label htmlFor="own-name" className="form-label small mb-0">
                  Owner's name
                </label>
                <input
                  type="text"
                  id="own-name"
                  className="form-control mt-0"
                />
              </div>
            </div>
            <div className="col-12 text-end ">
              <button className="btn btn-outline-success me-3">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
