import os
import unittest
import json
from flask_sqlalchemy import SQLAlchemy

from app import create_app
from database.models import setup_db, Actor , Movie


class CastingAgencyTestCase(unittest.TestCase):
    """This class represents the CastingAgency test case"""

    def setUp(self):
        """Define test variables and initialize app."""
        self.app = create_app()
        self.client = self.app.test_client
        self.database_name = "Casting_Agency_Test"
        self.database_path = "postgres://safe1@{}/{}".format('localhost:5432', self.database_name)
        setup_db(self.app, self.database_path)

        # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()
        
        self.new_movie = {
            "title":"MovieA",
            "release_date":"2019-2-22"
        }
        
        self.new_actor = {
            "name":"Saif",
            "age":21,
            "gender":"M",
            "movie_id":[1]
        }
    def tearDown(self):
        """Executed after reach test"""
        pass

    
    #--------------------------------------------------------------
    #Tests for GET endpoints
    #--------------------------------------------------------------

    #Movie Endpoints

    def test_get_all_movies(self):
        res = self.client().get("/movies")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['movies'])
        self.assertTrue(len(data['movies']))
    
    
    def test_get_specific_movie(self):
        res = self.client().get("/movies/1")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['movie'])
        self.assertTrue(len(data['movie']))


    def test_get_actors_for_specific_move(self):
        res = self.client().get("/movies/1/actors")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['actors'])
        self.assertTrue(len(data['actors']))
    
    #Actor Endpoints

    def test_get_all_actors(self):
        res  = self.client().get("/actors")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['actors'])
        self.assertTrue(len(data['actors']))

    def test_get_specific_actor(self):
        res = self.client().get("/actors/1")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['actor'])
        self.assertTrue(len(data['actor'])) 

    def test_get_movies_for_specific_actor(self):
        res  = self.client().get("/actors/1/movies") 
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['movies'])
        self.assertTrue(len(data['movies']))



    #--------------------------------------------------------------
    #Tests for POST Endpoints
    #--------------------------------------------------------------
    
    def test_create_new_movie(self):
        res = self.client().post("/movies",json=self.new_movie)
        data= json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['created_id'])

    def test_create_new_actor(self):
        res = self.client().post("/actors",json=self.new_actor)
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertTrue(data['created_id'])
        

    #--------------------------------------------------------------
    #Test for PATCH Endpoints
    #--------------------------------------------------------------    
    
    def test_update_movie(self):
        res  = self.client().patch("/movies/4",json={"title":"xxxxx"})
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertEqual(data['updated_id'],4)

    def test_update_actor(self):
        res  = self.client().patch("/actors/4",json={"name":"Khalid"})
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertEqual(data['updated_id'],4)    

    #--------------------------------------------------------------
    #Test for DELETE Endpoints
    #--------------------------------------------------------------
    
    def test_delete_movie(self):
        res = self.client().delete("/movies/2")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertEqual(data['deleted_id'],2)

    def test_delete_actor(self):
        res = self.client().delete("/actors/2")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,200)
        self.assertEqual(data['success'],True)
        self.assertEqual(data['deleted_id'],2)

    
    #--------------------------------------------------------------
    #Tests for Expected Errors Endpoints
    #--------------------------------------------------------------
    
    def test_401_unauthoraized(self):
        res = self.client().post("/actors")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,401)
        self.assertEqual(data['success'],False)
        self.assertEqual(data['message'],'unauthoraized')
        
    def test_404_not_found(self):
        res = self.client().get("/movies/999999")
        data = json.loads(res.data)

        self.assertEqual(res.status_code,404)
        self.assertEqual(data['success'],False)
        self.assertEqual(data['message'],"resource not found")

    def test_422_unprocessable(self):
        res = self.client().post("/movies",json={"title":"xx"})
        data = json.loads(res.data)

        self.assertEqual(res.status_code,422)
        self.assertEqual(data['success'],False) 
        self.assertEqual(data['message'],'unprocessable')   



        
# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()