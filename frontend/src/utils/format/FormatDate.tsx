const formatDate = (dateString: string, format: string = 'DD MMM YYYY') => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
    const [day, month, year] = dateString.split('.');
    
    // Заменяем символы формата на соответствующие значения
    return format
        .replace('DD', day)
        .replace('MMM', months[parseInt(month) - 1])
        .replace('MM', month)
        .replace('YYYY', year);
}

export default formatDate;