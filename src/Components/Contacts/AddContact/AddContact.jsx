import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const AddContact = () => {
  let navigate = useNavigate()
  let [state, setState] = useState({
    loading: false,
    contact: {
      name: '',
      photo: '',
      contact: '',
      email: '',
      company: '',
      title: '',
      groupId: ''
    },
    groups: [],
    errorMesssage: '',
  })
  
  useEffect(() => {
    let pro1 = new Promise((res1, rej1) => {
      setState({ ...state, loading: true })
      let response = ContactServices.getAllGroups()
      console.log(response)
      res1(response)
    })
    pro1.then((res1) => {
      setState({ ...state, loading: false, groups: res1.data })
      console.log(res1.data)
    }).catch((error) => {
      setState({ ...state, loading: false, errorMessage: error.message })
      alert("data not found !!")
    })
  }, [])



  let updateInput = (e) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [e.target.name]: e.target.value
      }
    })
  }



  let submitForm = (e) => {
    e.preventDefault()
    let prom1 = new Promise((res1, rej1) => {
      let response = ContactServices.createContact(state.contact)
      if (response) {
        navigate('/contacts/list', { replace: true })
      }
      res1(response)
    })
    prom1.then((res1) => {
      setState({ ...state, loading: false })
    }).catch((error) => {
      setState({ ...state, errorMessage: error.message })
      navigate('/contacts/add', { replace: false })
    })

  }
  let { loading, contact, groups} = state
  return (
    <div>
      <section className="create-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className='h4 text-success fw-bold'>Create Contact</p>
              <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus omnis sit dolore qui, alias earum deserunt quos delectus! Tenetur vel nulla vero, magnam commodi dolorem soluta vitae corporis neque quia.</p>
            </div>
          </div>
          {
            loading ? <Spinner /> : <React.Fragment>
              <div className="row">
                <div className="col-md-4">
                  <form action="" onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="name"
                        value={contact.name}
                        onChange={updateInput}
                        type="text" className='form-control' placeholder='Name' />
                    </div>
                    <div className="input-group mb-2">
                      <input
                        required={true}
                        name="photo"
                        value={contact.photo}
                        onChange={updateInput}
                        type="text" className='form-control' placeholder='Photo URL' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="contact"
                        value={contact.contact}
                        onChange={updateInput}
                        type="number" className='form-control' placeholder='Mobile Number' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="email"
                        value={contact.email}
                        onChange={updateInput}
                        type="email" className='form-control' placeholder='Email' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="company"
                        value={contact.company}
                        onChange={updateInput}
                        type="text" className='form-control' placeholder='Company' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name="title"
                        value={contact.title}
                        onChange={updateInput}
                        type="text" className='form-control' placeholder='Title' />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        name="groupId"
                        value={contact.groupId}
                        onChange={updateInput}
                        className='form-control'>
                        <option value="">Select A Group</option>
                        {
                          groups.length > 0 && groups.map((group) => {
                            return (
                              <option key={group.id} value={group.name}>{group.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <input type="submit" className='btn btn-success' value={'Create'} />
                    <Link to={'/'} className='btn btn-danger ms-2'>Close</Link>
                  </form>
                </div>
              </div>
            </React.Fragment>
          }
        </div>
      </section>
    </div >
  )
}

export default AddContact
