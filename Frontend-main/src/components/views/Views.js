import axios from "axios";
import React, { useEffect, useState } from "react";
import "./view.scss";
import Icon from "./../../assets/images/logo.png";
import moment from "moment";

const Views = () => {
  const [allDocuments, setAllDocuments] = useState([]);
  const [filteredDocumnets, setFilteredDocumnets] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const topButtons = [
    {
      icon: "fa-solid fa-file-medical fa-2x",
      heading: "Report",
      type: "report",
    },
    {
      icon: "fa-solid fa-prescription fa-2x",
      heading: "Prescription",
      type: "prescription",
    },
    {
      icon: "fa-solid fa-syringe fa-2x",
      heading: "Vaccination",
      type: "vaccination",
    },
  ];
  useEffect(() => {
    getAllDocs();
  }, []);

  const getAllDocs = async () => {
    const token = localStorage.getItem('doctalk');
    const res = await axios.get("/documents/getAllDocs", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log("ujjwal all", res.data);
    setAllDocuments(res.data.docs);
  };
  console.log("ujjwal filtered", filteredDocumnets);

  const handleFilter = (type) => {
    console.log("ujjwal in ", type);
    const filterArr = allDocuments.filter((doc) => doc.type === type);
    setFilteredDocumnets(filterArr);

    if (filterArr.length) {
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  };
  console.log("ujjwal not found", notFound);
  const handleDownload = (doc) => {
    window.open(doc.link);
  };

  const handleDelete = async (doc) => {
    console.log("ujjwal in delet");

    try {
      const res = await axios.post(`/documents/deleteDoc/${doc._id}`);
      console.log("ujjwal deleted", res.data);
      const filterArr = res.data.doc.filter(
        (current) => current.type === doc.type
      );

      setFilteredDocumnets(filterArr);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ujjwal after delete filterarr", filteredDocumnets);

  return (
    <>
      <div className="row row-type-card">
        {topButtons.map((topButton) => {
          return (
            <div
              className="card w-35 new-div"
              style={{ cursor: "pointer" }}
              onClick={() => handleFilter(topButton.type)}
            >
              <div className="card-body">
                <i className={topButton.icon}></i>
                <h5 className="card-title">{topButton.heading}</h5>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row">
        {filteredDocumnets.length > 0 ? (
          filteredDocumnets?.map((doc) => {
            return (
              <div className="col-lg-6">
                <div className="hello-container">
                  <div
                    className="row"
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <div
                      className="col-lg-2"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        src={Icon}
                        style={{ width: "7rem", height: "7rem" }}
                        alt=""
                      />
                    </div>
                    <div className="col-lg-10">
                      <h4>{doc.name}</h4>
                      {/* <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vero, voluptatem.
                  </p> */}
                      <hr style={{ marginRight: "3rem" }} />
                      <div className="row">
                        <div className="col-lg-6" style={{ padding: 0 }}>
                          <h6>Uploaded On</h6>
                          <p>{moment(doc.createdAt).format("D-MM-YYYY")}</p>
                        </div>

                        {/* Handle Starts Here */}

                        <div class="col-lg-6">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                              marginRight: "2rem",
                            }}
                          >
                            <i
                              class="fa-regular fa-trash-can"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDelete(doc)}
                            ></i>
                            <i
                              class="fa-solid fa-file-arrow-down"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDownload(doc)}
                            ></i>
                          </div>
                        </div>

                        {/* Hamndle Ends Here */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : notFound ? (
          <div className="mt-5 bolder h2 d-flex justify-content-center w-100">
            Not Found
          </div>
        ) : (
          <div className="mt-5 bolder h2 d-flex justify-content-center w-100">
            Please Select An Option
          </div>
        )}
      </div>
    </>
  );
};

export default Views;