import styled from 'styled-components';
import closeIcon from '../img/close.svg';

import cardIcon from '../img/creditcard.svg';
import caretleft from '../img/caretleft.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PaymentLink(props) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        // URL에서 orderId 추출
        const pathSegments = window.location.pathname.split('/');
        const orderId = pathSegments[pathSegments.length - 1];
        console.log('orderId',orderId)
        // JSON 파일에서 결제 데이터 가져오기
        axios.get('/data/PaymentData.json') // JSON 파일의 위치를 지정하세요.
            .then(response => {
                // 특정 상품 찾기
                console.log('response',response)
                const product = response.data.products.find(p => p.id === orderId);
                setProducts(product ? [product] : []);
            })
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    console.log('products',products)

    const handlePayment = () => {
        if (products.length > 0) {
            const product = products[0];
            window.AUTHNICE.requestPay({
                clientId: 'S2_af4543a0be4d49a98122e01ec2059a56',
                method: 'card',
                orderId: product.orderId,
                amount: product.amount,
                goodsName: product.goodsName,
                returnUrl: 'http://localhost:3000/serverAuth',
                fnError: function (result) {
                    console.log('result', result);
                    alert('개발자확인용 : ' + result);
                }
            });
        } else {
            console.log('상품 정보가 없습니다.');
        }
    };
    

    return (
        <PaymentContainer>
            <PaymentHeader>
                <PaymentTitleText>결제하기</PaymentTitleText>
                {/* <img src={closeIcon} /> */}
            </PaymentHeader>

            {products.map(product => (
                <React.Fragment key={product.id}>
            <PaymentContent>
                <PaymentContentTitle>상품</PaymentContentTitle>
        
                    <PaymentContentText>{product.centerName}</PaymentContentText>
         
                <PaymentFlex>
                    <PaymentContentText>{product.goodsName}</PaymentContentText>
                    <PaymentPriceText>{product.amount.toLocaleString()}원</PaymentPriceText>
                </PaymentFlex>
     
                    <PaymentDateText>{product.date}</PaymentDateText>

            </PaymentContent>

            <BorderLine />

            <PaymentContent>
                <PaymentContentTitle>구매 정보</PaymentContentTitle>
             
                <PaymentFlex>
                    <PaymentContentText>이름</PaymentContentText>
                    <PaymentContentText>{product.userName}</PaymentContentText>
                </PaymentFlex>
                <PaymentFlex>
                    <PaymentContentText>연락처</PaymentContentText>
                    <PaymentContentText>{product.userPhone}</PaymentContentText>
                </PaymentFlex>
            </PaymentContent>

            <BorderLine />


            {/* 총 결제 금액 */}
            <PaymentFlex>
                    <PaymentContentTitle>총 결제 금액</PaymentContentTitle>
                    <PaymentPriceText>{product.amount.toLocaleString()}원</PaymentPriceText>
            </PaymentFlex>

            </React.Fragment>
            ))}

            <BorderLine />

            {/* 결제 방법 */}
            <PaymentContent>
            <PaymentContentTitle>결제 방법</PaymentContentTitle>
            <CardBoxContainer>
                <CardBox>
                     <img src={cardIcon} />
                     <CardBoxText>카드</CardBoxText>
                </CardBox>
            </CardBoxContainer>

            </PaymentContent>


            {/* 무이자 할부 및 할인 혜택 확인 */}
            <SaleBox>
                <SaleBoxText>무이자 할부 및 할인 혜택 확인</SaleBoxText>
                <img src={caretleft} />
            </SaleBox>

            <CheckBoxContainer>
                <CheckBox />
                <CheckBoxText>[필수] 결제 서비스 이용 약관, 개인정보 처리 동의</CheckBoxText>
            </CheckBoxContainer>


            {/* 결제 버튼 */}
            <PaymentButton onClick={handlePayment}>결제하기</PaymentButton>

        </PaymentContainer>
    );
}

export default PaymentLink;


const PaymentContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center; 
    padding: 20px;
    box-sizing: border-box;
`

const PaymentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 40px;
`

const PaymentTitleText = styled.h1`
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 28px */
letter-spacing: -0.5px;
color:#1F1F1F;
`

const PaymentContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
`

const PaymentContentTitle = styled.h2`
    font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
letter-spacing: -0.4px;
color:#1F1F1F;
margin-bottom: 13px;
`

const PaymentFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
`

const PaymentSubFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    box-sizing: border-box;
`

const PaymentContentText = styled.h6`
margin-bottom: 6px;
color:#1F1F1F;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 22.4px */
letter-spacing: -0.4px;

`

const PaymentDateText = styled.p`
color:  #707070;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 22.4px */
letter-spacing: -0.35px;
`

const PaymentPriceText = styled.h2`
color: #000;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 22.4px */
letter-spacing: -0.4px;
`

const CardBoxContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const CardBox = styled.div`
    width: 110px;
    height: 110px;
    border: 1px solid #eee;
    background-color: #F6F6F6;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    margin-bottom: 12px;
    cursor: pointer;    
`

const CardBoxText = styled.h6`
color: #1F1F1F;
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 22.4px */
letter-spacing: -0.4px;
margin-top: 4px;
`

const BorderLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #eee;
    margin-top: 32px;
    margin-bottom: 36px;
`

// 무이자 할부
const SaleBox = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
padding: 12px;
box-sizing: border-box;
background-color: #F6F6F6;
cursor: pointer;
`

const SaleBoxText = styled.h6`
color: #707070;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 160%; /* 22.4px */
letter-spacing: -0.35px;
`

// 체크박스

const CheckBoxContainer = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
width: 100%;
margin-top: 16px;
margin-bottom: 40px;
cursor: pointer;    
`

const CheckBox = styled.div`
    width: 20px;
    height: 20px;
    border: 1px solid #eeeeee;
    background-color: #eee;
    border-radius: 4px;
    margin-right: 8px;
    text-decoration: none;
`

const CheckBoxText = styled.h6`
color: #707070;
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 160%; /* 22.4px */
letter-spacing: -0.35px;
 text-decoration: underline;
`

const PaymentButton = styled.button`
    width: 100%;
    height: 60px;
    border: none;
    border-radius: 90px;
    background-color: #EEEEEE;
    color: #B5B5B5;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 22.4px */
    letter-spacing: -0.4px;
    cursor: pointer;
    margin-bottom: 40px;
    &:hover {
        background-color: #1F1F1F;
        color: #fff;
    }
`