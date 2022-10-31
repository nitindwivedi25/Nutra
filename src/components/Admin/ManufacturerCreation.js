import React, { useEffect, useState } from "react";
// import DataTable from '@bit/adeoy.utils.data-table';
import Sidemenu from "./Sidemenu";
import "./Dashboard.css";
import $ from "jquery";
import { Link } from "react-router-dom";
var Userdata;
const ManufacturerCreation = () => {
  var count = 0;
  const [manufactureres, setManufactureres] = useState([]);
  const [ManufacturerCount, setManufacturerCount] = useState(0);
  const [update, setUpdate] = useState(false);
  const [data, Setdata] = useState({
    name: "",
    descripton: "",
    image: [],
  });

  const submitData = async (e) => {
    const formData = new FormData();
    await formData.append("description", data.description);
    await formData.append("name", data.name);
    formData.append("image", data.image);
    // const url = "http://144.91.110.221:3033/api/manufacture/add_manufacture";
    const url = "http://localhost:3033/api/manufacture/add_manufacture";
    await fetch(url, {
      method: "POST",
      // headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'multipart/form-data'
      //   },
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        GetManufacturer();
        this.getAddOn();
        
      })
      
      .catch((err) => console.log(err));
    //console.log(formData)
    e.preventDefault();
    
  };

  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetManufacturer();
  }, []);
  const DeleteManufacturer = async (_id) => {
    await fetch(
      "http://localhost:3033/api/manufacture/delete_manufacturer_by_id",
      // "http://144.91.110.221:3033/api/manufacture/delete_manufacturer_by_id",
      {
        method: "Delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: _id,
        }),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        GetManufacturer();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };
  const GetManufacturer = async () => {
    //await fetch("http://144.91.110.221:3033/api/manufacture/all_manufacture")
    await fetch("http://localhost:3033/api/manufacture/all_manufacture")
      .then((res) => res.json())
      .then(async (data) => {
        setManufactureres(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const EditManufacturer = (item) => {
    let obj;
    obj = {
      _id: item._id,
      image: item.image,
      name: item.name,
      description: item.description,
    };

    Setdata(obj);
  };

  const UpdateManufacturer = async (e, _id) => {
    e.preventDefault();

    //await fetch("http://144.91.110.221:3033/api/manufacture/update_manufacturer_by_id", {
    await fetch(
      "http://localhost:3033/api/manufacture/update_manufacturer_by_id",
      {
        method: "Put",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        GetManufacturer();
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const data1 = [];
  {
    manufactureres.map((item, index) => {
      data1.push({
        sr_no: index + 1,
        name: item.name,
        Action:
          Userdata !== undefined && Userdata.role == "superAdmin" ? (
            <>
              <button
                className="btnbtn-danger"
                onClick={() => {
                  if (window.confirm("Are you sure ?")) {
                    DeleteManufacturer(item._id);
                  } else {
                    return false;
                  }
                }}
              >
                <i className="bx bx-trash"></i>
              </button>
              <button
                className="ml-2 btnbtn-danger"
                onClick={() => {
                  EditManufacturer(item);
                  setUpdate(true);
                }}
              >
                <i className="bx bx-edit"></i>
              </button>
            </>
          ) : (
            <button>
              <i className="bx bx-show"></i>
            </button>
          ),
      });
    });
  }
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "Manufacturer Name", data: "name" },
    // { title: "Manufacturer", data: "manufacturer" },
    { title: "Action", data: "Action" },
  ];
  const click = (row) => {
    console.log(row);
  };
  return (
    <>
      <div className="container-fluid">
        {" "}
        <Link href="#" className="nav__logo">
          <img
            src={require("../../Images/logo2.png")}
            className="dashboard-logo"
            alt="image"
          />
        </Link>
      </div>
      <div id="body-pd">
        <Sidemenu />
        {Userdata != undefined ? (
          Userdata.role == "superAdmin" ? (
            <form>
              <div className="container">
                <div className="row">
                  {/* <div className="col-1"></div> */}
                  <div className="col-10">
                    <div className="card p-4 m-2 product-form">
                      <h5>Manufacturer Creation</h5>

                      <div className="row">
                        <div className="col-6">
                          <input
                            type="file"
                            multiple
                            className="form-control Dashborad-search"
                            onChange={(e) => {
                              Setdata({ ...data, image: e.target.files[0] });
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="text"
                            className="form-control Dashborad-search"
                            placeholder="Manufacturer Name "
                            defaultValue={update == true ? data.name : ""}
                            onChange={(e) => {
                              Setdata({ ...data, name: e.target.value });
                            }}
                          />
                        </div>
                        <div className="col-6 pt-2">
                          <textarea
                            className="form-control"
                            placeholder="Manufacturer Description"
                            rows="3"
                            defaultValue={
                              update == true ? data.description : ""
                            }
                            onChange={(e) => {
                              Setdata({ ...data, description: e.target.value });
                            }}
                          ></textarea>
                        </div>
                        {update == false ? (
                          <div className="col-12 pt-4">
                            <button
                              className="btn btn-primary"
                              onClick={(e) => submitData(e)}
                            >
                              Submit
                            </button>
                          </div>
                        ) : null}
                        {update == true ? (
                          <div className="col-12 p-1">
                            <button
                              className="btn btn-primary"
                              id="update-btn"
                              onClick={(e) => UpdateManufacturer(e, data._id)}
                            >
                              Update
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="col-1"></div>
                </div>
              </div>
            </form>
          ) : null
        ) : null}
        {update ? (
          <div className="create-manu container text-right">
            <span>Create Manufacturer</span>
            <button onClick={() => setUpdate(false)}>
              <i className="bx bx-plus"></i>
            </button>
          </div>
        ) : null}
        <div className="container table-responsive">
          {/* <table class="table table-hover table-striped text-center">
  <thead>
    <tr>
      <th>Sr.No</th>
      <th scope="col">Manufacturer Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>

  {manufactureres.map((el, ind) => {
       count +=1;
       localStorage.setItem("ManufacturerCount",count);
    return(
        
    <tr>
      
        <td>{count}</td>
      <td>{el.name}</td>
     
      <td><i className="bx bx-trash"></i><i className="bx bx-edit pl-4"></i></td>
       
    </tr>
   
    )
    })}
   
  </tbody>
</table> */}

          {/* <DataTable
        data={data1}
        columns={columns}
        striped={true}
        hover={true}
        responsive={true}
        // onClickRow={click}
      /> */}
        </div>
      </div>
    </>
  );
};

export default ManufacturerCreation;
