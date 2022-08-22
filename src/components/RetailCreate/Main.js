import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { openDB, deleteDB, wrap, unwrap } from "idb";
import "./style.css";
import GoogleMaps from "../Maps/GoogleMaps";
import CameraModule from "../Camera/CameraModule";
import { BrowserView, MobileView, isBrowser, isMobile, AndroidView } from 'react-device-detect';

function Main() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [contact1, setcontact1] = useState();
  const [contact2, setcontact2] = useState("");
  const [retailsize, setretailsize] = useState("");
  const [itautomation, setitautomation] = useState("Automated");

  const [mobile, setmobile] = useState(false);
  const [tab, settab] = useState(false);
  const [computer, setcomputer] = useState(false);
  const [printer, setprinter] = useState(false);
  const [scanner, setscanner] = useState(false);

  const [nomobile, setnomobile] = useState(0);
  const [notab, setnotab] = useState(0);
  const [nocomputer, setnocomputer] = useState(0);
  const [noprinter, setnoprinter] = useState(0);
  const [noscanner, setnoscanner] = useState(0);

  const [submitted, setsubmitted] = useState(false);
  const [located, setlocated] = useState(false);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");
  const [error, seterror] = useState("");
  const [image_upload, setimage_upload] = useState();
  const [live_capture, setlive_capture] = useState();
  const [blobimage, setblobimage] = useState();
  const [image_upload_size, setimage_upload_size] = useState();
  const [live_capture_size, setlive_capture_size] = useState();

  const [checkexpo, setcheckexpo] = useState("NOT LOADED");

  useEffect(() => {
    openDB("retail", 1, {
      upgrade(db) {
        db.createObjectStore("details", { keyPath: "email" });
      },
    });
  }, []);

  // useEffect( () => {

  //   const use_effect_update_mysql_with_idb = async () => {
  //     console.log("INSIDE update_mysql_with_idb") ;
  //     const db = await openDB("retail", 1);
  //     const idb_data = await db.getAll("details");
  //     console.log(idb_data);

  //     idb_data.map( (info) => {
  //       console.log(info.mysql_sync);
  //       if( info.mysql_sync === false )
  //       {
  //         console.log(info.email);

  //         let form_data = new FormData();
  //         form_data.append('name', info.name);
  //         form_data.append('email', info.email);
  //         form_data.append('contact_number1', info.contact_number1);
  //         form_data.append('contact_number2', info.contact_number2);
  //         form_data.append('retail_size', info.retail_size);
  //         form_data.append('it_automation', info.it_automation);
  //         form_data.append('no_of_mobile', info.no_of_mobile);
  //         form_data.append('no_of_tab', info.no_of_tab);
  //         form_data.append('no_of_computer', info.no_of_computer);
  //         form_data.append('no_of_printer', info.no_of_printer);
  //         form_data.append('no_of_scanner', info.no_of_scanner);
  //         form_data.append('latitude', info.latitude);
  //         form_data.append('longitude', info.longitude);
  //         form_data.append('image', info.image );

  //         axios.post("https://django-retail-app.herokuapp.com/retail/create/",form_data, {
  //           headers: {
  //             'content-type': 'multipart/form-data',
  //           }
  //         })
  //           .then(async(response) => {
  //             // const json_data =await response.json();
  //             // console.log("mysql response", json_data);
  //             console.log(" FETCH RESPONSE "+ response.status) ;

  //             if (response.status >= 400 && response.status <= 599) {

  //               const temp = info.email + "response status " + response.status ;
  //               seterror(temp);

  //             } else
  //             {
  //               const indexeddb_data = {
  //               name: info.name,
  //               email: info.email,
  //               contact_number1: info.contact_number1,
  //               contact_number2: info.contact_number2,
  //               retail_size: info.retail_size,
  //               it_automation: info.it_automation,
  //               no_of_mobile: info.no_of_mobile,
  //               no_of_tab: info.no_of_tab,
  //               no_of_computer: info.no_of_computer,
  //               no_of_printer: info.no_of_printer,
  //               no_of_scanner: info.no_of_scanner,
  //               latitude: info.latitude,
  //               longitude: info.longitude,
  //               mysql_sync: true,
  //               image: info.image
  //             }

  //             await db.put("details", indexeddb_data)
  //             .then((res) => {
  //               console.log(res);

  //               const temp = info.email + "has been added successfully" ;
  //               seterror(temp);
  //               setsubmitted(true);

  //             });
  //             }
  //           })
  //           .catch(async(err) => {
  //             console.log(err);
  //               console.log(err.message);
  //               if ( err.message == "Network Error" )
  //               {
  //               }
  //             else
  //             {
  //               if( err.response.status >= 400 && err.response.status <= 599  )
  //               {
  //                 const temp = info.email + err.message + " " + err.response.data.email + " Please enter valid Data ";
  //                 seterror(temp);
  //                 await db.delete("details",info.email );
  //               }
  //               else
  //               {
  //                 const temp = info.email + + err.message ;
  //                 seterror(temp);
  //                 await db.delete("details",info.email );
  //               }
  //             }

  //           });

  //       }
  //     } )
  //   }
  //   use_effect_update_mysql_with_idb();

  // }, [] );

  const HandleLiveCapture = (image) => {
    
    // if(isMobile)
    // {
    //   window.ReactNativeWebView.postMessage(JSON.stringify({ message: "your message" , data: "your data"}));
    //   window.onload = (event) => {
    //     setcheckexpo("PAGE LOADED");
    //   }
    // }

    if(window.Android)
    {
      var obj = {
        name: 'suresh',
        email: 'suresh@gmail.com',
        contact_number1: 9876543211,
        latitude: 76.555
      };

      var send_to_android = JSON.stringify(obj);

      window.Android.showToast(send_to_android);
    }

    
    setlive_capture(image);
    setimage_upload();
    console.log(image);
    setblobimage(image);
    var stringLength = image.length - "data:image/jpeg;base64,".length;
    var sizeInBytes = 4 * Math.ceil(stringLength / 3) * 0.5624896334383812;
    var sizeInKb = sizeInBytes / 1000;
    console.log(sizeInKb);
    setlive_capture_size(sizeInKb);
  };

  const getlatlog = async (lat, long) => {
    setlatitude(lat);
    setlongitude(long);
    setlocated(latitude && longitude ? true : false);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setsubmitted(false);
    const db = await openDB("retail", 1);

    if (located) {
      if (await db.get("details", email)) {
        seterror("Email ID already registered");
      } else if (contact1 === contact2) {
        seterror("Both the contact number can't be same");
      } else if (retailsize <= 0) {
        const temp = "Retail size can't be " + retailsize;
        seterror(temp);
      } else if (!mobile && !tab && !computer && !printer && !scanner) {
        const temp = "Please choose the machine";
        seterror(temp);
      } else if (mobile && nomobile <= 0) {
        const temp = "Number of mobiles can't be " + nomobile;
        seterror(temp);
      } else if (tab && notab <= 0) {
        const temp = "Number of tabs can't be " + notab;
        seterror(temp);
      } else if (computer && nocomputer <= 0) {
        const temp = "Number of computers can't be " + nocomputer;
        seterror(temp);
      } else if (printer && noprinter <= 0) {
        const temp = "Number of printers can't be " + noprinter;
        seterror(temp);
      } else if (scanner && noscanner <= 0) {
        const temp = "Number of scanners can't be " + noscanner;
        seterror(temp);
      } else if (!(image_upload || live_capture)) {
        const temp = " Please capture a live image or upload image ";
        seterror(temp);
      } else if (image_upload && image_upload_size > 524288) {
        const temp = " Uploaded Image is more than 512KB ";
        seterror(temp);
      } else if (live_capture && live_capture_size > 512) {
        const temp = " Captured Image is more than 512KB ";
        seterror(temp);
      } else {
        let form_data = new FormData();
        form_data.append("name", name);
        form_data.append("email", email);
        form_data.append("contact_number1", contact1);
        form_data.append("contact_number2", contact2);
        form_data.append("retail_size", retailsize);
        form_data.append("it_automation", itautomation);
        form_data.append("no_of_mobile", nomobile);
        form_data.append("no_of_tab", notab);
        form_data.append("no_of_computer", nocomputer);
        form_data.append("no_of_printer", noprinter);
        form_data.append("no_of_scanner", noscanner);
        form_data.append("latitude", latitude);
        form_data.append("longitude", longitude);
        form_data.append("image", blobimage);

        const indexeddb_data = {
          name: name,
          email: email,
          contact_number1: contact1,
          contact_number2: contact2,
          retail_size: retailsize,
          it_automation: itautomation,
          no_of_mobile: nomobile,
          no_of_tab: notab,
          no_of_computer: nocomputer,
          no_of_printer: noprinter,
          no_of_scanner: noscanner,
          latitude: latitude,
          longitude: longitude,
          mysql_sync: true,
          image: blobimage,
        };
        axios
          .post(
            "https://django-retail-app.herokuapp.com/retail/create/",
            form_data,
            {
              headers: {
                "content-type": "multipart/form-data",
              },
            }
          )
          .then(async (response) => {
            console.log(" FETCH RESPONSE " + response.status);

            if (response.status >= 400 && response.status <= 599) {
              const temp = "response status " + response.status;
              seterror(temp);
            } else {
              db.add("details", indexeddb_data).then((res) => {
                console.log(res);
              });
              seterror("Retail Information Successfully Submitted");
              setsubmitted(true);
            }
          })
          .catch(async (err) => {
            console.log(err);
            console.log(err.message);
            if (err.message == "Network Error") {
              const indexeddb_data_sync_false = {
                name: name,
                email: email,
                contact_number1: contact1,
                contact_number2: contact2,
                retail_size: retailsize,
                it_automation: itautomation,
                no_of_mobile: nomobile,
                no_of_tab: notab,
                no_of_computer: nocomputer,
                no_of_printer: noprinter,
                no_of_scanner: noscanner,
                latitude: latitude,
                longitude: longitude,
                image: blobimage,
                mysql_sync: false,
              };
              db.add("details", indexeddb_data_sync_false).then((res) => {
                console.log(res);
              });
              seterror(
                "There is a Network Error, Retail Information SAVED, Data will be validated once the Network is back"
              );
              setsubmitted(true);

              
                
                if(window.Android)
                {
                  const send_to_android = {
                    name: name,
                    email: email,
                    contact_number1: contact1,
                    contact_number2: contact2,
                    retail_size: retailsize,
                    it_automation: itautomation,
                    no_of_mobile: nomobile,
                    no_of_tab: notab,
                    no_of_computer: nocomputer,
                    no_of_printer: noprinter,
                    no_of_scanner: noscanner,
                    latitude: latitude,
                    longitude: longitude,
                    image: blobimage
                  };

                  await window.Android.showToast(send_to_android);
                }
              
                const registration = await navigator.serviceWorker.ready;
                await registration.sync.register(email);

              // localStorage.setItem('name', JSON.stringify(name));
              // localStorage.setItem('email', JSON.stringify(email));
              // localStorage.setItem('contact_number1', JSON.stringify(contact1));
              // localStorage.setItem('contact_number2', JSON.stringify(contact2));
              // localStorage.setItem('retail_size',JSON.stringify(retailsize));
              // localStorage.setItem('it_automation', JSON.stringify(itautomation));
              // localStorage.setItem('no_of_mobile', JSON.stringify(nomobile));
              // localStorage.setItem('no_of_tab', JSON.stringify(notab));
              // localStorage.setItem('no_of_computer', JSON.stringify(nocomputer));
              // localStorage.setItem('no_of_printer', JSON.stringify(noprinter));
              // localStorage.setItem('no_of_scanner', JSON.stringify(noscanner));
              // localStorage.setItem('latitude', JSON.stringify(latitude));
              // localStorage.setItem('longitude', JSON.stringify(longitude));
              // localStorage.setItem('image', (blobimage));


              // await window.ReactNativeWebView.postMessage('Data from WebView / Website');

              // setTimeout(()=> {
                // if(isMobile)
                // {
                //   window.ReactNativeWebView.postMessage(JSON.stringify({ message: "your message" , data: "your data"}));
                // }
              // }, 2000);

              // await navigator.ReactNativeWebView.postMessage('Data from WebView / Website') ;

              //   navigator.serviceWorker.ready(serviceWorkerRegistration => {
              //     serviceWorkerRegistration.sync.register('some-unique-tag');
              //     console.log(" SYNC REGISTERED IN CATCH ");
              //  });

              //  navigator.serviceWorker.ready( (reg) => {
              //   reg.sync.register('SYNCDATA');
              //   console.log(" SYNC REGISTERED IN NEW CATCH ");
              //  }  )
            } 
            else {
              if (err.response.status >= 400 && err.response.status <= 599) {
                const temp =
                  err.message +
                  " " +
                  err.response.data.email +
                  " Please enter valid Data ";
                seterror(temp);
              } else {
                const temp = err.message;
                seterror(temp);
              }
            }
          });
      }
    } else {
      seterror("Please select your location");
    }
  };

  return (
    <div>
      <form className="getdata" onSubmit={handlesubmit}>
        <span className="heading">Enter Retail Information</span>

        <div className="lbl_ipt">
          <label className="label">Name*</label>
          <input
            className="input"
            type="text"
            onChange={(e) => {
              setname(e.target.value);
            }}
            required
          />
        </div>

        <div className="lbl_ipt">
          <label className="label">E-Mail*</label>
          <input
            className="input"
            type="email"
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
        </div>

        <div className="lbl_ipt">
          <label className="label contact_font">Contact Number 1*</label>
          <input
            className="input"
            placeholder="10 digit"
            type="tel"
            pattern="[0-9]{10}"
            onChange={(e) => {
              setcontact1(Number(e.target.value));
            }}
            required
          />
        </div>

        <div className="lbl_ipt">
          <label className="label contact_font">Contact Number 2</label>
          <input
            className="input"
            placeholder="10 digit"
            type="tel"
            pattern="[0-9]{10}"
            onChange={(e) => {
              setcontact2(Number(e.target.value));
            }}
          />
        </div>

        <div className="lbl_ipt">
          <label className="label">Retail Size*</label>
          <input
            className="input"
            type="number"
            placeholder="in sq feet area"
            onChange={(e) => {
              setretailsize(Number(e.target.value));
            }}
            required
          />
        </div>

        <div className="lbl_ipt">
          <label className="label">IT Automation*</label>
          <select
            value={itautomation}
            onChange={(e) => {
              setitautomation(e.target.value);
            }}
            required
          >
            <option value="Automated">Automated</option>
            <option value="Non-Automated">Non-Automated</option>
          </select>
        </div>

        <div className="slt_e-comm">
          <label className="label">Types of Machine</label>

          <div className="align_chbox_lbl">
            <label className="machine_css">
              <input
                type="checkbox"
                value={mobile}
                onChange={(e) => {
                  setmobile(e.currentTarget.checked);
                }}
              />
              mobile
            </label>
          </div>
          {mobile && (
            <input
              className="input"
              type="number"
              onChange={(e) => {
                setnomobile(Number(e.target.value));
              }}
              placeholder="Number of Devices"
              required={mobile}
            />
          )}

          <br />
          <div className="align_chbox_lbl">
            <label className="machine_css">
              <input
                type="checkbox"
                value={tab}
                onChange={(e) => {
                  settab(e.currentTarget.checked);
                }}
              />
              tab
            </label>
          </div>
          {tab && (
            <input
              className="input"
              type="number"
              onChange={(e) => {
                setnotab(Number(e.target.value));
              }}
              placeholder="Number of Devices"
              required={tab}
            />
          )}

          <br />
          <div className="align_chbox_lbl">
            <label className="machine_css">
              <input
                type="checkbox"
                value={computer}
                onChange={(e) => {
                  setcomputer(e.currentTarget.checked);
                }}
              />
              computer
            </label>
          </div>
          {computer && (
            <input
              className="input"
              type="number"
              onChange={(e) => {
                setnocomputer(Number(e.target.value));
              }}
              placeholder="Number of Devices"
              required={computer}
            />
          )}

          <br />
          <div className="align_chbox_lbl">
            <label className="machine_css">
              <input
                type="checkbox"
                value={printer}
                onChange={(e) => {
                  setprinter(e.currentTarget.checked);
                }}
              />
              printer
            </label>
          </div>
          {printer && (
            <input
              className="input"
              type="number"
              onChange={(e) => {
                setnoprinter(Number(e.target.value));
              }}
              placeholder="Number of Devices"
              required={printer}
            />
          )}

          <br />
          <div className="align_chbox_lbl">
            <label className="machine_css">
              <input
                type="checkbox"
                value={scanner}
                onChange={(e) => {
                  setscanner(e.currentTarget.checked);
                }}
              />
              scanner
            </label>
          </div>
          {scanner && (
            <input
              className="input"
              type="number"
              onChange={(e) => {
                setnoscanner(Number(e.target.value));
              }}
              placeholder="Number of Devices"
              required={scanner}
            />
          )}
          <br />
        </div>
        <GoogleMaps AddLatLong={getlatlog} />
        <br/>
        <CameraModule AddLiveImage={HandleLiveCapture} />
        <div>
          {live_capture && <img src={live_capture} alt="live_capture" />}
        </div>

        <div className="lbl_ipt">
          <label className="label">Photo</label>
          <input
            className="input"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => {
              setimage_upload(URL.createObjectURL(e.target.files[0]));
              setlive_capture();
              setblobimage(e.target.files[0]);
              console.log(e.target.files[0].size);
              setimage_upload_size(e.target.files[0].size);
            }}
          />
        </div>

        <div>
          {image_upload && (
            <img
              src={image_upload}
              className="image_upload_style"
              alt="image_upload"
            />
          )}
        </div>

        <label className={`label ${submitted ? "green" : "error_display"} `}>
          {error}
        </label>

        <div className="lbl_ipt form_btn">
          <button type="submit" className="form_button">
            Submit
          </button>
        </div>
      </form>

      <div>
      {/* {checkexpo} <br /> */}
        {name} <br />
        {email}
        <br />
        {contact1}
        <br />
        {contact2}
        <br />
        {retailsize}
        <br />
        {itautomation}
        <br />
        {located && <p>LOCATION SPOTTED</p>}
        <br />
        {latitude} <br />
        {longitude} <br />
        {mobile && nomobile} <br />
        {tab && notab} <br />
        {computer && nocomputer} <br />
        {printer && noprinter} <br />
        {scanner && noscanner} <br />
        
      </div>
    </div>
  );
}
export default Main;
