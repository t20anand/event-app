Number.prototype.padLeft = function(base,chr){
  var  len = (String(base || 10).length - String(this).length)+1;
  return len > 0? new Array(len).join(chr || '0')+this : this;
}

const FormatDate = (date, format='yyyy-MM-dd HH:mm:ss') => {
    let formattedDate = '';
    switch(format) {
      case 'yyyy-MM-dd HH:mm:ss':
        formattedDate = [date.getFullYear(), (date.getMonth()+1).padLeft(), date.getDate().padLeft()].join('-')+' '+[date.getHours().padLeft(), date.getMinutes().padLeft(), date.getSeconds().padLeft()].join(':');
        break;
      default:
        formattedDate = date.toLocaleString();
    }

    return formattedDate;
}

export default FormatDate;
