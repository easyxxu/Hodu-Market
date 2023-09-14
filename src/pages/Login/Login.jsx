import React from "react";
import LoginForm from "../../components/Auth/LoginForm";
import { AuthLayout } from "../../components/Layout/Layout";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
