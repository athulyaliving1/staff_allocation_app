import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";

const Menu = (props) => {
  const { children, items } = props;
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className="">
      <div className="">
        <button
          className="flex items-center justify-between w-full p-2 text-gray-600 duration-150 rounded-lg hover:bg-gray-50 active:bg-gray-100 "
          onClick={() => setIsOpened(!isOpened)}
        >
          <div className="flex items-center gap-x-2">{children}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 duration-150 ${isOpened ? "rotate-180" : ""}`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {isOpened ? (
          <ul className="px-2 mx-4 text-sm font-medium border-l">
            {items.map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.href}
                  className="flex items-center p-2 text-white duration-150 rounded-lg gap-x-2 hover:bg-text-gray-600 active:bg-gray-100"
                >
                  {item.icon ? (
                    <div className="text-white">{item.icon}</div>
                  ) : (
                    ""
                  )}
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

Menu.propTypes = {
  children: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.string),
  // Other prop validations
};

const Dashboard = () => {
  const navigation = [
    // {
    //   href: "/VendorRegsitration",
    //   name: "Vendor Registration",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   href: "/staffregister",
    //   name: "StaffRegister",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
    //       />
    //     </svg>
    //   ),
    // },
    {
      href: "/shiftroster",
      name: "NA Shift Roster",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M5 15h14v-2H5v2Zm0-4h14V9H5v2Zm0-4h14V5H5v2ZM3 21V3h18v18H3Zm2-2h14v-2H5v2Z" /></svg>
      ),
    },
    {
      href: "staffallocation",
      name: "NA Allocation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 11.95q.725-.8 1.113-1.825T14 8q0-1.1-.388-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8q0 1.5-1 2.625t-2.5 1.325ZM18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3h-2Zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2h-2ZM8 12q-1.65 0-2.825-1.175T4 8q0-1.65 1.175-2.825T8 4q1.65 0 2.825 1.175T12 8q0 1.65-1.175 2.825T8 12Zm-8 8v-2.8q0-.85.438-1.563T1.6 14.55q1.55-.775 3.15-1.163T8 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20H0Z" /></svg>
      ),
    },
    {
      href: "staffallocationupdate",
      name: "Staff Allocation  update",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      href: "staffnurseallocation",
      name: "Staff Nurse Allocation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      ),
    },
    {
      href: "staffnurseroster",
      name: "Staff Nurse Roster",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 1.5H11a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1h1.5" /><rect width="5" height="2.5" x="4.5" y=".5" rx="1" /><path d="M4.5 5.5h5M4.5 8h5m-5 2.5h5" /></g></svg>
      ),
    },
    {
      href: "shiftdetails",
      name: "Shift Details ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M11 9c0 1.66-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3m3 11H2v-2c0-2.21 2.69-4 6-4s6 1.79 6 4m8-6v2h-9v-2m9-4v2h-9V8m9-4v2h-9V4Z" /></svg>
      ),
    },
    {
      href: "shiftreport",
      name: "Shift Report ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 32 32"><path fill="currentColor" d="M10 18h8v2h-8zm0-5h12v2H10zm0 10h5v2h-5z" /><path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2ZM12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z" /></svg>
      ),
    },
    {
      href: "dutywisefilter",
      name: "Duty Wise ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20"><path fill="currentColor" d="M8 6h9v2H8zm0-3h11v2H8zM1 3h6v6H1zm7 11h9v2H8zm0-3h11v2H8zm-7 0h6v6H1z" /></svg>
      ),
    },
    {
      href: "staffbasereport",
      name: "Staff Base Report",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 13.5h-9m13-3H.5m13-3H.5" /><rect width="4" height="13" x="5" y="-4" rx=".5" transform="rotate(-90 7 2.5)" /></g></svg>
      ),
    },
    // {
    //   href: "staffshiftdetails",
    //   name: "Staff Shift Details",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   href: "staffallocationfilter",
    //   name: "staff Allocation Filter",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-5 h-5"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
    //       />
    //     </svg>
    //   ),
    // },
  ];


  // const profileRef = useRef();

  // const [isProfileActive, setIsProfileActive] = useState(false);

  // useEffect(() => {
  //   const handleProfile = (e) => {
  //     if (profileRef.current && !profileRef.current.contains(e.target))
  //       setIsProfileActive(false);
  //   };
  //   document.addEventListener("click", handleProfile);
  // }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-56 h-screen space-y-8 border-r shadow-2xl bg-primary">
        <div className="flex flex-col h-screen px-4 bg-primary xl:mt-32 lg:mt-20 ">
          {/* <div className="flex items-center h-20 pl-2">
            <div className="flex items-center w-full gap-x-4">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="block text-sm font-semibold text-gray-700">
                  Alivika tony
                </span>
                <span className="block mt-px text-xs text-gray-600">
                  Hobby Plan
                </span>
              </div>
              <div className="relative flex-1 text-right">
                <button
                  ref={profileRef}
                  className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                  onClick={() => setIsProfileActive(!isProfileActive)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isProfileActive ? (
                  <div className="absolute right-0 z-10 w-40 text-sm text-gray-600 bg-white border rounded-lg shadow-md top-12">
                    <div className="p-2 text-left">
                      <span className="block p-2 text-gray-500/80">
                        alivika@gmail.com
                      </span>
                      <a
                        href="dummuy"
                        className="block w-full p-2 text-left duration-150 rounded-md hover:bg-gray-50 active:bg-gray-100"
                      >
                        Add another account
                      </a>
                      <div className="relative duration-150 rounded-md hover:bg-gray-50 active:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="absolute inset-y-0 w-4 h-4 my-auto pointer-events-none right-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <select className="w-full p-2 bg-transparent outline-none appearance-none cursor-pointer">
                          <option disabled selected>
                            Theme
                          </option>
                          <option>Dark</option>
                          <option>Light</option>
                        </select>
                      </div>
                      <button className="block w-full p-2 text-left duration-150 rounded-md hover:bg-gray-50 active:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div> */}
          <div className="pt-2 mt-8 border-t">

          </div>
          <div className="overflow-auto">
            <ul className="flex-1 text-sm font-medium">
              {navigation.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="flex items-center p-2 text-white duration-150 rounded-lg gap-x-2 hover:bg-gray-500 active:bg-white"
                  >
                    <div className="text-white">{item.icon}</div>
                    {item.name}
                  </a>
                </li>
              ))}

            </ul>
            <div className="pt-2 mt-2 border-t">

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Dashboard;
