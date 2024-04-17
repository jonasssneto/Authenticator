const sumDays = (days: number) => {
    const today = new Date()
    today.setDate(today.getDate() + days)

    return today
}

export {
    sumDays
}

