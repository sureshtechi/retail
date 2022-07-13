import React from "react";
import styles from "./Table_Style.module.css";
const Table = (props) => {
  return (
    <div>
      {props.list.length > 0 ? (
        <table id={styles.table_css}>
          <thead>
            <tr>
              <th>Retail ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact 1</th>
              <th>Contact 2</th>
              <th>Retail Size</th>
              <th>IT Automation</th>
              <th>No of Mobiles</th>
              <th>No of Tabs</th>
              <th>No of Computer</th>
              <th>No of Printer</th>
              <th>No of Scanner</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Time Updated</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {props.list.map((item) => (
              <tr key={item.retail_id}>
                <td>{item.retail_id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact_number1}</td>
                <td>{item.contact_number2}</td>
                <td>{item.retail_size}</td>
                <td>{item.it_automation}</td>
                <td>{item.no_of_mobile}</td>
                <td>{item.no_of_tab}</td>
                <td>{item.no_of_computer}</td>
                <td>{item.no_of_printer}</td>
                <td>{item.no_of_scanner}</td>
                <td>{item.latitude}</td>
                <td>{item.longitude}</td>
                <td>{item.date_time}</td>
                <td>
                  <a
                    href={
                      "https://django-retail-app.herokuapp.com" + item.image
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    image link
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "NO DATA TO DISPLAY"
      )}
    </div>
  );
};

export default Table;
