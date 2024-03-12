const editAppointment = () => {
    const appointmentId = document.getElementById('edit-appointment-id').value;

    axios.get(`http://localhost:4545/api/appointments/${appointmentId}`)
        .then(response => {
            const appointment = response.data;
            if (appointment) {
                
                document.getElementById('edit-text-input1').value = appointment.appointment_name;
                document.getElementById('edit-text-input2').value = appointment.breed;
                document.getElementById('edit-time-input').value = appointment.time;
                document.getElementById('edit-dropdown').value = appointment.package_type;
                document.getElementById('edit-returning-customer').checked = appointment.returning_customer;

                
                document.querySelector('.edit-form').style.display = 'block';

                
                alert(`Appointment loaded for editing. ID: ${appointmentId}`);
            } else {
                alert(`No appointment found with ID: ${appointmentId}`);
            }
        })
        .catch(error => {
            console.error('Error retrieving appointment:', error);
            alert(`Error retrieving appointment with ID: ${appointmentId}`);
        });
};

document.getElementById('edit-appointment-btn').addEventListener('click', editAppointment);

const saveChanges = () => {
    const appointmentId = document.getElementById('edit-appointment-id').value;
    const name = document.getElementById('edit-text-input1').value;
    const breed = document.getElementById('edit-text-input2').value;
    const time = document.getElementById('edit-time-input').value;
    const packageType = document.getElementById('edit-dropdown').value;
    const returningCustomer = document.getElementById('edit-returning-customer').checked;

    let body = {
        name: name,
        time: time,
        breed: breed,
        package: packageType,
        returningCustomer: returningCustomer ? 'true' : 'false'
    };

    axios.put(`http://localhost:4545/api/appointments/${appointmentId}`, body)
        .then(response => {
            console.log('Appointment updated:', response.data);
            alert('Appointment updated successfully.');
        })
        .catch(error => {
            console.error('Error updating appointment:', error);
            alert('Error updating appointment.');
        });
};

document.getElementById('edit-save-btn').addEventListener('click', saveChanges);