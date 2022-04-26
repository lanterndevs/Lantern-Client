// Round to nearest two decimal places
function roundCents(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100
}

export { roundCents };
