import React, { useEffect, useState } from 'react';
import axios from 'axios';


function TestPayment() {
  const [products, setProducts] = useState([]);

  const [isServerConnected, setIsServerConnected] = useState(false);

  useEffect(() => {
    // 서버 연결 확인 요청을 보냅니다.
    axios.get('http://localhost:8080/test')
      .then(response => {
        // 서버로부터의 응답을 받아와 연결 여부를 설정합니다.
        setIsServerConnected(true);
      })
      .catch(error => {
        console.error('서버 연결에 실패했습니다.', error);
        setIsServerConnected(false);
      });
  }, []); 

  useEffect(() => {
    // 예제를 위해 간단하게 상품 정보 설정
    const product = {
      orderId: 'exampleOrderId',
      amount: 1000,
      goodsName: '테스트상품',
    };
    setProducts([product]);
  }, []);

  const goPay = (formObject) => {
    // nicepay-pgweb.js의 goPay 함수 호출
    window.goPay(formObject);
  };

  const nicepaySubmit = (formObject) => {
    // 인증 결과를 확인하고 승인 API를 호출하는 로직
    // 해당 로직은 서버 측에서 처리되어야 합니다.
    // 서버로의 요청은 예를 들어 axios 등을 사용하여 처리 가능합니다.
    // 서버 측 로직에서는 nicepaySubmit을 통해 전달된 formObject를 이용하여 필요한 데이터를 처리합니다.
  };

  const handlePayment = () => {
    if (products.length > 0) {
      const product = products[0];
      
      // goPay 함수를 호출하여 결제창을 열기
      goPay(document.yourFormObject);
    } else {
      console.log('상품 정보가 없습니다.');
    }
  };

  return (
    <div>
      <div>
        {/* ... (이전 코드 생략) */}
      </div>
      {isServerConnected
        ? <p>서버와의 연결이 확인되었습니다.</p>
        : <p>서버와의 연결에 실패했습니다.</p>
      }
      {/* 결제 버튼 */}
      <button onClick={handlePayment}>결제하기</button>
    </div>
  );
}

export default TestPayment;
