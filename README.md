# ProjectBakery

## Bernie's Bakery Pricing Guide

[Bernie's Bakery](https://q-bakery.herokuapp.com/) -- link to Heroku-hosted site

### Problem:
    Need to keep associates up-to-date on item prices as we go into the holiday season
### App Purpose:
    Shows all inventory items that could be possibly sold via shop, farmer's market, or cross-country shipments with relative prices
### Who would use it:
    The store owner would use it to keep items up-to-date, and associates would use it for reference when in the sales position.

## RESTful Routes
1. Index --> GET --> '/'
2. Show --> GET --> '/:id'
3. New --> GET --> '/new'
4. Create --> POST --> '/:id'
5. Edit --> GET --> '/:id/edit'
6. Update --> PUT --> '/:id'
7. Delete --> DELETE --> '/:id'

### Technologies Used
    - Mongoose, Node.js, Express, EJS, Bootstrap

### Approach Taken
    1. Draw a waterfall scheme to show the flow of pages (this was hand-drawn)
        **Adjustments were made to the original, to create a more streamline presentation**
    2. Write out the RESTful route process (handwritten)
    3. Set up MVC
        a) Models
            * bakery.js --- this holds the mongoose Schema for Bakery
        b) Views
            * Partials
                * head.ejs --- houses code used throughout the other View EJS files' head
            * edit.ejs --- shows the edit page
            * index.ejs --- shows the index page 
            * new.ejs --- shows the add page
            * show.ejs --- shows item detail page
        c) Controllers
            * bakery.js --- houses the router
    4. Set up server
    5. Include dependencies and middleware as I go along
    6. Set up Index Route
    7. Connect index.ejs file to index route
    8. Set up New Route
    9. Connect new.ejs to new route
        * Have a way to link back to home page
    10. Post results created from new page onto home page
    11. Have a way to show the individual bakery item
    12. Have a way to edit individual bakery item from home or show page
    13. Render edit page when an edit button is pushed
    14. Put results from edit page on show page
    15. Create a way to delete the item
    16. Set up CSS
    17. Type out README.md file

### Problems
    1. The first problem I ran into was my original layout. I would have had to create other views files, and the way I had the pages laid out, I thought it would be better to address this later when we learn about relational databases. To help search items by category, I decided to create a search bar on the homepage that would redirect to page with the results related to the value put into the search bar. I was unable to complete this, but would like to revisit this problem, once learning how to solve my query problems.
    2. The second problem I encountered was the displaying of new items via the heroku host. I am able to view up to 3 items on a row on my localhost server, but am only able to view 1 per row on the heroku host. There are CSS shortcuts that I believe can help me address this issues when I return to the project.