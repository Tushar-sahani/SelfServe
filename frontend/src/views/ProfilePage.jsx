import React from "react";
import { profileViewModel } from "../viewModels/profileViewModel";
const ProfilePage = () => {
  const personalInfo = profileViewModel.getPersonalInfo();
  const stats = profileViewModel.getStats();
  const activity = profileViewModel.getActivity();

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      {/* Personal Info Section */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <img
            src={personalInfo.profilePic}
            alt={personalInfo.name}
            className="w-24 h-24 rounded-full mb-4 md:mb-0 md:mr-6"
          />
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {personalInfo.name}{" "}
              <span className="bg-green-400 text-white px-2 py-1 rounded text-sm">
                {personalInfo.badge}
              </span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <p>Registered: {personalInfo.registered}</p>
              <p>Phone: {personalInfo.phone}</p>
              <p>Country: {personalInfo.country}</p>
              <p>City: {personalInfo.city}</p>
              <p>Age: {personalInfo.age}</p>
              <p>Gender: {personalInfo.gender}</p>
              <p>Website: {personalInfo.website}</p>
            </div>
            <p className="mt-4 text-gray-600">
              Duis dapibus aliquam mi, eget euismod sem scelerisque ut...
            </p>
            <button className="mt-4 bg-red-400 text-white py-2 px-4 rounded">
              Ask {personalInfo.name}
            </button>
            <div className="mt-4 space-x-2">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(stats).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between bg-gray-200 p-4 rounded shadow"
          >
            <p className="font-semibold">
              {key.split(/(?=[A-Z])/).join(" ")} ({value})
            </p>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      {/* <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Today</th>
              <th className="p-2">Month</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(activity.today).map(([key], idx) => (
              <tr key={key}>
                <td className="p-2">{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                <td className="p-2">{activity.today[key]}</td>
                <td className="p-2">{activity.month[key]}</td>
                <td className="p-2">{activity.total[key]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default ProfilePage;
