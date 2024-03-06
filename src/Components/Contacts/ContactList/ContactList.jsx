import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ContactList = () => {
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: ""

  })

  let [query, setQuery] = useState({
    text: '',

  })

  useEffect(() => {
    let prom1 = new Promise((res1, rej1) => {
      setState({ ...state, loading: true, contacts: [] })

      let response = ContactServices.getAllContacts()
      res1(response)
    })
    prom1.then((res1) => {
      setState({ ...state, loading: false, contacts: res1.data, filteredContacts: res1.data })

    }).catch((error) => {
      setState({ loading: false, errorMessage: error.message })

      alert("data not found !!")
    })

  }, [])

  // Delete Contact
  let clickDelete = async (contactId) => {
    let promise1 = new Promise(((res1, rej1) => {
      let deleteContact =ContactServices.deleteContact(contactId)
      res1(deleteContact)

    }))
    promise1.then((resp1) => {
      if (resp1) {
        let prom1 = new Promise((res1, rej1) => {
          setState({ ...state, loading: true, contacts: [] })
          let response = ContactServices.deleteContact(contactId)
          res1(response)
        })
        prom1.then((resp1) => {
          setState({ ...state, loading: false, contacts: resp1.data })
          console.log(resp1.data)


        }).catch((error) => {
          setState({ ...state, loading: false, errorMessage: error })
          alert("data not deleted")
        })
      }
    })
  }


  // Search Contacts
  let searchContacts = (e) => {
    setQuery({ ...query, text: e.target.value })
    let theContacts = state.contacts.filter((contact) => {
      return contact.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setState({
      ...state, filteredContacts: theContacts
    })
  }


  let { loading, filteredContacts, errorMessage } = state
  return (
    <div>
      {/* SECTION-1 */}
      <section className='contact-search p-3'>
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className='h3 fw-bold'>Contact Manager
                  <Link to={'/contacts/add'} className='btn btn-primary ms-2'><i className='fa fa-plus-circle me-2' />ADD</Link>
                </p>
                <p className='fst-italic'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa impedit iusto repellat excepturi itaque voluptatum tenetur quos quae enim cumque quo id inventore sed eius blanditiis, autem unde. Laborum, pariatur.</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className='row'>
                  <div className="col-md-8">
                    <div className="mb-2">
                      <input
                        name='text'
                        value={query.text}
                        onChange={searchContacts}
                        type="text" className='form-control' placeholder='Search Names' />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input type="submit" className='btn btn-outline-dark' value={'Search'} />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION-2 */}
      {
        loading ? <Spinner /> : <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {
                  filteredContacts.length > 0 && filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6 my-2" key={contact.id}>
                        <div className="card">
                          <div className="card-body">
                            <div className="row align-items-center">
                              <div className="col-md-4 ">
                                <img src={contact.photo} alt='' className='contact-img' />
                              </div>
                              <div className="col-md-7">
                                <ul className='list-group'>
                                  <li className='list-group-item list-group-item-action'>
                                    Name : <span className='fw-bold'>{contact.name}</span>
                                  </li>
                                  <li className='list-group-item list-group-item-action'>
                                    Contact : <span className='fw-bold'>{contact.contact}</span>
                                  </li>
                                  <li className='list-group-item list-group-item-action'>
                                    E-Mail : <span className='fw-bold'>{contact.email}</span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/view/${contact.id}`} className='btn btn-primary my-1'><i className='fa fa-eye' /></Link>
                                <Link to={`/contacts/edit/${contact.id}`} className='btn btn-warning my-1'><i className='fa fa-pen'></i></Link>
                                <button className='btn btn-danger my-1' onClick={() => clickDelete(contact.id)}> <i className='fa fa-trash '></i></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </section>
        </React.Fragment>
      }
    </div>
  )
}

export default ContactList
