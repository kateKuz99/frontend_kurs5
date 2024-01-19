import React from 'react'

export const SpecialistCertificatesBlock = ({certificate}) => {
  console.log("awersg")
  return (
        <div className='certificate'>
        <img 
          key={certificate.id}
          src={certificate.fileName != null ? " http://localhost:8080/api/v1/public/info/specialists/certificate/"+certificate.fileName : "https://via.placeholder.com/300"}
          alt='certificate '
        ></img>
    </div>
  )
}