import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/Auth/SignupForm';

const SignupPage = () => {
  const noop = () => {};
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-chocolate-50 to-chocolate-100 px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 self-start inline-flex items-center text-sm text-chocolate-700 hover:text-chocolate-900"
        >
          ← Back
        </button>
        <div className="w-full bg-white p-8 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <SignupForm onToggleForm={noop} onClose={noop} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
