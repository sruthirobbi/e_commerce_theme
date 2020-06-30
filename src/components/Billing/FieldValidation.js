

export default function FieldValidation(values,name){
    let errors={};
     switch (name) {
         
        case "fullname":
            if(!values.fullname){
                     errors.fullname ="Full name is required"
                 }else if(values.fullname.length < 3){
                     errors.fullname = "Full name must be more than 3 characters"
                 }
          return errors;
        case "email":
            if(!values.email){
                    return  errors.email = "Email address is required"
                 }else if (!values.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)){
                    return errors.email="Email is invalid"
                 }
          return errors;
        case "phone":
            if(!values.phone){
                errors.phone="Mobile Number is required"
            }else if(!values.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)){
               errors.phone="Please provide valid Mobile Number"
            }
            return errors

        case "address":
            if(!values.address){
                errors.address = "Address is required"
            }
            return errors

        case "city":
            if(!values.city){
                errors.city = "City is required"
           }else if(!values.city.match(/^[A-Za-z]+$/)){
                errors.city = "Please provide valid City name"
           }
           return errors;
        
        case "place":
            if(values.place){
                errors.place = "State is required"
            }
            return errors
        
        case "zipcode":
            if(values.zipcode){
                errors.zipcode = "Zip Code is required "
            }else if(values.zipcode.match(/^\d{4}(?:[-\s]\d{3})?$/)){
                errors.zipcode="Please provide valid Zip Code"
            }
            return errors

        default:
          return errors;
      }

}


