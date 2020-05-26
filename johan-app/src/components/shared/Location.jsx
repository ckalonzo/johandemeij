import React from "react"
const Location = (props) => {
    return (<>
    <section className="location">
    <ul>
    <li className="country">{props.country}</li>
    <li className="company">{props.company}</li>
    <li className="address">{props.address}</li>
    <li className="fulladdress">{`${props.city}, ${props.state} ${props.zip} ${props.subCountry}`}</li>
    <li className="tel">{`Tel.${props.tel}`}</li>
    <li className="fax">{`Fax.${props.fax}`}</li>
    <li className="email">E-mail: <a href={`mailto:${props.email}`}>{props.email}</a></li>
    {props.website ? <li className="website">website: <a href={"http://"+props.website} target="_blank">{props.website}</a></li>:<li>&nbsp;</li>}
    
    </ul>
    </section>
    </>)
}
export default Location