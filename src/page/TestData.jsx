import React, { useEffect, useState } from 'react';

function TestData(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const handleEvent = (event) => {
            // 여기서 event.data에는 React Native에서 보낸 데이터가 포함되어 있습니다.
            const data = event.data;
            console.log('React Native로부터 받은 데이터: ', data);
            setData(data);
        };

        window.addEventListener('message', handleEvent);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            window.removeEventListener('message', handleEvent);
        };
    }, []);

    return (
        <div>
            웹뷰 데이터 받아오기 test {data}
        </div>
    );
}

export default TestData;
