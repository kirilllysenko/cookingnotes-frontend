const minutesToTime = (minutes: number) => {
    if (minutes <= 60)
        return minutes + " minutes"
    else {
        const hours = minutes / 60 - minutes % 60;
        let text = hours + (hours === 1 ? " hour" : " hours");
        if (minutes % 60 !== 0)
            text = `${text} ${minutes % 60} minutes`
        return text;
    }
}

export default minutesToTime;
