import React from 'react';
import styled from 'styled-components';
import closeIcon from '../img/close.svg';
import cardIcon from '../img/creditcard.svg';
import caretleft from '../img/caretleft.svg';


function PaymentLink(props) {
    return (
        <PaymentContainer>
            <PaymentHeader>
                <PaymentTitleText>결제하기</PaymentTitleText>
                <img src={closeIcon} />
            </PaymentHeader>


            <PaymentContent>
                <PaymentContentTitle>상품</PaymentContentTitle>
        
                    <PaymentContentText>에이블짐 노원본점</PaymentContentText>
         
                <PaymentFlex>
                    <PaymentContentText>[브이 트레이너] 1:1 PT 20회</PaymentContentText>
                    <PaymentPriceText>60,000원</PaymentPriceText>
                </PaymentFlex>
     
                    <PaymentDateText>2023.06.01 ~ 2023.10.10</PaymentDateText>

            </PaymentContent>

            <BorderLine />

            <PaymentContent>
                <PaymentContentTitle>구매 정보</PaymentContentTitle>
             
                <PaymentFlex>
                    <PaymentContentText>이름</PaymentContentText>
                    <PaymentContentText>남주혁</PaymentContentText>
                </PaymentFlex>
                <PaymentFlex>
                    <PaymentContentText>연락처</PaymentContentText>
                    <PaymentContentText>010-1234-1234</PaymentContentText>
                </PaymentFlex>
            </PaymentContent>

            <BorderLine />


            {/* 총 결제 금액 */}
            <PaymentFlex>
                    <PaymentContentTitle>총 결제 금액</PaymentContentTitle>
                    <PaymentPriceText>60,000원</PaymentPriceText>
            </PaymentFlex>

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
            <PaymentButton>결제하기</PaymentButton>

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