```bash

npm run dev

docker run -d \
  --name snake-mongo \
  -p 27017:27017 \
  -v ~/docker/mongo-data:/data/db \
  mongo:latest

docker exec -it snake-mongo bash
mongosh
show dbs
use snake-mongo
show collections
db.users....

```
