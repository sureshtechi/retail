import React, { useState } from 'react'
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import './gmap.css' ;

const libraries = ["places"] ;
const mapContainerStyle = {
  width:"50vw",
  height: "50vh",
};

const options = {
  // styles: MapStyles,
  // disableDefaultUI: true,
  zoomControl: true,
};

const GoogleMaps = (props) => {

  const [latitude, setlatitude] = useState(false);
  const [longitude, setlongitude] = useState(false);
  const [located, setlocated] = useState(false);

  const center = {
    lat: latitude,
    lng: longitude,
  };
  
    const getlocation = async() => {

      navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);

        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);

        if (loadError) return "Error Loading Maps" ;
        if ( isLoaded) return "Loading Maps" ;
      })
    }

    const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      libraries,
    });

    props.AddLatLong(latitude,longitude);

    return (
    <div>
      <span className='location_btn' onClick={( () => { getlocation() } )}>Get Current Location*</span>
      <div><br></br></div>
      
      { latitude && longitude && 
      <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={options}
      zoom={15}
      center={center}
      onClick={ (event) => {
        setlatitude( event.latLng.lat() );
        setlongitude( event.latLng.lng() );
      } }
      >
        <span className="locate">
      <img onClick={( () => { getlocation() } )} className='locator_icon'  src={require('../images/pointer.webp')} alt="compass" />
    </span>
      <Marker position={ { lat: latitude , lng: longitude } }  >   </Marker>
      <InfoWindow position={ { lat: latitude , lng: longitude } }>
        <div>
        Your Location
        </div> 
      </InfoWindow>
      </GoogleMap>
      }
    </div>
  )
}

export default GoogleMaps