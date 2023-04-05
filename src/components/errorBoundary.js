import React from 'react'
import { useSelector } from 'react-redux'
import { selectException } from '@/store/vehicleSlice';

export default function ErrorBoundary({ children }) {
      const exception = useSelector(selectException)

      // Check if the error is thrown
      if (exception ) {
        // You can render any custom fallback UI
        return (
            <div className="alert alert-danger" role="alert">
                { exception?.response?.data ? (
                    <>
                        { exception.response.data.status }: { exception.response.data.error }
                    </>
                ) : ( 
                    <>
                        { exception.code }: { exception.message } 
                    </>
                ) }
            </div> 
        )
      }  
      // Return children components in case of no error
  
      return children
  }
