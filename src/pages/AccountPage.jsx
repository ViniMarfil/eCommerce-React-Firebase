import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { AccountSettings, SignInForms } from "../components/index";

function AccountPage() {
  const { user } = useContext(UserContext);

  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return user ? <AccountSettings /> : <SignInForms />;
}

export default AccountPage;
