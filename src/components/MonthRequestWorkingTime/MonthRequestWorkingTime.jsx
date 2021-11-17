import React, { useState, useEffect } from 'react'
import './MonthRequestWorkingTime.css'
import { CSVLink } from "react-csv";





export default function MonthRequestWorkingTime({ user, month, userName, data, time ,close}) {


    const header = ["Date", "Project", "Time", "total", time]
    const csvData =
        data.map((item) => [item.date, item.project.project, item.time.time,])


        ;
    console.log(csvData)




    return (
        <div className="container-fluid table-container">
            <button onClick={close} className="close">X</button>
            <table className="table table-striped">
                <thead>
                    <tr className="table-dark">
                        <th>Date</th>
                        <th>Project</th>
                        <th>time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="table-info">
                        <td>{month}</td>
                        <td>{userName}</td>
                        <td>{user}</td>
                    </tr>

                    {data.map((data) => {
                        return <tr key={data.id} className="table-secondary">
                            <td>{data.date}</td>
                            <td>{data.project.project}</td>
                            <td>{data.time.time}</td>
                        </tr>
                    })}
                </tbody>
                <tfoot>
                    <tr className="table-secondary">
                        <td>Total Hours</td>

                        <td className="sum bg-secondary">{time}</td>
                    </tr>
                </tfoot>

            </table>
            <button className="btn btn-secondary">
            <CSVLink style={{textDecoration:"none",color:"white"}} data={csvData} headers={header} filename={"working-hours"+month}>Download as CSV</CSVLink>
            </button>
        </div >
    )
}

