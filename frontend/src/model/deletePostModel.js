// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const deletePostModel = (id) => {
//   const [error, setError] = useState(null);
//   const [deletedId, setDeletedId] = useState([]);

//   const { token } = useSelector((store) => store.auth);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.delete(
//           `http://${import.meta.env.VITE_IP_ADDRESS}:${
//             import.meta.env.VITE_PORT
//           }/api/deleteArticle/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (response.data.apiResponseCode === "200") {
//           if (response.data.apiResponseData.responseCode === "200") {
//             setDeletedId(response.data.apiResponseData.responseData.id);
//           } else {
//             setError(response.data.apiResponseData.responseMessage);
//             // ////console.log(error);
//           }
//         } else {
//           setError(response.data.apiResponseMessage);
//           //   ////console.log(error);
//         }
//       } catch (error) {
//         const errorMessage =
//           error.response?.data?.message || "Failed to fetch posts";
//         setError(errorMessage);
//       } 
//     };

//     fetchProfile();
//   }, []);

//   return {
//     deletedId,
//     error,
//   };
// };

// export default deletePostModel;
