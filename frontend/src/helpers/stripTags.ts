export default (str: string): string => {
    if ((str===null) || (str===''))
        return '';
    else
        str = str.toString();

    return str.replace( /(<([^>]+)>)/ig, '');
}
