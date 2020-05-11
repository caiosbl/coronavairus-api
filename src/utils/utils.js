exports.toNumber = (string) => Number(String(string).split(",").join(""));
exports.sortByDate = (key, ascedent = false) => {

    const comparator = ascedent ? -1 : 1;

    return (a, b) => {

        
        const aDateFormatted = `${a[key].split("/")[2]}-${a[key].split("/")[1]}-${a[key].split("/")[0]}`;
        const bDateFormatted = `${b[key].split("/")[2]}-${b[key].split("/")[1]}-${b[key].split("/")[0]}`;
       
        const aDate = new Date(aDateFormatted);
        const bDate = new Date(bDateFormatted);

        if (aDate > bDate) return 1 * comparator;
        if (bDate > aDate) return -1 * comparator;

        return 0;
    }


} 