export const subscriptionExpiryDateGenerator = (type: 0 | 1 | 2) => {
        const expiryDate = new Date();
        const currentMonth = expiryDate.getMonth();
        if(type === 0 || type === 2){
            expiryDate.setMonth(currentMonth + 1)
        }else{
            expiryDate.setMonth(currentMonth + 2)
        }
        return expiryDate;
}