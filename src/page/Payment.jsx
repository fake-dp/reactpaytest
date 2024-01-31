import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { format } from 'date-fns';

const Payment = () => {
 
  const [paymentData, setPaymentData] = useState(null);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const goodsNameParams = queryParams.get('goodsName');
  const totalPrice = queryParams.get('totalPrice');
  const memberTicketId = queryParams.get('memberTicketId');

  const merchantKey = "K/Yp1YrgMPr2FwvMo7Pzvr6F8zhEZpfvrYduZw1U5LXa7LzBUsnii1hnhcWaeIffKCjFjvrotzWAIyBc4+sMPw==";
  const merchantID = "fittest01m";
  const ediDate = format(new Date(), 'yyyyMMddHHmmss');
  const amt = totalPrice;
  // feturnurl을 어떻게 활용해야하는지 모르겠음
  // const returnURL = 'https://www.noteggdev.co.kr/payResult_utf.jsp';
  const returnURL = `http://27.96.135.229:8080/api/members/v2/tickets/${memberTicketId}/payment`;
    // const returnURL = 'https://www.noteggdev.co.kr/payResult_utf.jsp';
  const goodsName = goodsNameParams;
  const moid = 'nice_api_test_3.0';
  const signData = getSignData(ediDate + merchantID + amt + merchantKey).toString();
  const formRef = useRef(null);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
      const handleEvent = (event) => {
          try {
              const data = event.data;
              setPaymentData(data);
          } catch(error) {
              console.log('Received data is not valid JSON: ', event.data);
          }
      };

      window.addEventListener('message', handleEvent);
      return () => {
          window.removeEventListener('message', handleEvent);
      };
  }, []);




  useEffect(() => {
    detectDeviceAndAssignMethods(isMobile);
  }, []);


  function detectDeviceAndAssignMethods(isMobile) {
    if (isMobile) {
      // 모바일 환경의 경우
      formRef.current.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
      formRef.current.acceptCharset = "euc-kr";
      // formRef.current.submit();
    }else{

      window.nicepayClose = nicepayClose;
      window.nicepaySubmit = nicepaySubmit;
      window.goPay(formRef.current);
    }
    }

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

  function nicepaySubmit(){
    // console.log('결과값',document.payForm)
    document.payForm.submit();
}

  function nicepayClose(){
    alert("결제를 다시 시도해주세요");
}

  return (
    <div>
      {
        memberTicketId
      }
      <form
        name="payForm"
        method="post"
        action={returnURL}
        ref={formRef}
        acceptCharset="euc-kr">
          <input type="hidden" name="GoodsName" value={goodsName}/>
        <input type="hidden" name="Amt" value={amt}/>
        <input type="hidden" name="MID" value={merchantID}/>
        <input type="hidden" name="EdiDate" value={ediDate}/>
        <input type="hidden" name="Moid" value={moid}/>
        <input type="hidden" name="SignData" value={signData}/>
        <input type="hidden" name="PayMethod" value="CARD"/>
        <input type="hidden" name="ReturnURL" value={returnURL}/>
      </form>
    </div>
  );
};

export default Payment;
