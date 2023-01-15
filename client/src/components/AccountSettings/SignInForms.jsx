import React, { useContext, useState, useRef } from "react";
import GoogleButton from "react-google-button";
import UserContext from "../../contexts/UserContext";

function SignInForms() {
  const { signInWithGoogle } = useContext(UserContext);

  return (
    <section className="flex w-full flex-col items-center  bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
      <SignInWithEmailForm />
      <CreateAccountForm />
      <p>Or sign in with Google:</p>
      <GoogleButton onClick={signInWithGoogle} />
    </section>
  );
}

function SignInWithEmailForm() {
  const { signIn } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  async function signInHandler(e) {
    e.preventDefault();
    const currentEmail = emailRef.current.value;
    const currentPassword = passwordRef.current.value;

    if (currentEmail.length === 0 || currentPassword.length === 0) {
      setErrorMessage("You forgot to fill in all the fields!");
      return;
    }

    if (!currentEmail.includes("@")) {
      setErrorMessage("That's not a valid e-mail!");
      return;
    }

    if (currentPassword.length < 6) {
      setErrorMessage("The password needs to be at least 6 characters.");
      return;
    }

    const result = await signIn(currentEmail, currentPassword);
    if (result.success) {
      setErrorMessage("");
    } else {
      if (result.message === "Firebase: Error (auth/user-not-found).") {
        setErrorMessage("User not found.");
      } else {
        setErrorMessage(result.message);
      }
    }
  }

  return (
    <>
      <h1 className="text-2xl md:text-3xl mb-2">Please sign in with your account.</h1>
      <form
        onSubmit={signInHandler}
        className="m-4 mb-8 flex min-w-full flex-col items-center  justify-center rounded border border-slate-900 bg-slate-300 p-8  text-xl text-slate-900 dark:bg-slate-800 md:min-w-[20rem]"
      >
        <input
          type="text"
          id="email"
          placeholder="E-mail"
          ref={emailRef}
          className="mb-4 min-w-full rounded-sm px-2 outline-none md:min-w-[20rem]"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
          className="min-w-full rounded-sm px-2 outline-none md:min-w-[20rem]"
        />
        <h2 className="p-2 text-base font-semibold italic text-red-600">
          {errorMessage}
        </h2>
        <input
          type="submit"
          value="Sign in"
          className="text-md block w-full cursor-pointer rounded bg-orange-600 px-12  py-3 text-white shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500 md:w-auto"
        />
      </form>
    </>
  );
}

function CreateAccountForm() {
  const { createUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repeatPasswordRef = useRef("");

  async function createAccountHandler(e) {
    e.preventDefault();
    const currentEmail = emailRef.current.value;
    const currentPassword = passwordRef.current.value;
    const currentRepeatPassword = repeatPasswordRef.current.value;

    if (
      currentEmail.length === 0 ||
      currentPassword.length === 0 ||
      currentRepeatPassword.length === 0
    ) {
      setErrorMessage("You forgot to fill in all the fields!");
      return;
    }

    if (!currentEmail.includes("@")) {
      setErrorMessage("That's not a valid e-mail!");
      return;
    }

    if (currentPassword.length < 6) {
      setErrorMessage("The password needs to be at least 6 characters.");
      return;
    }

    if (currentPassword !== currentRepeatPassword) {
      setErrorMessage("The passwords doesn't match.");
      return;
    }

    const result = await createUser(currentEmail, currentPassword);
    if (result.success) {
      setErrorMessage("");
    } else {
      setErrorMessage(result.message);
    }
  }

  return (
    <>
      <h2 className=" text-2xl md:text-3xl mb-2">Don't have an account already? Create one:</h2>
      <form
        onSubmit={createAccountHandler}
        className="flex min-w-full flex-col items-center justify-center rounded border border-slate-900 bg-slate-300 p-8 text-xl text-slate-900 dark:bg-slate-800 md:min-w-[20rem]"
      >
        <input
          type="text"
          id="email"
          placeholder="E-mail"
          ref={emailRef}
          className="mb-4 min-w-full rounded-sm px-2 outline-none md:min-w-[20rem]"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          ref={passwordRef}
          className="mb-4 min-w-full rounded-sm px-2 outline-none md:min-w-[20rem]"
        />
        <input
          type="password"
          id="repeatPassword"
          placeholder="Re-enter your password"
          ref={repeatPasswordRef}
          className="min-w-full rounded-sm px-2 outline-none md:min-w-[20rem]"
        />
        <h2 className="p-2 text-base font-semibold italic text-red-600">
          {errorMessage}
        </h2>
        <input
          type="submit"
          value="Create account"
          className="text-md  m-0 block w-full cursor-pointer rounded bg-orange-600 p-0 px-12 py-3  text-white shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500 md:w-auto"
        />
      </form>
    </>
  );
}

export default SignInForms;
