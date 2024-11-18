import './App.css';
import AppLayout from "./views/layouts/AppLayout";
import AppRouter from "./views/layouts/AppRouter";

function App() {
    return (
       <AppLayout>
           <AppRouter/>
       </AppLayout>
    );
}

export default App;
