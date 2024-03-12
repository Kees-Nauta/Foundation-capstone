
function displayAppointments() {
    axios.get('http://localhost:4545/api/get-appointments')
        .then(response => {
            const appointments = response.data;
            const appointmentList = document.getElementById('appointment-list');
            appointmentList.innerHTML = '';

            appointments.forEach(appointment => {
                const listItem = document.createElement('li');
                const detailsContainer = document.createElement('div');
                detailsContainer.classList.add('appointment-details');

                const nameLabel = document.createElement('div');
                nameLabel.textContent = `Name: ${appointment.appointment_name}`;
                detailsContainer.appendChild(nameLabel);

                const timeLabel = document.createElement('div');
                timeLabel.textContent = `Time: ${appointment.time}`;
                detailsContainer.appendChild(timeLabel);

                const packageLabel = document.createElement('div');
                packageLabel.textContent = `Package: ${appointment.package_type}`;
                detailsContainer.appendChild(packageLabel);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', () => {
                    deleteAppointment(appointment.appointment_id); 
                });

                listItem.appendChild(detailsContainer);
                listItem.appendChild(deleteButton);
                appointmentList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching appointments:', error);
        });
}

function deleteAppointment(appointmentId) {
    axios.delete(`http://localhost:4545/api/delete-appointment/${appointmentId}`)
        .then(response => {
            displayAppointments();
        })
        .catch(error => {
            console.error('Error deleting appointment:', error);
        });
}

document.addEventListener('DOMContentLoaded', displayAppointments);