export default function validation(values){
    let errors={};
     if(!values.email){
         errors.email = "Email address is required"
     }else if (!values.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
         errors.email="Email is invalid"
     }

     if(!values.fullname){
         errors.fullname ="Full name is required"
     }else if(values.fullname.length < 4){
         errors.fullname = "Full name must be more than 3 characters"
     }

     if(!values.phone){
         errors.phone="Mobile Number is required"
     }else if(!values.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
        errors.phone="Please provide valid Mobile Number"
     }

     if(!values.address){
         errors.address = "Address is required"
     }
     
    if(!values.city){
         errors.city = "City is required"
    }else if(values.city.length<4){
         errors.city = "Please provide valid City name"
    }

    if(!values.place){
        errors.place = "State is required"
    }

    if(!values.zipcode){
        errors.zipcode = "Zip Code is required"
    }else if(!values.zipcode.match(/^\d{5}(?:[-\s]\d{4})?$/)){
        errors.zipcode="Please provide valid Zip Code"
    }

    return errors;
}


