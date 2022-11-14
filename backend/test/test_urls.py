from flask import Flask
from shortner.views import DeleteView, NewView, UpdateView, StubView
import unittest

class TestUrls(unittest.TestCase):
  def setUp(self):
        self.app=Flask(__name__, instance_relative_config=False)
        self.app=self.app.test_client()
  def test_add_url_is_resolved(self):
        response = self.app.get('/add_new')
        self.assertEquals(response.view_class, NewView)
  def test_delete_url_is_resolved(self):
        response = self.app.get('/delete')
        self.assertEquals(response.view_class, DeleteView)
  def test_update_url_is_resolved(self):
        response = self.app.get('/update')
        self.assertEquals(response.view_class, UpdateView)
  
  
