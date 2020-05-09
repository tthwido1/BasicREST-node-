##
Run app 
> npm run dev

##
MongoDB Shell

> show dbs

> use basicrest-subscribers

> show collections

> db.subscribers.find().pretty()


##
cURLs

####
GET all

```
curl --request GET \
  --url http://localhost:5000/subscribers/
```

####
GET One
```
curl --request GET \
  --url http://localhost:5000/subscribers/5eb693425ab6801af4d0242e
```

####
POST
```
curl --request POST \
  --url http://localhost:5000/subscribers/ \
  --header 'content-type: application/json' \
  --data '{
	"name": "lname",
	"channel": "some-other-channel"
}'
```

####
PUT
```
curl --request PUT \
  --url http://localhost:5000/subscribers/5eb694f35ab6801af4d0242f \
  --header 'content-type: application/json' \
  --data '{
	"name": "lname-",
	"channel": "some-other-channel"
}'
```

####
DELETE
```
curl --request DELETE \
  --url http://localhost:5000/subscribers/5eb694f35ab6801af4d0242f
```
