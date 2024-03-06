import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ContactServices } from '../../Services/ContactServices'
import Spinner from '../../Spinner/Spinner'

const ViewContact = () => {
  let { contactId } = useParams()
  let [state, setState] = useState({
    loading: false,
    contact: {},
    errorMessage: ''
  })

  useEffect(() => {
    setState({ ...state, loading: true })
    let prom = new Promise((res1, rej1) => { 
    let response = ContactServices.getContact(contactId) 
    console.log(response.data)
      res1(response)
    })
    prom.then((resp1) => {
      setState({ ...state, loading: false, contact: resp1.data })
      console.log(resp1.data)
    }).catch((error) => {
      setState({ ...state, loading: false, errorMessage: error.message })
    })
},[contactId])

  let {loading, contact, errorMessage}=state
  return (
    <div>

      {/* SECTION-1 */}
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem doloremque impedit repudiandae illum laborum nostrum, sunt ipsum, assumenda ut delectus veniam pariatur velit, praesentium mollitia perferendis suscipit nobis aliquid explicabo?</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION-2 */}
      {
        loading ? <Spinner /> : <React.Fragment>
          {
            Object.keys(contact).length > 0 &&

            <section className='view-contact mt-3'>
              <div className="container">

                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img src={contact.photo} alt='img not found' className='contact-img' />
                  </div>
                  <div className="col-md-7">
                    <ul className='list-group ms-3'>
                      <li className='list-group-item list-group-item-action'>
                        Name : <span className='fw-bold'>{contact.name}</span>

                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Contact : <span className='fw-bold'>{contact.contact}</span>

                      </li>
                      <li className='list-group-item list-group-item-action'>
                        E-Mail : <span className='fw-bold'>{contact.email}</span>

                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Company : <span className='fw-bold'>{contact.company}</span>

                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Title : <span className='fw-bold'>{contact.title}</span>

                      </li>
                      <li className='list-group-item list-group-item-action'>
                        Group : <span className='fw-bold'>{contact.groupId}</span>
 
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="col-md-12  d-flex justify-content-center">
                    <Link to={'/'} className='btn btn-warning'>Back</Link>
                  </div>
                </div>
              </div>
            </section>
          }
        </React.Fragment>
      }
    </div>
  )
}

export default ViewContact
