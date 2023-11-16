import React from 'react';
import { useParams } from 'react-router-dom';
function Payment(props) {

    const { id } = useParams();

    return (
        <div>
            결제 페이지 입니따아따땅땅
            <h1>아이디값 tests : {id}</h1>
        </div>
    );
}

export default Payment;