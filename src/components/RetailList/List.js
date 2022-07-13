import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { openDB, deleteDB, wrap, unwrap } from "idb";

const List = () => {
  const [list, setlist] = useState([]);
  useEffect(() => {
    openDB("retail_list", 1, {
      upgrade(db) {
        db.createObjectStore("list_data", { keyPath: "retail_id" });
      },
    });
  }, []);

  useEffect(() => {
    const get_data_mysql = async () => {
      const db = await openDB("retail_list", 1);
      axios
        .get("https://django-retail-app.herokuapp.com/retail/create/")
        .then(async (response) => {
          setlist(response.data);

          const retail_data = response.data;
          db.clear("list_data");

          retail_data.map(async (info) => {
            console.log(info.email);
            const mysql_data = {
              retail_id: info.retail_id,
              name: info.name,
              email: info.email,
              contact_number1: info.contact_number1,
              contact_number2: info.contact_number2,
              retail_size: info.retail_size,
              it_automation: info.it_automation,
              no_of_mobile: info.no_of_mobile,
              no_of_tab: info.no_of_tab,
              no_of_computer: info.no_of_computer,
              no_of_printer: info.no_of_printer,
              no_of_scanner: info.no_of_scanner,
              latitude: info.latitude,
              longitude: info.longitude,
              date_time: info.date_time,
              image: info.image,
            };

            if (!(await db.get("list_data", info.retail_id))) {
              db.add("list_data", mysql_data).then((res) => {
                console.log(res);
              });
            }
          });
        })
        .catch(async (err) => {
          console.log(err);
          if (err.message == "Network Error") {
            const data = await db.getAll("list_data");
            setlist(data);
          }
        });
    };
    get_data_mysql();
  }, []);

  return (
    <div>
      <Table list={list} />
    </div>
  );
};

export default List;
