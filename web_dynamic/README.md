# AirBnB Clone - Web Dynamic

## Description
This project is part of the curriculum for the SE Foundations program. It focuses on the dynamic aspects of web development, including the use of Python, Front-end technologies, and JavaScript.

## Authors
- Khalfani Khalfan

## Learning Objectives
- Requesting your own API
- Modifying HTML element styles and content
- DOM manipulation
- Making GET and POST requests with JQuery Ajax
- Binding to DOM and user events

## Requirements
- Use of JQuery version 3.x
- No use of `var`
- DOM should not reload for each action

## Setup
Before starting the project, install the necessary dependencies:
```bash
$ sudo apt-get install -y python3-lxml
$ sudo pip3 install flask_cors flasgger
```
Tasks
* 0. Last clone!
Fork the codebase and update the repository name to AirBnB_clone_v4. Add yourself as an author and improve the README.md.

* 1. Cash only
Start a Flask web application and manage asset caching with UUIDs.

* 2. Select some Amenities to be comfortable!
Make the filters section dynamic with JQuery, managing the amenities selection.

* 3. API status
Update the API entry point to handle CORS appropriately.

```python
>>> Import JQuery
```
Include the following in your HTML <head> tag:

HTML

```html
<head>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
</head>
```
### Expose Ports from Vagrant
Add the following line to your Vagrantfile for port forwarding:

``` Ruby

config.vm.network :forwarded_port, guest: 5001, host: 5001
```