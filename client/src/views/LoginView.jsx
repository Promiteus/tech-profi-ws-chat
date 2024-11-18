import {useState} from "react";


const LoginView = ({login}) => {
    const [value, setValue] = useState({login: '', room: ''});
    return (
       <div className="d-flex justify-content-center">
         <div className="d-flex flex-column  rounded p-4 border-1 border-dark border ">
             <h4 className="text-center">Вход</h4>
             <div className="d-flex justify-content-between align-items-center my-1">
                 <label className="mx-1">Логин</label>
                 <input placeholder="Имя пользователя" className="flex-grow-1" value={value.login} onChange={(e) => setValue({...value, login: e.target.value})}/>
             </div>
             <div className="d-flex justify-content-between align-items-center my-1">
                 <label className="mx-1">Комната</label>
                 <input placeholder="Комната" className="flex-grow-1" value={value.room} onChange={(e) => setValue({...value, room: e.target.value})}/>
             </div>
             <button className="btn btn-outline-primary mx-1 my-2 p-1" onClick={() => login(value)}>Войти</button>
         </div>
       </div>
    );
}

export default LoginView;