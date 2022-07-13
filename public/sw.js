// import { openDB } from "idb";
const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v2";
const assets = [
  "/",
  "index.html",
  "favicon.ico",
  "fallback.html",
  "logo192.png",
  "logo512.png",
  "/static/js/bundle.js",
  "/manifest.json",
];

// navigator.serviceWorker.ready.then(registration => {
//   if (registration.sync) {
//     console.log("Background Sync is supported.");
//       // Background Sync is supported.
//   } else {
//     console.log("Background Sync isn't supported.") ;
//       // Background Sync isn't supported.
//   }
// });

// install event
self.addEventListener("install", (evt) => {
  console.log("service worker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event || evt.request.url.match("maps/api/mapsjs/gen_204?csp_test=true")
self.addEventListener("fetch", (evt) => {
  console.log("fetch event", evt);
  if (evt.request.url.match("/retail/create/")) {
    console.log(evt.request.url);
  } else {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          return (
            cacheRes ||
            fetch(evt.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone());
                return fetchRes;
              });
            })
          );
        })
        .catch(() => caches.match("fallback.html"))
    );
  }
});

self.addEventListener("sync", (event) => {
  console.log("SYNC EVENT TRIGGERED");
  console.log(event);
  event.waitUntil(getDataAndSend());
});

function getDataAndSend() {
  console.log("INSIDE getDataAndSend");
  let db;
  const request = indexedDB.open("retail");
  request.onerror = (event) => {
    console.log(ERROR, event);
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log(db);
    getData(db);
  };
}

function getData(db) {
  const transaction = db.transaction(["details"], "readwrite");
  const objectStore = transaction.objectStore("details");
  console.log(objectStore);
  const request = objectStore.getAll();
  console.log(request);
  var data_inserted = false;

  var single_idb_data = [];
  var idb_len = 0;
  var success_count = 0;
  var tot_non_sync_data = 0;

  request.onerror = (event) => {
    console.log("ERROR");
  };
  request.onsuccess = async (event) => {
    console.log("TOTAL IDB", request.result.length);
    idb_len = request.result.length;
    success_count = 0;
    tot_non_sync_data = 0;

    for (let i = 0; i < idb_len; i++) {
      if (request.result[i].mysql_sync === false) {
        tot_non_sync_data = tot_non_sync_data + 1;
        console.log(request.result[i]);
        console.log(request.result[i].name);
        data_inserted = false;

        console.log("Email of the user is " + request.result[i].email);

        let form_data = new FormData();
        form_data.append("name", request.result[i].name);
        form_data.append("email", request.result[i].email);
        form_data.append("contact_number1", request.result[i].contact_number1);
        form_data.append("contact_number2", request.result[i].contact_number2);
        form_data.append("retail_size", request.result[i].retail_size);
        form_data.append("it_automation", request.result[i].it_automation);
        form_data.append("no_of_mobile", request.result[i].no_of_mobile);
        form_data.append("no_of_tab", request.result[i].no_of_tab);
        form_data.append("no_of_computer", request.result[i].no_of_computer);
        form_data.append("no_of_printer", request.result[i].no_of_printer);
        form_data.append("no_of_scanner", request.result[i].no_of_scanner);
        form_data.append("latitude", request.result[i].latitude);
        form_data.append("longitude", request.result[i].longitude);
        form_data.append("image", request.result[i].image);

        console.log(form_data);

        var requestOptions = {
          method: "POST",
          body: form_data,
          redirect: "follow",
        };

        await fetch(
          "https://django-retail-app.herokuapp.com/retail/create/",
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .then(async () => {
            success_count = success_count + 1;
            data_inserted = await true;
            single_idb_data = await request.result[i];
            console.log("-----------------------------------------------");
            console.log(data_inserted);
            console.log(
              "MAIN DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
              single_idb_data
            );
            console.log(single_idb_data.email);
            console.log(request.result[i].email, " Added in MySQL DB");
            // console.log("PROMISE RESOLVED");
            // Promise.resolve();
          })
          .catch((error) => {
            // console.log("PROMISE REJECTED");
            console.log("error", error);
            console.log(request.result[i].email, "NOT Added in MySQL DB");
            // Promise.reject();
          });
      }
    }
  };
  // const transaction1 = db.transaction(['details'],IDBTransaction.READ_WRITE);
  // const objectStore1 = transaction1.objectStore('details');

  const indexeddb_data = {
    name: "varunkumar",
    email: "varun@gmail.com",
    contact_number1: 9854758965,
    contact_number2: 3256985789,
    retail_size: 7,
    it_automation: "automated",
    no_of_mobile: 1000,
    no_of_tab: 0,
    no_of_computer: 0,
    no_of_printer: 0,
    no_of_scanner: 0,
    latitude: 2.5544,
    longitude: 5.22,
    mysql_sync: true,
    image: "image",
  };

  {
    () => {
      console.log("EMMMPPPTTTYYYYYY FFFUUUNNCCCCTTTIIIOOONNNN");
    };
  }

  console.log("-----------------------------------------------");
  console.log(data_inserted);
  if (data_inserted === false) {
    var update_retail_data = single_idb_data;
    console.log("-----------------------------------------------");
    console.log(single_idb_data);
    console.log("EMAIL", update_retail_data.email);
    update_retail_data.mysql_sync = true;
    console.log(update_retail_data);

    const updateRequest = objectStore.put(update_retail_data);

    updateRequest.onsuccess = () => {
      console.log("MYSQL SYNC CHANGED TO TRUE", update_retail_data.email);
    };

    updateRequest.onerror = (err) => {
      console.log(err);
    };
  }

  if (success_count === tot_non_sync_data) {
    console.log("PROMISE RESOLVED");
    Promise.resolve();
  } else {
    console.log("PROMISE REJECTED");
    Promise.reject();
  }
}

// self.addEventListener('fetch', evt => {
//   console.log('fetch event', evt);

//     evt.respondWith(
//       caches.match(evt.request).then(cacheRes => {
//         return cacheRes || fetch(evt.request) ;
//       }).catch(() =>
//           caches.match('fallback.html')
//     )
//     );

// });

// if (self.BackgroundFetchManager) {
//   // Background Fetch is supported.
//   console.log('Background Fetch is supported.');
// } else {
//   console.log('Background Fetch is not supported.');
// }
