import React, { useContext } from "react";
import AccountSettings from "../components/AccountSettings/AccountSettings";
import SignInForms from "../components/AccountSettings/SignInForms";
import { UserContext } from "../contexts/UserContext";

function AccountPage() {
  const { user } = useContext(UserContext);

  console.log(user);

  if (user) {
    return <AccountSettings />;
  }

  return <SignInForms />;
}

export default AccountPage;
