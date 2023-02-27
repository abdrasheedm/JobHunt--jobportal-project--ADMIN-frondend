import React, { useEffect, useState } from "react";
import axios from "../axios";
import Swal from "sweetalert2";
import { tokens } from "../theme";
import { useTheme } from "@emotion/react";

function DepartmentModal({ visible, onClose, Type, DepId }) {
  if (visible) {
    document.body.style.overflow = "hidden";
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const token = JSON.parse(localStorage.getItem("token"));

  const [categoryId, setCategoryId] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [categoryName, setCategoryname] = useState("");

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    axios.get("company-category/").then((res) => {
      setCategories(res.data);
    });
  };

    const fetchDepartment = () => {
      axios.get(`single-department-view/?dep_id=${DepId}`).then((res) => {
        setCategoryname(res.data.category.category_name)
        setDepartmentName(res.data.department_name)
      })
    }

  const handleDepartment = (e) => {
    setDepartmentName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      category: categoryId,
      department_name: departmentName,
    };

    if (Type === "add") {
      axios
        .post("add-department-view/", data)
        .then((res) => {
          onClose();
        });
    } else {
      axios
        .patch(`update-department-view/?dep_id=${DepId}`, data)
        .then((res) => {
          onClose();
        });
    }
  };
  useEffect(() => {
    if (Type === "edit") {
        fetchDepartment()
    } else {
      setDepartmentName("");
    }
    fetchCategories();
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-gray-900 fixed inset-0 bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center">
      <div className="bg-white bg-opacity-30 p-16 rounded-2xl drop-shadow-2xl mb-5">
        {Type === "add" ? (
          <h1 className="text-center font-bold text-3xl">Add Department</h1>
        ) : (
          <h1 className="text-center font-bold text-3xl">Edit Department</h1>
        )}

        <form
          novalidate=""
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <div className="mb-5">
              <div className="px-5">
              <label
                  htmlFor="company_name"
                  className="block mb-2 text-sm"
                >
                  Category
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-md text-gray-900 dark:border-gray-700 dark:bg-gray-100"
                  onChange={(e) => {
                    setCategoryId(e.target.value);
                  }}
                >
                  <option>Please choose one option</option>
                  {categories.map((category, index) => {
                    return (
                      <option value={category.id} key={index} selected={categoryName==category.category_name ? true : false}>
                        {category.category_name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="mb-5">
              <div className="px-5">
                <label for="firstName" className="block mb-2 text-sm">
                  Department Name
                </label>
                <input
                  type="name"
                  name="categoryName"
                  id="firstName"
                  placeholder="Enter Department Title"
                  className="w-full px-3 py-2 border rounded-md text-gray-900 dark:border-gray-700 dark:bg-gray-100"
                  onChange={handleDepartment}
                  value={departmentName}
                  required
                />
              </div>
            </div>
          </div>
          <div className="my-5">
            <div className="">
              <button
                type="submit"
                style={{ backgroundColor: colors.blueAccent[700] }}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md active:bg-gray-900 false"
              >
                Save
              </button>
              <button
                type="button"
                style={{ backgroundColor: "grey" }}
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out border border-transparent rounded-md active:bg-gray-900 false"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentModal;
