import React, { useContext } from "react";
import AccountSettings from "../components/AccountSettings/AccountSettings";
import SignInForms from "../components/AccountSettings/SignInForms";
import { UserContext } from "../contexts/UserContext";

function AccountPage() {
  const { user } = useContext(UserContext);

  return user ? <AccountSettings /> : <SignInForms />;
}

export default AccountPage;
