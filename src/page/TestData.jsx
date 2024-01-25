import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function TestData(props) {
    const [test, setTest] = useState(null);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const goodsName = queryParams.get('goodsName');
    const totalPrice = queryParams.get('totalPrice');

    useEffect(() => {
        const handleEvent = (event) => {
            try {
                // 여기서 event.data에는 React Native에서 보낸 데이터가 포함되어 있습니다.
                // const data = event.data?.paymentInfoData;
                const data = JSON.parse(event.data.paymentInfoData);
                setTest(data);
            } catch(error) {
                console.log('Received data is not valid JSON: ', event.data);
            }
        };

        window.addEventListener('message', handleEvent);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener('message', handleEvent);
        };
    }, []);

    return (
        <>
        <div>
                <h1>웹뷰 데이터 받아오기 @@#!</h1>
        </div>
        <div>
            
             
                    <>
                        <p>test: {test.paymentInfoData}</p>
                        <p>
                            <span>goodsName: {goodsName}</span>
                            <span>totalPrice: {totalPrice}</span>
                        </p>
                    </>
                
            
        </div>
        </>
    );
}

export default TestData;
