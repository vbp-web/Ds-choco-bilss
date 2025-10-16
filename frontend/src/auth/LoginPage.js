import React from 'react';
import LoginForm from '../components/Auth/LoginForm';

const LoginPage = () => {
  const noop = () => {};

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <LoginForm onToggleForm={noop} onClose={noop} />
      </div>
    </div>
  );
};

export default LoginPage;
