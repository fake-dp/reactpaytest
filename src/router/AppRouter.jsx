import React from 'react';
import { Routes, Route } from "react-router-dom";
import PaymentDone from '../page/PaymentDone';
import PaymentLink from '../page/PaymentLink';
import Payment from '../page/Payment';
import TestData from '../page/TestData';
function AppRouter(props) {
    return (
    <Routes>
      <Route path='/paymentlink/:id' element={<PaymentLink />} />
      <Route path='/payment/complete' element={<PaymentDone />} />
      {/* <Route path='/payment' element={<Payment />} /> */}
      <Route path='/payment' element={<TestData />} />
    </Routes>
    );
}

export default AppRouter;