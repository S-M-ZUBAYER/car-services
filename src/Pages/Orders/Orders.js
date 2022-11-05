import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`https://genius-car-resources-server.vercel.app/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('car-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('car-token')
                    return logOut();
                }
                return res.json()
            })
            .then(data => setOrders(data))
    }, [user?.email, logOut]);

    const handleToDelete = (id) => {
        const proceed = window.confirm("Are you sure, Do you Want To cancel this order");
        if (proceed) {
            fetch(`https://genius-car-resources-server.vercel.app/orders/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('car-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    const remainingOrders = orders.filter(ord => ord._id !== id);
                    setOrders(remainingOrders);
                    if (data.deletedCount > 0) {
                        alert("delete successfully")

                    }
                })
        }
    }
    const handleToUpdate = (id) => {
        fetch(`https://genius-car-resources-server.vercel.app/orders/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem('car-token')}`

            },
            body: JSON.stringify({ status: "Approved" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Order Updated successfully')
                    const approvingOrder = orders.find(ord => ord._id === id);
                    approvingOrder.status = "Approved";
                    const remainingOrders = orders.filter(ord => ord._id !== id);
                    const newOrders = [approvingOrder, ...remainingOrders];
                    setOrders(newOrders);
                }
            })
    }

    return (
        <div >
            <h2 className="text-4xl">You have {orders.length} orders</h2>
            <div className="overflow-x-auto w-full ">
                <table className="table w-full bg-slate-700">
                    <thead>
                        <tr>
                            <th className='bg-slate-700'>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th className='bg-slate-700'>Name</th>
                            <th className='bg-slate-700'>Job</th>
                            <th className='bg-slate-700'>Favorite Color</th>
                            <th className='bg-slate-700'></th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-700">
                        {orders?.map(order => <OrderRow
                            key={order._id}
                            order={order}
                            handleToDelete={handleToDelete}
                            handleToUpdate={handleToUpdate}
                        ></OrderRow>)}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;


