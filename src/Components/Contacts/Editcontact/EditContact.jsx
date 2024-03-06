import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const EditContact = () => {
  let navigate = useNavigate()
  let { contactId } = useParams()
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
    errorMessage: ''
  })

 

  useEffect(() => {
    let prom = new Promise((res, rej) => {
      setState({ ...state, loading: true })
      let response = ContactServices.getContact(contactId)
      res(response)
    })
    prom.then((resp1) => {
      console.log(resp1)
      setState({ ...state, loading: false, contact: resp1.data })
      return new Promise((res1, rej1) => {
        let groupResponse = ContactServices.getAllGroups()
        res1(groupResponse)
      }).then((resp2) => {
        console.log(resp2)
        setState({ ...state, loading: false, contact: resp1.data, groups: resp2.data })
      })
    })
  },[contactId])


  let updateInput = (e) => {
    setState({
      ...state, contact: {
        ...state.contact,
        [e.target.name]: e.target.value
      }
    })
  }

  let submitForm = (event) => {
    event.preventDefault()
    let prom = new Promise((res, rej) => {
      let putContact = ContactServices.updateContact(state.contact, contactId)
      res(putContact)
      rej()
    })
    prom.then((resp1) => {
      if (resp1) {
        setState({ ...state, contact: resp1.data })
        navigate('/contacts/list', { replace: true })
      }

    }).catch((error) => {
      setState({ ...state, loading: false, errorMessage: error })
      navigate(`/contacts/edit / ${ contactId }`, { replace: false })
    })

  }

  let { loading, contact, groups, errorMessage } = state
  return (
    <div>
      {
        loading ? <Spinner /> : <React.Fragment>
          <section className="edit-contact p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className='h4 text-primary fw-bold'>Edit Contact</p>
                  <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus omnis sit dolore qui, alias earum deserunt quos delectus! Tenetur vel nulla vero, magnam commodi dolorem soluta vitae corporis neque quia.</p>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <form action="" onSubmit={submitForm}>
                    <div className="mb-2">
                      <input
                        required={true}
                        name='name'
                        onChange={updateInput}
                        value={contact.name}
                        type="text" className='form-control' placeholder='Name' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name='photo'
                        onChange={updateInput}
                        value={contact.photo}
                        type="text" className='form-control' placeholder='Photo URL' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name='contact'
                        onChange={updateInput}
                        value={contact.contact}
                        type="number" className='form-control' placeholder='Mobile Number' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name='email'
                        onChange={updateInput}
                        value={contact.email}
                        type="email" className='form-control' placeholder='Email' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name='company'
                        onChange={updateInput}
                        value={contact.company}
                        type="text" className='form-control' placeholder='Company' />
                    </div>
                    <div className="mb-2">
                      <input
                        required={true}
                        name='title'
                        onChange={updateInput}
                        value={contact.title}
                        type="text" className='form-control' placeholder='Title' />
                    </div>
                    <div className="mb-2">
                      <select
                        required={true}
                        name='groupId'
                        onChange={updateInput}
                        value={contact.groupId}
                        className='form-control'>
                        <option value="">Select A Group</option>
                        {
                          groups.length > 0 &&
                          groups.map(group => {
                            return (
                              <option key={group.id} value={group.name}>{group.name}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <input type="submit" className='btn btn-primary' value={'Update'} />
                    <Link to={'/'} className='btn btn-danger ms-2'>Close</Link>
                  </form>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <img src={contact.photo} alt='Profile Avtar' className='contact-img' />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      }
      {/* SECTION-1 */}

    </div >
  )
}

export default EditContact
