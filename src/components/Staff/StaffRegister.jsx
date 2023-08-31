import React from "react";
import Dashboard from "../Dashboard";

function StaffRegister() {
  return (
    <div className="bg-gray-100">
      StaffRegister
      <div className="container p-4 mx-auto mt-8 lg:pl-60 xl:pl-60 ">
        <Dashboard />

        <div>
          <h5 className="pt-24 subheading">Staff Register</h5>
        </div>
        <div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                First Name
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="FirstName"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Last Name
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Designation
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="Just a hint.."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                D.O.B
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Employee Id
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="Just a hint.."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                D.O.B
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Gender
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Blood Group
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Marital Status
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Religion
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Food Habits
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Mobile Number
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                Email
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                {" "}
                personal Email
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Current Address
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Current Area
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Current city
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Current Pin code
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Current State
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Current country
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Permanent address
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Permanent city
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Permanent pin code
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Permanent state
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Permanent country
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div className="flex-1 w-full mx-2 svelte-1l8159u">
              <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-600 uppercase">
                Permanent area
              </div>
              <div className="flex my-2 svelte-1l8159u">
                <input
                  placeholder="john"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-2 mt-4">
          <button
            className="flex justify-center px-4 py-2 text-base font-bold text-gray-700 transition duration-200 ease-in-out bg-gray-100 border border-gray-600 rounded cursor-pointer hover:scale-110 focus:outline-none hover:bg-gray-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffRegister;
