import axios from 'axios'

const Forgot = ()=>{

const resetPassword = async (email) => {
    try {
        const response = await fetch('http://127.0.0.1:8000/api/resetpassword/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleSubmit = () =>{


var email = document.querySelector('.forgot').value
resetPassword(email);

}


    return(
    <>
        <input type="email" name="forgot" className="forgot" placeholder="Email" required />
        <button onClick={handleSubmit}>Submit</button>
    </>
    )
};


export default Forgot;