# amazon
## Key features: Multiple databases- MySQL & MongoDB ,Redis Cache, Kafka, Passport JWT Authentication.
### Screens
<img src="frontend/public/images/login.png" width="45%" alt="Login Page"></img>
<img src="frontend/public/images/dashboard.png" width="45%"></img>
<img src="frontend/public/images/product-page.png" width="45%"></img>
<img src="frontend/public/images/cart.png" width="45%"></img>
<img src="frontend/public/images/checkout.png" width="45%"></img>
<img src="frontend/public/images/orders.png" width="45%"></img>
### System Architecture
<img src="frontend/public/images/arch-design.png" width="90%"></img>
### Database Schema
<img src="frontend/public/images/db-schema.png" width="90%"></img>
### Performance Testing
<p>We deployed the app on AWS S3 and tested the application using Jmeter with 100,200,300,400,500 concurrent requests, the performance was as follows:<p/>
<img src="frontend/public/images/pm1.png" width="90%"></img>
<p>After using load balancer, the application throughput is increased and the response time is gradually decreased, and even if the users are increased, the application was able to serve all the request within shorter response time compared to the application without load balancer.</p>
<p>Redis Caching also provides significant improvement in performance in certain functionalities where it is used. For eg. In product search and while fetching orders. Redis provided significant improvement in response times</p>
<img src="frontend/public/images/pm2.png" width="90%"></img>
