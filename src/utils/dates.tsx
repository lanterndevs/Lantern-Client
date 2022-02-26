// Takes a date and outputs 'MM-DD-YYYY'
function formatDate(date) {
    let month = date.getMonth() + 1; // getMonth() is zero-based
    var day = date.getDate();

    return [date.getFullYear(),
        "-", (month > 9 ? '' : '0') + month,
        "-", (day > 9 ? '' : '0') + day,
    ].join('');
}

export {
    formatDate
};