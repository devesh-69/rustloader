import React, { useState } from 'react';

const AuthPage = () => {
    const [isOwner, setIsOwner] = useState(false);  // To toggle between Vehicle Owner and User
    const [isLogin, setIsLogin] = useState(true);   // To toggle between Login and Register

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4">
            <div className="max-w-lg w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-blue-600">
                        {isOwner ? 'Vehicle Owner' : 'User'} {isLogin ? 'Login' : 'Register'}
                    </h2>
                    <p className="mt-2 text-gray-600">
                        {isOwner
                            ? isLogin
                                ? 'Login to list your vehicle.'
                                : 'Register as a vehicle owner to list your vehicle.'
                            : isLogin
                                ? 'Login to rent a vehicle.'
                                : 'Register to rent vehicles from our platform.'
                        }
                    </p>
                </div>

                {/* Toggle Between Login and Register */}
                <form className="space-y-6" action="#" method="POST">
                    {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="name" className="block text-gray-700">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Full Name"
                                required
                            />
                        </div>
                    )}

                    <div className="input-group">
                        <label htmlFor="email" className="block text-gray-700">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Phone Number and Company Name for Vehicle Owners */}
                    {isOwner && !isLogin && (
                        <>
                            <div className="input-group">
                                <label htmlFor="companyName" className="block text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter your company name"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Phone Number for Both User and Vehicle Owner */}
                    {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="phone" className="block text-gray-700">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                placeholder="Phone Number"
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
                    >
                        {isLogin ? (isOwner ? 'Login as Vehicle Owner' : 'Login as User') : (isOwner ? 'Register as Vehicle Owner' : 'Register as User')}
                    </button>
                </form>

                {/* Toggle Between User Type and Register/Login */}
                <div className="text-center mt-8 space-y-4">
                    <div className="bg-black text-white py-2 rounded-lg">
                        <p className="text-gray-100">
                            {isOwner ? 'Are you a renter?' : 'Are you a vehicle owner?'}
                            <button
                                className="text-yellow-400 hover:underline ml-2 font-semibold"
                                onClick={() => setIsOwner(!isOwner)}
                            >
                                {isOwner ? 'Switch to User' : 'Switch to Vehicle Owner'}
                            </button>
                        </p>
                    </div>

                    <div className=" py-2 rounded-lg">
                        <p className="text-b">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                className="text-black hover:underline ml-2 font-semibold"
                                onClick={() => setIsLogin(!isLogin)}
                            >
                                {isLogin ? 'Register Here' : 'Login Here'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
