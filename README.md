# Breezy HR Recruitment Analytics
If your company's recruitment department uses **[Breezy HR](https://breezy.hr)** as application tracking system, this app might enhance your **recruiting analytics** capabilities. 

**This app allows you to:**
- Store all candidate-data in a SQL database. Candidate names will be anonymized after 180 days.
- Provide constantly updated  data and timelines about your current vacancies, candidates and every action of the candidate-journey including timestamps.
- Store data in an optimised structure for more advanced analytics than provided by the Breezy App itself.
- Error logs in extra file (errors.log)
 … and many more things!

At the moment I’m using this app with **MySQL** and **Tableau** for data-visualisation!

## Project status: 
This project started as a personal side project mainly for personal learning purposes. Fortunately, this MVP caught the attention of our Jimdo Data Department and they agreed to join forces on this Dashbaord and beyond. Therefore, this app won't be maintained and improved anymore, at least not in this repo! 

## Installation
- Node.js
- MySQL
- Dependencies from package.json

## How to use
Create a .env file with
```sh
COMPANY_ID=[breezy_company_id]
AUTH TOKEN=[breezy_auth_token]
DB_HOST=[host] 
DB_USER=[db_user]
DB_PASSWORD=[db_password]
DATABASE=[db_name]
```

Run **positions.js** to keep your position data uptodate (published and closed ones)  
Run **candidates.js** to keep updating the latest candidate dataw  
Run **stream.js** to keep updating the lastest candidate actions   

## Planned next: 
Better error tracing and resolving.  
Integrate **Calendly** data.  
Integrate **Google Calendar** data.  
Logging of how many new positions were published during the last x-days.  
Docker & Deploy

Feedback is always very welcome!


## License

MIT
**Free Software, Hell Yeah!**