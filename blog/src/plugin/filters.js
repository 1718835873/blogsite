exports.formateDate=(value)=>{
    var time = new Date(value * 1000);
    var year = time.getFullYear();
    var month = time.getMonth() + 1 > 9 ? (time.getMonth() + 1) : "0" + (time.getMonth() + 1)
    var day = time.getDate();
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}