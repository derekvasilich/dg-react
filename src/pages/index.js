import { useSelector, useDispatch } from 'react-redux'
import { login, selectAuthorization, selectException } from '@/store/authSlice'
import { useState } from 'react'
import { useRouter } from 'next/router'

const emailRegExp = /^[a-zA-Z0-9_]+[@][a-zA-Z0-9_]+[.][-a-zA-Z0-9._]+$/

export default function Login({ setLoading, setAuthorization }) {
    const router = useRouter()
    const [filters, setFilters] = useState({email: '', password: ''})
    const error = useSelector(selectException)
    const authorization = useSelector(selectAuthorization)
    const isValid = () => filters.email.match(emailRegExp) && filters.password.length > 0
    const dispatch = useDispatch()    

    if (authorization) {
        router.push('/vehicles')
    }
    
    return (        
        <div className="card mb-4 shadow-sm">
            <div className="card-header">
                <h4 className="my-0 fw-normal">Login</h4>
            </div>
            <div className="card-body">
                { error ? (
                    <div className="alert alert-danger" role="alert">
                        { error.status }: { error.error }
                    </div>                    
                ) : (<></>) }
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email"
                        value={ filters?.email }
                        onChange={ (e) => setFilters({...filters, email: e.target.value}) }
                        className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" 
                        value={ filters?.password }
                        onChange={ (e) => setFilters({...filters, password: e.target.value}) }
                        className="form-control" />
                </div>
                <a onClick={ () => dispatch(login(filters)) } 
                    disabled={ !isValid() }
                    className="w-100 btn btn-primary">
                        <i className="fa fa-chevron-left"></i> Login
                </a>
            </div>
        </div>  
    )
}