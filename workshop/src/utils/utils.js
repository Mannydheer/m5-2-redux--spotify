export const FollowerConverter = (num) => {
    if (num >= 1000 && num < 1000000) {
        console.log(num / 1000 + "K")
        return (Math.floor(num / 1000) + 'K')

    }
    else if (num >= 1000000) {
        return (Math.floor(num / 1000000) + 'M')
    }
    else {
        return (num)
    }

}