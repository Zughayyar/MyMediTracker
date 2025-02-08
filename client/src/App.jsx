import 'normalize.css'
import {Navigate, Route, Routes} from "react-router-dom";
import AdminDashboard from "./views/AdminDashboard.jsx";
import Login from "./components/users/Login.jsx";
import PractitionerDashboard from './views/PractitionerDashboard.jsx';
import '@ant-design/v5-patch-for-react-19';
import UsersList from "./components/users/UsersList.jsx";
import AdminHome from "./components/admin/AdminHome.jsx";
import UserForm from "./components/users/UserForm.jsx";

const App = () => {
    return (
        <div>
            <Routes>
                {/*Landing Page Routes*/}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login/>} />

                {/*Admin Dashboard Routes*/}
                <Route path="/adminDashboard" element={<AdminDashboard/>}>
                    <Route index path="home" element={<AdminHome/>} />
                    <Route path="users" element={<UsersList/>} />
                    <Route path="addUser" element={<UserForm/>} />
                    <Route path="editUser/:id" element={<UserForm/>} />
                </Route>

                {/*Practitioner Dashboard Routes*/}
                <Route path='/practDashboard' element={<PractitionerDashboard/>} />

                <Route />
            </Routes>
        </div>
    )
}

export default App