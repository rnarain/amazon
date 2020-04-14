export function paginate(array , page , page_size){
    return (array.slice((page - 1) * page_size, page * page_size))
}

export function pages(array,page_size){
    let len= array.length
    if(len>0){
        if(Math.floor(len/page_size) ==0){
            return 1
        }
        else{
            return (Math.floor(len/page_size))
        }
    }
    else{
        return 0
    }
}