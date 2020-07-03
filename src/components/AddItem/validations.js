

export default function validations(values){
    let errors={};
            if(!values.name){
                     errors.name ="Full name is required"
                 }else if(values.name.length < 3){
                     errors.name = "Full name must be more than 3 characters"
                 }
      
            if(!values.price){
                      errors.price = "Price is required"
                 }else if (!values.price.match(/^[0-9]*$/)){
                     errors.price="Provide Price in Numbers."
                 }
          
            if(!values.quantity){
                errors.quantity="Weight is required"
            }else if(!values.quantity.match(/^[0-9]*$/)){
               errors.quantity="Weight is Invalid"
            }
            
            if(!values.desc){
                errors.desc = "Description is required"
            }else if(values.desc.length < 6){
                errors.desc = "Please provide brief description of the product"
            }

            if(!values.img){
                errors.img = "Please upload image"
            }else if(!values.name.match(/\.(jpg|jpeg|png|gif)$/)){
                errors.img = "Please upload valid Image"
            }
            return errors;
        

      
}


