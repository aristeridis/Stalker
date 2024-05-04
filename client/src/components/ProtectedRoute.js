import React, { useEffect, useState } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { message } from 'antd';
//import { message } from 'statuses';

function ProtectedRoute({ children }) {
    const [user, setUser] = useState(null);
    const getCurrentUser = async () => {
        try {
            const response = await GetCurrentUser();
            if (response.success) {
                setUser(response.data);
            } else {
                setUser(null);
                message.error(response.message);
            }
        } catch (error) {
            setUser(null);
            message.error(error.message);
        }
    }
    useEffect(() => {
        getCurrentUser();
    }, [])
    return (
       user&& <div>
        {user.name}
        {children}</div>
    )
}

export default ProtectedRoute