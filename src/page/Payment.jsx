import React, { useEffect, useState, useRef } from 'react';
import CryptoJS from 'crypto-js';
import { format } from 'date-fns';

const Payment = () => {
  const merchantKey = "K/Yp1YrgMPr2FwvMo7Pzvr6F8zhEZpfvrYduZw1U5LXa7LzBUsnii1hnhcWaeIffKCjFjvrotzWAIyBc4+sMPw==";
  const merchantID = "fittest01m";
  const ediDate = format(new Date(), 'yyyyMMddHHmmss');
  const amt = 1005;
  const returnURL = 'http://localhost:8080/test';
  const goodsName = 'test';
  const moid = 'nice_api_test_3.0';
  const signData = getSignData(ediDate + merchantID + amt + merchantKey).toString();

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const [formData, setFormData] = useState({
    merchantKey,
    merchantID,
    ediDate,
    goodsName,
    amt,
    moid,
    signData,
  });

  const formRef = useRef(null);

//   const handlePaymentRequest = async () => {
//     window.goPay(formRef.current);
// };

  useEffect(() => {
    detectDeviceAndAssignMethods(isMobile);
  }, []);


  function detectDeviceAndAssignMethods(isMobile) {
    if (isMobile) {
      // 모바일 환경의 경우
      formRef.current.action = "https://web.nicepay.co.kr/v3/v3Payment.jsp";
      formRef.current.acceptCharset = "euc-kr";
      formRef.current.submit();
    } else {
      // PC 환경의 경우
      window.nicepaySubmit = nicepaySubmit;
      window.nicepayClose = nicepayClose;
      window.goPay(formRef.current);
    }
  }

  function getSignData(str) {
    var encrypted = CryptoJS.SHA256(str);
    return encrypted;
  }

  //It is executed when call payment window.
//   function nicepayStart() {
//     window.goPay(formRef.current);
//   }

  //[PC Only]When pc payment window is closed, nicepay-pgweb.js call back nicepaySubmit() function <<'nicepaySubmit()' DO NOT CHANGE>>
  function nicepaySubmit() {
    formRef.current.submit();
  }

  //[PC Only]payment window close function <<'nicepayClose()' DO NOT CHANGE>>
  function nicepayClose() {
    alert("결제가 취소 되었습니다");
  }

  return (
    <div>
      <form
        name="payForm"
        method="post"
        action={returnURL}
        ref={formRef}
        acceptCharset="euc-kr">
          <input type="hidden" name="GoodsName" value={formData.goodsName}/>
        <input type="hidden" name="Amt" value={formData.amt}/>
        <input type="hidden" name="MID" value={formData.merchantID}/>
        <input type="hidden" name="EdiDate" value={formData.ediDate}/>
        <input type="hidden" name="Moid" value={formData.moid}/>
        <input type="hidden" name="SignData" value={formData.signData}/>
        <input type="hidden" name="PayMethod" value="CARD"/>
        <input type="hidden" name="ReturnURL" value={formData.returnURL}/>
      </form>

      {/* <button onClick={handlePaymentRequest}>REQUEST</button> */}
    </div>
  );
};

export default Payment;
