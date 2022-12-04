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
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import http from '../../utils/api';
import "./styles.scss";

const RedirectionPage = () => {
  const URLshortenerUser  = window.localStorage.getItem("URLshortenerUser");
  var id = (URLshortenerUser && JSON.parse(URLshortenerUser).id) || {};

  const { pathname: stub } = useLocation()
  let dateTime = new Date();


  useEffect(() => {
    fetchURL()
  }, [])

  const fetchURL = async () => {
		await http
			.get(`/links/stub/${stub}`)
			.then((res) => {
				const { link } = res.data || {};
        const { disabled, expire_on, long_url, password_hash } = link || {}
				const isExpired = (expire_on && new Date(expire_on) > dateTime) || false;
        // console.log(disabled, (!expire_on || new Date(expire_on) > dateTime))
				if (disabled == false && link.password_hash == '' && !isExpired) {
					return window.location.assign(long_url);
				}
				else if (disabled == true || isExpired) {
					Swal.fire({
            icon: 'error',
            title: 'Oops, this link is no longer active!',
            text: 'It has either expired or has been disabled by the owner',
            confirmButtonColor: '#221daf',
          })
				}
				else if (password_hash != '') {
					Swal.fire({
						title: 'Enter password for authetication',
						input: 'text',
						inputAttributes: {
							autocapitalize: 'off',
						},
						showCancelButton: true,
						confirmButtonText: 'Submit',
						showLoaderOnConfirm: true,
						preConfirm: (password) => {
							if (password == link.password_hash) {
								window.location.assign(link.long_url);
							} else {
								Swal.showValidationMessage(`Incorect password. Request failed!`);
							}
						},
					});
				}
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Url does not exist!',
					text: 'Please check the URL again',
					confirmButtonColor: '#221daf',
				});
			});
	};

  return (
   <div>

    </div>
  );
};

export default RedirectionPage;