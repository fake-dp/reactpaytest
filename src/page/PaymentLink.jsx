import styled from 'styled-components';
// import closeIcon from '../img/close.svg';

import cardIcon from '../img/creditcard.svg';
import caretleft from '../img/caretleft.svg';
import React, { useEffect, useState,useRef } from 'react';
import {getPaymentUserInfo,postPaymentLink} from '../api/paymentApi';
import { useLocation } from 'react-router-dom';
import {formatPhoneNumber,formatDate} from '../util/CustomFn';
import { format } from 'date-fns';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

function PaymentLink(props) {

    const navigate = useNavigate();
    const formRef = useRef();
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [paymentData, setPaymentData] = useState([]);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
// 나중에 환경 변수 하기 
const merchantKey = "K/Yp1YrgMPr2FwvMo7Pzvr6F8zhEZpfvrYduZw1U5LXa7LzBUsnii1hnhcWaeIffKCjFjvrotzWAIyBc4+sMPw==";
const merchantID = "fittest01m";

const ediDate = format(new Date(), 'yyyyMMddHHmmss');
const amt = paymentData?.tickets?.reduce((total, ticket) => total + ticket.price, 0)||0;
// const amt = 2000;

// 이부분 뭘까
const returnURL = isMobile ? 'https://webapi.nicepay.co.kr/webapi/pay_process.jsp':'http://localhost:3000/payment/complete';
// const returnURL = 'http://localhost:8080/test';
const goodsName = paymentData?.goodsName; 
const moid = 'nice_api_test_3.0';
const signData = getSignData(ediDate + merchantID + amt + merchantKey).toString()

    



    useEffect(() => {
        detectDeviceAndAssignMethods(isMobile);
        getUserPayInfoData();
    }
    , []);

        // 디바이스를 감지하고, 적절한 결제창 함수들을 window 객체에 할당하는 함수
        function detectDeviceAndAssignMethods(isMobile) {
            
            if (isMobile) {
                // 모바일 환경의 경우
                formRef.current.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
                formRef.current.acceptCharset = "euc-kr";
                // formRef.current.submit();
            } else {
                // PC 환경의 경우
                window.nicepaySubmit = nicepaySubmit;
                window.nicepayClose = nicepayClose;
                // window.goPay(formRef.current);
            }
        }

// 사용자 결제 정보를 가져오는 함수입니다.
    const getUserPayInfoData = async () => {
        try {
            const response = await getPaymentUserInfo(id);
            setPaymentData(response); // 결제 데이터 상태 업데이트
        } catch (e) {
            alert(`결제 정보를 가져오는 중 오류가 발생했습니다: ${e.message}`);
            console.error('결제 정보 가져오기 실패:', e);
        }
    };

    const handlePostPaymentLink = async (data) => {
        const failureMessage = '결제가 실패되었습니다.';
        try {
            const response = await postPaymentLink(data);
            if (response) {
                alert('결제가 완료되었습니다.');
                console.log('결제 성공:', response);

            } else {
                alert(failureMessage);
                console.error('결제 실패:', response);

            }
        } catch (error) {
            alert(failureMessage);
            console.error('결제 처리 중 오류 발생:', error);

        }
    };


    function getSignData(str) {
        var encrypted = CryptoJS.SHA256(str);
        return encrypted;
    }
    
      
      function nicepayStart() {
        // NicePay 결제 시작
        if (window.goPay) {
          window.goPay(document.payForm);
        //   console.log('document.payForm',document.payForm)
        } else {
          console.error('나이스페이 에러.');
        }
      }

      function nicepayClose(){
        alert("결제를 다시 시도해주세요");
    }

    
      function nicepaySubmit(){
        // console.log('결과값',document.payForm)
        document.payForm.submit();
        if(document.payForm.AuthResultCode.value == '0000'){
            const linkData = {
                id: id,
                authInfo:{
                    authToken: document.payForm.AuthToken.value,
                    amount: document.payForm.Amt.value,
                    tid: document.payForm.TxTid.value,
                }
            }
            // handlePostPaymentLink(linkData);
        }else{
            console.log('결제실패')
            alert("결제를 다시 시도해주세요");
        }
}


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
        
                    <PaymentContentText>{paymentData.goodsName} {paymentData?.tickets?.length >= 2 && `(${paymentData?.tickets?.length})`}</PaymentContentText>
                        {
                            paymentData?.tickets?.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                    <PaymentFlex>
                                        <PaymentContentText>{item.centerName}</PaymentContentText>
                                        <PaymentPriceText>{item.price.toLocaleString()}원</PaymentPriceText>
                                    </PaymentFlex>
                                      <PaymentDateText>{formatDate(item.startDate)}~{formatDate(item.endDate)}</PaymentDateText>
                                    </React.Fragment>
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
        acceptCharset="euc-kr">
        <input type="" name="GoodsName" value={goodsName}/>
        <input type="" name="Amt" value={amt}/>
        <input type="" name="MID" value={merchantID}/>
        <input type="" name="EdiDate" value={ediDate}/>
        <input type="" name="Moid" value={moid}/>
        <input type="" name="SignData" value={signData}/>
        <input type="" name="PayMethod" value="CARD"/>
        <input type="" name="ReturnURL" value={returnURL}/>
      </form>
        </PaymentContainer>
    );
}

export default PaymentLink;


const PaymentForm = styled.form`
`

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
