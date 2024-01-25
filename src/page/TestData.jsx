import React, { useEffect, useState } from 'react';

function TestData(props) {
    const [test, setTest] = useState(null);

    useEffect(() => {
        const handleEvent = (event) => {
            try {
                // 여기서 event.data에는 React Native에서 보낸 데이터가 포함되어 있습니다.
                const data = event.data;
  
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
                        <p>test: {test}</p>
                    </>
                
            
        </div>
        </>
    );
}

export default TestData;
