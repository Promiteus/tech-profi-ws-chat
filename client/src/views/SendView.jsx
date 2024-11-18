import {useState} from "react";


const SendView = ({onSend}) => {
    const [value, setValue] = useState('');

    const onEnter = (e) => {
        if  ((e.keyCode === 10 || e.keyCode === 13) && e.ctrlKey) {
            onSend(value);
            setValue('');
        }
    }


    return (
        <>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between my-2">
                    <input className="flex-grow-1" onKeyDown={onEnter} value={value} onChange={(e) => setValue(e.target.value)}/>
                    <button className="btn btn-outline-primary mx-1 p-1" onClick={() => {onSend(value); setValue('')}}>{'Отпрвить'}</button>
                </div>
            </div>
        </>
    );
}

export default SendView;