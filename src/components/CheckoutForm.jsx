import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { convertFormToObj } from '../util/PaymentObj';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {

  const navigate = useNavigate();
  const formRef = useRef();
  const [payStatus, setPayStatus] = useState(false);
  // const { form, setForm } = useState({}); 

// useEffect(() => {
//     setTimeout(function(){
//     nicepayStart();
// }, 2000);
// }, []); 


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
    setPayStatus(true);
    document.payForm.submit();
    navigate("/payment/complete")
  }

  function nicepayClose(){
    alert("결제를 다시 시도해주세요");
    setPayStatus(false);
  }

  const sendPaymentResult = async () => {
    // const body = convertFormToObj(formRef.current);
    // body.success = success;
    // if (success) {
      // window.deleteLayer();
      navigate("/payment/complete")
    // }
  };

  useEffect(() => {
      // PC 결제창 진입
      if (typeof window !== "undefined") {
        window.nicepaySubmit = nicepaySubmit;
        window.nicepayClose = nicepayClose;
        // window.goPay(formRef.current);
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
    <Container>
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
      <ButtonWrap>
        <Button onClick={() => nicepayStart()}> 결제하기 !@!@!</Button>
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
