module.exports = (req, res) -> 

	session = {}

	if req?.session and typeof req.session is 'object'
		for own key, value of req.session 
			if (key isnt 'password') and (key isnt 'cookie') then session[key] = value

	if res then res.json session

	else return session