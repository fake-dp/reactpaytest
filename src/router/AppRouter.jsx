import React from 'react';
import { Routes, Route } from "react-router-dom";
import Payment from '../page/Payment';
import PaymentDone from '../page/PaymentDone';
import PaymentLink from '../page/PaymentLink';
function AppRouter(props) {
    return (
    <Routes>
      <Route path="/payment" element={<Payment />}/>
      <Route path='/serverAuth' element={<PaymentDone />} />
      <Route path='/paytest/:id' element={<PaymentLink />} />
    </Routes>
    );
}

export default AppRouter;