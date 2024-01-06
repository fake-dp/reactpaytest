import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { convertFormToObj } from '../util/PaymentObj';
import CryptoJS from 'crypto-js';

const CheckoutForm = () => {
  const formRef = useRef();

  useEffect(() => {

    const script = document.createElement('script');
    script.src = 'https://pg-web.nicepay.co.kr/v3/common/js/nicepay-pgweb.js';
    script.async = true;
    document.head.appendChild(script);
    // NicePay 초기화 코드 (예시)
    
    script.onload = () => {
   
      };

    return () => {
      // 컴포넌트가 언마운트될 때 NicePay 정리 작업 수행
      // 예: NicePay 라이브러리에서 제공하는 정리 함수 호출
      // nicepayCleanup();
    };
  }, []); // useEffect는 최초 렌더링 시에만 실행


// 3초뒤에 nicepayStart(); 호출
// setTimeout(function(){
//     nicepayStart();
// }, 3000);

useEffect(() => {
    setTimeout(function(){
    nicepayStart();
}, 3000);
}, []); 


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
//   const sendPaymentResult = async () => {
//     const body = convertFormToObj(formRef.current);
//     body.success = success;

//     if (success) {
//       window.deleteLayer();
//       router.push("/payment/complete")
//     }
//   };
//   //[PC 결제창 전용]결제 최종 요청시 실행됩니다. <<'nicepaySubmit()' 이름 수정 불가능>>
// function nicepaySubmit(){
// 	document.payForm.submit();
// }

// //[PC 결제창 전용]결제창 종료 함수 <<'nicepayClose()' 이름 수정 불가능>>
// function nicepayClose(){
// 	alert("결제가 취소 되었습니다");
// }

  const ediDate = format(new Date(), 'yyyyMMddHHmmss');
  const amt = '1250';
  const returnURL = 'http://localhost:8080/authReq';
  const goodsName = "나이스상품";
  const moid = 'nice_api_test_3.0';
  const merchantKey = "EYzu8jGGMfqaDEp76gSckuvnaHHu+bC4opsSN6lHv3b2lurNYkVXrZ7Z1AoqQnXI3eLuaUFyoRNC6FkrzVjceg==";
  const merchantID = "nicepay00m";
  const signData = getSignData(ediDate + merchantID + amt + merchantKey).toString()




  return (
    <Container>
      <form
        name="payForm"
        method="post"
        action="http://localhost:8080/authReq"
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
      <ButtonWrap>
        <Button onClick={() => nicepayStart()}> 결제하기 @!@</Button>
      </ButtonWrap>
    </Container>
  );
};

export default CheckoutForm;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12rem;
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Button = styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
`;
