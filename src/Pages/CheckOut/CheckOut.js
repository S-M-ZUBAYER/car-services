import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const CheckOut = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);


    const handleToOrder = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const phone = form.phone.value;
        const email = user?.email || 'unregistered'
        const message = form.message.value;
        console.log(name, phone, email, message)

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            phone,
            email,
            message
        }
        // if (phone.length < 10) {
        //     alert('phone number should be longer than 10 characters')
        // }
        fetch('https://genius-car-resources-server.vercel.app/orders', {
            method: "POST",
            headers: {
                'content-type': "application/json",
                authorization: `Bearer ${localStorage.getItem('car-token')}`

            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert('Oder placed successfully');
                form.reset();
            })
            .catch(err => console.error(err))

    }
    return (
        <div>
            <form onSubmit={handleToOrder}>
                <h2 className="text-4xl">You are about to order: {title}</h2>
                <h3 className="text-3xl">Price: {price}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-black">
                    <input type="text" name="firstName" placeholder="First Name" className="input input-bordered input-bordered w-full max-w-xs mx-auto" />
                    <input type="text" name="lastName" placeholder="Last Name" className="input input-bordered input-bordered w-full max-w-xs mx-auto" />
                    <input type="text" name="phone" placeholder="Your Phone" className="input input-bordered input-bordered w-full max-w-xs mx-auto" required />
                    <input type="text" name="email" placeholder="Email" defaultValue={user?.email} className="input input-bordered input-bordered w-full max-w-xs mx-auto" readOnly />
                </div>
                <div className='text-center my-5 text-black'>
                    <textarea name="message" className="textarea textarea-bordered h-24 w-3/4" placeholder="Your message" required></textarea>

                </div>
                <input type="submit" className="btn btn-accent text-center w-3/4" value='CheckOut' />
            </form>
        </div>
    );
};

export default CheckOut;