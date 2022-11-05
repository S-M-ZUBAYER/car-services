import React, { useContext } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthTokenFunc from '../../API/Auth';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const LogIn = () => {
    const { logIn, LogInWithGoogle } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const handleToLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        logIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user.email);
                AuthTokenFunc(user);
                navigate(from, { replace: true })


            })
            .catch(err => console.error(err))
    }
    const SignInWithGoogle = () => {
        LogInWithGoogle()
            .then((result) => {
                const user = result.user;
                console.log(user);
                AuthTokenFunc(user);
                navigate(from, { replace: true })
                // if (user?.uid) {
                //     navigate(from, { replace: true });
                // }
                // else {
                //     toast("register firest")
                // }
            })
            .catch(error => console.error(error))
    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-10 md:grid-cols-2 lg:flex-row">
                <div className="text-center w-3/4 lg:text-left">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-10">
                    <form onSubmit={handleToLogin} className="card-body text-black">
                        <div className="form-control">
                            <h1 className="text-5xl font-bold text-center text-slate-800">Login</h1>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered text-black" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-accent" value="Login" />
                        </div>
                    </form>
                    <div className="text-center">
                        <button onClick={SignInWithGoogle} >< FaGoogle className="text-black mr-3" /> </button>
                        <button>< FaFacebook className="text-black mr-3" /> </button>
                        <button>< FaGithub className="text-black" /> </button>
                    </div>
                    <p className="text-center text-black">New to genius car service <Link className="font-bold text-orange-700" to='/register'>Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;