import React from 'react';
import { Routes, Route } from "react-router-dom";
import Payment from '../page/Payment';
import PaymentDone from '../page/PaymentDone';
import PaymentLink from '../page/PaymentLink';
import TestPayment from '../page/TestPayment';
import DtoPayment from '../page/DtoPayment';
function AppRouter(props) {
    return (
    <Routes>
      {/* <Route path="/payment" element={<Payment />}/>
      <Route path='/paytest/:id' element={<PaymentLink />} />
      <Route path='/paymentTest' element={<TestPayment />} /> */}
      <Route path='/payment/complete' element={<PaymentDone />} />
      <Route path='/payment' element={<DtoPayment/>} />
    </Routes>
    );
}

export default AppRouter;