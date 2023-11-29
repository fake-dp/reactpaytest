import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { postPaymentSubscription } from '../api/paymentApi';

function PaymentDone(props) {
    useEffect(() => {
        // 결제 정보를 서버에 전달하는 작업
        const paymentData = {
            // 여기에 결제 정보를 채워넣으세요.
        };

        postPaymentSubscription(paymentData)
            .then((response) => {
                // 결제 정보 전달 성공 시 처리
                console.log('결제 정보 전달 성공', response);
            })
            .catch((error) => {
                // 결제 정보 전달 실패 시 처리
                console.error('결제 정보 전달 실패', error);
            });
    }, []);

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
