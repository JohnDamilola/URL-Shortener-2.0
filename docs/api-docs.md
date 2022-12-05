### Backend API ENDPOINTS

AUTHENTICATION

Auth Login
> POST /auth/login
> 

<aside>
💡 Payload: email, password
</aside>
<br/><br/>

Auth Registration
> POST /auth/register
> 

<aside>
💡 Payload: first_name, last_name, email, password
</aside>
<br/><br/>

LINKS

Get a single shortened link
> GET /links/{id}
> 

Get all shortened links  

> GET /links/all
> 

Create shortened link 

> POST /links/create
> 

<aside>
💡 Payload: id, stub, long_url, disabled, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_term, password_hash, expire_on, user_id

</aside>
<br/><br/>

Update single link

> PATCH /links/update/{id}
> 

<aside>
💡 Payload: id, stub, long_url, disabled, utm_source, utm_medium, utm_campaign, utm_term, utm_content, utm_term, password_hash, expire_on, user_id
</aside>
<br/><br/>

Delete single link

> DELETE /links/{id}

Get the overview stats (total links created, total links enabled, and total links visits)
> GET /links/stats
> 
<aside>
💡 return: total_links_created, total_links_enabled, total_links_visit
</aside>
<br/><br/>

Get a single shortened link using stub
> GET /links/stub/{stub}
> 

<aside>
💡 return: total_links_created, total_links_enabled, total_links_visit
</aside>
<br/><br/>

USER MANAGEMENT

Update User
> PATCH /users/{id}
> 

<aside>
💡 Payload: first_name, last_name, email, password
</aside>
<br/><br/>

Delete User
> DELETE /users/{id}

ANALYTICS

Get all user links engagements
> GET /links/engagements
> 

<aside>
💡 return: id, 
    link_id,
    utm_source
    utm_medium 
    utm_campaign 
    utm_term 
    utm_content,
    created_on
</aside>

Get all engagements for a single link
> GET /links/{id}/engagements
> 

<aside>
💡 return: id, 
    link_id,
    utm_source
    utm_medium 
    utm_campaign 
    utm_term 
    utm_content,
    created_on
</aside>
