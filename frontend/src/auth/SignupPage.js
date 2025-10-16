import React from 'react';
import SignupForm from '../components/Auth/SignupForm';

const SignupPage = () => {
  const noop = () => {};

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <SignupForm onToggleForm={noop} onClose={noop} />
      </div>
    </div>
  );
};

export default SignupPage;
