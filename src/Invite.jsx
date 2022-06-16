import React, { useState } from "react";
import { RadiobuttonContent } from "./Data";
import { SensitivePermissionAutomation } from "./Data";

const Invite = () => {
  return (
    <form action="#" method="POST">
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6 shadow sm:rounded-md ">
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <fieldset>
                    <div className="flex items-center gap-4  ">
                      {RadiobuttonContent.map((radioValue, i) => {
                        return (
                          <div
                            key={i}
                            className={`flex items-start border  rounded p-3 hover:cursor-pointer  `}
                          >
                            <div className="flex items-center h-5 ">
                              <input
                                id="flexRadioDefault1"
                                name="flexRadioDefault1"
                                value={radioValue}
                                type="radio"
                                className={`focus:ring-white  h-4 w-4 text-green-500 border-gray-300 rounded-full hover:cursor-pointer`}
                              />
                              <label
                                className="ml-3 text-sm font-medium text-gray-500 hover:cursor-pointer"
                                htmlFor="Admin"
                              >
                                {radioValue}
                              </label>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex flex-col my-4">
                      {SensitivePermissionAutomation.map((ReferralData) => {
                        return (
                          <div className="flex flex-col my-4">
                            <strong className="uppercase text-gray-600 font-medium">
                              {ReferralData.Category}
                            </strong>
                            <div className="ml-2 flex item-start mt-2 ">
                              <div className="flex items-center h-5 w-[50%] ">
                                <input
                                  id="referral"
                                  name="comments"
                                  type="checkbox"
                                  className="focus:ring-white h-4 w-4 text-green-500 border-gray-300 rounded"
                                />
                                <label
                                  className="ml-3 text-sm font-medium text-gray-500 hover:cursor-pointer"
                                  htmlFor="referral"
                                >
                                  {ReferralData.HeadingCheck.permissionsName}
                                </label>
                              </div>
                              <div className="text-sm ml-[12px] w-[50%]">
                                <p> {ReferralData.HeadingCheck.description}</p>
                              </div>
                            </div>
                            {ReferralData.Permissions.map((referral) => {
                              return (
                                <div className="ml-5 pb-2 flex items-start mt-1">
                                  <input type="checkbox" name="" id="" />
                                  <p
                                    className="w-1/2 ml-auto 
                      text-[#5A5B72]
                    "
                                  >
                                    {referral.description}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200"></div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Invite;
