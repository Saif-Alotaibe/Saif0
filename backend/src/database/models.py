from flask_sqlalchemy import SQLAlchemy
import datetime
import os
db = SQLAlchemy()

'''
setup_db(app)
binds database to an application
'''

database_path = os.environ['DATABASE_URL']

def setup_db(app,database_path=database_path):
    app.config['SQLALCHEMY_DATABASE_URI']=database_path
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False
    db.app=app
    db.init_app(app)
    db.create_all()
    
   # db.create_all()
'''
drops the database tables and starts fresh
    can be used to initialize a clean database
'''
# def db_drop_and_create():
#     db.drop_all()
#     db.create_all()


'''
Act 
'''

class Act(db.Model):
   __tablename__ = "acts"


   #Making  movie id and actor id  both primary key prevent inconsistency of data (repeted data) 
   movie_id  = db.Column(db.Integer,db.ForeignKey("movies.id"),primary_key=True)
   actor_id = db.Column(db.Integer,db.ForeignKey("actors.id"),primary_key=True)

   def __init__(self,movie_id,actor_id):
      self.movie_id=movie_id
      self.actor_id=actor_id
    
   def insert(self):
       db.session.add(self)
       db.session.commit()

   def update(self):
       db.session.commit()

   def delete(self):
       db.session.delete(self)
       db.session.commit()   





'''
Movie
 products = db.relationship('Product', secondary=order_items,
      backref=db.backref('orders', lazy=True))
'''
class Movie(db.Model):
  __tablename__ = "movies"

  id = db.Column(db.Integer,primary_key=True)
  title = db.Column(db.String(),unique=True,nullable=False)
  release_date = db.Column(db.Date(),nullable=False)
  actors = db.relationship("Actor",secondary="acts",backref=db.backref("movies",lazy=True))

  def __init__(self,title,release_date):
      self.title=title
      self.release_date=release_date

  def insert(self):
      db.session.add(self)
      db.session.commit()

  def update(self):
      db.session.commit()

  def delete(self):
      db.session.delete(self)
      db.session.commit() 

  def format(self):
      return {
          "id":self.id,
          "title":self.title,
          "release_date":f"{self.release_date}"
      }    

'''
Actor
'''

class Actor(db.Model):
  __tablename__ = "actors"

  id = db.Column(db.Integer,primary_key=True)
  name = db.Column(db.String(),nullable=False)
  age = db.Column(db.Integer,nullable=False)
  gender = db.Column(db.CHAR(1),nullable=False)
  
  def __init__(self,name,age,gender):
      self.name= name
      self.age=age
      self.gender=gender

  def insert(self):
      db.session.add(self)
      db.session.commit()

  def update(self):
      db.session.commit()

  def delete(self):
      db.session.delete(self)
      db.session.commit()

  def format(self):
       return {
           "id":self.id,
           "name":self.name,
           "age":self.age,
           "gender":self.gender
       }         



      
