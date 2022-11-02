import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);
    console.log(createUser)
    const handleToSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(err => console.error(err));
        console.log(name, email, password)
    }
    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-10 md:grid-cols-2 lg:flex-row">
                <div className="text-center w-3/4 lg:text-left">
                    <img src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-10">
                    <form onSubmit={handleToSignUp} className="card-body text-black">
                        <div className="form-control">
                            <h1 className="text-5xl font-bold text-center text-slate-800">Login</h1>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Enter Your Name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered text-black" required />

                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" className="btn btn-accent" value="Sign Up" />
                        </div>
                    </form>
                    <p className="text-center text-black">Already Have an Account? Please <Link className="font-bold text-orange-700" to='/login'>Log In</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;