"use client";
import React, { useEffect, useState } from "react";
import { Button, Form } from "antd";

const SubmitButton = ({ form, children }) => {
  const [submittable, setSubmittable] = useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({
        validateOnly: true,
      })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button
      type="primary"
      onClick={() => form.submit()}
      disabled={!submittable}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
