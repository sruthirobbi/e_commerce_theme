

export default function AddItemValidation(values,name){
    let errors={};
     switch (name) {
        case "name":
            if(!values.name){
                     errors.name ="Full name is required"
                 }else if(values.name.length < 3){
                     errors.name = "Full name must be more than 3 characters"
                 }
                 console.log(errors)
          return errors;
        case "price":
            if(!values.price){
                      errors.price = "Price is required"
                 }else if (!values.price.match(/^[0-9]*$/)){
                     errors.price="Provide Price in Numbers."
                 }
          return errors;
        case "quantity":
            if(!values.quantity){
                errors.quantity="Weight is required"
            }else if(!values.quantity.match(/^[0-9]*$/)){
               errors.quantity="Weight is Invalid"
            }
            return errors

        case "desc":
            if(!values.desc){
                errors.desc = "Description is required"
            }else if(values.desc.length < 6){
                errors.desc = "Please provide brief description of the product"
            }
           return errors;
        
        case "img":
            if(!values.img){
                errors.img = "Please upload image"
            }

        default:
          return errors;
      }

      
}


