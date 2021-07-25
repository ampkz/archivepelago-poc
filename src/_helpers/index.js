export const StringifyName = (nameObj) => {
    if(String(nameObj.SecondName).length > 0){
        return nameObj.FirstName + ' ' + nameObj.SecondName + ' ' + nameObj.LastName;
    }else{
        return nameObj.FirstName + ' ' + nameObj.LastName;
    }
}