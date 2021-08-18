const format2Digits = (num) => {
    if(num < 10) {
        num = '0' + num;
    }
    return num;
};

const getCurrentTime = () => {
    const date = new Date();
    const hours = format2Digits(date.getHours());
    const mins = format2Digits(date.getMinutes());
    const secs = format2Digits(date.getSeconds());
    return `${hours}:${mins}:${secs}`;
};

const filterData = (filter,list) => {
    return list.map( obj => {
        const newObj = {};
        for(const prop of filter) {
            newObj[prop] = obj[prop];
        }
        return newObj;
    });
};


const pagination =(_spaces,req)=>{
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);

    const spacesLast = [];

    if(req.query.offset==null && req.query.limit!=null){
        for(let i=0; i<=limit-1;i++){
        
            spacesLast.push(_spaces[i]);
            
        }
        return spacesLast;
    }else if(req.query.offset!=null && req.query.limit==null){
        for(let i=offset-1; i<=_spaces.length-1;i++){       
             
            spacesLast.push(_spaces[i]);
        }
        return spacesLast;
    }else if(req.query.offset!=null && req.query.limit!=null){
        for(let i=offset-1; i<=(offset+limit)-1;i++){
        
            spacesLast.push(_spaces[i]);
            
        }
        return spacesLast;
    }else{
        return _spaces;
    }
}



module.exports = { 
    getCurrentTime,
    filterData,
    pagination
};