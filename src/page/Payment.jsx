import React from 'react';
import { useParams } from 'react-router-dom';

function Payment(props) {
    const { id } = useParams();

    // 아이디값에 따른 더미 데이터
    const dummyData = {
        '0': {
            title: '상품 A',
            description: '상품 A 설명 쌸라쌸라쌸랴 얄리리 얄랑',
            price:1004
        },
        '1': {
            title: '상품 B',
            description: '상품 B 설명 ㅋ쿠아다마으라킫',
            price:1000
        },
        '2': {
            title: '상품 C',
            description: '상품 C 설명 삐약삐약뱡ㅃ',
            price:7000
        },
        '3': {
            title: '상품 D',
            description: '상품 D 설명 끾링미림ㄴㅇ럄ㅇ낢낭ㄹ',
            price:3000
        }
    };


    const handlePaymentClick = () => {
        // 나이스페이 결제창 실행 스크립트
        window.AUTHNICE.requestPay({
            clientId: 'S2_af4543a0be4d49a98122e01ec2059a56',
            method: 'card',
            orderId: '유니크한-주문번호',
            amount: dummyData[id].price,
            goodsName: dummyData[id].title,
            returnUrl: 'http://localhost:3000/serverAuth',
            fnError: function (result) {
                alert('개발자확인용 : ' + result.errorMsg + '')
            }
        });
    };

    // 현재 id에 해당하는 데이터를 선택
    const currentData = dummyData[id] || {};

    return (
        <div>
            <h1>결제 페이지: {currentData.title}</h1>
            <hr />
            <p>가격 {currentData.price}원</p>
            <hr />
            <p> 설명 {currentData.description}</p>
            <hr />
            {/* <p>결제하기 버튼을 누르면 나이스페이 결제창이 실행됩니다.</p> */}

            <button onClick={handlePaymentClick}>결제하기</button>
        </div>
    );
}

export default Payment;
