import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import DataTable from '@bit/adeoy.utils.data-table';

// import { useStateValue } from '../state';
// import { logout } from '../state/auth/actions';
import "../.././views/landing/homepage.css";
// import '../components/Carouselcomp'
import Sidemenu from "./Sidemenu";
import $ from "jquery";

let changeNavValue = 0;
var header;
var sticky;
var Userdata = "";
const Roles = (props) => {
  // let history=useHistory();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [manufactureres, setManufactureres] = useState([]);
  const [role, setRole] = useState("");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [organization, setOrganization] = useState("");
  const [registerModal, setRegisterModal] = useState(false);
  useEffect(() => {
    Userdata = JSON.parse(localStorage.getItem("Userdata"));

    GetUser();
    GetManufacturer();
  }, []);
  const GetUser = async () => {
    //await fetch("http://144.91.110.221:3033/api/auth/allusers")
    await fetch("http://localhost:3033/api/auth/allusers")
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data.data);
        console.log(data.data, "userdata");
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const GetManufacturer = async () => {
    //await fetch("http://144.91.110.221:3033/api/manufacture/all_manufacture")
    await fetch("http://localhost:3033/api/manufacture/all_manufacture")
      .then((res) => res.json())
      .then(async (data) => {
        setManufactureres(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err, "errors");
      });
  };

  const logout = () => {
    localStorage.setItem("Userdata", null);
    window.location.replace("/");
  };
  const RegisterUser = () => {
    console.log("kp");
    //fetch('http://144.91.110.221:3033/api/auth/register',
    fetch("http://localhost:3033/api/auth/register", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
        role: role,
        organization: organization,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  };
  const LoginUser = (e) => {
    e.preventDefault();
    console.log("kp");
    if (username != "" && password != "") {
      //fetch('http://144.91.110.221:3033/api/auth/login',
      fetch("http://localhost:3033/api/auth/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then(async (res) => {
          await localStorage.setItem("Userdata", JSON.stringify(res));
          console.log(res, "hello Deepak");
          alert(res.role);
          if (res.role == "user") {
            history.push("/");
          } else {
            history.push("/dashboard");
          }
          window.location.reload();

          console.log(res);
        });
    } else {
      alert("Please Enter a Valid Data");
    }
  };
  const headerFunction = async () => {
    if (window.pageYOffset > sticky) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  };

  const data1 = [];
  {
    users.map((item, index) => {
      data1.push({
        sr_no: index + 1,
        name: item.username,
        Email: item.email,
        company: item.organization,
        Role: (
          <select value={item.role} className="form-control">
            <option value={item.role}>{item.role}</option>
            <option>Admin</option>
            <option>Manager</option>
            <option>User</option>
          </select>
        ),
        Action: (
          <>
            <button className="btnbtn-danger">
              <i className="bx bx-trash"></i>
            </button>
            <button className="ml-2 btnbtn-danger">
              <i className="bx bx-edit"></i>
            </button>
          </>
        ),
      });
    });
  }
  const columns = [
    { title: "SR NO", data: "sr_no" },
    { title: "User Name", data: "name" },
    { title: "Email", data: "Email" },
    { title: "Roles", data: "Role" },
    { title: "Organization", data: "company" },
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

      <div className="container-fluid top-nav" id="body-pd">
        <Sidemenu />
        {/* login Register Modal  */}

        <div class="form-row de-flex items-align-center justify-content-center mt-5">
          <div className="container justify-content-center align-items-center d-flex">
            <div className="col-1"></div>
            <div
              className="col-10 d-flex"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                borderRadius: "5px",
              }}
            >
              <div class="form-group col-lg-6">
                {/* <h1>Sale</h1> */}
                <img src={require("../../Images/woman-laptop.jpg")} />
              </div>
              <div class="form-group col-6">
                <div class="form-group col-lg-12 pt-3">
                  {/* <label>Username<span>*</span></label> */}
                  <input
                    type="text"
                    class="form-control input-text "
                    placeholder="Username*"
                    required
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group col-lg-12">
                  {/* <label>Email<span>*</span></label> */}
                  <input
                    type="email"
                    class="form-control input-text"
                    placeholder="Email*"
                    required
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group col-lg-12">
                  {/* <label>Password<span>*</span></label> */}
                  <input
                    class="form-control input-text"
                    placeholder="Password*"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group col-lg-12">
                  {/* <label>Confirm Password<span>*</span></label> */}
                  <input
                    class="form-control input-text"
                    placeholder="Confirm Password*"
                    required
                  />
                </div>
                {Userdata != undefined && Userdata.role == "superAdmin" ? (
                  <div class="form-group col-lg-12">
                    {/* <label>User Roles<span>*</span></label> */}
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option>Select User Role From Here</option>
                      <option value="Manager">Manager</option>
                      <option value="Vendor">Vendor</option>
                      <option value="user">User</option>:null
                    </select>
                  </div>
                ) : Userdata.role == "Manager" ? (
                  <div class="form-group col-lg-12">
                    {/* <label>User Roles<span>*</span></label> */}

                    <select
                      className="form-control"
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option>Select User Role From Here</option>
                      <option value="Vendor">Vendor</option>
                      <option value="user">User</option>:null
                    </select>
                  </div>
                ) : null}
                <div class="form-group col-lg-12">
                  {/* <label>Vendor Organization<span>*</span></label> */}
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setOrganization(e.target.value);
                    }}
                  >
                    <option>Select Vendor Organization Form Here</option>
                    {manufactureres.map((el, ind) => (
                      <option value={el.name}>{el.name}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group col-lg-12">
                  <button
                    class="btn btn-registration btn-lg"
                    onClick={(e) => {
                      RegisterUser(e);
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
            <div className="col-1"></div>
          </div>
        </div>

        {/* tabs start */}

        {/* Ends Tabs */}

        {/* End login register Modal  */}
        <div className="container pt-5">
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
export default Roles;
