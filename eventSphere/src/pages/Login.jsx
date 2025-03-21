import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (data) => {
    setLoading(true);
    try {
      await signup(data.email, data.password);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white">Create an Account</h2>
        </div>
        <div className="p-6">
          <AuthForm isLogin={false} onSubmit={handleSignup} />
          
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
