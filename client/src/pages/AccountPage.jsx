import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {AccountSettings, SignInForms } from "../components/index"

function AccountPage() {
  const { user } = useContext(UserContext);

  return user ? <AccountSettings /> : <SignInForms />;
}

export default AccountPage;
