const name = document.getElementById('text-input1');
const breed = document.getElementById('text-input2');
const time = document.getElementById('time-input');
const packageType = document.getElementById('dropdown');
const returningCustomerCheckbox = document.getElementById('returning-customer');

const addAppointment = event => {
    event.preventDefault(); 
    
    let body = {
        name: name.value,
        time: time.value,
        breed: breed.value,
        package: packageType.value,
        returningCustomer: returningCustomerCheckbox.checked ? 'true' : 'false'
    };
    
    axios.post('http://localhost:4545/api/scheduleAppointment', body)
        .then(response => {
            const appointmentId = response.data[0].appointment_id; 
            alert(`Appointment scheduled. Appointment ID: ${appointmentId}`);
            console.log('Appointment added:', response.data);
        })
        .catch(error => {
            console.error('Error adding appointment:', error);
        });
};

document.getElementById('submmitbtn').addEventListener('click', addAppointment);




