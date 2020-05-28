export const  phoneValidation = (value,name) => {
    var phoneno = /^\d{10}$/;
    if((value.match(phoneno))){
      return false;
    }else{
      return name + " number is not valided";
    }
}
export const  emailValidation = (value,name) => {
    var re = /\S+@\S+\.\S+/;
      if(re.test(value)){
        return false;
      }else{
       return name + " is not valided";
       
      }
}
export const  requiredValidation = (value,name) => {
    if(value.length>1 && value !==''){
        return false;
      }else{
         return name + " is required";
      }
}
export const  validationFun = (fieldState,name) => {
    let returnValue=false
    fieldState.type.forEach((itm)=>{
       if(itm=='requiredValidation'){
            const valid=requiredValidation(fieldState.value,name) 
            const newValue={
                value:fieldState.value,
                hasError:valid?true:false,
                errorMessage:valid,
                type:fieldState.type
           }
           returnValue= newValue
        }
        if(itm=='emailValidation'){
           const valid=emailValidation(fieldState.value,name) 
            const newValue={
                value:fieldState.value,
                hasError:valid?true:false,
                errorMessage:valid,
                type:fieldState.type
           }
           returnValue= newValue
        }
        if(itm=='phoneValidation'){
            const valid=phoneValidation(fieldState.value,name) 
            const newValue={
                value:fieldState.value,
                hasError:valid?true:false,
                errorMessage:valid,
                type:fieldState.type
           }
           returnValue= newValue
        }
    })
    return returnValue
}
