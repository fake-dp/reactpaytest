import styled from 'styled-components';
import closeIcon from '../img/close.svg';

import cardIcon from '../img/creditcard.svg';
import caretleft from '../img/caretleft.svg';
import React, { useEffect, useState,useRef } from 'react';
import {getPaymentUserInfo} from '../api/paymentApi';
import { useLocation } from 'react-router-dom';
import {formatPhoneNumber,formatDate} from '../util/CustomFn';

import { format } from 'date-fns';
import { convertFormToObj } from '../util/PaymentObj';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

function PaymentLink(props) {
    const navigate = useNavigate();
    const formRef = useRef();
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [paymentData, setPaymentData] = useState([]);

    console.log(id); // 아이디 출력

    const getUserPayInfoData = async () => {
        try{
            const response = await getPaymentUserInfo(id);
            // console.log(response);
            setPaymentData(response);
        } catch (e) {
            // console.log(e);
            alert('결제 정보를 불러오는데 실패했습니다.');
        }
    }

    useEffect(() => {
        getUserPayInfoData();
    }
    , []);




    function getSignData(str) {
        var encrypted = CryptoJS.SHA256(str);
        return encrypted;
    }
    
      
      function nicepayStart() {
        // NicePay 결제 시작
        if (window.goPay) {
          window.goPay(document.payForm);
        } else {
          console.error('NicePay library not loaded.');
        }
      }
    
      function nicepaySubmit(){
        console.log("nicepaySubmit")
        document.payForm.submit();
        navigate("/payment/complete")
      }
    
      function nicepayClose(){
        alert("결제를 다시 시도해주세요");
      }


  useEffect(() => {
    // PC 결제창 진입
    if (typeof window !== "undefined") {
      window.nicepaySubmit = nicepaySubmit;
      window.nicepayClose = nicepayClose;
      console.log('dnlseh윈도우',window.nicepaySubmit)
    }
}, []);


const ediDate = format(new Date(), 'yyyyMMddHHmmss');
const amt = '1200';
const returnURL = 'http://localhost:8080/authReq';
// const returnURL = 'http://localhost:3000/payment/complete';
// const returnURL = 'http://27.96.135.229:8080/api/members/v1/tickets/payment';
const goodsName = "나이스상품";
const moid = 'nice_api_test_3.0';
const merchantKey = "K/Yp1YrgMPr2FwvMo7Pzvr6F8zhEZpfvrYduZw1U5LXa7LzBUsnii1hnhcWaeIffKCjFjvrotzWAIyBc4+sMPw==";
const merchantID = "fittest01m";
//   const merchantKey = "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";
// const merchantID = "nicepay00m";
const signData = getSignData(ediDate + merchantID + amt + merchantKey).toString()


    return (
        <PaymentContainer>
            <PaymentHeader>
                <PaymentTitleText>결제하기</PaymentTitleText>
                {/* <img src={closeIcon} /> */}
            </PaymentHeader>
                {
                    paymentData&& paymentData && (
         
                <React.Fragment >
            <PaymentContent>
                <PaymentContentTitle>상품</PaymentContentTitle>
        
                    <PaymentContentText>{paymentData.goodsName}</PaymentContentText>
                        {
                            paymentData?.tickets?.map((item, index) => {
                                return (
                                    <>
                                    <PaymentFlex key={index}>
                                        <PaymentContentText>{item.centerName}</PaymentContentText>
                                        <PaymentPriceText>{item.price.toLocaleString()}원</PaymentPriceText>
                                    </PaymentFlex>
                                      <PaymentDateText>{formatDate(item.startDate)}~{formatDate(item.endDate)}</PaymentDateText>
                                    </>
                                )
                               }
                            )
                        }
            </PaymentContent>

            <BorderLine />

            <PaymentContent>
                <PaymentContentTitle>구매 정보</PaymentContentTitle>
             
                <PaymentFlex>
                    <PaymentContentText>이름</PaymentContentText>
                    <PaymentContentText>{paymentData.member?.name}</PaymentContentText>
                </PaymentFlex>
                <PaymentFlex>
                    <PaymentContentText>연락처</PaymentContentText>
                    <PaymentContentText>{formatPhoneNumber(paymentData.member?.phone)}</PaymentContentText>
                </PaymentFlex>
           
            </PaymentContent>

            <BorderLine />


            {/* 총 결제 금액 */}
            <PaymentFlex>
                    <PaymentContentTitle>총 결제 금액</PaymentContentTitle>
                    <PaymentPriceText>
                    {paymentData?.tickets?.reduce((total, ticket) => total + ticket.price, 0).toLocaleString()}원
                    </PaymentPriceText>
            </PaymentFlex>

            </React.Fragment>
  
            )}
                

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
            <PaymentButton onClick={() => nicepayStart()}>결제하기</PaymentButton>


        {/* 결제 정보 하이드 */}
        <form
        name="payForm"
        method="post"
        action={returnURL}
        ref={formRef}
        acceptCharset="euc-kr"
      >
        <input type="hidden" name="GoodsName" value={goodsName}/>
        <input type="hidden" name="Amt" value={amt}/>
        <input type="hidden" name="MID" value={merchantID}/>
        <input type="hidden" name="EdiDate" value={ediDate}/>
        <input type="hidden" name="Moid" value={moid}/>
        <input type="hidden" name="SignData" value={signData}/>
        <input type="hidden" name="PayMethod" value="CARD"/>
        <input type="hidden" name="ReturnURL" value={returnURL}/>
      </form>

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