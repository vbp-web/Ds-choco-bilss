import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/Auth/SignupForm';

const SignupPage = () => {
  const noop = () => {};
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent px-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 inline-flex items-center text-sm text-chocolate-700 hover:text-chocolate-900"
        >
          ← Back
        </button>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SignupForm onToggleForm={noop} onClose={noop} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
