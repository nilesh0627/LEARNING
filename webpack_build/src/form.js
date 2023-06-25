import {useState} from 'react';
const URL='https://jsonplaceholder.typicode.com/todos';
export default function App() {
  const [formData, setFormData]=useState({
    userName:'',
    password:'',
    confirmPassword:'',
    isUserNameValidate: false,
    isResetButtonDisabled: true
  });

  const handleFormInput=(e)=> {
    setFormData(formData=>({...formData, [e.target.name]:e.target.value}))
  }

  const checkUservalidity=async(e)=>{
    e.preventDefault();
    await fetch(URL).then(res=>{
      setFormData(formData=>({...formData, isUserNameValidate:true}))
    }).catch(error=>{
      setFormData(formData=>({...formData, isUserNameValidate:false}))
    })
  }

  const comparePasssword=()=>{
    const isPasswordSame = formData.password === formData.confirmPassword
    setFormData(formData=>({...formData, isResetButtonDisabled: !isPasswordSame}))
  }

  const resetPassword=()=>{

  }
  return (
    <form className="App" onSubmit={resetPassword}>
      <h1>Reset Password</h1>
      <input placeholder="Enter UserName" type="text" name="userName" value={formData.userName} onChange={handleFormInput}/>
      {formData.isUserNameValidate ? <>
        <input placeholder="Enter Password" type="password" name="password" value={formData.password} onChange={handleFormInput} onBlur={comparePasssword}/>
        <input placeholder="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleFormInput} onBlur={comparePasssword}/>
        <button title={formData.isResetButtonDisabled ? "Password doesn't match" : ""} type="submit" disabled={formData.isResetButtonDisabled}>Reset Password</button>
      </>: <button onClick={checkUservalidity}>Proceed</button>}
    </form>
  );
}
