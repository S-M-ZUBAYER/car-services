import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleToDelete, handleToUpdate }) => {
    const { _id, serviceName, price, customer, phone, service, status } = order;
    const [orderService, setOrderService] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/services/${service}`)
            .then(res => res.json())
            .then(data => setOrderService(data))
    }, [service])


    return (
        <tr className='bg-slate-700'>
            <th className='bg-slate-700'>
                <button onClick={() => { handleToDelete(_id) }} className="btn btn-circle btn-outline bg-orange-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td className='bg-slate-700'>
                <div className="flex items-center space-x-3 bg-slate-700">
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {orderService?.img && <img src={orderService.img} alt="Avatar Tailwind CSS Component" />}

                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td className='bg-slate-700'>
                {serviceName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td >
            <td className='bg-slate-700'>Purple</td>
            <th className='bg-slate-700'>
                <button onClick={() => handleToUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : 'Pending'}</button>
            </th>
        </tr>
    );
};

export default OrderRow;