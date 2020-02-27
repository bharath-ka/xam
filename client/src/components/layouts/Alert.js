import React from 'react';
import { useSelector } from 'react-redux';
import { Alert as Alrt } from 'react-bootstrap';

const Alert = () => {
    const alerts = useSelector(state => state.alert)
    return (
        alerts !== null && alerts.length > 0 && alerts.map(alert => (
            <Alrt style={{ marginTop: "10px" }} key={alert.id} variant={alert.alertType}>
                {alert.msg}
            </Alrt>
        ))
    )
}

export default Alert;
