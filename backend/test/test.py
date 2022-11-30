import sys
sys.path.append('backend/test')
from test_auth import AuthTestApp
from test_shorten_links import LinkTestApp
import unittest

if __name__=="__main__":
  unittest.main()
