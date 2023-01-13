import React, { useContext } from "react";
import UserContext from "../../contexts/UserContext";

function AccountSettings() {
  const { user, signOutUser } = useContext(UserContext);

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 text-2xl dark:bg-slate-700 dark:text-slate-200">
      <h1>Hello, {user.displayName}! </h1>

      <button
        onClick={signOutUser}
        className="text-md block w-full cursor-pointer rounded bg-orange-600 px-12  py-3 text-white shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500 md:w-auto"
      >
        Sign out
      </button>
    </section>
  );
}

export default AccountSettings;
