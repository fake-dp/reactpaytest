import React from 'react';
import { Routes, Route } from "react-router-dom";
import PaymentDone from '../page/PaymentDone';
import PaymentLink from '../page/PaymentLink';
import Payment from '../page/Payment';
function AppRouter(props) {
    return (
    <Routes>
      <Route path='/paymentlink/:id' element={<PaymentLink />} />
      <Route path='/payment/complete' element={<PaymentDone />} />
      <Route path='/payment' element={<Payment />} />
    </Routes>
    );
}

export default AppRouter;