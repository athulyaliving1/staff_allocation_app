import React from "react";
import Dashboard from "../Dashboard";

function StaffRegister() {
  return (
    <div className="bg-gray-100">
      StaffRegister
      <div class="mt-8 p-4 container mx-auto lg:pl-60 xl:pl-60 ">
        <Dashboard />

        <div>
          <h5 className="pt-24 subheading">Staff Register</h5>
        </div>
        <div>
          <div class="flex flex-col md:flex-row">
            <div class="w-full flex-1 mx-2 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                First Name
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="FirstName"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div class="w-full flex-1 mx-2 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Last Name
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="Last Name"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Designation
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="Just a hint.."
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                D.O.B
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Employee Id
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="Just a hint.."
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                D.O.B
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Gender
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Blood Group
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Marital Status
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Religion
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Food Habits
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Mobile Number
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                Email
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                {" "}
                personal Email
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Current Address
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Current Area
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Current city
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Current Pin code
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Current State
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Current country
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Permanent address
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Permanent city
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Permanent pin code
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Permanent state
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
          <div class="flex flex-col md:flex-row">
            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Permanent country
              </div>
              <div class="my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>

            <div class="w-full mx-2 flex-1 svelte-1l8159u">
              <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Permanent area
              </div>
              <div class=" my-2  flex  svelte-1l8159u">
                <input
                  placeholder="john"
                  class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />{" "}
              </div>
            </div>
          </div>
        </div>
        <div class="flex p-2 mt-4">
          <button
            class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-gray-200  
        bg-gray-100 
        text-gray-700 
        border duration-200 ease-in-out 
        border-gray-600 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default StaffRegister;
