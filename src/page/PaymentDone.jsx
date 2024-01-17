import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


function PaymentDone() {


    return (
        <Container>
            <HText>결제가 완료되었습니다.</HText>
        </Container>
    );
}

export default PaymentDone;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 12rem;
`

const HText = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    margin-bottom: 1rem;
`
