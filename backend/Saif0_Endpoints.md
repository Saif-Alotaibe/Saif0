## Endpoints of Saif0 api

```



GET '/actors'
- Fetches a list of actors with pagination (Default number of returned actors are :4)
- Request Arguments: page(optional) , by default page=1
- Returns: A list of actors , number of available actors , success flag  
{
    "actors":list of actors
    "success":boolean flag indicates whether the request success or not
    "number_of_actors":Number of available actors
}

GET '/actors/<int:actor_id>'
- Fetch actor object exists in database , if actor not exists will rise 404 error
- Request Arguments: actor_id (mandatory) 
- Returns: success flag,actor object with actor_id specificed in the request
{
    "success":boolean flag indicates whether the request success or not
    "actor":an actor object
} 

GET '/actors/<int:actor_id>/movies'
- Fetches a list of movies for specific actor , if actor not exists will rise 404 error
- Request Arguments: actor_id (mandatory)
- Returns: success flag , movies list 
{
    "success":boolean flag indicates whether the request success or not
    "movies":list of movies for actor whose id is actor_id
}

GET '/movies'
- Fetches a list of movies with pagination (Default number of returned movies are :4)
- Request Arguments: page(optional) , by default page=1
- Returns: A list of movies , number of available movies , success flag  
{
    "movies":list of movies
    "success":boolean flag indicates whether the request success or not
    "number_of_movies":Number of available movies
}   

GET '/movies/<int:movie_id>'
- Fetches movie object exists in database , if movie not exists will rise 404 error
- Request Arguments: movie_id(mandatory)
- Returns: success flag,movie object with movie_id specificed in the request 
{
    "movie":movie object
    "success":boolean flag indicates whether the request success or not
    
}   

GET '/movies/<int:movie_id>/actors'
- Fetches actors list for specific movie , if movie not exists will rise 404 error
- Request Arguments: movie_id (mandatory)
- Returns: success flag , actors list 
{
    "success":boolean flag indicates whether the request success or not
    "actors":list of actors for movie whose id is movie_id
}



POST '/movies'
- Create new movie
- Request Arguments: An object with key:value pairs. contains:
{ 
    "title": A unique title
    "release_date": release date of movie in form of "YYYY-MM-DD" example : "2020-5-22"
}
- Returns: id of created movie , success flag 
{
    "success":boolean flag indicates whether the request success or not
    "created_id": id of created movie
}

POST '/actors'
- Create new actor
- Request Arguments: An object with key:value pairs. contains:
{
    "name":name of actor 
    "age": age of actor
    "gender": gender of actor , there is only two options 'M' for male , 'F' for Female
    "movies_ids":list of ids of movies where actor acts in those movies , example :[2,3]
}
- Returns: success flag , id of created actor
{
    "success": boolean flag indicates whether the request success or not
    "created_id": id of created actor
}

PATCH '/movies/<int:movie_id>'
- Update existing movie , if movie not exist will rise 404 error
- Request Arguments: an object contains at least one of those arguments:
{
   "title":new title of movie ( title must be unique , if not will rise 422 error)
   "release_date":release date of movie in form oF "YYYY-MM-DD"  example : "2020-5-22"
}
- Returns : success flag , updated id
{
    "success":boolean flag indicates whether the request success or not
    "updated_id": id of updated movie
}

PATCH '/actors/<int:actor_id>'
- Update existing actor , if actor not exist will rise 404 error
- Request Arguments: an object contains at least one of those arguments:
{
   "name":name of actor
   "age":  gender of actor , there is only two options 'M' for male , 'F' for Female
    "movies_ids":list of ids of movies where actor acts in those movies , example :[2,3]
}
- Returns : success flag , updated id
{
    "success":boolean flag indicates whether the request success or not
    "updated_id": id of updated actor
}


DELETE '/movies/<int:movie_id>'
- DELETE movie based on movie_id , if movie not exist will rise 404 error
- Request Arguments: movie_id (mandatory)
- Returns: id of deleted movie , success flag
{
    "success":boolean flag indicates whether the request success or not
    "deleted_id":id of deleted movie
} 

DELETE '/actors/<int:actor_id>'
- DELETE acotr based on actor_id , if actor not exist will rise 404 error
- Request Arguments: actor_id (mandatory)
- Returns: id of deleted actor , success flag
{
    "success":boolean flag indicates whether the request success or not
    "deleted_id":id of deleted actor
} 


```