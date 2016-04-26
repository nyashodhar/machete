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
					status		: if instance.status is 'running' then true else false 
					pubSubInfo	: instance.pubSubInfo
				}
			)
			return {
				id			: "model#{idx}"
				name		: item.name
				dnsName		: item.dnsName or 'N/A'
				elb			: item.elb
				instances	: instances
			}
		)
		res.json(data)
	)