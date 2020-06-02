module.exports = {
    usersOnly: (req, res, next) => {
        const {user} = req.session
        if (!user) {
            return res.status(401).send('Please log in')
        }
        next()
    }
}