const convertCSTimeToJsTime = (csTime) => {
    let jsTime = new Date(Date.parse(csTime));
    return jsTime
}