export default (str: string): string => {
    if (!str) return '';

    str = str.toString();

    return str.replace(/(<([^>]+)>)/ig, '');
}