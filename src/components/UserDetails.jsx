import React, { useState } from "react";

const UserDetails = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          setLocationError(err.message);
        },
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const getBrowserDetails = () => {
    const userAgent = navigator.userAgent;
    const browserName = (() => {
      if (userAgent.indexOf("Chrome") > -1) return "Chrome";
      else if (userAgent.indexOf("Firefox") > -1) return "Firefox";
      else if (userAgent.indexOf("Safari") > -1) return "Safari";
      else if (userAgent.indexOf("Edge") > -1) return "Edge";
      else return "Unknown";
    })();
    return {
      browserName,
      userAgent,
      platform: navigator.platform,
      language: navigator.language,
    };
  };

  const handleGetBrowserInfo = () => {
    setBrowserInfo(getBrowserDetails());
  };

  return (
    <div>
      <button onClick={getLocation}>Get My Location</button>
      <button onClick={handleGetBrowserInfo}>Get Browser Details</button>

      {location && (
        <div>
          <h3>Location</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
      {locationError && <p>{locationError}</p>}

      {browserInfo && (
        <div>
          <h3>Browser Details</h3>
          <p>Browser Name: {browserInfo.browserName}</p>
          <p>User Agent: {browserInfo.userAgent}</p>
          <p>Platform: {browserInfo.platform}</p>
          <p>Language: {browserInfo.language}</p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
