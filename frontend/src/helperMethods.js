export const dateTimeToDate = (dateTime)=> {
    var date = new Date(dateTime);
    return(
        date.getFullYear() + '-' +  ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())));
}