/*
MIT License

Copyright (c) 2022 John Damilola, Leo Hsiang, Swarangi Gaurkar, Kritika Javali, Aaron Dias Barreto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import Main from "assets/images/mh.svg";
import { Link } from "react-router-dom";
import "./styles.scss";

const Home = () => {
    return (
        <div className="home">
          <section className="masthead">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <h1>Simple URL shortener</h1>
                  <p>
                  The URL-Shortner is a simple tool that you can utilize to create short versions of that long urls and share it with others.
                  </p>
                  <div className="btn-flex mt-4">
                    <Link to="/register">
                      <button className="btn btn-main">Get started for free</button>
                    </Link>
                  </div>
                </div>
                <div className="col-md-6">
                  <img
                    className="img-fluid d-none d-lg-block"
                    src={Main}
                    alt="laptop with coffee"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      );
 
};

export default Home;
