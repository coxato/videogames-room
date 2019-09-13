import React from 'react';
// components
// import AdminGeneral from "../containers/generalAdmin"; 
import AdminEvents from '../containers/eventosAdmin';
// minimun change

function AdminPage(){
    return(
        <section>
            {/* <AdminGeneral /> */}
            <AdminEvents />
        </section>
    )
}

export default AdminPage;