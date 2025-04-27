import { ISpinWheelProps, SpinWheel } from 'spin-wheel-game';
export const MySpinWheel = () => {

    const segments = [
        { segmentText: 'Option 1', segColor: 'red' },
        { segmentText: 'Option 2', segColor: 'blue' },
        { segmentText: 'Option 3', segColor: 'green' },
        // Add more segments as needed
    ];

    const handleSpinFinish = (result: string) => {
        console.log(`Spun to: ${result}`);
        // Handle the result as needed
    };

    const spinWheelProps: ISpinWheelProps = {
        segments,
        onFinished: handleSpinFinish,
        primaryColor: 'black',
        contrastColor: 'white',
        buttonText: 'Spin',
        isOnlyOnce: false,
        size: 290,
        upDuration: 100,
        downDuration: 600,
        fontFamily: 'Arial',
        arrowLocation: 'top',
        showTextOnSpin: true,
        isSpinSound: true,
    };

    return (
        <div className='mx-auto mt-4'>
            <h4>請選擇5-10家餐廳作為輪盤選項</h4>

            <SpinWheel {...spinWheelProps} />
        </div >
    );

};