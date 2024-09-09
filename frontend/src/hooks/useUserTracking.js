import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useUserTracking = () => {
  const { isAuthenticated, token, userInfo } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      const getUserInfo = async () => {
        try {
          // browser info
          const browserInfo = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
          };

          // user location
          const geoPromise = new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (position) => resolve(position.coords),
              (error) => reject(error),
              { timeout: 10000 }
            );
          });

          const coords = await geoPromise;

          const userData = {
            browserInfo,
            email: userInfo.email,
            location: {
              latitude: coords.latitude,
              longitude: coords.longitude,
            },
          };


          const response = await axios.patch(
            `http://${import.meta.env.VITE_IP_ADDRESS}:${
              import.meta.env.VITE_PORT
            }/api/users/login`,
            userData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log(response.data);
        } catch (error) {
          console.error("Error tracking user info:", error);
        }
      };

      getUserInfo();
    }
  }, [isAuthenticated, token]);
};

export default useUserTracking;
