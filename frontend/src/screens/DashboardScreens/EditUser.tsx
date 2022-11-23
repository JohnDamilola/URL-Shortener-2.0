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
import { Popconfirm } from "antd";
import { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import http from 'utils/api';
import "./styles.scss";

const EditUser = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, SetLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const URLshortenerUser  = window.localStorage.getItem("URLshortenerUser");
  var id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};

  const handleEditUser = async(e: any) => {
    e.preventDefault()
    const payload = {
      first_name,
      last_name,
      email,
      password,
    };
    setIsSubmitting(true);

    await http
      .patch(`/user/update/${id}`, payload)
      .then((res) => {
        const { localId } = res.data;
        Swal.fire({
          icon: 'success',
          title: 'Edit Successful!',
          text: 'You have successfully Edited account info',
          confirmButtonColor: '#221daf',
        }).then(() => {
          setIsSubmitting(false);
          window.location.replace("/dashboard");
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Edit Failed!',
          text: 'An error occurred, please try again',
          confirmButtonColor: '#221daf',
        })
        setIsSubmitting(false);
      });
  };
  const handleDeleteAccount = async(id: any) => {

    await http
      .delete(`/user/delete/${id}`)
      .then((res) => {
        const { id } = res.data;
        Swal.fire({
          icon: 'success',
          title: 'Account Deleted Successfully!',
          text: 'You have successfully deleted your account',
          confirmButtonColor: '#221daf',
        }).then(() => {
          window.localStorage.removeItem('URLshortenerUser')
          window.location.replace('/')
        })
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Account Deletion Failed!',
          text: 'An error occurred, please try again',
          confirmButtonColor: '#221daf',
        })
      });
  };
  return (
    <div className="create-deck-page dashboard-commons">
      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="header-card">
                <div className="row justify-content-center">
                  <div className="col-md-12">
                    <div className="page-header">
                      <div className="row justify-content-between align-items-center">
                        <h3>Edit Your Account Info</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flash-card__list row justify-content-center mt-2">
                  <form className="col-md-12" onSubmit={handleEditUser}>
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => SetLastName(e.target.value)}
                        placeholder="Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="johndoe@gmail.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group mt-4 text-right mb-0">
                      <button className="btn" type='submit'>
                        <i className="lni lni-circle-plus mr-2"></i>
                        <span className="">{isSubmitting ? 'Editing User...' : 'Submit'}</span>
                      </button>
                    </div>
                  </form>
                  <p>&nbsp;&nbsp;</p>
                    <div className="col-md-12">
                      <div className="page-header">
                          <h3>Delete Your Account</h3>
                      </div>
                    </div>
                    <div className="form-group mt-4 text-right mb-0">
                            <Popconfirm
                              title="Are you sure to delete this account?"
                              onConfirm={() => handleDeleteAccount(id)}
                              okText="Yes"
                              cancelText="No"
                            >
                             <button className="btn" type='submit'>
                              <i className="lni lni-circle-plus mr-2"></i> Delete
                              </button>
                            </Popconfirm>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditUser;