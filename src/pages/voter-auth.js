import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { apiRequest } from "@/services/api";

export default function VoterAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: login/register, 2: details (for registration)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    idNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        // Login
        const data = await apiRequest('/api/auth/login', 'POST', {
          email: formData.email,
          password: formData.password
        });
        // Save token to localStorage or cookie if needed
        router.push('/elections');
      } else {
        // Registration
        const data = await apiRequest('/api/auth/register', 'POST', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'voter',
          age: formData.age,
          address: formData.address,
          idNumber: formData.idNumber
        });
        router.push('/elections');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setStep(1);
    setError('');
    setFormData({
      name: '',
      email: '',
      password: '',
      age: '',
      address: '',
      idNumber: ''
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Voter Login' : 'Voter Registration'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-xl"
              required
            />
          )}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-xl"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-xl"
            required
          />
          {!isLogin && (
            <>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                placeholder="ID Number"
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </>
          )}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
            disabled={loading}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={switchMode}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
