import React, { useEffect, useState } from 'react';

function TestData(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const handleEvent = (event) => {
            try {
                // 여기서 event.data에는 React Native에서 보낸 데이터가 포함되어 있습니다.
                const data = event.data;
                console.log('React Native로부터 받은 데이터: ', data);
                setData(data);
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
        <div>
        웹뷰 데이터 받아오기 test!!!!

            <div>
                <p>{data}</p>
                {/* <p>paymentInfoData: {data.paymentInfoData}</p> */}
                {/* <p>totalPrice: {data.totalPrice}</p> */}
                {/* <p>goodsName: {data.goodsName}</p> */}
            </div>

    </div>
    );
}

export default TestData;
