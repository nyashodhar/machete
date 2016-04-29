Q		= require 'q'
lib		= require '../lib'
poll	= lib.pollsource()


compare = (a, b) ->
	if a < b
		return -1
	if a > b
		return 1
	return 0


module.exports = (req, res) -> 
	poll(req).then((data) -> 
		data = data.map((item, idx) ->
			instances = item.instances.map((instance) ->
				if instance?.pubSubInfo?.length
					instance.pubSubInfo = instance.pubSubInfo.sort(compare)
				return {
					ip			: instance.ip
					version		: instance.version or 'N/A'
					status		: if instance.status is '200' then '<b><font color="green">OK</font></b>' else '<b><font color="red">ERROR</font></b>'
					pubSubInfo	: instance.pubSubInfo
				}
			)
			return {
				id			: "model#{idx}"
				name		: item.name.toUpperCase()
				dnsName		: item.dnsName or 'N/A'
				elb			: item.elb
				instances	: instances
			}
		)
		res.json(data)
	)