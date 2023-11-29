import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Payment(props) {
    const location = useLocation();
    const [paymentData, setPaymentData] = useState({ orderId: '', amount: '', goodsName: '' });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const orderId = queryParams.get('orderId');
        const amount = queryParams.get('amount');
        const goodsName = queryParams.get('goodsName');

        setPaymentData({ orderId, amount, goodsName });

        // 결제창 실행 로직
        if (orderId && amount && goodsName) {
            window.AUTHNICE.requestPay({
                clientId: 'S2_af4543a0be4d49a98122e01ec2059a56',
                method: 'card',
                orderId,
                amount,
                goodsName,
                returnUrl: 'http://localhost:3000/serverAuth',
                fnError: function (result) {
                    console.log('result', result);
                    alert('개발자확인용 : ' + result);
                }
            });
        }
    }, [location]);

    return (
        <div></div>
    );
}

export default Payment;
