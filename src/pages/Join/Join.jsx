import React from "react";
import JoinForm from "../../components/Auth/JoinForm";
import { AuthLayout } from "../../components/Layout/Layout";

export default function Join() {
  return (
    <AuthLayout>
      <JoinForm />
    </AuthLayout>
  );
}
