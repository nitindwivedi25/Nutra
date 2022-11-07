
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "../views/landing/homepage.css";
let resultArr = []
let subCategoryList = []
const Separate = () => {
const [subcategories, setSubCategories] = useState([]);
const [categories, setCategories] = useState([]);
const [allCategories, setAllCategories] = useState()
useEffect(() => {

    //Userdata = JSON.parse(localStorage.getItem("Userdata"));
    GetCategory();
   

    // $(document).ready(function () {
    //   header = document.getElementById("myHeader");
    //   sticky = header.offsetTop;
    //   window.onscroll = function () {
    //     headerFunction();
    //   };
    //   $(".arrow").click(function () {
    //     $(".sublist").slideUp();
    //   });
    // });
  }, []);
 


  

  const GetCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/category/all_category")
    await fetch("http://localhost:3033/api/category/all_category")
      .then((res) => res.json())
      .then(async (data) => {
        setCategories(data.data);
      })

      .catch((err) => {
        console.log(err, "error");
      });
  };
  useEffect(() => {
    if (categories && categories.length > 0) {
      GetSubCategory()
    }
  }, [categories])



  const GetSubCategory = async () => {
    //await fetch("http://144.91.110.221:3033/api/subcategory/all_subcategory")
    await fetch("http://localhost:3033/api/subcategory/all_subcategory")
      .then((res) => res.json())
      .then(async (data) => {
        // setSubCategories(data.data);
        // let result = mergeCategoriesWithSubCategories(data.data)
        for (let item of categories) {
            let obj = {
              categoryName: item.name,
              subCategoryList: []
            }
            for (let el of data.data) {
              if (item._id == el.category) {
                obj.subCategoryList.push(el)
              }
            }
            resultArr.push(obj)
          }

        setAllCategories(resultArr)
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

 

  let mergeCategoriesWithSubCategories = (data) => {
    for (let item of categories) {
      let obj = {
        categoryName: item.name,
        subCategoryList: []
      }
      for (let el of data) {
        if (item._id == el.category) {
          obj.subCategoryList.push(el)
        }
      }
      resultArr.push(obj)
    }
    return resultArr
  }

 

  console.log(allCategories, 'all Categories merged array')
  return (
    <>
        <h1>Dummy Heading</h1>

        {/* {
            allCategories && allCategories.length > 0 &&
            allCategories.map((item, i) => {
                return(
                    <>{item.categoryName}</>
                )
            })
        } */}
         {
                allCategories && allCategories.length > 0 && allCategories.map((item, i) => {
                  return (
                    <>
                    
                      <div class="dropdown aside-menu-submenu-list">
                        <button class="btn dropdown-toggle" type="button" 
                        data-bs-toggle="dropdown" aria-expanded="false">
                            <div>{item.categoryName}</div>
                            <div>
                              {
                                item.subCategoryList && item.subCategoryList.length > 0 && 
                                <i class='bx bxs-chevron-down'></i>
                              }
                              
                            </div>
                        </button>
                        {
                                item.subCategoryList && item.subCategoryList.length > 0 && 
                         <ul class="dropdown-menu shadow">
                          {
                            item.subCategoryList && item.subCategoryList.length > 0 &&
                            item.subCategoryList.map((el) => {
                              return (
                                <>
                                  {/* <p className="mb-0">{el.name}</p> */}
                                  <li>
                                    <a class="dropdown-item" href="#">
                                    <span className="pic">
                                      <img src={"http://localhost:3033/" + el.image[0].path} className="img-fluid"/>
                                      </span>     
                                    <span className="title">{el.name}</span>
                                    
                                  </a></li>
                                </>
                              )
                            })
                          }


                          </ul>
                }
                      </div>
                    </>
                  )
                })
                // props.categoriesArr.map((item, i) => {
                //   return(
                //     <>
                //     <p>{item}</p>
                //     </>
                //   )
                // })
              }

        
    </>
  );
};
export default Separate;
