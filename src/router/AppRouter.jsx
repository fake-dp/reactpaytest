import React from 'react';
import { Routes, Route } from "react-router-dom";
import Payment from '../page/Payment';
import PaymentDone from '../page/PaymentDone';
function AppRouter(props) {
    return (
    <Routes>
      <Route path="/payment" element={<Payment />}/>
      <Route path='/serverAuth' element={<PaymentDone />} />
    </Routes>
    );
}

export default AppRouter;