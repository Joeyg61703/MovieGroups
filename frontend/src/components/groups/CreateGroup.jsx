import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createGroup } from '../../features/groups/groupSlice'
// import { login, reset } from '../features/auth/authSlice'



const CreateGroup = () => {
  const [formData, setFormData] = useState({
    groupName: '',
    password: '',
  })

  const { groupName, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

//   useEffect(() => {
//     if (isError) {
//       console.log(message)
//       toast.error(message)
//     }

//     if (isSuccess || user) {
//       navigate('/')
//     }

//     dispatch(reset())
//   }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      groupName,
      password,
    }

    dispatch(createGroup(userData))
  }
  return (

     <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-25">
            <h2 className="title title-red">Create Group</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tr-movie-menu-active text-center">
            <form  onSubmit={onSubmit} className="col border border-dark shadow rounded p-5 justify-content-evenly align-items-center" action="">
                <div className="flex-row">
                    <label htmlFor="groupName"><h3>Group Name</h3></label>           
                    <input value={groupName} onChange={onChange} className="form-input text-center" type="text" id="groupName" name="groupName" />
                </div>           
                
                <div className="flex-row justify-content-center">
                    <label  htmlFor="password"><h3>Password</h3></label>
                    <input value={password} onChange={onChange} className="form-input text-center" type="password" id="password" name="password" />
                </div>           
                
                <button className="form-button d-flex justify-content-center align-items-center mt-5 w-100 " type="submit">
                        Create                        
                </button>
                
            </form>        
            </div>
          </div>
        </div>
     </div>
  )
}

export default CreateGroup