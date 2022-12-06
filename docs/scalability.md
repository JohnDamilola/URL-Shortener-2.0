![Load Balancer (1)](https://user-images.githubusercontent.com/17693596/205795052-49ee58be-ea56-4191-b6e1-4e70dce11b64.png)

One way to further scale this web application would be to introduce a **load balancer** to route requests in a way that maximises speed and capacity utilisation to ensure that no server is overworked.

Then split up services to introduce a **micro-service architecture**, one for the short url shortening & retrieval and the other for url engagement analytics. Also, specialised databases can be used for each service.

## ADDED SCALABILITY LEAPS
With our upgrade for Phase 2.0., we were able to the team introducted identity and access management that centralizes user identity and improves the scalability. 

Also, our application uses and follows RESTful API to provide a stateless software that does not share anything between requests. This means that there doesn't have to be (much) communication between servers, making our application horizontally scalable. Moreover, development teams can scale the product without much difficulty because there is a separation between the client and the server.

We were able to record the following leaps comparing phase1 vs phase2 endpoints
<ul>
  <li>An average of x10 improvement in API response time</li>
  <li>An average of x73 improvement in API connection time</li>
  <li>Adding user authentication to scale up the creation of shortened URL under multiple users and still allow for anonymous users creating shortened links</li>
  <li>Faster URL redirect speeds despite an extra endpoint triggered to track engagements, page visits, UTM parameters</li>

<li>x233 response time in landing page on fresh load
<img width="1129" alt="Screenshot 2022-12-05 at 21 23 15" src="https://user-images.githubusercontent.com/17693596/205795403-744ab8f7-b669-4d5e-8c4c-d1ed8983826c.png"/>
<img width="1129" alt="Screenshot 2022-12-05 at 21 23 39" src="https://user-images.githubusercontent.com/17693596/205795404-eff05b81-37b4-4a63-8ca0-6283643010a1.png"/>
Source: (https://www.site24x7.com/tools/restapi-tester.html)
  </li>
  </ul>
