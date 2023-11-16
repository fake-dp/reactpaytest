import React from 'react';
import { Routes, Route } from "react-router-dom";
import Payment from '../page/Payment';

function AppRouter(props) {
    return (
    <Routes>
      <Route path="/:id" element={<Payment />}/>
    </Routes>
    );
}

export default AppRouter;