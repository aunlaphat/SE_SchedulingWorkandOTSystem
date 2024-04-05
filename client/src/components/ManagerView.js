import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Creative.css";
import { Link } from "react-router-dom";

function ManagerView({user}) {
  const [mana, setmana] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/ManagerView`)
  //     .then((res) => setmana(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  //ส่งไปนอกสาขา ไม่รวมสาขาตัวเอง
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sentOutbranch = await axios.get(
          `${process.env.REACT_APP_API_URL}/ManagerView`
        );
        const filterSendOutbranch = sentOutbranch.data.filter(
          (data) => data.branchID !== user.branchID 
        );
        console.log(filterSendOutbranch);
        setmana(filterSendOutbranch);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [user]);

  return (
    <div className=" d-flex  modalBackground bg-success justify-content-center align-items-center">
      <div className="w-80 bg-white rounded p-3 sarabun">
        <table className="table fonttext2">
          <thead>
            <tr>
              <th>สาขาที่ต้องการ</th>
              <th>วันที่ต้องการ</th>
              <th>เวลาเริ่มงาน</th>
              <th>เวลาเลิกงาน</th>
              <th>สถานะ</th>
              <th>รายละเอียด</th>
            </tr>
          </thead>
          <tbody>
            {mana.map((data, i) => (
              <tr key={i}>
                <td>{data.branchName}</td>
                <td>{data.date}</td>
                <td>{data.timeStart}</td>
                <td>{data.timeEnd}</td>

                <td>
                  <button className="btn btn-primary ">{data.status}</button>
                </td>

                <td>
                  <Link
                    to={`/ManagerView/sendFC/${data.absenceID}`}
                    className="btn btn-warning"
                  >
                    รายละเอียด
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerView;
