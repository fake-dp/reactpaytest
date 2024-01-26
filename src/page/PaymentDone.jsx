import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


function PaymentDone() {
    useEffect(() => {
        // 결제 결과 데이터 추출 (이 예시에서는 단순화를 위해 하드코딩)
        const paymentResult = {
            authResultCode: queryParams.get('AuthResultCode'),
            authResultMsg: queryParams.get('AuthResultMsg'),
            authToken: queryParams.get('AuthToken'),
            payMethod: queryParams.get('PayMethod'),
            mid: queryParams.get('MID'),
            moid: queryParams.get('Moid'),
            signature: queryParams.get('Signature'),
            amt: queryParams.get('Amt'),
            reqReserved: queryParams.get('ReqReserved'),
            txtid: queryParams.get('TxTid'),
            // 실제 데이터에 따라 필요한 값을 여기에 추가
        };

        // React Native 앱으로 결과 데이터를 전송
        if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
            window.ReactNativeWebView.postMessage(JSON.stringify(paymentResult));
        }
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
