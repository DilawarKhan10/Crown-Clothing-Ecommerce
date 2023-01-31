import { useState} from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../routes/utils/firebase/firebase";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart, signUpSuccess } from "../../store/user/user.action";
import './sign-up.style.scss'



const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () =>{
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

        if (password !== confirmPassword){
            alert("Password do not match")
            return;
        }

        try{
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        }
        catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('cannot create user, email already in use');
            }
            console.log("user creation encountered an error", error)
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})
    }
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label='Display Name'
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='displayName' 
                    value={displayName}
                />

                <FormInput
                label='Email'
                type='email'
                required 
                onChange={handleChange} 
                name='email' 
                value={email}
                />

                <FormInput 
                label='Password'
                type='password' 
                required 
                onChange={handleChange} 
                name='password' 
                value={password}
                />

                <FormInput 
                label='Confirm Password'
                type='password' 
                required 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
                />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );

}

export default SignUpForm;