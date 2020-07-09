import os
from flask import Flask, request, abort, jsonify 
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
from database.models import setup_db , Actor , Movie , Act
from datetime import datetime
from auth.auth import requires_auth , AuthError

######## Number of actors,movies per page in each request
ACTORS_PER_PAGE=4
MOVIES_PER_PAGE=4
########

def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  CORS(app)
  @app.after_request
  def after_request(response):
    response.headers.add("Access-Control-Allow-Headers","Content-Type, Authoraization, true")
    response.headers.add("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS")
    return response

  ##############################
  # GET ENDPOINTS 
  ##############################

  @app.route("/")
  def index():
    return "running"

  #Actor Endpoints
  
  @app.route("/actors",methods=['GET'])
  @requires_auth("get:actors")
  def get_all_actors(payload):
    page = request.args.get("page",1,type=int)
    start = (page-1) * ACTORS_PER_PAGE
    end = start+ACTORS_PER_PAGE
    actors = Actor.query.order_by(Actor.id).all()
    Formated_Actors = [actor.format() for actor in actors]

    return jsonify({
      "success":True,
      "actors":Formated_Actors[start:end],
      "number_of_actors":len(Formated_Actors)
    })

  @app.route("/actors/<int:actor_id>",methods=['GET'])
  @requires_auth("get:actors")
  def get_specific_actor(payload,actor_id):
    actor = Actor.query.get(actor_id)

    if actor is None:
      abort(404)

    return jsonify({
      "success":True,
      "actor":actor.format()
    })

   
  @app.route("/actors/<int:actor_id>/movies")
  @requires_auth("get:movies")
  def get_all_movies_for_specific_actor(payload,actor_id):
    actor = Actor.query.get(actor_id)
    if actor is None:
      abort(404)

    movies = [movie.format() for movie in actor.movies] 

    return jsonify({
      "success":True,
      "movies":movies
    })  

  #Movie Endpoints
  @app.route("/movies",methods=['GET'])
  @requires_auth("get:movies")
  def get_all_movies(payload):
    page = request.args.get("page",1,type=int)
    start = (page-1) * MOVIES_PER_PAGE
    end = start+MOVIES_PER_PAGE
    movies = Movie.query.order_by(Movie.id).all()
    Formated_Movies = [movie.format() for movie in movies]

    return jsonify({
      "success":True,
      "movies":Formated_Movies[start:end],
      "number_of_movies":len(Formated_Movies)
    })  

  @app.route("/movies/<int:movie_id>",methods=['GET'])
  @requires_auth("get:movies")
  def get_specific_movie(payload,movie_id):
    movie = Movie.query.get(movie_id)
    
    
    
    if movie is None:
      abort(404)

    return jsonify({
      "success":True,
      "movie":movie.format()
    })  

  @app.route("/movies/<int:movie_id>/actors")
  @requires_auth("get:actors")
  def get_all_actors_for_specific_movie(payload,movie_id):
    movie = Movie.query.get(movie_id)
    if movie is None:
      abort(404)

    actors = [actor.format() for actor in movie.actors]
    
    return jsonify({
      "success":True,
      "actors":actors
      
    })


  ##############################
  # POST ENDPOINTS 
  ##############################
  
  #Movie Endpoint
  @app.route("/movies",methods=['POST'])
  @requires_auth("post:movie")
  def create_movie(payload):
    body = request.get_json()
    
    if body is None:
      abort(401)

    title = body.get("title")
    tmp = body.get("release_date",None)
   
    if isinstance(tmp,str):
      release_date = datetime.strptime(tmp,'%Y-%m-%d').date()
    else:
      release_date=tmp

    try:
      movie= Movie(title=title,release_date=release_date)
      movie.insert()

      return jsonify({
        "success":True,
        "created_id":movie.id
      })  
    except:
      abort(422)

  #Actor Endpoint
  @app.route("/actors",methods=['POST'])
  @requires_auth("post:actor")
  def create_actor(payload):
    body = request.get_json()
   
    if body is None:
      abort(401)

    name = body.get("name") 
    age = body.get("age")
    gender = body.get("gender")
    movies_ids = body.get("movies_ids",[])
   

    if len(movies_ids)==0:
        abort(401)

    try:
      actor = Actor(name=name,age=age,gender=gender)
      actor.insert()
      
     

      for movie_id in movies_ids:
        act_on = Act(movie_id=movie_id,actor_id=actor.id)  
        act_on.insert()

      return jsonify({
        "success":True,
        "created_id":actor.id
      }) 
    except:
      abort(422) 



  ##############################
  # PATCH ENDPOINTS 
  ##############################

  @app.route("/movies/<int:movie_id>",methods=['PATCH'])
  @requires_auth("patch:movie")
  def update_movie(payload,movie_id):
    
    movie = Movie.query.get(movie_id)

    if movie is None:
      abort(404)

    body = request.get_json()
    
    if body is None:
      abort(401)

    title = body.get("title")
    if len(title) ==0:
      title=movie.title
      
    tmp_date = body.get("release_date",movie.release_date)
    
    if isinstance(tmp_date,str):  
      release_date = datetime.strptime(tmp_date,'%Y-%m-%d').date()
    else:
        release_date=tmp_date

    try:
      movie.title= title
      movie.release_date = release_date
      movie.update()

      return jsonify({
        "success":True,
        "updated_id":movie_id
      })

    except:
      abort(422)  

 
  @app.route("/actors/<int:actor_id>",methods=['PATCH'])
  @requires_auth("patch:actor")
  def update_actor(payload,actor_id):

    actor = Actor.query.get(actor_id)

    if actor is None:
      abort(404)

    body = request.get_json()

    if body is None:
      abort(401)

    name = body.get("name",actor.name)
    age = body.get("age",actor.age)
    gender = body.get("gender",actor.gender)
    movies_ids = body.get("movies_ids",[])

    if len(movies_ids) !=0:
        actor.movies=[]
        for i in movies_ids:
          movie  = Movie.query.get(i)
          actor.movies.append(movie)
          
    try:
      actor.name = name 
      actor.age = age
      actor.gender = gender

      actor.update()

      return jsonify({
        "success":True,
        "updated_id":actor_id
      })  
    except:
      abort(422)  



  ##############################
  # DELETE ENDPOINTS 
  ##############################

  @app.route("/movies/<int:movie_id>",methods=['DELETE'])
  @requires_auth("delete:movie")
  def delete_movie(payload,movie_id):
    movie = Movie.query.get(movie_id)

    if movie is None:
      abort(404)

    try:
      movie.actors=[]
      movie.delete()

      return jsonify({
        "success":True,
        "deleted_id":movie_id
      })
    except:
      abort(422)  
  
  @app.route("/actors/<int:actor_id>",methods=['DELETE'])
  @requires_auth("delete:actor")
  def delete_actor(payload,actor_id):
    actor = Actor.query.get(actor_id)

    if actor is None:
      abort(404)

    try:
      actor.movies = []
      actor.delete()

      return jsonify({
        "success":True,
        "deleted_id":actor_id
      })  
    except:
      abort(422)

  
  ##############################
  # Error Handlers 
  ##############################
  
  @app.errorhandler(401)
  def unauthoraized(error):
    return jsonify({
      "success":False,
      "error":401,
      "message":"unauthoraized",
    }),401
  
  @app.errorhandler(404)
  def not_found(error):
    return jsonify({
      "success":False,
      "error":404,
      "message":"resource not found"

    }),404

  @app.errorhandler(422)
  def unprocessable(error):
    return jsonify({
      "success":False,
      "error":422,
      "message":"unprocessable"
    }),422

  @app.errorhandler(AuthError)
  def auth_errors(auth):
    return jsonify({
        "success":False,
        "error":auth.status_code,
        "message":auth.error['code']
    }),auth.status_code

  return app

APP = create_app()

if __name__ == '__main__':
    APP.run(host='0.0.0.0', port=8080, debug=True)