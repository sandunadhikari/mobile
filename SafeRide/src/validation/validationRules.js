const validation=(value,rules,form)=>{
    //console.log(form);
    let valid=true;
    for (let rule in rules){
        switch (rule) {
            case "isRequired":
                valid=valid&& validateRequired(value);
                break;
            case "isEmail":
                valid=valid&& validateEmail(value);
                break;
            case "minLength":
                valid=valid&& validateMinLength(value,rules[rule]);
                break;
            case "confirmPass":
                valid=valid&& validateConfirmPass(value,form[rules.confirmPass].value);
                break;
            default:
                valid=true

        }
    }
    return valid;


}
const validateRequired=value=>{
    if(value!==''){
        return true;
    }
    return false;
}
const validateEmail=email=>{
    const expression=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expression.test(String(email).toLowerCase());
}
const validateMinLength=(value,ruleValue)=>{
    if(value.length>=ruleValue){
        return true;
    }
    return false;

}
const validateConfirmPass=(confirmPass,Pass)=>{
    if(confirmPass==Pass){
        return true;
    }
    else {
        return false;
    }

}
export default validation;